/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — AI Education & Literacy Data
   UNESCO AI Competency Frameworks, embeddable education tools,
   curricula programs, and education statistics.
   Sources: UNESCO, AI4K12, Code.org, MIT, CONARE, MEP, INTEF
   ═══════════════════════════════════════════════════════════════ */

// ── UNESCO AI Competency Frameworks ──
export const EDU_FRAMEWORKS = (en) => ({
  title: en ? "AI Competency Frameworks for Education" : "Marcos de Competencias AI para Educación",
  source: "UNESCO (2024-2025)",

  students: {
    title: en ? "UNESCO AI Competency Framework for Students" : "Marco de Competencias AI para Estudiantes de UNESCO",
    url: "https://www.unesco.org/en/digital-education/ai-competency-framework-students",
    year: 2024,
    totalCompetencies: 12,
    levels: [
      en ? "Understand (ages 6-10)" : "Comprender (edades 6-10)",
      en ? "Apply (ages 10-14)" : "Aplicar (edades 10-14)",
      en ? "Create (ages 14-18)" : "Crear (edades 14-18)"
    ],
    competencies: [
      {
        id: 1,
        area: en ? "AI Mindset" : "Mentalidad AI",
        name: en ? "Recognize AI" : "Reconocer AI",
        description: en ? "Identify AI systems in everyday life and distinguish AI from non-AI technologies" : "Identificar sistemas AI en la vida cotidiana y distinguir AI de tecnologías no-AI"
      },
      {
        id: 2,
        area: en ? "AI Mindset" : "Mentalidad AI",
        name: en ? "Understand How AI Works" : "Entender Cómo Funciona AI",
        description: en ? "Comprehend basic AI concepts: data, algorithms, training, inference, pattern recognition" : "Comprender conceptos básicos de AI: datos, algoritmos, entrenamiento, inferencia, reconocimiento de patrones"
      },
      {
        id: 3,
        area: en ? "AI Mindset" : "Mentalidad AI",
        name: en ? "Critical AI Thinking" : "Pensamiento Crítico sobre AI",
        description: en ? "Evaluate AI outputs critically, question AI-generated content, identify potential errors" : "Evaluar críticamente las salidas de AI, cuestionar contenido generado por AI, identificar errores potenciales"
      },
      {
        id: 4,
        area: en ? "AI Use" : "Uso de AI",
        name: en ? "Use AI Responsibly" : "Usar AI Responsablemente",
        description: en ? "Apply AI tools ethically, respect intellectual property, understand terms of service" : "Aplicar herramientas AI éticamente, respetar propiedad intelectual, entender términos de servicio"
      },
      {
        id: 5,
        area: en ? "AI Use" : "Uso de AI",
        name: en ? "Human-AI Collaboration" : "Colaboración Humano-AI",
        description: en ? "Effectively collaborate with AI tools while maintaining human judgment and oversight" : "Colaborar efectivamente con herramientas AI manteniendo juicio y supervisión humana"
      },
      {
        id: 6,
        area: en ? "AI Use" : "Uso de AI",
        name: en ? "AI for Problem Solving" : "AI para Resolución de Problemas",
        description: en ? "Apply AI tools to solve real-world problems across disciplines" : "Aplicar herramientas AI para resolver problemas del mundo real en distintas disciplinas"
      },
      {
        id: 7,
        area: en ? "AI Ethics" : "Ética AI",
        name: en ? "Identify AI Bias" : "Identificar Sesgo AI",
        description: en ? "Recognize how bias enters AI systems through data, design, and deployment choices" : "Reconocer cómo el sesgo entra en sistemas AI a través de datos, diseño y decisiones de despliegue"
      },
      {
        id: 8,
        area: en ? "AI Ethics" : "Ética AI",
        name: en ? "Understand AI Privacy" : "Entender Privacidad AI",
        description: en ? "Comprehend how AI systems collect, use, and potentially misuse personal data" : "Comprender cómo sistemas AI recopilan, usan y potencialmente hacen mal uso de datos personales"
      },
      {
        id: 9,
        area: en ? "AI Ethics" : "Ética AI",
        name: en ? "AI Safety & Wellbeing" : "Seguridad y Bienestar AI",
        description: en ? "Understand risks of AI including manipulation, addiction, and harmful content generation" : "Entender riesgos de AI incluyendo manipulación, adicción y generación de contenido dañino"
      },
      {
        id: 10,
        area: en ? "AI Creation" : "Creación con AI",
        name: en ? "Design AI Solutions" : "Diseñar Soluciones AI",
        description: en ? "Design and prototype AI-based solutions to community or global challenges" : "Diseñar y prototipar soluciones basadas en AI para desafíos comunitarios o globales"
      },
      {
        id: 11,
        area: en ? "AI Creation" : "Creación con AI",
        name: en ? "Train AI Models" : "Entrenar Modelos AI",
        description: en ? "Collect data, train simple ML models, and evaluate their performance" : "Recopilar datos, entrenar modelos ML simples y evaluar su rendimiento"
      },
      {
        id: 12,
        area: en ? "AI Creation" : "Creación con AI",
        name: en ? "AI & Society" : "AI y Sociedad",
        description: en ? "Analyze AI's impact on society, work, environment, and propose governance approaches" : "Analizar el impacto de AI en la sociedad, trabajo, ambiente y proponer enfoques de gobernanza"
      }
    ]
  },

  teachers: {
    title: en ? "UNESCO AI Competency Framework for Teachers" : "Marco de Competencias AI para Docentes de UNESCO",
    url: "https://www.unesco.org/en/digital-education/ai-competency-framework-teachers",
    year: 2024,
    totalCompetencies: 15,
    levels: [
      en ? "Acquire (awareness)" : "Adquirir (concienciación)",
      en ? "Deepen (application)" : "Profundizar (aplicación)",
      en ? "Create (innovation)" : "Crear (innovación)"
    ],
    competencies: [
      {
        id: 1,
        area: en ? "AI Pedagogy" : "Pedagogía AI",
        name: en ? "AI-Enhanced Teaching" : "Enseñanza Mejorada con AI",
        description: en ? "Integrate AI tools into teaching practices to enhance learning outcomes" : "Integrar herramientas AI en prácticas de enseñanza para mejorar resultados de aprendizaje"
      },
      {
        id: 2,
        area: en ? "AI Pedagogy" : "Pedagogía AI",
        name: en ? "Personalized Learning with AI" : "Aprendizaje Personalizado con AI",
        description: en ? "Use AI to differentiate instruction and provide adaptive learning experiences" : "Usar AI para diferenciar instrucción y proporcionar experiencias de aprendizaje adaptativo"
      },
      {
        id: 3,
        area: en ? "AI Pedagogy" : "Pedagogía AI",
        name: en ? "AI-Informed Assessment" : "Evaluación Informada por AI",
        description: en ? "Leverage AI tools for formative assessment while maintaining educational validity" : "Aprovechar herramientas AI para evaluación formativa manteniendo validez educativa"
      },
      {
        id: 4,
        area: en ? "AI Pedagogy" : "Pedagogía AI",
        name: en ? "Teaching About AI" : "Enseñar Sobre AI",
        description: en ? "Develop curriculum and activities that teach students about AI concepts and implications" : "Desarrollar currículo y actividades que enseñen a estudiantes sobre conceptos e implicaciones AI"
      },
      {
        id: 5,
        area: en ? "AI Pedagogy" : "Pedagogía AI",
        name: en ? "Inclusive AI Education" : "Educación AI Inclusiva",
        description: en ? "Ensure AI education reaches all students regardless of background or ability" : "Asegurar que educación AI llegue a todos los estudiantes sin importar origen o capacidad"
      },
      {
        id: 6,
        area: en ? "AI Knowledge" : "Conocimiento AI",
        name: en ? "AI Foundations" : "Fundamentos AI",
        description: en ? "Understand core AI/ML concepts sufficient to teach and evaluate AI tools critically" : "Entender conceptos centrales de AI/ML suficientes para enseñar y evaluar herramientas AI críticamente"
      },
      {
        id: 7,
        area: en ? "AI Knowledge" : "Conocimiento AI",
        name: en ? "Generative AI Literacy" : "Alfabetización AI Generativa",
        description: en ? "Understand capabilities and limitations of GenAI tools including ChatGPT, image generators" : "Entender capacidades y limitaciones de herramientas GenAI incluyendo ChatGPT, generadores de imágenes"
      },
      {
        id: 8,
        area: en ? "AI Knowledge" : "Conocimiento AI",
        name: en ? "AI Data Literacy" : "Alfabetización de Datos AI",
        description: en ? "Understand how data quality, quantity, and representation affect AI outputs" : "Entender cómo la calidad, cantidad y representación de datos afectan las salidas AI"
      },
      {
        id: 9,
        area: en ? "AI Ethics" : "Ética AI",
        name: en ? "Ethical AI Use in Education" : "Uso Ético de AI en Educación",
        description: en ? "Navigate ethical considerations of AI in education: plagiarism, assessment integrity, student privacy" : "Navegar consideraciones éticas de AI en educación: plagio, integridad de evaluación, privacidad estudiantil"
      },
      {
        id: 10,
        area: en ? "AI Ethics" : "Ética AI",
        name: en ? "AI Bias Awareness" : "Conciencia de Sesgo AI",
        description: en ? "Identify and mitigate bias in AI educational tools and content" : "Identificar y mitigar sesgo en herramientas educativas AI y contenido"
      },
      {
        id: 11,
        area: en ? "AI Ethics" : "Ética AI",
        name: en ? "Student Data Protection" : "Protección de Datos Estudiantiles",
        description: en ? "Ensure student data privacy when using AI tools — comply with data protection regulations" : "Asegurar privacidad de datos estudiantiles al usar herramientas AI — cumplir con regulaciones de protección de datos"
      },
      {
        id: 12,
        area: en ? "Professional AI" : "AI Profesional",
        name: en ? "AI for Professional Development" : "AI para Desarrollo Profesional",
        description: en ? "Use AI tools for own professional growth, research, and administrative efficiency" : "Usar herramientas AI para crecimiento profesional propio, investigación y eficiencia administrativa"
      },
      {
        id: 13,
        area: en ? "Professional AI" : "AI Profesional",
        name: en ? "AI Content Creation" : "Creación de Contenido con AI",
        description: en ? "Create and adapt educational materials using AI while maintaining quality and originality" : "Crear y adaptar materiales educativos usando AI manteniendo calidad y originalidad"
      },
      {
        id: 14,
        area: en ? "Professional AI" : "AI Profesional",
        name: en ? "AI Policy Participation" : "Participación en Políticas AI",
        description: en ? "Contribute to school and district AI policies, participate in AI governance discussions" : "Contribuir a políticas AI escolares y distritales, participar en discusiones de gobernanza AI"
      },
      {
        id: 15,
        area: en ? "Professional AI" : "AI Profesional",
        name: en ? "AI Innovation in Education" : "Innovación AI en Educación",
        description: en ? "Pioneer new AI applications in education, share best practices, mentor colleagues" : "Liderar nuevas aplicaciones AI en educación, compartir mejores prácticas, mentorear colegas"
      }
    ]
  },

  ai4k12: {
    title: en ? "AI4K12 — Five Big Ideas in AI" : "AI4K12 — Cinco Grandes Ideas en AI",
    org: "AI4K12 Initiative (AAAI + CSTA)",
    url: "https://ai4k12.org/",
    year: 2020,
    description: {
      en: "Framework for K-12 AI education developed by AAAI and CSTA. Organizes AI concepts into five big ideas with grade-band progression.",
      es: "Marco para educación AI K-12 desarrollado por AAAI y CSTA. Organiza conceptos AI en cinco grandes ideas con progresión por niveles de grado."
    },
    bigIdeas: [
      {
        id: 1,
        name: en ? "Perception" : "Percepción",
        subtitle: en ? "Computers perceive the world using sensors" : "Las computadoras perciben el mundo usando sensores",
        color: "#ef4444",
        examples: en ? "Image recognition, speech recognition, natural language processing" : "Reconocimiento de imágenes, reconocimiento de voz, procesamiento de lenguaje natural"
      },
      {
        id: 2,
        name: en ? "Representation & Reasoning" : "Representación y Razonamiento",
        subtitle: en ? "Agents maintain representations of the world and use them for reasoning" : "Los agentes mantienen representaciones del mundo y las usan para razonar",
        color: "#f59e0b",
        examples: en ? "Knowledge graphs, decision trees, search algorithms" : "Grafos de conocimiento, árboles de decisión, algoritmos de búsqueda"
      },
      {
        id: 3,
        name: en ? "Learning" : "Aprendizaje",
        subtitle: en ? "Computers can learn from data" : "Las computadoras pueden aprender de datos",
        color: "#10b981",
        examples: en ? "Supervised learning, neural networks, training and testing" : "Aprendizaje supervisado, redes neuronales, entrenamiento y pruebas"
      },
      {
        id: 4,
        name: en ? "Natural Interaction" : "Interacción Natural",
        subtitle: en ? "Intelligent agents require many kinds of knowledge to interact naturally with humans" : "Agentes inteligentes requieren muchos tipos de conocimiento para interactuar naturalmente con humanos",
        color: "#3b82f6",
        examples: en ? "Chatbots, virtual assistants, emotion recognition" : "Chatbots, asistentes virtuales, reconocimiento de emociones"
      },
      {
        id: 5,
        name: en ? "Societal Impact" : "Impacto Social",
        subtitle: en ? "AI can impact society in both positive and negative ways" : "AI puede impactar la sociedad tanto positiva como negativamente",
        color: "#8b5cf6",
        examples: en ? "Bias, privacy, job displacement, beneficial AI applications" : "Sesgo, privacidad, desplazamiento laboral, aplicaciones AI beneficiosas"
      }
    ]
  }
});

// ── Embeddable/Linkable Education Tools ──
export const EDU_TOOLS = (en) => [
  {
    id: "teachable-machine",
    name: "Google Teachable Machine",
    url: "https://teachablemachine.withgoogle.com/",
    ageRange: "8+",
    spanishSupport: true,
    embeddable: true,
    free: true,
    category: en ? "ML Training" : "Entrenamiento ML",
    description: {
      en: "Train image, sound, and pose classification models directly in the browser. No code required. Export to TensorFlow.js, TF Lite, or Coral.",
      es: "Entrena modelos de clasificación de imágenes, sonido y poses directamente en el navegador. Sin código. Exporta a TensorFlow.js, TF Lite o Coral."
    },
    pedagogicalUse: {
      en: "Perfect introduction to supervised learning. Students collect training data, train model, test accuracy, observe bias.",
      es: "Introducción perfecta al aprendizaje supervisado. Estudiantes recopilan datos de entrenamiento, entrenan modelo, prueban precisión, observan sesgo."
    }
  },
  {
    id: "ml-for-kids",
    name: "Machine Learning for Kids",
    url: "https://machinelearningforkids.co.uk/",
    ageRange: "7-14",
    spanishSupport: true,
    embeddable: false,
    free: true,
    category: en ? "ML Training" : "Entrenamiento ML",
    description: {
      en: "Scratch-based ML platform: train text, image, number, and sound classifiers. Build Scratch projects that use trained models.",
      es: "Plataforma ML basada en Scratch: entrena clasificadores de texto, imagen, números y sonido. Construye proyectos Scratch que usan modelos entrenados."
    },
    pedagogicalUse: {
      en: "Bridges Scratch (widely used in CR schools) with ML concepts. Ideal for MEP integration.",
      es: "Conecta Scratch (ampliamente usado en escuelas de CR) con conceptos ML. Ideal para integración con MEP."
    }
  },
  {
    id: "tf-playground",
    name: "TensorFlow Playground",
    url: "https://playground.tensorflow.org/",
    ageRange: "14+",
    spanishSupport: false,
    embeddable: true,
    free: true,
    category: en ? "Neural Networks" : "Redes Neuronales",
    description: {
      en: "Interactive neural network visualization: adjust architecture, learning rate, activation functions. See real-time training animation.",
      es: "Visualización interactiva de redes neuronales: ajustar arquitectura, tasa de aprendizaje, funciones de activación. Ver animación de entrenamiento en tiempo real."
    },
    pedagogicalUse: {
      en: "Builds intuition for neural network behavior — how layers, neurons, and hyperparameters affect learning.",
      es: "Construye intuición sobre comportamiento de redes neuronales — cómo capas, neuronas e hiperparámetros afectan el aprendizaje."
    }
  },
  {
    id: "quick-draw",
    name: "Google Quick, Draw!",
    url: "https://quickdraw.withgoogle.com/",
    ageRange: "6+",
    spanishSupport: true,
    embeddable: true,
    free: true,
    category: en ? "AI Games" : "Juegos AI",
    description: {
      en: "Drawing game: sketch objects and AI tries to recognize them in 20 seconds. 50M+ doodle dataset available for analysis.",
      es: "Juego de dibujo: dibuja objetos y AI intenta reconocerlos en 20 segundos. Dataset de 50M+ garabatos disponible para análisis."
    },
    pedagogicalUse: {
      en: "Gamified introduction to image recognition. Discuss: how does AI 'see'? What makes recognition hard?",
      es: "Introducción gamificada al reconocimiento de imágenes. Discutir: ¿cómo 've' AI? ¿Qué hace difícil el reconocimiento?"
    }
  },
  {
    id: "moral-machine",
    name: "MIT Moral Machine",
    url: "https://www.moralmachine.net/",
    ageRange: "12+",
    spanishSupport: true,
    embeddable: false,
    free: true,
    category: en ? "AI Ethics" : "Ética AI",
    description: {
      en: "Trolley-problem scenarios for autonomous vehicles. 40M+ responses analyzed. Reveals cultural differences in ethical preferences.",
      es: "Escenarios tipo dilema del tranvía para vehículos autónomos. 40M+ respuestas analizadas. Revela diferencias culturales en preferencias éticas."
    },
    pedagogicalUse: {
      en: "Sparks deep ethical discussions about AI decision-making. Compare CR cultural values vs global patterns.",
      es: "Genera discusiones éticas profundas sobre toma de decisiones AI. Comparar valores culturales CR vs patrones globales."
    }
  },
  {
    id: "survival-best-fit",
    name: "Survival of the Best Fit",
    url: "https://www.survivalofthebestfit.com/",
    ageRange: "14+",
    spanishSupport: false,
    embeddable: false,
    free: true,
    category: en ? "AI Bias" : "Sesgo AI",
    description: {
      en: "Interactive game about AI hiring bias: build a hiring algorithm and discover how bias emerges from seemingly neutral choices.",
      es: "Juego interactivo sobre sesgo AI en contratación: construye un algoritmo de contratación y descubre cómo el sesgo emerge de decisiones aparentemente neutrales."
    },
    pedagogicalUse: {
      en: "Directly relevant to CR's BPO sector — demonstrates algorithmic discrimination in employment decisions.",
      es: "Directamente relevante para sector BPO de CR — demuestra discriminación algorítmica en decisiones de empleo."
    }
  },
  {
    id: "gapminder",
    name: "Gapminder Tools",
    url: "https://www.gapminder.org/tools/",
    ageRange: "10+",
    spanishSupport: true,
    embeddable: true,
    free: true,
    category: en ? "Data Literacy" : "Alfabetización de Datos",
    description: {
      en: "Animated bubble charts showing global development data. Dollar Street photo database challenges assumptions about poverty.",
      es: "Gráficos de burbujas animados mostrando datos de desarrollo global. Base de fotos Dollar Street desafía suposiciones sobre pobreza."
    },
    pedagogicalUse: {
      en: "Foundation for data literacy — understanding data is prerequisite for understanding AI. Excellent for geography + math classes.",
      es: "Fundamento para alfabetización de datos — entender datos es prerrequisito para entender AI. Excelente para clases de geografía + matemáticas."
    }
  },
  {
    id: "databasic",
    name: "DataBasic.io",
    url: "https://databasic.io/",
    ageRange: "10+",
    spanishSupport: true,
    embeddable: false,
    free: true,
    category: en ? "Data Literacy" : "Alfabetización de Datos",
    description: {
      en: "Four simple data literacy tools: WordCounter, WTFcsv, SameDiff, ConnectTheDots. MIT Civic Media Lab. Full Spanish interface.",
      es: "Cuatro herramientas simples de alfabetización de datos: WordCounter, WTFcsv, SameDiff, ConnectTheDots. MIT Civic Media Lab. Interfaz completa en español."
    },
    pedagogicalUse: {
      en: "Beginner-friendly data analysis — great for teacher training workshops and introductory data science.",
      es: "Análisis de datos para principiantes — excelente para talleres de capacitación docente y ciencia de datos introductoria."
    }
  },
  {
    id: "ml5js",
    name: "ml5.js",
    url: "https://ml5js.org/",
    ageRange: "14+",
    spanishSupport: false,
    embeddable: true,
    free: true,
    category: en ? "ML Programming" : "Programación ML",
    description: {
      en: "Friendly ML library for JavaScript: pre-trained models for image classification, pose estimation, text generation. Built on TensorFlow.js.",
      es: "Librería ML amigable para JavaScript: modelos pre-entrenados para clasificación de imágenes, estimación de poses, generación de texto. Sobre TensorFlow.js."
    },
    pedagogicalUse: {
      en: "Bridge between no-code tools and real programming. Ideal for CS students learning to integrate AI into web projects.",
      es: "Puente entre herramientas sin código y programación real. Ideal para estudiantes de CS aprendiendo a integrar AI en proyectos web."
    }
  },
  {
    id: "elements-of-ai",
    name: "Elements of AI",
    url: "https://www.elementsofai.com/",
    ageRange: "16+",
    spanishSupport: true,
    embeddable: false,
    free: true,
    category: en ? "AI Literacy Course" : "Curso de Alfabetización AI",
    description: {
      en: "Free online AI course from University of Helsinki. Taken by 1% of Finland's population. 25+ languages including Spanish.",
      es: "Curso AI en línea gratuito de la Universidad de Helsinki. Tomado por 1% de la población de Finlandia. 25+ idiomas incluyendo español."
    },
    pedagogicalUse: {
      en: "Mass AI literacy model. CR could replicate Finland's goal of training 1% of population (52,000 people).",
      es: "Modelo de alfabetización AI masiva. CR podría replicar meta de Finlandia de capacitar 1% de la población (52,000 personas)."
    }
  },
  {
    id: "scratch-ai",
    name: "Scratch + AI Extensions",
    url: "https://scratch.mit.edu/",
    ageRange: "7-14",
    spanishSupport: true,
    embeddable: true,
    free: true,
    category: en ? "Visual Programming" : "Programación Visual",
    description: {
      en: "MIT Scratch with AI extensions: text-to-speech, translate, video sensing. Familiar platform for CR schools with AI capabilities.",
      es: "MIT Scratch con extensiones AI: texto a voz, traducción, detección de video. Plataforma familiar para escuelas de CR con capacidades AI."
    },
    pedagogicalUse: {
      en: "Leverages existing Scratch familiarity in CR education system to introduce AI concepts incrementally.",
      es: "Aprovecha familiaridad existente con Scratch en sistema educativo de CR para introducir conceptos AI incrementalmente."
    }
  },
  {
    id: "ai-experiments",
    name: "Google AI Experiments",
    url: "https://experiments.withgoogle.com/collection/ai",
    ageRange: "10+",
    spanishSupport: false,
    embeddable: true,
    free: true,
    category: en ? "AI Exploration" : "Exploración AI",
    description: {
      en: "Collection of 100+ interactive AI experiments: music, art, language, visual. Showcases creative AI applications.",
      es: "Colección de 100+ experimentos AI interactivos: música, arte, lenguaje, visual. Muestra aplicaciones AI creativas."
    },
    pedagogicalUse: {
      en: "Demonstrates AI beyond STEM — art, music, creativity. Engages students who aren't traditional CS learners.",
      es: "Demuestra AI más allá de STEM — arte, música, creatividad. Involucra estudiantes que no son aprendices CS tradicionales."
    }
  },
  {
    id: "autodraw",
    name: "Google AutoDraw",
    url: "https://autodraw.com/",
    ageRange: "6+",
    spanishSupport: true,
    embeddable: false,
    free: true,
    category: en ? "AI Art" : "Arte AI",
    description: {
      en: "AI-powered drawing tool that suggests professional drawings based on rough sketches. Demonstrates pattern recognition.",
      es: "Herramienta de dibujo con AI que sugiere dibujos profesionales basados en bocetos. Demuestra reconocimiento de patrones."
    },
    pedagogicalUse: {
      en: "Fun entry point for younger students. Discussion: How does AI 'understand' what you're trying to draw?",
      es: "Punto de entrada divertido para estudiantes jóvenes. Discusión: ¿Cómo 'entiende' AI lo que intentas dibujar?"
    }
  },
  {
    id: "semantris",
    name: "Google Semantris",
    url: "https://research.google.com/semantris/",
    ageRange: "10+",
    spanishSupport: false,
    embeddable: false,
    free: true,
    category: en ? "NLP Games" : "Juegos NLP",
    description: {
      en: "Word association game powered by NLP: type words semantically related to targets. AI scores based on word embeddings.",
      es: "Juego de asociación de palabras impulsado por NLP: escribe palabras semánticamente relacionadas con objetivos. AI puntúa basándose en embeddings de palabras."
    },
    pedagogicalUse: {
      en: "Introduces natural language processing concepts through play. Discuss: How does AI understand word meaning?",
      es: "Introduce conceptos de procesamiento de lenguaje natural a través del juego. Discutir: ¿Cómo entiende AI el significado de las palabras?"
    }
  },
  {
    id: "ai-dungeon",
    name: "AI Dungeon / ChatGPT Creative Writing",
    url: "https://aidungeon.com/",
    ageRange: "14+",
    spanishSupport: true,
    embeddable: false,
    free: true,
    category: en ? "Generative AI" : "AI Generativa",
    description: {
      en: "AI-generated interactive fiction: demonstrates language model capabilities. Explore creativity, storytelling, and GenAI limitations.",
      es: "Ficción interactiva generada por AI: demuestra capacidades de modelos de lenguaje. Explorar creatividad, narrativa y limitaciones de GenAI."
    },
    pedagogicalUse: {
      en: "Creative writing + AI: students compare AI-generated vs human narratives. Discuss authorship and creativity.",
      es: "Escritura creativa + AI: estudiantes comparan narrativas generadas por AI vs humanas. Discutir autoría y creatividad."
    }
  }
];

// ── AI Education Curricula & Programs ──
export const EDU_CURRICULA = (en) => [
  {
    id: "code-org-ai",
    name: "Code.org — AI & Machine Learning Modules",
    org: "Code.org",
    url: "https://code.org/ai",
    targetAudience: en ? "K-12 students and teachers" : "Estudiantes K-12 y docentes",
    spanishSupport: true,
    free: true,
    description: {
      en: "Code.org AI curriculum: How AI Works video series, AI and Machine Learning course modules, Dance Party AI, AI for Oceans.",
      es: "Currículo AI de Code.org: serie de videos Cómo Funciona AI, módulos de cursos AI y Machine Learning, Dance Party AI, AI for Oceans."
    },
    crRelevance: {
      en: "Code.org already widely used in CR schools. AI modules integrate seamlessly into existing Hour of Code activities.",
      es: "Code.org ya ampliamente usado en escuelas de CR. Módulos AI se integran fluidamente en actividades existentes de Hora del Código."
    }
  },
  {
    id: "mit-app-inventor",
    name: "MIT App Inventor — AI Components",
    org: "MIT",
    url: "https://appinventor.mit.edu/explore/ai-with-mit-app-inventor",
    targetAudience: en ? "Middle and high school (12-18)" : "Secundaria y preparatoria (12-18)",
    spanishSupport: true,
    free: true,
    description: {
      en: "MIT App Inventor with AI extensions: Personal Image Classifier, Look Extension (image recognition), ChatBot component, translation.",
      es: "MIT App Inventor con extensiones AI: Clasificador de Imágenes Personal, Extensión Look (reconocimiento de imágenes), componente ChatBot, traducción."
    },
    crRelevance: {
      en: "Students build real mobile apps with AI capabilities — practical skills for CR's growing tech sector.",
      es: "Estudiantes construyen apps móviles reales con capacidades AI — habilidades prácticas para el creciente sector tech de CR."
    }
  },
  {
    id: "cs-unplugged",
    name: "CS Unplugged — AI Activities",
    org: "University of Canterbury",
    url: "https://www.csunplugged.org/",
    targetAudience: en ? "K-8 (ages 5-13)" : "K-8 (edades 5-13)",
    spanishSupport: true,
    free: true,
    description: {
      en: "Computer science without computers: hands-on activities teaching AI/ML concepts through games, puzzles, and physical activities.",
      es: "Ciencias de la computación sin computadoras: actividades prácticas enseñando conceptos AI/ML a través de juegos, rompecabezas y actividades físicas."
    },
    crRelevance: {
      en: "Ideal for rural CR schools with limited connectivity — teaches AI concepts without requiring computers or internet.",
      es: "Ideal para escuelas rurales de CR con conectividad limitada — enseña conceptos AI sin requerir computadoras o internet."
    }
  },
  {
    id: "maestros-tech",
    name: "Maestros.tech",
    org: "Maestros.tech Community",
    url: "https://maestros.tech/",
    targetAudience: en ? "Teachers (Spanish-speaking)" : "Docentes (hispanohablantes)",
    spanishSupport: true,
    free: true,
    description: {
      en: "Spanish-language teacher community for educational technology: AI integration guides, lesson plans, professional development resources.",
      es: "Comunidad de docentes en español para tecnología educativa: guías de integración AI, planes de lecciones, recursos de desarrollo profesional."
    },
    crRelevance: {
      en: "Native Spanish-language resources for CR teachers — removes language barrier for AI education adoption.",
      es: "Recursos nativos en español para docentes de CR — elimina barrera de idioma para adopción de educación AI."
    }
  },
  {
    id: "intef",
    name: "INTEF — Instituto Nacional de Tecnologías Educativas (Spain)",
    org: en ? "Ministry of Education, Spain" : "Ministerio de Educación, España",
    url: "https://intef.es/",
    targetAudience: en ? "Teachers (Spanish-speaking)" : "Docentes (hispanohablantes)",
    spanishSupport: true,
    free: true,
    description: {
      en: "Spain's national ed-tech institute: AI in education guides, digital competency frameworks, teacher training MOOCs in Spanish.",
      es: "Instituto nacional de tecnología educativa de España: guías de AI en educación, marcos de competencia digital, MOOCs de capacitación docente en español."
    },
    crRelevance: {
      en: "High-quality Spanish-language AI education resources from Spain's national education technology institute.",
      es: "Recursos de educación AI de alta calidad en español del instituto nacional de tecnología educativa de España."
    }
  },
  {
    id: "ai4all",
    name: "AI4ALL — Open Learning",
    org: "AI4ALL",
    url: "https://ai-4-all.org/",
    targetAudience: en ? "Underrepresented high school students (15-18)" : "Estudiantes sub-representados de preparatoria (15-18)",
    spanishSupport: false,
    free: true,
    description: {
      en: "AI education focused on diversity and inclusion: open curriculum, summer programs, mentorship for underrepresented students in AI.",
      es: "Educación AI enfocada en diversidad e inclusión: currículo abierto, programas de verano, mentoría para estudiantes sub-representados en AI."
    },
    crRelevance: {
      en: "Model for inclusive AI education — could be adapted for CR's indigenous and Afro-Costa Rican communities.",
      es: "Modelo para educación AI inclusiva — podría adaptarse para comunidades indígenas y afrocostarricenses de CR."
    }
  },
  {
    id: "plan-ceibal",
    name: "Plan Ceibal — AI Integration (Uruguay)",
    org: "Plan Ceibal, Uruguay",
    url: "https://www.ceibal.edu.uy/",
    targetAudience: en ? "K-12 (entire country)" : "K-12 (país completo)",
    spanishSupport: true,
    free: true,
    description: {
      en: "Uruguay's Plan Ceibal: pioneered 1:1 laptop program, now integrating AI literacy, computational thinking, and robotics across all grades.",
      es: "Plan Ceibal de Uruguay: pionero en programa 1:1 de laptops, ahora integrando alfabetización AI, pensamiento computacional y robótica en todos los grados."
    },
    crRelevance: {
      en: "Uruguay's model demonstrates how a small LATAM country can achieve universal AI literacy — directly replicable in CR.",
      es: "El modelo de Uruguay demuestra cómo un país pequeño de LATAM puede lograr alfabetización AI universal — directamente replicable en CR."
    }
  }
];

// ── Education Statistics ──
export const EDU_STATS = (en) => ({
  title: en ? "AI Education & STEM Statistics — Costa Rica" : "Estadísticas de Educación AI y STEM — Costa Rica",
  sources: ["CONARE", "MEP", "INEC", "UNESCO UIS", "OECD"],

  stemGraduates: {
    label: en ? "STEM Graduates per Year" : "Graduados STEM por Año",
    value: "~8,500",
    year: 2023,
    source: "CONARE — Estado de la Educación",
    context: {
      en: "Costa Rica graduates ~8,500 STEM professionals annually. Of these, approximately 2,800 are in IT-related fields.",
      es: "Costa Rica gradúa ~8,500 profesionales STEM anualmente. De estos, aproximadamente 2,800 son en campos relacionados con TI."
    }
  },

  keyMetrics: [
    {
      metric: en ? "University enrollment rate" : "Tasa de matrícula universitaria",
      value: "57%",
      benchmark: en ? "LATAM avg: 52%" : "Promedio LATAM: 52%",
      source: "UNESCO UIS",
      year: 2023
    },
    {
      metric: en ? "R&D expenditure (% GDP)" : "Gasto en I+D (% PIB)",
      value: "0.39%",
      benchmark: en ? "OECD avg: 2.7%" : "Promedio OCDE: 2.7%",
      source: "RICYT / UNESCO",
      year: 2022
    },
    {
      metric: en ? "Researchers per million" : "Investigadores por millón",
      value: "1,372",
      benchmark: en ? "OECD avg: 4,300" : "Promedio OCDE: 4,300",
      source: "UNESCO UIS",
      year: 2022
    },
    {
      metric: en ? "Internet penetration" : "Penetración de internet",
      value: "82.7%",
      benchmark: en ? "LATAM avg: 75%" : "Promedio LATAM: 75%",
      source: "ITU / SUTEL",
      year: 2024
    },
    {
      metric: en ? "Schools with internet access" : "Escuelas con acceso a internet",
      value: "78%",
      benchmark: en ? "Target: 100% by 2027" : "Meta: 100% para 2027",
      source: "MEP / FONATEL",
      year: 2024
    },
    {
      metric: en ? "PISA Math score" : "Puntaje PISA Matemáticas",
      value: "411",
      benchmark: en ? "OECD avg: 472" : "Promedio OCDE: 472",
      source: "OECD PISA 2022",
      year: 2022
    },
    {
      metric: en ? "PISA Science score" : "Puntaje PISA Ciencias",
      value: "411",
      benchmark: en ? "OECD avg: 485" : "Promedio OCDE: 485",
      source: "OECD PISA 2022",
      year: 2022
    },
    {
      metric: en ? "English proficiency (EF EPI)" : "Dominio de inglés (EF EPI)",
      value: en ? "High (rank 36/113)" : "Alto (posición 36/113)",
      benchmark: en ? "#2 in LATAM after Argentina" : "#2 en LATAM después de Argentina",
      source: "EF EPI 2024",
      year: 2024
    },
    {
      metric: en ? "Female STEM enrollment" : "Matrícula femenina en STEM",
      value: "35%",
      benchmark: en ? "Global avg: 35%" : "Promedio global: 35%",
      source: "CONARE",
      year: 2023
    },
    {
      metric: en ? "CS/IT programs accredited" : "Programas CS/TI acreditados",
      value: "45+",
      benchmark: en ? "Across 5 public + 20+ private universities" : "En 5 universidades públicas + 20+ privadas",
      source: "CONARE / CONESUP",
      year: 2024
    }
  ],

  gaps: [
    {
      area: en ? "AI-specific courses" : "Cursos específicos de AI",
      status: en ? "Critical Gap" : "Brecha Crítica",
      color: "#ef4444",
      detail: {
        en: "No dedicated AI/ML degree programs at public universities. AI taught as elective modules within CS programs.",
        es: "Sin programas de grado dedicados a AI/ML en universidades públicas. AI enseñada como módulos electivos dentro de programas CS."
      }
    },
    {
      area: en ? "Teacher AI training" : "Capacitación AI para docentes",
      status: en ? "Critical Gap" : "Brecha Crítica",
      color: "#ef4444",
      detail: {
        en: "No systematic AI training program for K-12 teachers. Individual MEP initiatives exist but are not scaled.",
        es: "Sin programa sistemático de capacitación AI para docentes K-12. Existen iniciativas individuales del MEP pero no están escaladas."
      }
    },
    {
      area: en ? "K-12 AI curriculum" : "Currículo AI K-12",
      status: en ? "Major Gap" : "Brecha Mayor",
      color: "#f59e0b",
      detail: {
        en: "No formal AI curriculum in K-12 education. Computational thinking introduced but AI concepts not yet integrated.",
        es: "Sin currículo AI formal en educación K-12. Pensamiento computacional introducido pero conceptos AI aún no integrados."
      }
    },
    {
      area: en ? "R&D investment" : "Inversión en I+D",
      status: en ? "Major Gap" : "Brecha Mayor",
      color: "#f59e0b",
      detail: {
        en: "R&D at 0.39% of GDP — far below OECD average of 2.7%. Limits AI research capacity and innovation output.",
        es: "I+D en 0.39% del PIB — muy por debajo del promedio OCDE de 2.7%. Limita capacidad de investigación AI y producción de innovación."
      }
    },
    {
      area: en ? "Rural digital divide" : "Brecha digital rural",
      status: en ? "Significant Gap" : "Brecha Significativa",
      color: "#f59e0b",
      detail: {
        en: "22% of schools lack internet. Rural areas have significantly lower broadband quality for AI-enabled learning.",
        es: "22% de escuelas carecen de internet. Áreas rurales tienen calidad de banda ancha significativamente menor para aprendizaje con AI."
      }
    }
  ]
});
