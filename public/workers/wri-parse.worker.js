/* ═══════════════════════════════════════════════════════════════
   WRI Global Power Plant Database — CSV parse Web Worker
   Self-contained (no module deps). Receives { text, fuelKeys }.
   Posts { plants: [...] } or { error: 'schema' }.

   Column contract (v1.3.0):
     latitude, longitude, primary_fuel, capacity_mw, name, country_long
   ═══════════════════════════════════════════════════════════════ */
self.onmessage = function (e) {
  var text = e.data.text;
  var fuelKeys = e.data.fuelKeys;

  // ── Minimal CSV parser (handles RFC-4180 quoted fields) ──
  var rows = [];
  var field = "", row = [], inQ = false;
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQ = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }

  if (!rows.length) { self.postMessage({ error: 'schema' }); return; }

  var head = rows[0].map(function (h) { return h.trim(); });
  var iLat  = head.indexOf('latitude');
  var iLng  = head.indexOf('longitude');
  var iFuel = head.indexOf('primary_fuel');
  var iCap  = head.indexOf('capacity_mw');
  var iName = head.indexOf('name');
  var iCtry = head.indexOf('country_long');

  if (iLat < 0 || iLng < 0 || iFuel < 0) {
    self.postMessage({ error: 'schema' });
    return;
  }

  var out = [];
  for (var r = 1; r < rows.length; r++) {
    var rw  = rows[r];
    var lat = parseFloat(rw[iLat]);
    var lng = parseFloat(rw[iLng]);
    if (!isFinite(lat) || !isFinite(lng)) continue;

    var fuelRaw = (rw[iFuel] || 'Other').trim();
    var fuel    = fuelKeys.indexOf(fuelRaw) >= 0 ? fuelRaw : 'Other';
    var cap     = parseFloat(rw[iCap]) || 8;
    var alt     = Math.max(0.004, Math.min(0.14, 0.004 + Math.sqrt(cap) / 900));

    out.push({
      lat:     lat,
      lng:     lng,
      fuel:    fuel,
      cap:     cap,
      alt:     alt,
      name:    iName >= 0 ? (rw[iName] || '') : '',
      country: iCtry >= 0 ? (rw[iCtry] || '') : '',
    });
  }

  self.postMessage({ plants: out });
};
