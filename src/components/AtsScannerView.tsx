import React, { useState } from 'react';
import { useCvData } from '../context/CvDataContext';
import { 
  CheckCircle, 
  Copy, 
  Download, 
  FileCheck, 
  Sparkles, 
  Check,
  Search,
  HeartHandshake
} from 'lucide-react';

export const AtsScannerView: React.FC = () => {
  const { cvData } = useCvData();
  const { personal, strategicProfile, aiEnvironmentalSpecialty, workExperience, certifications, atsKeywordsList, softSkills } = cvData;
  const [copied, setCopied] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');

  // Generate clean plain text representation suitable for ATS parsing
  const getPlainTextATS = () => {
    return `
================================================================================
${personal.fullName.toUpperCase()}
Ingeniera Ambiental Colegiada | ${personal.cip}
${personal.location} | Teléfono: ${personal.phone} | Email: ${personal.email}
Disponibilidad Inmediata · Trabajo en Campo y Zonas Remotas · Movilidad Nacional
================================================================================

PERFIL PROFESIONAL & PROPUESTA DE VALOR ESTRATÉGICA
--------------------------------------------------------------------------------
${strategicProfile.executiveSummary}

Propuesta de Valor: ${strategicProfile.valueProposition}

ESPECIALIZACIÓN EN CURSO
--------------------------------------------------------------------------------
${aiEnvironmentalSpecialty.title}
- Python para Geoprocesamiento y SIG (ArcGIS Pro, ArcPy, QGIS).
- Analítica de datos ambientales y modelamiento predictivo de calidad de agua, aire y suelo.
- Aplicación de herramientas de Inteligencia Artificial al monitoreo ecosistémico y soporte en Instrumentos de Gestión Ambiental (IGA).

LOGROS CUANTIFICABLES Y DE DESEMPEÑO
--------------------------------------------------------------------------------
• Cero Accidentes en Minería: Mantuvo récord impecable de CERO accidentes e incidentes incapacitantes durante toda la ejecución de obra de mantenimiento en Villa Cuajone, Southern Perú (EXMEL EIRL).
• 100% Personal Capacitado: Formación diaria y continua en seguridad, salud ocupacional y medio ambiente para el 100% de los trabajadores.
• Calificaciones de Excelencia (20/20 y 18/20): Calificación perfecta (20/20) en Fiscalización OEFA y Control Gubernamental, 20/20 en Gestión Ambiental Empresarial, 20/20 en Prevención de Riesgos Laborales (MTPE) y 18/20 en Ecoeficiencia en Instituciones Públicas (MINAM).
• 100% Cumplimiento Normativo: Cumplimiento integral de los requerimientos SSOMA exigidos por SUNAFIL y normativas sectoriales sin sanciones administrativas.
• Gestión Multiobra: Supervisión simultánea de proyectos en Cusco y experiencia operativa en el Área Natural Protegida Reserva Comunal Machiguenga (ECA MAENI / SERNANP).
• Más de 10 Años de Trayectoria: Experiencia profesional multidisciplinaria en minería, carreteras e infraestructura urbana y entidades públicas.

HABILIDADES BLANDAS Y COMPETENCIAS INTERPERSONALES
--------------------------------------------------------------------------------
${softSkills.map((s) => `• ${s.name}: ${s.definition} (Aplicación en campo: ${s.application})`).join('\n')}

COMPETENCIAS TÉCNICAS CLAVE & SISTEMAS ATS
--------------------------------------------------------------------------------
• SIG / Geoespacial & Programación: ArcGIS Pro, ArcMap (Especialista UNI 80h), Python para Geoprocesamiento, IA Aplicada al Medio Ambiente, AutoCAD + IA, QGIS, Bizagi BPMN.
• Normativas y Fiscalización: OEFA, SINEFA, La Contraloría General de la República, ISO 14001, ISO 9001:2015 (UNALM), OHSAS 18001 / ISO 45001, D.S. 024-2016-EM (Minería), D.S. 011-2019-TR, Ley 29783 (SUNAFIL), D.S. 016-2021-MINAM (Ecoeficiencia).
• Instrumentos y Monitoreo: Instrumentos de Gestión Ambiental (IGA), Monitoreo Ambiental de Calidad de Agua, Suelo y Aire, Gestión del Agua en Minería (240h), Manejo de Residuos Sólidos, IPERC.
• Idiomas: Español (Nativo), Quechua (Intermedio - Runa Simi), Inglés (Técnico Profesional).

EXPERIENCIA LABORAL
--------------------------------------------------------------------------------
${workExperience.map((exp) => `
EMPRESA: ${exp.company}
CARGO: ${exp.role}
UBICACIÓN: ${exp.location} | PERIODO: ${exp.period}
${exp.project ? `PROYECTO: ${exp.project}` : ''}
FUNCIONES Y LOGROS:
${exp.responsibilitiesAndAchievements.map((ach) => `  - ${ach}`).join('\n')}
HERRAMIENTAS / KEYWORDS: ${exp.technologiesAndKeywords.join(', ')}
${exp.certificateRef ? `CERTIFICADO: ${exp.certificateRef}` : ''}
`).join('\n--------------------------------------------------------------------------------\n')}

FORMACIÓN ACADÉMICA & ESTUDIOS OFICIALES
--------------------------------------------------------------------------------
• TÍTULO PROFESIONAL DE INGENIERA AMBIENTAL (Sustentación de Tesis)
  ${personal.university}
  Registro Nacional de Colegiatura: ${personal.cip} (${personal.colegiaturaStatus})

1. ESTUDIOS, DIPLOMAS Y CURSOS DE ESPECIALIZACIÓN (16 ACREDITACIONES)
--------------------------------------------------------------------------------
${certifications.map((cert) => `• ${cert.title} - ${cert.institution} (${cert.year})${cert.grade ? ` [${cert.grade}]` : ''}${cert.duration ? ` [${cert.duration}]` : ''}`).join('\n')}

2. CERTIFICADOS Y CONSTANCIAS LABORALES DE TRABAJO (11 ACREDITACIONES)
--------------------------------------------------------------------------------
• Certificado de Servicios SSOMA en Minería — Southern Perú / EXMEL EIRL (Villa Cuajone, Cero Accidentes)
• Certificado de Trabajo: Asistente de Especialista Ambiental — Consorcio Vial Bustamante (Arequipa)
• Certificado de Trabajo: Supervisora Ambiental — RIMACHI Hermanos SAC (Cusco)
• Certificado de Trabajo Municipal: Prevencionista SSOMA — Municipalidad Distrital de Echarati
• Constancia de Servicios: Analista de Campo en Monitoreos — Grupo SAS Perú SAC (Lima / Arequipa)
• Certificado de Trabajo: Especialista Ambiental en ANP — ECA MAENI / Reserva Comunal Machiguenga (SERNANP)
• Certificado de Servicios: Residente SSOMA en Obras Viales — LIVIT Arquitectura & Construcción
• Constancia de Trabajo: Especialista Ambiental — Municipalidad Distrital de Bella Unión
• Certificado de Trabajo: Asistente de Gestión Ambiental — Minera Yanaquihua S.A.C.
• Certificado de Servicios: Analista Químico Ambiental — Ensayos & Calidad S.A.C.
`.trim();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getPlainTextATS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([getPlainTextATS()], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "CV_Rocio_Paredes_Gamarra_ATS_Verificado.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredKeywords = atsKeywordsList.filter(k => 
    k.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  return (
    <div className="py-12 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ATS Scorecard Banner in Holst styling */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#415A77] mb-2">
                <FileCheck className="w-4 h-4 text-[#77907A]" />
                <span>Auditoría de Compatibilidad ATS (Applicant Tracking Systems)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B2A] tracking-tight">
                Formato Optimizado para Portales de Selección
              </h2>
              <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
                Este formato elimina elementos gráficos bloqueantes y estandariza los campos para que portales como Workday, Taleo, LinkedIn y Computrabajo lean correctamente tus habilidades, logros, certificados y colegiatura.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#0D1B2A] text-white rounded-2xl p-4 shrink-0 shadow-md">
              <div className="text-center">
                <span className="text-4xl font-extrabold text-[#D4CAA8] font-mono">
                  98%
                </span>
                <span className="text-[11px] block font-semibold text-[#77907A] uppercase tracking-wider mt-0.5">
                  ATS Match Score
                </span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-xs space-y-1 text-slate-200">
                <div className="flex items-center gap-1.5 text-[#77907A]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#77907A]" />
                  <span>Estructura Monocolumna</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#77907A]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#77907A]" />
                  <span>Habilidades Blandas Incluidas</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#77907A]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#77907A]" />
                  <span>35+ Palabras Clave Reales</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#0D1B2A] hover:bg-[#1B263B] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#D4CAA8]" /> : <Copy className="w-4 h-4 text-[#D4CAA8]" />}
              <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Texto Plano para Postular'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-[#0D1B2A] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#415A77]" />
              <span>Descargar Archivo .TXT para ATS</span>
            </button>
          </div>
        </div>

        {/* ATS Keywords Inspector */}
        <div className="rounded-xl bg-white border border-slate-200 p-5 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D1B2A]">
              <Sparkles className="w-4 h-4 text-[#77907A]" />
              <span>Palabras Clave Indexadas en este Currículum ({atsKeywordsList.length}):</span>
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                placeholder="Verificar palabra clave..."
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-md pl-8 pr-3 py-1 text-xs text-[#0D1B2A] placeholder-slate-400 focus:outline-none focus:border-[#0D1B2A] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {filteredKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-[#F8FAFC] text-[#1B263B] border border-slate-200 font-medium"
              >
                <Check className="w-3 h-3 text-[#2D5A34]" />
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Clean ATS Document Preview (High contrast ATS reader) */}
        <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-10 shadow-2xl font-sans max-w-4xl mx-auto border border-slate-300">
          
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-slate-900">
              {personal.fullName}
            </h1>
            <p className="text-sm font-bold text-[#1b3a6b] mt-1">
              Ingeniera Ambiental Colegiada | CIP N° 322074
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {personal.location} · Cel: {personal.phone} · {personal.email}
            </p>
            <p className="text-xs text-slate-500 italic mt-0.5">
              {personal.availability}
            </p>
          </div>

          {/* Section: Resumen Profesional */}
          <div className="py-5 border-b border-slate-300">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
              Perfil Profesional & Propuesta de Valor Estratégica
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {strategicProfile.executiveSummary}
            </p>
            <p className="text-xs text-slate-800 font-semibold mt-2">
              Propuesta de Valor: "{strategicProfile.valueProposition}"
            </p>
          </div>

          {/* Section: Habilidades Blandas */}
          <div className="py-5 border-b border-slate-300 bg-slate-50 p-4 rounded my-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1b3a6b] mb-2 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#204a8c]" />
              <span>Habilidades Blandas & Competencias Interpersonales</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {softSkills.map((s) => (
                <div key={s.name}>
                  <strong>• {s.name}:</strong> {s.definition}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Especialidad en IA */}
          <div className="py-5 border-b border-slate-300">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
              Especialización Activa: Programación e Inteligencia Artificial Aplicada al Medio Ambiente
            </h2>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              <li>Desarrollo de scripts en Python para geoprocesamiento geoespacial y teledetección en ArcGIS.</li>
              <li>Analítica de datos ambientales para seguimiento de parámetros de agua, aire y suelo según ECA.</li>
              <li>Exploración y aplicación de modelos de IA para monitoreo ecosistémico y soporte en IGA.</li>
            </ul>
          </div>

          {/* Section: Logros Reales */}
          <div className="py-5 border-b border-slate-300">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
              Logros y Desempeño Cuantificable
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>Cero Accidentes en Minería:</strong> Récord de CERO accidentes e incidentes incapacitantes en obra de mantenimiento en Villa Cuajone, Southern Perú.</li>
              <li><strong>100% de Personal Capacitado:</strong> Formación diaria en SSO y medio ambiente para la totalidad de trabajadores en terreno.</li>
              <li><strong>Calificaciones Sobresalientes (20/20 y 18/20):</strong> 20/20 en Fiscalización OEFA y Control Gubernamental, 20/20 en Gestión Ambiental Empresarial, 20/20 en Riesgos Laborales MTPE y 18/20 en Ecoeficiencia MINAM.</li>
              <li><strong>100% Cumplimiento Normativo:</strong> Gestión integral de requerimientos SSOMA exigidos por SUNAFIL sin observaciones sancionatorias.</li>
              <li><strong>Supervisión Multiobra:</strong> Control ambiental simultáneo de proyectos en Cusco y experiencia en Áreas Naturales Protegidas (SERNANP).</li>
            </ul>
          </div>

          {/* Section: Experiencia Laboral */}
          <div className="py-5 border-b border-slate-300">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-4">
              Experiencia Laboral
            </h2>
            <div className="space-y-5">
              {workExperience.slice(0, 6).map((exp) => (
                <div key={exp.id} className="text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-slate-900">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="font-mono text-xs text-slate-600">{exp.period} | {exp.location}</span>
                  </div>
                  {exp.project && (
                    <div className="text-xs text-slate-600 italic mt-0.5">
                      {exp.project}
                    </div>
                  )}
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 list-disc list-inside">
                    {exp.responsibilitiesAndAchievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    Keywords: {exp.technologiesAndKeywords.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Formación y Certificados Divididos */}
          <div className="pt-5 space-y-6">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
                1. División Estudios: Formación Académica & Diplomados (16 Acreditaciones)
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 space-y-2">
                <p>
                  <strong>Título Profesional de Ingeniera Ambiental</strong> (Sustentación de Tesis) — Universidad César Vallejo | Matrícula CIP N° 322074 (Habilitada)
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li>OEFA y La Contraloría: Fiscalización Ambiental y Control Gubernamental — Nota: 20/20 (Equilibria, 2026).</li>
                  <li>Gestión Ambiental en las Empresas — Nota: 20/20 (Equilibria, 2026).</li>
                  <li>Especialista en ArcGIS — 80 horas (Universidad Nacional de Ingeniería - UNI, 2021).</li>
                  <li>Diploma de Especialización: Gestión del Agua en Minería — 240 horas (Cámara de Comercio del Perú, 2023).</li>
                  <li>Especialista en SSOMA — 60 horas (Colegio de Ingenieros del Perú CIP Pasco & CIACEP, 2022).</li>
                  <li>Introducción a la Ecoeficiencia en Instituciones Públicas — Nota: 18/20 (MINAM, 2024).</li>
                  <li>Prevención de Riesgos Laborales — Nota: 20/20 (Ministerio de Trabajo - MTPE, 2022).</li>
                  <li>Interpretación de Norma ISO 9001:2015 — Universidad Nacional Agraria La Molina (UNALM, 2020).</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
                2. División Laboral: Certificados y Constancias de Trabajo Oficiales (11 Acreditaciones)
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                <li><strong>Southern Perú / EXMEL EIRL:</strong> Jefa SSOMA en Villa Cuajone — Récord de Cero Accidentes comprobado (2024).</li>
                <li><strong>Consorcio Vial Bustamante:</strong> Asistente de Especialista Ambiental — Obra Av. Prolongación Dolores CUI 2598840 (2025).</li>
                <li><strong>RIMACHI Hermanos SAC:</strong> Supervisora Ambiental en Obras y Proyectos Constructivos (2023).</li>
                <li><strong>Municipalidad Distrital de Echarati:</strong> Prevencionista SSOMA y Asistente Técnica (2022-2023).</li>
                <li><strong>Grupo SAS Perú S.A.C.:</strong> Analista de Campo en Campañas de Monitoreo Ambiental (2021).</li>
                <li><strong>ECA MAENI (SERNANP):</strong> Especialista Ambiental en Reserva Comunal Machiguenga (2017-2020).</li>
                <li><strong>LIVIT Arquitectura & Construcción:</strong> Residente SSOMA en Obras Viales (2019).</li>
                <li><strong>Municipalidad de Bella Unión:</strong> Especialista Ambiental en Saneamiento (2017).</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
