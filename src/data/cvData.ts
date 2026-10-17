import { OfficialDocument, OFFICIAL_DOCUMENTS } from './documentsData';
import rocioAvatarImg from '../assets/images/rocio_executive_avatar_1790208523556.jpg';

export type { OfficialDocument, OfficialDocumentSignature } from './documentsData';

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startYear: number;
  sector: 'Minería' | 'Obras e Infraestructura' | 'Sector Público & ANP' | 'Consultoría & Laboratorio';
  project?: string;
  responsibilitiesAndAchievements: string[];
  technologiesAndKeywords: string[];
  certificateRef?: string;
}

export interface SoftSkillItem {
  name: string;
  definition: string;
  application: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  institution: string;
  year: string;
  duration?: string;
  grade?: string;
  category: 'Fiscalización & Control' | 'SSOMA & Seguridad' | 'Geoespacial & Tecnológico' | 'Calidad & Ecoeficiencia' | 'Monitoreo & Recursos';
  verifiedDocNumber?: string;
  significance: string;
}

export const CV_DATA = {
  personal: {
    fullName: "Rocío Milagros Paredes Gamarra",
    title: "Ingeniera Ambiental",
    cip: "CIP N° 322074",
    colegiaturaStatus: "Colegiada Ordinaria y Habilitada",
    university: "Universidad César Vallejo (Título Profesional con Sustentación de Tesis)",
    location: "Arequipa, Perú",
    phone: "918 191 721",
    email: "rocioparedesg41@gmail.com",
    avatarUrl: rocioAvatarImg,
    availability: "Disponibilidad inmediata · Disposición para trabajo en campo / zonas remotas · Movilidad a nivel nacional",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio (B1)" },
      { name: "Italiano", level: "Básico (A2)" },
    ],
    coreCompetencies: [
      "Supervisión SSOMA en Minería (D.S. 024-2016-EM)",
      "Gestión de IGA (DIA, EIA, IGAFEM, ITS)",
      "Fiscalización Ambiental OEFA & Ley 29783",
      "Monitoreo de Agua, Aire, Ruido y Suelo (ECA / LMP)",
      "SIG Geoespacial (ArcGIS Pro, QGIS, Teledetección)",
      "Python & Modelos IA Aplicados al Medio Ambiente",
      "Concertación y Relaciones Comunitarias",
      "Planes de Manejo Integral de Residuos Sólidos (D.L. 1278)",
    ],
  },

  strategicProfile: {
    title: "Ingeniera Ambiental Colegiada (CIP N° 322074) | Especialista en SSOMA, Fiscalización & SIG",
    executiveSummary: "Ingeniera Ambiental colegiada con más de 10 años de experiencia técnica y de campo en supervisión ambiental, seguridad y salud ocupacional (SSOMA), gestión de residuos sólidos e Instrumentos de Gestión Ambiental (IGA) en los sectores de minería, construcción y municipios. Sólido dominio práctico de normativas nacionales e internacionales (OEFA, Contraloría, SUNAFIL, ISO 14001, ISO 9001, OHSAS 18001), manejo avanzado de ArcGIS y amplia experiencia operativa en campo en zonas remotas y campamentos. Actualmente llevando una Especialidad en Programación a través de la Inteligencia Artificial Aplicada al Medio Ambiente, fortaleciendo el análisis de datos ambientales y el geoprocesamiento geoespacial.",
    valueProposition: "Garantizo el cumplimiento normativo estricto y la prevención de riesgos operacionales y ambientales: récord comprobado de cero accidentes en minería, gestión documentaria rigurosa ante fiscalizaciones, liderazgo empático de equipos en terreno y aplicación de herramientas tecnológicas de vanguardia.",
  },

  aiEnvironmentalSpecialty: {
    title: "Especialidad en Programación a través de la Inteligencia Artificial Aplicada al Medio Ambiente",
    status: "Especialidad en curso",
    description: "Formación especializada orientada a la integración de programación y modelos de inteligencia artificial para el análisis, monitoreo y solución de problemas ambientales y geoespaciales.",
    pillars: [
      {
        title: "Programación en Python para Geoprocesamiento y SIG",
        detail: "Desarrollo de scripts para el procesamiento automatizado de datos espaciales, análisis de cuencas y generación eficiente de cartografía temática en ArcGIS.",
        tools: ["Python", "ArcGIS / ArcPy", "QGIS", "Geodatabases"],
      },
      {
        title: "Analítica de Datos y Modelamiento Ambiental",
        detail: "Estructuración de bases de datos para el seguimiento de parámetros físico-químicos de agua, suelo y aire conforme a los Estándares de Calidad Ambiental (ECA).",
        tools: ["Bases de Datos Ambientales", "Analítica en Python", "Monitoreo Paramétrico"],
      },
      {
        title: "Inteligencia Artificial para Monitoreo Ecosistémico",
        detail: "Exploración y aplicación de algoritmos de IA y teledetección satelital para el análisis de coberturas vegetales, detección de cambios en el territorio y apoyo en Instrumentos de Gestión Ambiental (IGA).",
        tools: ["Imágenes Satelitales", "Detección de Coberturas", "Automatización de Reportes"],
      },
    ],
  },

  // Soft Skills highlighted prominently as requested by the user
  softSkills: [
    {
      name: "Liderazgo de Equipos Técnicos",
      definition: "Capacidad para guiar, coordinar y alinear a cuadrillas de campo, personal técnico y supervisores hacia objetivos comunes de seguridad y calidad.",
      application: "Liderazgo del personal en obra minera (Villa Cuajone - Southern Perú), consorcios viales y cuadrillas comunales en áreas naturales.",
    },
    {
      name: "Trabajo en Equipo",
      definition: "Colaboración armónica e interdisciplinaria entre áreas de ingeniería, operaciones, seguridad, contratistas y gerencia.",
      application: "Coordinación fluida en proyectos con múltiples frentes simultáneos en Cusco, Arequipa y Moquegua.",
    },
    {
      name: "Comunicación Asertiva",
      definition: "Transmisión clara, firme y respetuosa de directivas de seguridad, requerimientos ambientales y advertencias de riesgo.",
      application: "Impartición diaria de charlas de 5 minutos, inducciones de SSOMA y presentaciones de informes ante supervisores y autoridades.",
    },
    {
      name: "Escucha Activa",
      definition: "Atención receptiva a las inquietudes de los trabajadores de obra, contratistas y pobladores locales para prevenir desviaciones.",
      application: "Detección oportuna de condiciones subestándar y necesidades de cuadrillas de campo antes del inicio de labores críticas.",
    },
    {
      name: "Empatía",
      definition: "Comprensión genuina del entorno humano y social de los colaboradores y de las comunidades en el área de influencia del proyecto.",
      application: "Interacción respetuosa con comunidades nativas en la Reserva Comunal Machiguenga y centros poblados en Urubamba y Echarati.",
    },
    {
      name: "Resolución de Conflictos",
      definition: "Mediación eficaz para solucionar discrepancias operativas, laborales o socioambientales de forma constructiva.",
      application: "Atención y concertación en frentes de obra urbanos con vecinos y en proyectos de desarrollo agropecuario y ambiental.",
    },
    {
      name: "Adaptabilidad y Flexibilidad",
      definition: "Disposición y resiliencia para desenvolverse con eficiencia en zonas remotas, climas rigurosos, campamentos y cambios operacionales.",
      application: "Trayectoria probada en selva alta (La Convención), costa sur y operaciones mineras en campamento con disponibilidad nacional.",
    },
    {
      name: "Inteligencia Emocional",
      definition: "Autocontrol, serenidad y madurez para tomar decisiones críticas y mantener el orden ante situaciones de emergencia o tensión.",
      application: "Formación en brigadas operativas ante emergencias y manejo de incidentes de seguridad y ambientales en terreno.",
    },
    {
      name: "Gestión Documentaria Regulatoria",
      definition: "Rigor, orden meticuloso y trazabilidad en la elaboración, control y custodia de expedientes técnicos, permisos y carpetas SSOMA.",
      application: "Preparación de documentación para inspecciones de SUNAFIL, OEFA y la Contraloría General de la República.",
    },
    {
      name: "Ejecución Bajo Presión",
      definition: "Cumplimiento disciplinado de hitos de entrega, plazos legales y compromisos de instrumentos ambientales bajo exigencia continua.",
      application: "Cumplimiento en plazo del 100% de los cronogramas en obras viales (Av. Dolores) y proyectos municipales con múltiples metas.",
    },
  ] as SoftSkillItem[],

  // Real quantifiable achievements directly from her CV & certificates
  quantifiedAchievements: [
    {
      title: "Cero Accidentes en Operaciones de Minería",
      metric: "0 Accidentes",
      context: "EXMEL EIRL — Villa Cuajone, Southern Perú",
      description: "Mantuvo un récord de CERO accidentes e incidentes incapacitantes durante toda la ejecución de la obra de mantenimiento de losa y cerco perimétrico en zona minera.",
    },
    {
      title: "100% del Personal de Obra Capacitado",
      metric: "100% Formación",
      context: "Supervisión SSOMA en Minería y Construcción",
      description: "Garantizó la formación diaria y continua en seguridad, salud ocupacional y medio ambiente del 100% del personal obrero y técnico.",
    },
    {
      title: "Calificaciones de Excelencia (20/20 y 18/20)",
      metric: "Notas 20/20",
      context: "Certificaciones Oficiales Especializadas",
      description: "Calificación perfecta (20/20) en Fiscalización OEFA y Control Gubernamental (Equilibria), 20/20 en Gestión Ambiental Empresarial, 20/20 en Prevención de Riesgos Laborales (MTPE) y 18/20 en Ecoeficiencia en Instituciones Públicas (MINAM).",
    },
    {
      title: "Cumplimiento Riguroso de la Ley 29783 y SUNAFIL",
      metric: "100% Cumplimiento",
      context: "Empresa de Construcción LIVIT & Consorcios",
      description: "Elaboración y recopilación integral de la documentación de gestión SSOMA exigida por SUNAFIL, garantizando el cumplimiento normativo en obra y conforme a Ley sin sanciones.",
    },
    {
      title: "Gestión de Múltiples Proyectos Simultáneos",
      metric: "Multiobra",
      context: "Rimachi Hermanos SAC & Sector Municipal",
      description: "Supervisión simultánea de la ejecución de programas ambientales en múltiples proyectos constructivos en la región Cusco, cumpliendo cronogramas e hitos establecidos.",
    },
    {
      title: "+10 Años de Trayectoria Comprobada",
      metric: "10+ Años",
      context: "Colegio de Ingenieros del Perú (CIP N° 322074)",
      description: "Experiencia multisectorial en minería, infraestructura vial urbana, obras civiles, gestión municipal y áreas naturales protegidas (SERNANP).",
    },
  ],

  workExperience: [
    {
      id: "exp-bustamante",
      role: "Asistente de Especialista Ambiental",
      company: "CONSORCIO VIAL BUSTAMANTE",
      location: "Arequipa, Perú",
      period: "Mayo – Noviembre 2025",
      startYear: 2025,
      sector: "Obras e Infraestructura",
      project: "Obra: «Mejoramiento de servicio de movilidad urbana en la Avenida Prolongación Dolores desde Puente Dolores hasta Av. Caracas del distrito de José Luis Bustamante y Rivero, provincia y departamento de Arequipa». (CUI N° 2598840).",
      responsibilitiesAndAchievements: [
        "Realicé inspecciones periódicas de campo y elaboré informes técnicos detallados del desarrollo ambiental del proyecto.",
        "Actualicé y gestioné las bases de datos de control ambiental y de incidencias de la obra vial.",
        "Informé oportunamente acerca del cumplimiento de los compromisos ambientales planteados en el instrumento ambiental (IGA).",
        "Impartí charlas de capacitación y sensibilización ambiental dirigidas a los trabajadores de la obra.",
      ],
      technologiesAndKeywords: [
        "Instrumento de Gestión Ambiental (IGA)",
        "Inspecciones Técnicas de Campo",
        "Bases de Datos Ambientales",
        "Gestión de Residuos de Obra",
        "Sensibilización Ambiental",
      ],
      certificateRef: "Certificado de Trabajo Consorcio Vial Bustamante (12/11/2025)",
    },
    {
      id: "exp-exmel",
      role: "Jefa de Seguridad, Salud Ocupacional y Medio Ambiente (SSOMA)",
      company: "EXMEL EIRL — Unidad Villa Cuajone, Southern Perú",
      location: "Villa Cuajone, Moquegua / Arequipa",
      period: "Setiembre – Octubre 2024",
      startYear: 2024,
      sector: "Minería",
      project: "Obra: «Mantenimiento de losa y cerco perimétrico» en zona minera.",
      responsibilitiesAndAchievements: [
        "Elaboré la documentación integral del Sistema SSOMA: reglamento interno, políticas, plan y programa para la obra en zona minera.",
        "Diseñé e implementé el Plan de Manejo Ambiental del proyecto, asegurando el cumplimiento de los estándares exigidos por Southern Perú.",
        "Impartí capacitaciones diarias en SSO y medio ambiente, garantizando la adecuada formación del 100% del personal de obra.",
        "Inspeccioné instalaciones y herramientas para prevenir condiciones y actos inseguros, manteniendo CERO ACCIDENTES durante la ejecución.",
      ],
      technologiesAndKeywords: [
        "Estándares Mineros Southern Perú",
        "Sistema de Gestión SSOMA",
        "Plan de Manejo Ambiental",
        "Cero Accidentes",
        "Capacitación al 100% del Personal",
        "Inspección de Herramientas y Condiciones Inseguras",
      ],
      certificateRef: "Supervisión SSOMA en Operaciones Mineras",
    },
    {
      id: "exp-rimachi",
      role: "Supervisora Ambiental",
      company: "RIMACHI HERMANOS CONSTRUCTORES Y CONSULTORES SAC",
      location: "Cusco, Perú",
      period: "Setiembre – Diciembre 2023",
      startYear: 2023,
      sector: "Obras e Infraestructura",
      project: "Supervisión en proyectos diversos desarrollados por la empresa en la región Cusco.",
      responsibilitiesAndAchievements: [
        "Supervisé la correcta ejecución de los programas ambientales en múltiples proyectos simultáneos de construcción en la región Cusco.",
        "Capacité a trabajadores en protección ambiental y seguridad industrial, elevando el nivel de cumplimiento normativo del equipo.",
        "Inspeccioné instalaciones y procedimientos constructivos para prevenir incidentes ambientales y condiciones de riesgo laboral.",
      ],
      technologiesAndKeywords: [
        "Supervisión Ambiental Multiobra",
        "Seguridad Industrial",
        "Cumplimiento Normativo",
        "Inspección de Procedimientos",
      ],
      certificateRef: "Certificado de Trabajo Rimachi Hnos SAC (29/12/2023)",
    },
    {
      id: "exp-echarati-2022",
      role: "Asistente de Proyecto / Prevencionista de Riesgos / Promotora Social / Asistente Técnico",
      company: "MUNICIPALIDAD DISTRITAL DE ECHARATI",
      location: "La Convención, Cusco",
      period: "Mayo – Diciembre 2022",
      startYear: 2022,
      sector: "Sector Público & ANP",
      project: "Proyectos: «Instalación de alertas tempranas frente a los potenciales efectos negativos de la radiación ultravioleta en las I.E. 52106, 501094, 501169, 501237, 501214 y la I.E. Santo Domingo de Pangoa» / «Mejoramiento de los servicios de promoción y competitividad de productos agropecuarios potenciales en 5 localidades».",
      responsibilitiesAndAchievements: [
        "Gestioné la elaboración del Plan SSOMA y el Plan de Vigilancia COVID-19 para proyectos de alertas tempranas UV y mejoramiento agropecuario.",
        "Actualicé medidas de prevención de riesgos laborales y representé al proyecto en coordinaciones con aseguradoras y entidades fiscalizadoras.",
        "Organicé y mantuve la documentación técnica, bases de datos y sistemas de archivo del proyecto.",
        "Coordiné el cronograma operativo del proyecto, cumpliendo los hitos establecidos en plazo.",
      ],
      technologiesAndKeywords: [
        "Plan SSOMA Municipal",
        "Prevención de Riesgos Laborales",
        "Alertas de Radiación UV",
        "Gestión de Cronogramas",
        "Coordinación con Aseguradoras y Fiscalizadoras",
      ],
      certificateRef: "Certificado de Trabajo MDE Echarati (18/01/2023)",
    },
    {
      id: "exp-sas",
      role: "Analista de Campo",
      company: "GRUPO SAS PERU S.A.C.",
      location: "Lima – Arequipa",
      period: "Junio 2021",
      startYear: 2021,
      sector: "Consultoría & Laboratorio",
      project: "Monitoreos ambientales y ocupacionales en proyectos industriales y mineros.",
      responsibilitiesAndAchievements: [
        "Ejecuté monitoreos ocupacionales y ambientales de calidad de agua, suelo y aire en proyectos industriales y mineros.",
        "Implementé controles ambientales y mantuve registros actualizados de parámetros medidos para la toma de decisiones técnicas.",
      ],
      technologiesAndKeywords: [
        "Monitoreo Ambiental (Agua, Suelo, Aire)",
        "Monitoreo Ocupacional",
        "Medición de Parámetros",
        "Control Ambiental",
      ],
      certificateRef: "Servicios de Monitoreo Ambiental",
    },
    {
      id: "exp-machiguenga",
      role: "Especialista Ambiental",
      company: "EJECUTOR DE CONTRATO DE ADMINISTRACION DE LA RESERVA COMUNAL MACHIGUENGA - ECA MAENI",
      location: "La Convención, Cusco",
      period: "Marzo 2017 – Abril 2020",
      startYear: 2017,
      sector: "Sector Público & ANP",
      project: "Proyectos desarrollados dentro del Área Natural Protegida y zona de amortiguamiento de la RESERVA COMUNAL MACHIGUENGA.",
      responsibilitiesAndAchievements: [
        "Lideré el componente ambiental de proyectos dentro del Área Natural Protegida Reserva Comunal Machiguenga y su zona de amortiguamiento.",
        "Realicé análisis de datos ambientales y asesoramiento técnico para la recuperación ambiental de áreas intervenidas.",
        "Coordiné equipos de trabajo multidisciplinarios y mantuve bases de datos y registros de seguimiento ambiental.",
      ],
      technologiesAndKeywords: [
        "Áreas Naturales Protegidas (ANP)",
        "Reserva Comunal Machiguenga",
        "Recuperación Ambiental",
        "Equipos Multidisciplinarios",
        "Bases de Datos Ambientales",
      ],
      certificateRef: "Certificado de Trabajo ECA MAENI (03/08/2020)",
    },
    {
      id: "exp-bella-union",
      role: "Asistente de Proyecto",
      company: "MUNICIPALIDAD DISTRITAL DE BELLA UNIÓN",
      location: "Caravelí, Arequipa",
      period: "Marzo 2016 – Enero 2017",
      startYear: 2016,
      sector: "Sector Público & ANP",
      project: "Proyecto: «Mejoramiento de la gestión integral para el desarrollo cultural y turístico en el distrito de Bella Unión».",
      responsibilitiesAndAchievements: [
        "Apoyé la investigación y recopilación de información técnica, legal y financiera para el diseño de proyectos de desarrollo turístico.",
        "Coordiné las tareas operativas del proyecto (reuniones, informes, seguimiento) y elaboré informes de síntesis.",
      ],
      technologiesAndKeywords: [
        "Gestión Integral de Proyectos",
        "Información Técnica y Legal",
        "Informes de Síntesis",
      ],
      certificateRef: "Constancia Bella Unión",
    },
    {
      id: "exp-yanaquihua",
      role: "Asistente de Proyecto",
      company: "MUNICIPALIDAD DISTRITAL DE YANAQUIHUA",
      location: "Yanaquihua, Arequipa",
      period: "Setiembre 2015 – Febrero 2016",
      startYear: 2015,
      sector: "Sector Público & ANP",
      project: "Proyecto: Defensa ribereña Yause «La Barrera».",
      responsibilitiesAndAchievements: [
        "Redacté documentación administrativa y técnica; organicé archivos físicos y digitales del proyecto.",
      ],
      technologiesAndKeywords: [
        "Defensas Ribereñas",
        "Documentación Técnica y Administrativa",
        "Organización de Archivos",
      ],
      certificateRef: "Constancia Yanaquihua",
    },
    {
      id: "exp-livit",
      role: "Asistente de Seguridad SSOMA",
      company: "EMPRESA DE CONSTRUCCIÓN LIVIT",
      location: "Arequipa, Perú",
      period: "Marzo – Julio 2015",
      startYear: 2015,
      sector: "Obras e Infraestructura",
      project: "Proyecto Multifamiliar Metrópoli 054 (Arequipa).",
      responsibilitiesAndAchievements: [
        "Impartí charlas de inducción y capacitaciones en SSOMA para personal obrero del proyecto multifamiliar Metrópoli 054.",
        "Elaboré y recopilé la documentación de gestión SSOMA exigida por SUNAFIL, garantizando el cumplimiento normativo en obra y conforme a Ley.",
        "Confeccioné informes de impacto ambiental, identifiqué causas de accidentes e implementé estrategias de prevención.",
      ],
      technologiesAndKeywords: [
        "Cumplimiento Normativo SUNAFIL",
        "Gestión SSOMA en Edificación",
        "Charlas de Inducción a Cuadrillas",
        "Prevención de Accidentes",
        "Informes de Impacto Ambiental",
      ],
      certificateRef: "Certificados de Trabajo LIVIT (29/04/2015 y 31/07/2015)",
    },
    {
      id: "exp-echarati-2014",
      role: "Asistente Técnico de Obra",
      company: "MUNICIPALIDAD DISTRITAL DE ECHARATI",
      location: "Echarati, Cusco",
      period: "Mayo – Setiembre 2014",
      startYear: 2014,
      sector: "Sector Público & ANP",
      project: "Proyecto: «Mejoramiento e implementación de la educación ambiental para el manejo adecuado de los recursos naturales en el Alto y Medio Urubamba».",
      responsibilitiesAndAchievements: [
        "Impartí capacitaciones ambientales en instituciones educativas y centros poblados del distrito de Echarati.",
        "Organicé campañas de aprendizaje de la correcta disposición de residuos sólidos.",
        "Organicé campañas de clasificación y disposición final de residuos sólidos.",
      ],
      technologiesAndKeywords: [
        "Educación Ambiental",
        "Clasificación de Residuos Sólidos",
        "Disposición Final",
        "Campañas en Centros Poblados",
      ],
      certificateRef: "Constancia de Trabajo MDE Gerencia de Medio Ambiente (03/10/2014)",
    },
    {
      id: "exp-sernanp",
      role: "Guardaparque Voluntaria",
      company: "MINISTERIO DEL AMBIENTE – SERNANP",
      location: "Reserva Comunal Machiguenga, Cusco",
      period: "Enero – Marzo 2013",
      startYear: 2013,
      sector: "Sector Público & ANP",
      project: "Área Natural Protegida de la Reserva Comunal Machiguenga.",
      responsibilitiesAndAchievements: [
        "Realicé control y vigilancia del área natural protegida.",
        "Elaboré bases de datos y análisis para la toma de decisiones.",
      ],
      technologiesAndKeywords: [
        "SERNANP",
        "Control y Vigilancia",
        "Área Natural Protegida",
        "Bases de Datos de Campo",
      ],
      certificateRef: "Carta y Resolución de Reconocimiento SERNANP JRCM",
    },
  ] as WorkExperience[],

  // Real certifications with verified data from the user's PDF
  certifications: [
    {
      id: "cert-oefa-contraloria",
      title: "Curso teórico - práctico en: «OEFA y LA CONTRALORIA: Fiscalización Ambiental y Control Gubernamental en la Gestión Pública»",
      institution: "Equilibria Consulting S.A.C.",
      year: "2026",
      duration: "40 horas académicas (2 meses)",
      grade: "Nota: 20 / 20",
      category: "Fiscalización & Control",
      verifiedDocNumber: "Certificado ID 71332551",
      significance: "Reglamento de Supervisión de OEFA, funciones de fiscalización ambiental, mapa del control gubernamental, evidencia y expedientes.",
    },
    {
      id: "cert-gestion-empresas",
      title: "Curso teórico – práctico en «GESTIÓN AMBIENTAL EN LAS EMPRESAS»",
      institution: "Equilibria Consulting S.A.C.",
      year: "2026",
      duration: "12 horas académicas (2 meses)",
      grade: "Nota: 20 / 20",
      category: "Fiscalización & Control",
      verifiedDocNumber: "Certificado ID 71332551",
      significance: "Identificación, caracterización y valoración de impactos ambientales en el ámbito empresarial.",
    },
    {
      id: "cert-agua-mineria",
      title: "Diploma de Especialización en «GESTIÓN DE AGUA EN MINERÍA»",
      institution: "Cámara de Comercio del Perú",
      year: "2023",
      duration: "240 horas académicas lectivas",
      category: "Monitoreo & Recursos",
      verifiedDocNumber: "Diploma Especialización Registro 2023",
      significance: "Manejo, tratamiento y gestión integral del recurso hídrico en operaciones mineras.",
    },
    {
      id: "cert-ecoeficiencia-minam",
      title: "Curso virtual «Introducción a la Ecoeficiencia en Instituciones Públicas» (Edición 2024-I)",
      institution: "Ministerio del Ambiente (MINAM)",
      year: "2024",
      duration: "60 horas académicas",
      grade: "Nota: 18 / 20",
      category: "Calidad & Ecoeficiencia",
      verifiedDocNumber: "Constancia CV-IEIP-2024I_Parte348[R]",
      significance: "D.S. N° 016-2021-MINAM, gestión de RAEE, plásticos de un solo uso (Ley 30884), compras públicas sostenibles y huella de carbono.",
    },
    {
      id: "cert-arcgis-uni",
      title: "Programa de «ESPECIALISTA EN ARCGIS»",
      institution: "Universidad Nacional de Ingeniería (UNI) — CEPS UNI",
      year: "2021",
      duration: "80 horas cronológicas",
      category: "Geoespacial & Tecnológico",
      verifiedDocNumber: "Certificado ACERT-CEPS-CE-049-2021-920 (Cod: J5CO3ST)",
      significance: "Análisis geoespacial, geoprocesamiento, cartografía temática digital y manejo avanzado de SIG.",
    },
    {
      id: "cert-ssoma-cip",
      title: "Curso de actualización profesional de «ESPECIALISTA EN SSOMA»",
      institution: "Colegio de Ingenieros del Perú (CIP Consejo Departamental Pasco) y CIACEP",
      year: "2022",
      duration: "60 horas lectivas",
      category: "SSOMA & Seguridad",
      verifiedDocNumber: "Registro CIPP-CIACEP/2022-040-102",
      significance: "Reglamento SST en Minería D.S. 024-2016-EM, sector construcción D.S. 011-2019-TR, taller de IPERC, ciclo PHVA y preparación ante emergencias.",
    },
    {
      id: "cert-riesgos-mtpe",
      title: "Curso de «PREVENCIÓN DE RIESGOS LABORALES»",
      institution: "Ministerio del Trabajo y Promoción del Empleo (MTPE)",
      year: "2022",
      duration: "16 horas académicas",
      grade: "Nota: 20 / 20",
      category: "SSOMA & Seguridad",
      verifiedDocNumber: "Certificado MTPE Código QR",
      significance: "Conceptos básicos, peligros físicos, químicos, biológicos, ergonómicos y psicosociales bajo Ley de SST.",
    },
    {
      id: "cert-iso9001-unalm",
      title: "Curso de «ISO 9001:2015 INTERPRETACIÓN DE NORMA»",
      institution: "Universidad Nacional Agraria La Molina (UNALM)",
      year: "2020",
      duration: "24 horas lectivas",
      category: "Calidad & Ecoeficiencia",
      verifiedDocNumber: "Certificado 7318 132840",
      significance: "Interpretación e implementación de sistemas de gestión de la calidad bajo la norma ISO 9001:2015.",
    },
    {
      id: "cert-calidad-procesos-unalm",
      title: "Curso de «HERRAMIENTAS DE CALIDAD PARA MEJORA DE PROCESOS»",
      institution: "Universidad Nacional Agraria La Molina (UNALM)",
      year: "2020",
      duration: "16 horas lectivas",
      category: "Calidad & Ecoeficiencia",
      verifiedDocNumber: "Certificado 7322 134818",
      significance: "Metodologías de calidad y mejora continua de procesos en el marco de la reactivación empresarial.",
    },
    {
      id: "cert-desastres-gore",
      title: "«CAPACITACIÓN DE BRIGADAS OPERATIVAS ANTE EMERGENCIAS Y RIESGO DE DESASTRES»",
      institution: "Oficina de Gestión de Riesgo de Desastres de la Municipalidad de Echarati y COER GORE Cusco",
      year: "2022",
      duration: "30 horas",
      category: "SSOMA & Seguridad",
      verifiedDocNumber: "Certificado VER Voluntariado de Emergencia",
      significance: "Ley del SINAGERD, combate de incendios forestales, manejo de extintores, cuerdas y primeros auxilios.",
    },
    {
      id: "cert-senalizacion-vial",
      title: "Curso de «SEGURIDAD Y SEÑALIZACIÓN VIAL»",
      institution: "Centro Integral de Asesoría Capacitación y Entrenamiento Profesional (CIACEP)",
      year: "2022",
      duration: "40 horas lectivas",
      category: "SSOMA & Seguridad",
      verifiedDocNumber: "Registro CIACEP/2022-021-056",
      significance: "Reglamento nacional de seguridad vial, normas técnicas de demarcación, delimitación de vías y señalización.",
    },
    {
      id: "cert-agua-ana",
      title: "Charlas «CALIDAD DEL AGUA EN LA CUENCA QUILCA-CHILI» Y «TRATAMIENTO DEL AGUA»",
      institution: "Ministerio de Agricultura / Autoridad Nacional del Agua (ANA)",
      year: "2013",
      category: "Monitoreo & Recursos",
      verifiedDocNumber: "Constancia Oficial ANA",
      significance: "Dinámica y calidad de agua en la cuenca Quilca-Chili y técnicas de tratamiento hídrico.",
    },
    {
      id: "cert-monitoreo-gr",
      title: "Curso en «MONITOREO AMBIENTAL: CALIDAD DE AIRE, SUELO Y AGUA»",
      institution: "GR Consulting Asesoría y Capacitación / Instituto de la Calidad y Medio Ambiente (ICMA)",
      year: "2012",
      duration: "18 horas lectivas",
      category: "Monitoreo & Recursos",
      verifiedDocNumber: "Certificado GR Consulting / ICMA",
      significance: "Muestreo, toma de muestras y monitoreo de parámetros ambientales.",
    },
    {
      id: "cert-residuos-pnud",
      title: "Taller de capacitación en «MANEJO DE RESIDUOS SÓLIDOS»",
      institution: "Gobierno Regional de Arequipa, PENUND (PNUD) y Municipalidad Provincial de Arequipa",
      year: "2010",
      category: "Calidad & Ecoeficiencia",
      verifiedDocNumber: "Certificado Convenio GRA - PNUD",
      significance: "Gestión integral de residuos sólidos municipales en el distrito de Arequipa.",
    },
  ],

  technicalSkillsCategories: [
    {
      name: "SIG, Geoprocesamiento & Programación",
      description: "Herramientas de análisis espacial y automatización de datos.",
      skills: [
        { name: "ArcGIS / ArcMap", level: "Avanzado (Especialista UNI 80h)", isAtsKeyword: true },
        { name: "Python para Geoprocesamiento", level: "Intermedio / En Especialización", isAtsKeyword: true },
        { name: "Inteligencia Artificial Aplicada al Medio Ambiente", level: "En Especialización Activa", isAtsKeyword: true },
        { name: "AutoCAD + IA", level: "Manejo Técnico", isAtsKeyword: true },
        { name: "QGIS", level: "Manejo Técnico", isAtsKeyword: true },
        { name: "BIZAGI (BPMN)", level: "Modelado de Procesos", isAtsKeyword: true },
      ],
    },
    {
      name: "Normativa, Fiscalización & Control Gubernamental",
      description: "Conocimiento exhaustivo de marcos legales y de supervisión pública.",
      skills: [
        { name: "OEFA: Fiscalización Ambiental", level: "Aprobado con Nota 20/20", isAtsKeyword: true },
        { name: "La Contraloría: Control Gubernamental", level: "Aprobado con Nota 20/20", isAtsKeyword: true },
        { name: "ISO 14001 (Gestión Ambiental)", level: "Dominio Normativo", isAtsKeyword: true },
        { name: "ISO 9001:2015 (Interpretación)", level: "Certificado UNALM", isAtsKeyword: true },
        { name: "OHSAS 18001 / ISO 45001", level: "Dominio Normativo", isAtsKeyword: true },
        { name: "D.S. 024-2016-EM (Seguridad en Minería)", level: "Aplicado en Terreno", isAtsKeyword: true },
        { name: "Ley 29783 / SUNAFIL", level: "Gestión Documentaria y Cumplimiento", isAtsKeyword: true },
        { name: "D.S. 016-2021-MINAM (Ecoeficiencia)", level: "Certificado MINAM (Nota 18/20)", isAtsKeyword: true },
      ],
    },
    {
      name: "Instrumentos de Gestión Ambiental & Monitoreo",
      description: "Supervisión operativa, muestreo y cumplimiento en campo.",
      skills: [
        { name: "Instrumentos de Gestión Ambiental (IGA)", level: "Elaboración y Seguimiento", isAtsKeyword: true },
        { name: "Monitoreo Ambiental (Agua, Suelo, Aire)", level: "Ejecución en Campo", isAtsKeyword: true },
        { name: "Gestión de Agua en Minería", level: "Especialización 240h", isAtsKeyword: true },
        { name: "Gestión de Residuos Sólidos", level: "Planes de Manejo y Segregación", isAtsKeyword: true },
        { name: "Planes de Manejo y Contingencias", level: "Diseño e Implementación", isAtsKeyword: true },
        { name: "Inspecciones de Seguridad (IPERC)", level: "Campo y Operaciones", isAtsKeyword: true },
      ],
    },
    {
      name: "Ofimática y Herramientas Digitales",
      description: "Gestión eficiente de información y bases de datos técnicas.",
      skills: [
        { name: "Microsoft Excel (Avanzado para bases de datos)", level: "Avanzado", isAtsKeyword: true },
        { name: "Microsoft Word & PowerPoint", level: "Avanzado", isAtsKeyword: true },
        { name: "Gestión y Actualización de Bases de Datos", level: "Avanzado", isAtsKeyword: true },
        { name: "OpenOffice", level: "Manejo Técnico", isAtsKeyword: false },
      ],
    },
  ],

  atsKeywordsList: [
    "Ingeniera Ambiental", "CIP N° 322074", "Colegiada", "SSOMA", "OEFA", "La Contraloría",
    "Instrumentos de Gestión Ambiental (IGA)", "Monitoreo Ambiental", "Calidad de Agua", "Calidad de Suelo",
    "Calidad de Aire", "ArcGIS", "Python", "Geoprocesamiento", "Inteligencia Artificial",
    "Gestión de Residuos Sólidos", "Southern Perú", "Villa Cuajone", "Minería", "ISO 14001",
    "ISO 9001", "OHSAS 18001", "D.S. 024-2016-EM", "Ley 29783", "SUNAFIL", "MINAM",
    "Ecoeficiencia", "D.S. 016-2021-MINAM", "SERNANP", "Reserva Comunal Machiguenga",
    "Cero Accidentes", "IPERC", "Capacitaciones", "Gestión Documentaria", "Inspecciones de Campo",
    "Liderazgo de Equipos", "Resolución de Conflictos", "Comunicación Asertiva", "Adaptabilidad",
  ],

  officialDocuments: OFFICIAL_DOCUMENTS,
};
