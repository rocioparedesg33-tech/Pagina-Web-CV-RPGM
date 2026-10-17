export interface OfficialDocumentSignature {
  name: string;
  title: string;
  entity: string;
}

export interface OfficialDocument {
  id: string;
  type: 'titulo' | 'colegiatura' | 'especializacion' | 'trabajo' | 'reconocimiento';
  category: string;
  title: string;
  institution: string;
  issuerLogoType: 'cip' | 'ucv' | 'oefa' | 'minam' | 'uni' | 'mtpe' | 'unalm' | 'empresa' | 'ana' | 'gore' | 'sernanp';
  documentTitle: string;
  subTitle?: string;
  recipient: string;
  recipientId: string;
  dateIssued: string;
  year: string;
  validity?: string;
  registrationNumber: string;
  hoursOrCredits?: string;
  grade?: string;
  roleOrDesignation?: string;
  projectOrContext?: string;
  summaryText: string;
  topicsOrModules?: string[];
  legalArticlesOrNorms?: string[];
  signatures: OfficialDocumentSignature[];
  verificationBadge: string;
  relatedExperienceId?: string;
}

export const OFFICIAL_DOCUMENTS: OfficialDocument[] = [
  // 1. TÍTULO PROFESIONAL
  {
    id: "doc-titulo-ucv",
    type: "titulo",
    category: "Título Universitario",
    title: "Título Profesional de Ingeniera Ambiental",
    institution: "Universidad César Vallejo",
    issuerLogoType: "ucv",
    documentTitle: "DIPLOMA DE TÍTULO PROFESIONAL",
    subTitle: "A NOMBRE DE LA NACIÓN",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2017",
    year: "2017",
    validity: "Grado y Título Profesional Auténtico Registrado",
    registrationNumber: "Reg. Sunedu / Libro de Títulos UCV",
    hoursOrCredits: "Carrera Universitaria Completa (10 Ciclos Académicos)",
    grade: "Aprobada por Sustentación de Tesis",
    roleOrDesignation: "Titulada Universitaria",
    summaryText: "Por cuanto la egresada Rocío Milagros Paredes Gamarra ha cumplido satisfactoriamente con todos los requisitos académicos prescritos por la Ley Universitaria N° 30220 y el estatuto de la universidad, habiendo aprobado con éxito la Sustentación de Tesis ante jurado calificador de la Facultad de Ingeniería, se le confiere a Nombre de la Nación el Título Profesional de INGENIERA AMBIENTAL.",
    topicsOrModules: [
      "Sustentación formal de tesis de grado ante jurado examinador",
      "Evaluación y mitigación de impactos ambientales",
      "Ingeniería de tratamiento de aguas y remediación de suelos",
      "Sistemas integrados de gestión y legislación ambiental peruana"
    ],
    legalArticlesOrNorms: ["Ley Universitaria N° 30220", "Estatuto y Reglamento de Grados y Títulos"],
    signatures: [
      { name: "Dra. Rectora de la Universidad", title: "Rectorado", entity: "Universidad César Vallejo" },
      { name: "Dr. Decano de Facultad de Ingeniería", title: "Decano de la Facultad", entity: "Facultad de Ingeniería y Arquitectura" },
      { name: "Abog. Secretario General", title: "Secretaría General", entity: "UCV - Registro Central" }
    ],
    verificationBadge: "Título Profesional Oficial Registrado"
  },

  // 2. COLEGIATURA CIP
  {
    id: "doc-colegiatura-cip",
    type: "colegiatura",
    category: "Colegiatura CIP",
    title: "Certificado de Colegiatura y Habilitación CIP N° 322074",
    institution: "Colegio de Ingenieros del Perú (CIP)",
    issuerLogoType: "cip",
    documentTitle: "CERTIFICADO DE COLEGIATURA Y HABILITACIÓN PROFESIONAL",
    subTitle: "CONSEJO DEPARTAMENTAL",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "Matrícula CIP N° 322074",
    dateIssued: "17 de Octubre de 2023",
    year: "2023",
    validity: "Colegiada Ordinaria y Habilitada",
    registrationNumber: "CIP N° 322074 - Reg. Nacional de Colegiados",
    hoursOrCredits: "Acreditación Nacional Permanente",
    grade: "Colegiada Ordinaria y Habilitada",
    roleOrDesignation: "Ingeniera Ambiental Colegiada",
    summaryText: "Certifica que la profesional Ing. Rocío Milagros Paredes Gamarra se encuentra debidamente inscrita en el Registro de Matrícula del Colegio de Ingenieros del Perú con el número de CIP 322074, en calidad de Colegiada Ordinaria, habiendo prestado el juramento deontológico de Ley y encontrándose plenamente HABILITADA para el ejercicio legal de la profesión en todo el territorio de la República del Perú.",
    topicsOrModules: [
      "Inscripción en el Libro de Matrículas de Ingenieros del Perú",
      "Facultad legal para suscripción de Informes de Supervisión Ambiental, Planes SSOMA e Instrumentos IGA",
      "Sujeción al Código de Ética Profesional del CIP",
      "Habilitación vigente con ejercicio pleno"
    ],
    legalArticlesOrNorms: ["Ley de Creación del Colegio de Ingenieros N° 16053", "Ley N° 28858 del Ejercicio Profesional"],
    signatures: [
      { name: "Ing. Decano Departamental CIP", title: "Decano", entity: "Colegio de Ingenieros del Perú" },
      { name: "Ing. Director Secretario CIP", title: "Director Secretario", entity: "Consejo Departamental" }
    ],
    verificationBadge: "Colegiada y Habilitada CIP 322074"
  },

  // 3. CURSO OEFA Y CONTRALORIA (20/20)
  {
    id: "cert-oefa-contraloria",
    type: "especializacion",
    category: "Fiscalización & Control",
    title: "OEFA y LA CONTRALORIA: Fiscalización Ambiental y Control Gubernamental en la Gestión Pública",
    institution: "Equilibria Consulting S.A.C.",
    issuerLogoType: "oefa",
    documentTitle: "CERTIFICADO DE APROBACIÓN CON EXCELENCIA",
    subTitle: "CURSO TEÓRICO - PRÁCTICO ESPECIALIZADO",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "Enero 2026",
    year: "2026",
    validity: "Certificación Oficial Vigente",
    registrationNumber: "ID 71332551",
    hoursOrCredits: "40 horas académicas (2 meses de duración)",
    grade: "Nota: 20 / 20 (Calificación de Excelencia)",
    summaryText: "Por haber culminado y aprobado con la máxima calificación sobresaliente de 20/20 el curso teórico - práctico en: «OEFA y LA CONTRALORIA: Fiscalización Ambiental y Control Gubernamental en la Gestión Pública», demostrando dominio absoluto de las funciones de fiscalización, supervisiones in situ, régimen sancionador y el mapa de control gubernamental.",
    topicsOrModules: [
      "Reglamento de Supervisión Ambiental de OEFA y tipificación de infracciones",
      "Procedimiento Administrativo Sancionador (PAS) y medidas administrativas",
      "Control Gubernamental y auditoría de cumplimiento ante la Contraloría General",
      "Elaboración rigurosa de expedientes y medios probatorios técnicos"
    ],
    legalArticlesOrNorms: ["Ley N° 29325 Ley del SINEFA", "D.S. N° 006-2019-MINAM", "Ley N° 27785 de Contraloría"],
    signatures: [
      { name: "Mg. Director Académico", title: "Director de Programas Especializados", entity: "Equilibria Consulting S.A.C." },
      { name: "Gerente General", title: "Gerencia General", entity: "Equilibria Consulting S.A.C." }
    ],
    verificationBadge: "Acreditado con Calificación 20/20"
  },

  // 4. GESTION AMBIENTAL EN LAS EMPRESAS (20/20)
  {
    id: "cert-gestion-empresas",
    type: "especializacion",
    category: "Fiscalización & Control",
    title: "Gestión Ambiental en las Empresas",
    institution: "Equilibria Consulting S.A.C.",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADO DE CAPACITACIÓN",
    subTitle: "CURSO TEÓRICO - PRÁCTICO",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "Enero 2026",
    year: "2026",
    validity: "Certificación Oficial Vigente",
    registrationNumber: "ID 71332551-GAE",
    hoursOrCredits: "12 horas académicas (2 meses)",
    grade: "Nota: 20 / 20 (Sobresaliente)",
    summaryText: "Por haber participado y aprobado con calificación máxima de 20/20 en el curso «GESTIÓN AMBIENTAL EN LAS EMPRESAS», abordando herramientas para la identificación, caracterización, valorización económica de impactos ambientales y formulación de planes de manejo para la actividad empresarial e industrial.",
    topicsOrModules: [
      "Identificación y evaluación de aspectos e impactos ambientales",
      "Matrices causa-efecto (Leopold, Conesa simplificada)",
      "Programas de monitoreo y mitigación operacional",
      "Cumplimiento de estándares de calidad ambiental empresarial"
    ],
    signatures: [
      { name: "Coordinador Académico", title: "Coordinación de Capacitación", entity: "Equilibria Consulting S.A.C." }
    ],
    verificationBadge: "Acreditado con Nota 20/20"
  },

  // 5. GESTION DE AGUA EN MINERIA (240 HORAS)
  {
    id: "cert-agua-mineria",
    type: "especializacion",
    category: "Monitoreo & Recursos",
    title: "Diploma de Especialización en Gestión de Agua en Minería",
    institution: "Cámara de Comercio del Perú",
    issuerLogoType: "empresa",
    documentTitle: "DIPLOMA DE ESPECIALIZACIÓN PROFESIONAL",
    subTitle: "PROGRAMA DE ALTA ESPECIALIZACIÓN TÉCNICA",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2023",
    year: "2023",
    validity: "Acreditación Profesional de Posgrado",
    registrationNumber: "Diploma Especialización Registro 2023-AG-MIN",
    hoursOrCredits: "240 horas académicas lectivas",
    grade: "Aprobado con Mención de Honor",
    summaryText: "Otorga el presente Diploma de Especialización Profesional a la Ing. Rocío Milagros Paredes Gamarra por haber culminado con éxito las 240 horas lectivas del programa de «GESTIÓN DE AGUA EN MINERÍA», demostrando alto dominio de balance de aguas, drenaje ácido de mina, plantas de tratamiento y cumplimiento de ECA y LMP.",
    topicsOrModules: [
      "Balance hidrológico e hidrogeológico en operaciones mineras",
      "Generación, predicción y neutralización de Drenaje Ácido de Roca / Mina (DAM)",
      "Tratamiento activo y pasivo de efluentes metalúrgicos",
      "Monitoreo paramétrico de calidad hídrica conforme a Estándares ECA-Agua (D.S. 004-2017-MINAM)",
      "Cierre de componentes hídricos y relaveras"
    ],
    legalArticlesOrNorms: ["D.S. N° 010-2010-MINAM (LMP efluentes)", "D.S. N° 004-2017-MINAM (ECA Agua)"],
    signatures: [
      { name: "Presidente del Consejo Directivo", title: "Dirección Ejecutiva", entity: "Cámara de Comercio del Perú" },
      { name: "Director del Instituto Tecnológico", title: "Dirección Académica", entity: "CCP Especializaciones" }
    ],
    verificationBadge: "Especialización de 240 Horas Lectivas"
  },

  // 6. ECOEFICIENCIA MINAM (18/20)
  {
    id: "cert-ecoeficiencia-minam",
    type: "especializacion",
    category: "Calidad & Ecoeficiencia",
    title: "Introducción a la Ecoeficiencia en Instituciones Públicas (Edición 2024-I)",
    institution: "Ministerio del Ambiente (MINAM)",
    issuerLogoType: "minam",
    documentTitle: "CONSTANCIA OFICIAL DE APROBACIÓN",
    subTitle: "MINISTERIO DEL AMBIENTE - DIRECCIÓN GENERAL DE CALIDAD AMBIENTAL",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2024",
    year: "2024",
    validity: "Constancia Oficial del Estado Peruano",
    registrationNumber: "CV-IEIP-2024I_Parte348[R]",
    hoursOrCredits: "60 horas académicas",
    grade: "Nota: 18 / 20 (Aprobado con Distinción)",
    summaryText: "El Ministerio del Ambiente otorga la presente constancia a Rocío Milagros Paredes Gamarra por haber aprobado satisfactoriamente con la calificación de 18/20 el curso virtual «Introducción a la Ecoeficiencia en Instituciones Públicas», de acuerdo a los estándares del Decreto Supremo N° 016-2021-MINAM.",
    topicsOrModules: [
      "Disposiciones del D.S. N° 016-2021-MINAM (Medidas de Ecoeficiencia en el Sector Público)",
      "Gestión de Residuos de Aparatos Eléctricos y Electrónicos (RAEE)",
      "Cumplimiento de la Ley 30884 (Plásticos de un solo uso y envases descartables)",
      "Compras públicas sostenibles e indicadores de huella de carbono",
      "Ahorro de agua, energía eléctrica y combustible institucional"
    ],
    legalArticlesOrNorms: ["D.S. N° 016-2021-MINAM", "Ley N° 30884"],
    signatures: [
      { name: "Dirección General de Calidad Ambiental", title: "Dirección General", entity: "Ministerio del Ambiente" }
    ],
    verificationBadge: "Constancia Oficial MINAM Nota 18/20"
  },

  // 7. ESPECIALISTA EN ARCGIS (UNI - 80H)
  {
    id: "cert-arcgis-uni",
    type: "especializacion",
    category: "Geoespacial & Tecnológico",
    title: "Programa de Especialista en ArcGIS",
    institution: "Universidad Nacional de Ingeniería (UNI) — CEPS UNI",
    issuerLogoType: "uni",
    documentTitle: "CERTIFICADO DE ESPECIALISTA",
    subTitle: "CENTRO DE EXTENSIÓN Y PROYECCIÓN SOCIAL",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "Noviembre 2021",
    year: "2021",
    validity: "Certificación Universitaria Oficial UNI",
    registrationNumber: "ACERT-CEPS-CE-049-2021-920 (Cod: J5CO3ST)",
    hoursOrCredits: "80 horas cronológicas de capacitación técnica",
    grade: "Aprobado",
    summaryText: "La Universidad Nacional de Ingeniería, a través del CEPS UNI, certifica que la participante ha culminado y aprobado con éxito el programa de «ESPECIALISTA EN ARCGIS», adquiriendo destrezas en gestión de bases de datos espaciales, geoprocesamiento avanzado, análisis de superficies y cartografía temática para proyectos de ingeniería ambiental.",
    topicsOrModules: [
      "Manejo avanzado de ArcMap, ArcCatalog y ArcGIS Pro",
      "Modelamiento de cuencas hidrográficas y redes de drenaje (Spatial Analyst)",
      "Estructuración de Geodatabases corporativas y topología vectorial",
      "Teledetección básica y clasificación supervisada de imágenes satelitales",
      "Composición de planos y cartografía oficial bajo estándares IGN"
    ],
    signatures: [
      { name: "Director del CEPS UNI", title: "Dirección General CEPS", entity: "Universidad Nacional de Ingeniería" },
      { name: "Coordinador de Informática y SIG", title: "Coordinación Académica", entity: "CEPS UNI" }
    ],
    verificationBadge: "Acreditado UNI - Cód: J5CO3ST"
  },

  // 8. ESPECIALISTA EN SSOMA (CIP PASCO - 60H)
  {
    id: "cert-ssoma-cip",
    type: "especializacion",
    category: "SSOMA & Seguridad",
    title: "Curso de Actualización Profesional: Especialista en SSOMA",
    institution: "Colegio de Ingenieros del Perú (CIP Consejo Departamental Pasco) y CIACEP",
    issuerLogoType: "cip",
    documentTitle: "CERTIFICADO DE ESPECIALISTA EN SSOMA",
    subTitle: "CURSO DE ACTUALIZACIÓN PROFESIONAL",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2022",
    year: "2022",
    validity: "Acreditación Oficial del Colegio de Ingenieros",
    registrationNumber: "Registro CIPP-CIACEP/2022-040-102",
    hoursOrCredits: "60 horas lectivas",
    grade: "Aprobado",
    summaryText: "El Colegio de Ingenieros del Perú (CD Pasco) y el Centro Integral de Asesoría Capacitación y Entrenamiento Profesional certifican la aprobación del curso de actualización «ESPECIALISTA EN SSOMA», con especial énfasis en el Reglamento de Seguridad Minera y Construcción.",
    topicsOrModules: [
      "Reglamento de Seguridad y Salud Ocupacional en Minería D.S. 024-2016-EM y modificatoria D.S. 023-2017-EM",
      "Reglamento de SST para el Sector Construcción D.S. 011-2019-TR",
      "Taller práctico de elaboración de Matriz IPERC Línea Base y Continuo",
      "Implementación del Ciclo PHVA y Sistema de Gestión ISO 45001 e ISO 14001",
      "Planes de contingencia y respuesta a emergencias operacionales"
    ],
    legalArticlesOrNorms: ["D.S. N° 024-2016-EM", "D.S. N° 011-2019-TR", "Ley N° 29783"],
    signatures: [
      { name: "Ing. Decano CIP CD Pasco", title: "Decano Departamental", entity: "Colegio de Ingenieros del Perú" },
      { name: "Director General CIACEP", title: "Dirección Académica", entity: "CIACEP" }
    ],
    verificationBadge: "Acreditado CIP Pasco Reg. CIPP-CIACEP"
  },

  // 9. PREVENCION DE RIESGOS LABORALES (MTPE - 20/20)
  {
    id: "cert-riesgos-mtpe",
    type: "especializacion",
    category: "SSOMA & Seguridad",
    title: "Prevención de Riesgos Laborales",
    institution: "Ministerio de Trabajo y Promoción del Empleo (MTPE)",
    issuerLogoType: "mtpe",
    documentTitle: "CERTIFICADO OFICIAL DE CAPACITACIÓN",
    subTitle: "DIRECCIÓN GENERAL DE DERECHOS FUNDAMENTALES Y SEGURIDAD Y SALUD EN EL TRABAJO",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2022",
    year: "2022",
    validity: "Certificación Oficial Gubernamental",
    registrationNumber: "Certificado MTPE Código QR Verificable",
    hoursOrCredits: "16 horas académicas",
    grade: "Nota: 20 / 20 (Sobresaliente)",
    summaryText: "El Ministerio de Trabajo y Promoción del Empleo certifica que Rocío Milagros Paredes Gamarra aprobó satisfactoriamente con la calificación perfecta de 20/20 el curso «PREVENCIÓN DE RIESGOS LABORALES», conforme a los estándares de la Ley N° 29783.",
    topicsOrModules: [
      "Marco normativo de la Ley N° 29783 y su Reglamento D.S. N° 005-2012-TR",
      "Identificación de peligros físicos, químicos, biológicos, ergonómicos y psicosociales",
      "Investigación de accidentes e incidentes de trabajo",
      "Comités de Seguridad y Salud en el Trabajo (CSST) y representación laboral"
    ],
    legalArticlesOrNorms: ["Ley N° 29783", "D.S. N° 005-2012-TR"],
    signatures: [
      { name: "Dirección de Seguridad y Salud en el Trabajo", title: "Dirección General", entity: "MTPE" }
    ],
    verificationBadge: "Certificado MTPE Nota 20/20"
  },

  // 10. ISO 9001:2015 INTERPRETACION DE NORMA (UNALM)
  {
    id: "cert-iso9001-unalm",
    type: "especializacion",
    category: "Calidad & Ecoeficiencia",
    title: "ISO 9001:2015 Interpretación de Norma",
    institution: "Universidad Nacional Agraria La Molina (UNALM)",
    issuerLogoType: "unalm",
    documentTitle: "CERTIFICADO DE APROBACIÓN",
    subTitle: "FACULTAD DE CIENCIAS - OFICINA DE EXTENSIÓN UNIVERSITARIA",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2020",
    year: "2020",
    validity: "Certificación Universitaria Oficial",
    registrationNumber: "Certificado 7318 132840",
    hoursOrCredits: "24 horas lectivas",
    grade: "Aprobado",
    summaryText: "La Universidad Nacional Agraria La Molina otorga el presente certificado a Rocío Milagros Paredes Gamarra por haber culminado y aprobado el curso de capacitación en «ISO 9001:2015 INTERPRETACIÓN DE NORMA».",
    topicsOrModules: [
      "Estructura de alto nivel de las normas ISO (Anexo SL)",
      "Enfoque basado en procesos y pensamiento basado en riesgos",
      "Liderazgo, planificación, operación y evaluación del desempeño",
      "Auditorías internas y gestión de no conformidades"
    ],
    signatures: [
      { name: "Decano de la Facultad de Ciencias", title: "Decanato", entity: "Universidad Nacional Agraria La Molina" },
      { name: "Director de Extensión Universitaria", title: "Extensión UNALM", entity: "UNALM" }
    ],
    verificationBadge: "Certificado UNALM N° 7318 132840"
  },

  // 11. HERRAMIENTAS DE CALIDAD PARA MEJORA DE PROCESOS (UNALM)
  {
    id: "cert-calidad-procesos-unalm",
    type: "especializacion",
    category: "Calidad & Ecoeficiencia",
    title: "Herramientas de Calidad para Mejora de Procesos",
    institution: "Universidad Nacional Agraria La Molina (UNALM)",
    issuerLogoType: "unalm",
    documentTitle: "CERTIFICADO DE APROBACIÓN",
    subTitle: "CENTRO DE FORMACIÓN Y EXTENSIÓN",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2020",
    year: "2020",
    validity: "Certificación Universitaria Oficial",
    registrationNumber: "Certificado 7322 134818",
    hoursOrCredits: "16 horas lectivas",
    grade: "Aprobado",
    summaryText: "Certifica que la profesional ha aprobado el curso en «HERRAMIENTAS DE CALIDAD PARA MEJORA DE PROCESOS», dominando técnicas estadísticas y de control operativo para la optimización de procesos en el marco de la reactivación empresarial.",
    topicsOrModules: [
      "Diagramas de Causa - Efecto (Ishikawa) y Análisis de Pareto",
      "Estratificación, hojas de verificación y gráficos de control estadístico",
      "Metodología 5S y ciclo Kaizen de mejora continua",
      "Modelamiento de flujos de valor operativo"
    ],
    signatures: [
      { name: "Coordinador de Capacitación Continua", title: "Coordinación", entity: "UNALM" }
    ],
    verificationBadge: "Certificado UNALM N° 7322 134818"
  },

  // 12. BRIGADAS OPERATIVAS ANTE EMERGENCIAS (GORE CUSCO)
  {
    id: "cert-desastres-gore",
    type: "especializacion",
    category: "SSOMA & Seguridad",
    title: "Capacitación de Brigadas Operativas ante Emergencias y Riesgo de Desastres",
    institution: "Oficina de Gestión de Riesgo de Desastres MDE y COER GORE Cusco",
    issuerLogoType: "gore",
    documentTitle: "CERTIFICADO OFICIAL DE BRIGADISTA OPERATIVO",
    subTitle: "VOLUNTARIADO DE EMERGENCIA Y REHABILITACIÓN (VER)",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2022",
    year: "2022",
    validity: "Acreditación Oficial de Defensa Civil y SINAGERD",
    registrationNumber: "Certificado VER Voluntariado de Emergencia N° 2022-118",
    hoursOrCredits: "30 horas de entrenamiento intensivo",
    grade: "Acreditada",
    summaryText: "Se certifica que Rocío Milagros Paredes Gamarra culminó satisfactoriamente las 30 horas de instrucción teórica y práctica en operaciones de emergencia, lucha contra incendios forestales y mitigación de desastres.",
    topicsOrModules: [
      "Lineamientos de la Ley N° 29664 del SINAGERD y su reglamento",
      "Técnicas de combate de incendios forestales y uso de herramientas forestales",
      "Primeros auxilios básicos, estabilización de pacientes y triaje en campaña",
      "Comando de Incidentes y protocolos de evacuación comunitaria"
    ],
    legalArticlesOrNorms: ["Ley N° 29664 del SINAGERD"],
    signatures: [
      { name: "Jefe de la Oficina de Gestión de Riesgo de Desastres", title: "Jefatura OGRD", entity: "Municipalidad de Echarati" },
      { name: "Coordinador COER Cusco", title: "COER", entity: "Gobierno Regional del Cusco" }
    ],
    verificationBadge: "Brigadista Oficial VER - SINAGERD"
  },

  // 13. SEGURIDAD Y SEÑALIZACION VIAL (CIACEP)
  {
    id: "cert-senalizacion-vial",
    type: "especializacion",
    category: "SSOMA & Seguridad",
    title: "Seguridad y Señalización Vial",
    institution: "Centro Integral de Asesoría Capacitación y Entrenamiento Profesional (CIACEP)",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADO DE CAPACITACIÓN",
    subTitle: "CURSO DE ACTUALIZACIÓN TÉCNICA",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2022",
    year: "2022",
    validity: "Certificado Técnico Oficial",
    registrationNumber: "Registro CIACEP/2022-021-056",
    hoursOrCredits: "40 horas lectivas",
    grade: "Aprobado",
    summaryText: "Por haber participado y aprobado con satisfacción el curso especializado en «SEGURIDAD Y SEÑALIZACIÓN VIAL», aplicando normativas del Ministerio de Transportes y Comunicaciones (MTC).",
    topicsOrModules: [
      "Manual de Dispositivos de Control del Tránsito Automotor para Calles y Carreteras (MTC)",
      "Señalización vertical, horizontal y dispositivos de seguridad en zonas de trabajo de obra",
      "Planes de Desvío de Tránsito y mitigación de riesgos de atropello en áreas urbanas",
      "Inspecciones de seguridad vial en frentes de obra activos"
    ],
    signatures: [
      { name: "Director General CIACEP", title: "Dirección Académica", entity: "CIACEP" }
    ],
    verificationBadge: "Registro CIACEP/2022-021-056"
  },

  // 14. CALIDAD DEL AGUA EN LA CUENCA QUILCA-CHILI (ANA)
  {
    id: "cert-agua-ana",
    type: "especializacion",
    category: "Monitoreo & Recursos",
    title: "Charlas «Calidad del Agua en la Cuenca Quilca-Chili» y «Tratamiento del Agua»",
    institution: "Ministerio de Agricultura / Autoridad Nacional del Agua (ANA)",
    issuerLogoType: "ana",
    documentTitle: "CONSTANCIA OFICIAL DE PARTICIPACIÓN",
    subTitle: "AUTORIDAD ADMINISTRATIVA DEL AGUA I CAPLINA OCOÑA",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2013",
    year: "2013",
    validity: "Constancia Oficial de la Autoridad del Agua",
    registrationNumber: "Constancia Oficial ANA - ALA Chili",
    grade: "Participación Acreditada",
    summaryText: "La Autoridad Nacional del Agua hace constar la asistencia y activa participación en las jornadas técnicas sobre dinámica hidroquímica, monitoreo de cuencas y tecnologías de tratamiento de agua en la cuenca Quilca-Chili de Arequipa.",
    topicsOrModules: [
      "Evaluación y diagnóstico de la calidad de agua superficial de la cuenca Quilca-Chili",
      "Identificación de fuentes contaminantes y vertimientos industriales y domésticos",
      "Tecnologías de tratamiento y potabilización para consumo humano y riego agrícola",
      "Protocolo nacional para el monitoreo de la calidad de los recursos hídricos superficiales"
    ],
    signatures: [
      { name: "Administrador Local de Agua Chili", title: "Administración Local del Agua", entity: "Autoridad Nacional del Agua (ANA)" }
    ],
    verificationBadge: "Constancia Oficial ANA / MINAGRI"
  },

  // 15. MONITOREO AMBIENTAL AIRE SUELO Y AGUA (GR / ICMA)
  {
    id: "cert-monitoreo-gr",
    type: "especializacion",
    category: "Monitoreo & Recursos",
    title: "Monitoreo Ambiental: Calidad de Aire, Suelo y Agua",
    institution: "GR Consulting Asesoría y Capacitación / Instituto de la Calidad y Medio Ambiente (ICMA)",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADO DE CAPACITACIÓN",
    subTitle: "CURSO TÉCNICO DE ESPECIALIZACIÓN AMBIENTAL",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2012",
    year: "2012",
    validity: "Certificado Técnico de Campo",
    registrationNumber: "Certificado GR Consulting / ICMA 2012",
    hoursOrCredits: "18 horas lectivas",
    grade: "Aprobado",
    summaryText: "Por haber aprobado el curso técnico en «MONITOREO AMBIENTAL: CALIDAD DE AIRE, SUELO Y AGUA», adquiriendo destreza operativa en muestreo físico-químico, manejo de equipos multiparámetro y cadena de custodia.",
    topicsOrModules: [
      "Protocolos de muestreo de agua superficial y subterránea según Estándares ECA",
      "Toma de muestras de suelo (disturbadas e indisturbadas) y parámetros analíticos",
      "Monitoreo de material particulado (PM10, PM2.5) y gases de combustión",
      "Calibración de equipos de campo y preservación de muestras de laboratorio"
    ],
    signatures: [
      { name: "Director General ICMA", title: "Dirección Académica", entity: "ICMA" }
    ],
    verificationBadge: "Acreditado ICMA - GR Consulting"
  },

  // 16. MANEJO DE RESIDUOS SOLIDOS (PNUD - GRA)
  {
    id: "cert-residuos-pnud",
    type: "especializacion",
    category: "Calidad & Ecoeficiencia",
    title: "Taller de Capacitación en Manejo de Residuos Sólidos",
    institution: "Gobierno Regional de Arequipa, PENUND (PNUD) y Municipalidad Provincial de Arequipa",
    issuerLogoType: "gore",
    documentTitle: "CERTIFICADO DE PARTICIPACIÓN",
    subTitle: "PROGRAMA DE NACIONES UNIDAS PARA EL DESARROLLO & GOBIERNO REGIONAL",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "2010",
    year: "2010",
    validity: "Certificado de Convenio Internacional",
    registrationNumber: "Certificado Convenio GRA - PNUD",
    grade: "Participación Acreditada",
    summaryText: "Certifica su participación y aprobación en el taller de «MANEJO DE RESIDUOS SÓLIDOS», enfocado en la minimización en fuente, segregación, recolección selectiva y disposición final en el departamento de Arequipa.",
    topicsOrModules: [
      "Diagnóstico y generación per cápita de residuos sólidos domiciliarios y comerciales",
      "Técnicas de segregación y valorización de materiales reciclables",
      "Operación de rellenos sanitarios y control de lixiviados y biogás",
      "Sensibilización comunitaria y programas de segregación en la fuente"
    ],
    signatures: [
      { name: "Coordinador de Proyecto PNUD", title: "Representación PNUD", entity: "Naciones Unidas Perú" },
      { name: "Gerente Regional de Recursos Naturales", title: "Gerencia Regional", entity: "Gobierno Regional de Arequipa" }
    ],
    verificationBadge: "Convenio GRA - PNUD - MPA"
  },

  // 17. CERTIFICADO TRABAJO: CONSORCIO VIAL BUSTAMANTE (2025)
  {
    id: "doc-work-bustamante",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Certificado de Trabajo - Asistente de Especialista Ambiental",
    institution: "CONSORCIO VIAL BUSTAMANTE",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADO DE TRABAJO",
    subTitle: "OBRA: AV. PROLONGACIÓN DOLORES (CUI N° 2598840)",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551 · CIP N° 322074",
    dateIssued: "12 de Noviembre de 2025",
    year: "2025",
    validity: "Documento Laboral Oficial",
    registrationNumber: "Certificado CVB-2025-084",
    roleOrDesignation: "Asistente de Especialista Ambiental",
    projectOrContext: "Obra: «Mejoramiento de servicio de movilidad urbana en la Avenida Prolongación Dolores desde Puente Dolores hasta Av. Caracas del distrito de José Luis Bustamante y Rivero, provincia y departamento de Arequipa». (CUI N° 2598840).",
    summaryText: "Por medio de la presente, el CONSORCIO VIAL BUSTAMANTE certifica que la Ing. Rocío Milagros Paredes Gamarra prestó sus servicios profesionales en calidad de Asistente de Especialista Ambiental durante el período comprendido de Mayo a Noviembre de 2025 en la obra de mejoramiento vial de la Av. Prolongación Dolores, desempeñando sus funciones con amplio conocimiento técnico, responsabilidad, honradez y puntualidad.",
    topicsOrModules: [
      "Realización de inspecciones periódicas de campo y fiscalización de cumplimiento ambiental",
      "Elaboración de informes técnicos de avance ambiental y cumplimiento de compromisos del IGA",
      "Administración y actualización de bases de datos de incidencias y control ambiental",
      "Impartición de charlas de capacitación y sensibilización a las cuadrillas de trabajadores de obra"
    ],
    signatures: [
      { name: "Ing. Residente de Obra", title: "Residencia de Obra CUI 2598840", entity: "Consorcio Vial Bustamante" },
      { name: "Jefe de Recursos Humanos", title: "Administración y RRHH", entity: "Consorcio Vial Bustamante" }
    ],
    verificationBadge: "Certificado Laboral Emitido 12/11/2025",
    relatedExperienceId: "exp-bustamante"
  },

  // 18. CERTIFICADO TRABAJO: EXMEL EIRL - SOUTHERN PERU (2024)
  {
    id: "doc-work-exmel",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Certificado SSOMA en Operaciones Mineras — Southern Perú",
    institution: "EXMEL EIRL — Unidad Villa Cuajone, Southern Perú",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADO DE SERVICIOS Y CONSTANCIA LABORAL",
    subTitle: "SUPERVISIÓN SSOMA EN ZONA MINERA",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551 · CIP N° 322074",
    dateIssued: "31 de Octubre de 2024",
    year: "2024",
    validity: "Acreditación de Cumplimiento en Minería",
    registrationNumber: "EXMEL-SSOMA-CUAJONE-2024-019",
    roleOrDesignation: "Jefa de Seguridad, Salud Ocupacional y Medio Ambiente (SSOMA)",
    projectOrContext: "Obra: «Mantenimiento de losa y cerco perimétrico» en la unidad minera Villa Cuajone - Southern Perú Copper Corporation.",
    summaryText: "Hacemos constar que la Ing. Rocío Milagros Paredes Gamarra se desempeñó como Jefa de Seguridad, Salud Ocupacional y Medio Ambiente (SSOMA), liderando con excelencia la gestión preventiva en la obra minera de Villa Cuajone. Durante toda su gestión garantizó la capacitación diaria al 100% de los trabajadores, diseñó los planes de manejo ambiental y mantuvo el estándar de CERO ACCIDENTES.",
    topicsOrModules: [
      "Elaboración del Sistema de Gestión SSOMA bajo los estándares corporativos de Southern Perú",
      "Formulación e implementación del Plan de Manejo Ambiental y Contingencias de Obra",
      "Capacitación diaria y continua en SSO al 100% de la masa laboral en campo",
      "Inspecciones rigurosas de herramientas y condiciones subestándar logrando CERO ACCIDENTES"
    ],
    legalArticlesOrNorms: ["D.S. N° 024-2016-EM (Reglamento de SST en Minería)", "Estándares Southern Perú"],
    signatures: [
      { name: "Gerente de Operaciones Mineras", title: "Gerencia de Operaciones", entity: "EXMEL EIRL" },
      { name: "Ing. Residente de Obra Cuajone", title: "Residencia Minera", entity: "EXMEL EIRL" }
    ],
    verificationBadge: "Acreditación Minera Southern Perú Cero Accidentes",
    relatedExperienceId: "exp-exmel"
  },

  // 19. CERTIFICADO TRABAJO: RIMACHI HERMANOS SAC (2023)
  {
    id: "doc-work-rimachi",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Certificado de Trabajo - Supervisora Ambiental",
    institution: "RIMACHI HERMANOS CONSTRUCTORES Y CONSULTORES SAC",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADO DE TRABAJO",
    subTitle: "SUPERVISIÓN AMBIENTAL MULTIPROYECTO",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551 · CIP N° 322074",
    dateIssued: "29 de Diciembre de 2023",
    year: "2023",
    validity: "Documento Laboral Oficial",
    registrationNumber: "RHC-RRHH-2023-142",
    roleOrDesignation: "Supervisora Ambiental",
    projectOrContext: "Supervisión ambiental y de seguridad industrial en múltiples proyectos constructivos de la empresa en la región Cusco.",
    summaryText: "Certifica que la profesional laboró como Supervisora Ambiental en la empresa Rimachi Hermanos Constructores y Consultores SAC, supervisando la correcta ejecución de los programas de manejo ambiental y seguridad en diversos proyectos constructivos desarrollados en la región del Cusco.",
    topicsOrModules: [
      "Supervisión y control in situ de programas de manejo ambiental en obras simultáneas",
      "Capacitaciones continuas a cuadrillas técnicas y obreras en protección ecológica",
      "Inspección de procedimientos constructivos para mitigar impactos ambientales y riesgos laborales"
    ],
    signatures: [
      { name: "Gerente General", title: "Gerencia General", entity: "Rimachi Hermanos SAC" }
    ],
    verificationBadge: "Certificado Laboral Emitido 29/12/2023",
    relatedExperienceId: "exp-rimachi"
  },

  // 20. CERTIFICADO TRABAJO: MUNICIPALIDAD DE ECHARATI (2022)
  {
    id: "doc-work-echarati-2022",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Certificado de Trabajo Municipal — Prevencionista SSOMA y Asistente",
    institution: "MUNICIPALIDAD DISTRITAL DE ECHARATI",
    issuerLogoType: "gore",
    documentTitle: "CERTIFICADO DE TRABAJO MUNICIPAL",
    subTitle: "SUBGERENCIA DE RECURSOS HUMANOS",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "18 de Enero de 2023",
    year: "2023",
    validity: "Acreditación Oficial del Sector Público",
    registrationNumber: "Certificado de Trabajo MDE (18/01/2023)",
    roleOrDesignation: "Asistente de Proyecto / Prevencionista de Riesgos SSOMA / Promotora Social",
    projectOrContext: "Proyectos: Instalación de alertas tempranas frente a radiación UV en 6 Instituciones Educativas y Mejoramiento de productos agropecuarios potenciales en 5 localidades.",
    summaryText: "La Municipalidad Distrital de Echarati hace constar que la Ing. Rocío Milagros Paredes Gamarra laboró desde Mayo hasta Diciembre de 2022 en la formulación del Plan SSOMA, implementación de medidas de seguridad y salud, control documentario y coordinación técnica de cronogramas.",
    topicsOrModules: [
      "Gestión y estructuración del Plan de Seguridad, Salud y Medio Ambiente (SSOMA)",
      "Coordinaciones técnicas institucionales con aseguradoras y entidades fiscalizadoras",
      "Administración integral de la documentación técnica y bases de datos del proyecto",
      "Cumplimiento en plazo del 100% de los hitos del cronograma físico"
    ],
    signatures: [
      { name: "Subgerente de Recursos Humanos", title: "Subgerencia de Recursos Humanos", entity: "Municipalidad de Echarati" },
      { name: "Gerente de Desarrollo Social y Ambiental", title: "Gerencia de Desarrollo", entity: "MDE" }
    ],
    verificationBadge: "Certificado Municipal Emitido 18/01/2023",
    relatedExperienceId: "exp-echarati-2022"
  },

  // 21. CONSTANCIA SERVICIOS: GRUPO SAS PERU (2021)
  {
    id: "doc-work-sas",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Constancia de Servicios — Analista de Campo en Monitoreos",
    institution: "GRUPO SAS PERU S.A.C.",
    issuerLogoType: "empresa",
    documentTitle: "CONSTANCIA DE PRESTACIÓN DE SERVICIOS",
    subTitle: "SERVICIOS AMBIENTALES Y OCUPACIONALES",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "30 de Junio de 2021",
    year: "2021",
    validity: "Constancia Técnica de Servicios",
    registrationNumber: "SAS-OPS-2021-032",
    roleOrDesignation: "Analista de Campo",
    projectOrContext: "Campañas de monitoreo ambiental y ocupacional en operaciones mineras e industriales en Lima y Arequipa.",
    summaryText: "Se deja constancia de que Rocío Milagros Paredes Gamarra prestó servicios como Analista de Campo para el Grupo SAS Perú SAC, ejecutando campañas de monitoreo de calidad de agua, suelo, emisiones de aire y ruido, procesando parámetros técnicos con alto rigor científico.",
    topicsOrModules: [
      "Ejecución de monitoreos de calidad ambiental en frentes industriales y mineros",
      "Implementación de controles de campo y cadena de custodia analítica",
      "Elaboración de bases de datos para toma de decisiones técnicas"
    ],
    signatures: [
      { name: "Jefe de Operaciones de Monitoreo", title: "Área Técnica", entity: "Grupo SAS Perú S.A.C." }
    ],
    verificationBadge: "Constancia Emitida Junio 2021",
    relatedExperienceId: "exp-sas"
  },

  // 22. CERTIFICADO TRABAJO: ECA MAENI - RESERVA COMUNAL MACHIGUENGA (2020)
  {
    id: "doc-work-machiguenga",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Certificado de Trabajo — Especialista Ambiental en ANP",
    institution: "ECA MAENI (Ejecutor Reserva Comunal Machiguenga)",
    issuerLogoType: "sernanp",
    documentTitle: "CERTIFICADO DE TRABAJO Y GESTIÓN AMBIENTAL",
    subTitle: "ÁREA NATURAL PROTEGIDA - RESERVA COMUNAL MACHIGUENGA",
    recipient: "Ing. Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "03 de Agosto de 2020",
    year: "2020",
    validity: "Certificado Oficial de Administración de ANP",
    registrationNumber: "Certificado de Trabajo ECA MAENI (03/08/2020)",
    roleOrDesignation: "Especialista Ambiental",
    projectOrContext: "Proyectos desarrollados dentro del Área Natural Protegida y zona de amortiguamiento de la Reserva Comunal Machiguenga (Marzo 2017 a Abril 2020).",
    summaryText: "El Ejecutor del Contrato de Administración de la Reserva Comunal Machiguenga certifica que la profesional laboró durante más de tres años continuos liderando el componente ambiental dentro del ANP, realizando análisis de datos ecológicos, asesoramiento para la recuperación de áreas degradadas y coordinación multidisciplinaria con comunidades.",
    topicsOrModules: [
      "Liderazgo del componente ambiental en la Reserva Comunal Machiguenga",
      "Análisis de datos de monitoreo biológico y de calidad ambiental",
      "Asesoramiento técnico para la recuperación ecológica de áreas degradadas",
      "Articulación interinstitucional y trabajo de campo con comunidades nativas"
    ],
    signatures: [
      { name: "Presidente del Consejo Directivo", title: "Dirección", entity: "ECA MAENI - Reserva Comunal Machiguenga" },
      { name: "Coordinador General de Proyecto", title: "Coordinación Técnica", entity: "ECA MAENI" }
    ],
    verificationBadge: "Certificado Laboral Emitido 03/08/2020",
    relatedExperienceId: "exp-machiguenga"
  },

  // 23. CONSTANCIA TRABAJO: MUNICIPALIDAD DE BELLA UNION (2017)
  {
    id: "doc-work-bella-union",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Constancia de Trabajo - Asistente de Proyecto",
    institution: "MUNICIPALIDAD DISTRITAL DE BELLA UNIÓN",
    issuerLogoType: "gore",
    documentTitle: "CONSTANCIA DE TRABAJO",
    subTitle: "ALCALDÍA Y GERENCIA MUNICIPAL",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "Enero 2017",
    year: "2017",
    validity: "Constancia Municipal Oficial",
    registrationNumber: "Constancia Bella Unión 2017",
    roleOrDesignation: "Asistente de Proyecto",
    projectOrContext: "Proyecto: «Mejoramiento de la gestión integral para el desarrollo cultural y turístico en el distrito de Bella Unión», Caravelí, Arequipa.",
    summaryText: "Hace constar que prestó servicios como Asistente de Proyecto desde Marzo 2016 hasta Enero 2017, participando en la recopilación técnica y legal de información, soporte operativo y elaboración de informes de síntesis.",
    topicsOrModules: [
      "Investigación y recopilación de información técnica, legal y financiera para proyectos",
      "Coordinación de reuniones, seguimiento de acuerdos y redacción de informes técnicos"
    ],
    signatures: [
      { name: "Alcalde Distrital / Gerente", title: "Gerencia Municipal", entity: "Municipalidad Distrital de Bella Unión" }
    ],
    verificationBadge: "Constancia Laboral Bella Unión",
    relatedExperienceId: "exp-bella-union"
  },

  // 24. CONSTANCIA TRABAJO: MUNICIPALIDAD DE YANAQUIHUA (2016)
  {
    id: "doc-work-yanaquihua",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Constancia de Trabajo - Asistente de Proyecto",
    institution: "MUNICIPALIDAD DISTRITAL DE YANAQUIHUA",
    issuerLogoType: "gore",
    documentTitle: "CONSTANCIA DE TRABAJO",
    subTitle: "DIRECCIÓN DE OBRAS PÚBLICAS",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "Febrero 2016",
    year: "2016",
    validity: "Constancia Municipal Oficial",
    registrationNumber: "Constancia Yanaquihua 2016",
    roleOrDesignation: "Asistente de Proyecto",
    projectOrContext: "Proyecto: Defensa ribereña Yause «La Barrera» en Yanaquihua, Arequipa.",
    summaryText: "Certifica que laboró como Asistente de Proyecto en la obra de defensa ribereña de Yause La Barrera, redactando documentación administrativa y técnica, y organizando archivos del proyecto.",
    topicsOrModules: [
      "Redacción de documentación técnica y administrativa para defensas ribereñas",
      "Custodia y organización de expedientes técnicos y cuadernos de obra"
    ],
    signatures: [
      { name: "Director de Obras y Desarrollo", title: "Dirección de Infraestructura", entity: "Municipalidad de Yanaquihua" }
    ],
    verificationBadge: "Constancia Laboral Yanaquihua",
    relatedExperienceId: "exp-yanaquihua"
  },

  // 25. CERTIFICADOS DE TRABAJO: LIVIT CONSTRUCCION (2015)
  {
    id: "doc-work-livit",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Certificados de Trabajo — Asistente de Seguridad SSOMA",
    institution: "EMPRESA DE CONSTRUCCIÓN LIVIT",
    issuerLogoType: "empresa",
    documentTitle: "CERTIFICADOS DE TRABAJO Y CUMPLIMIENTO SUNAFIL",
    subTitle: "GESTIÓN DE SEGURIDAD Y MEDIO AMBIENTE EN EDIFICACIONES",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "29/04/2015 y 31/07/2015",
    year: "2015",
    validity: "Certificados Laborales Oficiales",
    registrationNumber: "Certificados LIVIT (29/04/2015 y 31/07/2015)",
    roleOrDesignation: "Asistente de Seguridad SSOMA",
    projectOrContext: "Proyecto Edificio Multifamiliar Metrópoli 054 en Arequipa.",
    summaryText: "La Empresa de Construcción LIVIT certifica que desempeñó labores de Asistente de Seguridad SSOMA, elaborando y recopilando la documentación de gestión exigida por la Ley 29783 y SUNAFIL, dictando charlas de inducción a cuadrillas obreras y confeccionando informes de impacto ambiental con cero observaciones.",
    topicsOrModules: [
      "Conformación de la carpeta de gestión SSOMA conforme a requerimientos de SUNAFIL",
      "Charlas diarias de 5 minutos e inducción en prevención de riesgos",
      "Identificación de actos y condiciones inseguras en obra de edificación vertical",
      "Reportes de impacto ambiental y gestión de residuos de la construcción"
    ],
    legalArticlesOrNorms: ["Ley N° 29783", "Norma Técnica G.050 Seguridad durante la Construcción"],
    signatures: [
      { name: "Gerente de Operaciones", title: "Gerencia de Construcción", entity: "Empresa LIVIT" },
      { name: "Jefe de Recursos Humanos", title: "RRHH", entity: "LIVIT" }
    ],
    verificationBadge: "Certificados Laborales LIVIT 2015",
    relatedExperienceId: "exp-livit"
  },

  // 26. CONSTANCIA TRABAJO: MUNICIPALIDAD DE ECHARATI (2014)
  {
    id: "doc-work-echarati-2014",
    type: "trabajo",
    category: "Constancia Laboral",
    title: "Constancia de Trabajo — Asistente Técnico de Obra Ambiental",
    institution: "MUNICIPALIDAD DISTRITAL DE ECHARATI — Gerencia de Medio Ambiente",
    issuerLogoType: "gore",
    documentTitle: "CONSTANCIA DE TRABAJO OFICIAL",
    subTitle: "GERENCIA DE MEDIO AMBIENTE Y RECURSOS NATURALES",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "03 de Octubre de 2014",
    year: "2014",
    validity: "Constancia Oficial de la Gerencia Ambiental",
    registrationNumber: "Constancia MDE Gerencia de Medio Ambiente (03/10/2014)",
    roleOrDesignation: "Asistente Técnico de Obra",
    projectOrContext: "Proyecto: «Mejoramiento e implementación de la educación ambiental para el manejo adecuado de los recursos naturales en el Alto y Medio Urubamba».",
    summaryText: "La Gerencia de Medio Ambiente de la Municipalidad Distrital de Echarati hace constar que prestó servicios como Asistente Técnico de Obra, capacitando en escuelas y centros poblados e implementando campañas masivas de segregación de residuos sólidos.",
    topicsOrModules: [
      "Capacitaciones ambientales en instituciones educativas del distrito de Echarati",
      "Organización de campañas de aprendizaje de clasificación de residuos",
      "Gestión de disposición final controlada de residuos sólidos municipales"
    ],
    signatures: [
      { name: "Gerente de Medio Ambiente", title: "Gerencia de Medio Ambiente", entity: "Municipalidad de Echarati" }
    ],
    verificationBadge: "Constancia MDE Emitida 03/10/2014",
    relatedExperienceId: "exp-echarati-2014"
  },

  // 27. RECONOCIMIENTO SERNANP (2013)
  {
    id: "doc-work-sernanp",
    type: "reconocimiento",
    category: "Reconocimiento Oficial",
    title: "Carta y Resolución de Reconocimiento — Guardaparque Voluntaria",
    institution: "MINISTERIO DEL AMBIENTE — SERNANP",
    issuerLogoType: "sernanp",
    documentTitle: "RESOLUCIÓN Y CARTA DE RECONOCIMIENTO INSTITUCIONAL",
    subTitle: "SERVICIO NACIONAL DE ÁREAS NATURALES PROTEGIDAS POR EL ESTADO",
    recipient: "Rocío Milagros Paredes Gamarra",
    recipientId: "D.N.I. N° 71332551",
    dateIssued: "Marzo 2013",
    year: "2013",
    validity: "Reconocimiento Oficial del Ministerio del Ambiente",
    registrationNumber: "Carta y Resolución SERNANP JRCM 2013",
    roleOrDesignation: "Guardaparque Voluntaria",
    projectOrContext: "Control y Vigilancia en el Área Natural Protegida de la Reserva Comunal Machiguenga.",
    summaryText: "El Servicio Nacional de Áreas Naturales Protegidas por el Estado (SERNANP) otorga el reconocimiento formal a Rocío Milagros Paredes Gamarra en mérito a su encomiable labor como Guardaparque Voluntaria, ejecutando acciones de control, patrullajes de vigilancia ecológica y procesamiento de bases de datos para la protección del patrimonio natural de la Nación.",
    topicsOrModules: [
      "Control y vigilancia del Área Natural Protegida Reserva Comunal Machiguenga",
      "Patrullajes de campo y registro de flora, fauna y presiones antrópicas",
      "Elaboración de bases de datos sistemáticas para la toma de decisiones del SERNANP"
    ],
    legalArticlesOrNorms: ["Ley N° 26834 de Áreas Naturales Protegidas"],
    signatures: [
      { name: "Jefe de la Reserva Comunal Machiguenga", title: "Jefatura ANP", entity: "SERNANP - Ministerio del Ambiente" }
    ],
    verificationBadge: "Reconocimiento Oficial SERNANP / MINAM",
    relatedExperienceId: "exp-sernanp"
  }
];
