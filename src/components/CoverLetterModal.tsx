import React, { useState, useEffect } from 'react';
import { useCvData } from '../context/CvDataContext';
import { 
  X, 
  Copy, 
  Check, 
  Building2, 
  Truck, 
  Landmark,
  ShieldCheck,
  Sparkles,
  Pencil,
  RotateCcw
} from 'lucide-react';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { cvData, isEditMode } = useCvData();
  const { personal } = cvData;
  const [selectedTarget, setSelectedTarget] = useState<'mineria' | 'obras' | 'regulador'>('mineria');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [customLetters, setCustomLetters] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('rocio_cv_custom_letters');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentEditText, setCurrentEditText] = useState('');

  const defaultTemplates = {
    mineria: {
      sectorName: "Sector Gran Minería & Operaciones Metalúrgicas",
      subject: "Postulación: Jefatura / Especialista de SSOMA y Supervisión Ambiental",
      addressedTo: "Gerencia de Gestión del Talento y Operaciones Mineras",
      body: `Estimado Equipo de Selección y Dirección de Operaciones:

Por medio de la presente, presento formalmente mi postulación para integrarme a su equipo técnico como Especialista / Jefa de SSOMA y Supervisión Ambiental. Soy Ingeniera Ambiental Colegiada (CIP N° 322074) con más de 10 años de experiencia profesional en campo y supervisión operativa, destacando mi labor en operaciones mineras como Southern Perú Copper Corporation (Unidad Villa Cuajone) a través de EXMEL EIRL, donde mantuve un récord impecable de CERO accidentes e incidentes incapacitantes.

Cuento con un Diploma de Especialización en Gestión del Agua en Minería (240 horas lectivas acreditadas), dominio integral del D.S. 024-2016-EM, elaboración de planes de manejo ambiental y control de condiciones seguras en terreno.

Adicionalmente, aporto valor mediante mi formación en curso: Especialidad en Programación a través de la Inteligencia Artificial Aplicada al Medio Ambiente (Python para geoprocesamiento geoespacial y ArcGIS), lo que me permite optimizar el análisis de bases de datos ambientales y el monitoreo de parámetros físico-químicos en campo.

Poseo habilidades interpersonales sólidas para liderar equipos técnicos con empatía, comunicación asertiva y resolución de conflictos. Cuento con total disponibilidad inmediata para trabajo bajo régimen minero en campamento y zonas remotas a nivel nacional.

Agradezco de antemano la atención a mi postulación y quedo a su disposición para coordinar una entrevista.

Atentamente,

Ing. Rocío Milagros Paredes Gamarra
CIP N° 322074 | Cel: ${personal.phone}
Email: ${personal.email} | ${personal.location}`,
    },

    obras: {
      sectorName: "Sector Obras Viales, Construcción e Infraestructura",
      subject: "Postulación: Especialista Ambiental / Supervisora SSOMA en Obras Civiles y Viales",
      addressedTo: "Comité de Selección y Gerencia de Infraestructura",
      body: `Estimados Señores del Comité Técnico de Selección:

Me dirijo a ustedes con el propósito de poner a su disposición mi perfil profesional como Ingeniera Ambiental Colegiada (CIP N° 322074), con más de 10 años supervisando Instrumentos de Gestión Ambiental (IGA), planes de manejo ambiental y requerimientos de seguridad en obras viales y civiles.

Recientemente me desempeñé como Asistente de Especialista Ambiental en el Consorcio Vial Bustamante (Obra: Mejoramiento de Movilidad Urbana Av. Dolores - Caracas, CUI N° 2598840) y anteriormente en constructoras como Rimachi Hermanos SAC y LIVIT (Metrópoli 054), garantizando el cumplimiento de compromisos ambientales, capacitación diaria a cuadrillas de trabajadores y CERO sanciones en inspecciones de SUNAFIL.

Asimismo, cuento con certificación como Especialista en ArcGIS por la Universidad Nacional de Ingeniería (UNI) y actualmente curso una Especialidad en Programación e Inteligencia Artificial aplicada al Medio Ambiente, fortaleciendo la gestión de bases de datos cartográficas y expedientes técnicos de obra.

Cuento con disponibilidad inmediata para desplazarme a cualquier punto del territorio nacional.

Atentamente,

Ing. Rocío Milagros Paredes Gamarra
CIP N° 322074 | Cel: ${personal.phone}
Email: ${personal.email} | ${personal.location}`,
    },

    regulador: {
      sectorName: "Organismos Reguladores & Sector Público (OEFA / MINAM / SERNANP)",
      subject: "Postulación: Especialista en Fiscalización Ambiental y Gestión Pública",
      addressedTo: "Dirección de Supervisión Ambiental y Fiscalización",
      body: `Estimada Comisión Evaluadora:

Tengo el agrado de presentar mi postulación para integrarme a su equipo técnico. Soy Ingeniera Ambiental Colegiada (CIP N° 322074) con más de una década de experiencia gestionando programas ambientales en Áreas Naturales Protegidas (ECA MAENI - Reserva Comunal Machiguenga, SERNANP) y municipalidades distritales.

Poseo formación especializada con calificación sobresaliente de 20/20 en "OEFA y la Contraloría: Fiscalización Ambiental y Control Gubernamental en la Gestión Pública", así como en "Ecoeficiencia en Instituciones Públicas" (calificación 18/20 por el MINAM bajo el D.S. 016-2021-MINAM) y preparación en brigadas ante emergencias y riesgos de desastres.

Mi perfil se enriquece con mi especialización en curso en Programación e Inteligencia Artificial aplicada al Medio Ambiente, herramienta que aplico para el procesamiento técnico de datos geoespaciales y control de parámetros ambientales.

Quedo a su disposición para aportar mi rigor técnico, solvencia ética e integridad profesional a los objetivos de su institución.

Atentamente,

Ing. Rocío Milagros Paredes Gamarra
CIP N° 322074 | Cel: ${personal.phone}
Email: ${personal.email} | ${personal.location}`,
    },
  };

  const activeBody = customLetters[selectedTarget] || defaultTemplates[selectedTarget].body;

  useEffect(() => {
    setCurrentEditText(activeBody);
    setIsEditing(false);
  }, [selectedTarget, activeBody]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveCustom = () => {
    const updated = { ...customLetters, [selectedTarget]: currentEditText };
    setCustomLetters(updated);
    try {
      localStorage.setItem('rocio_cv_custom_letters', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    const updated = { ...customLetters };
    delete updated[selectedTarget];
    setCustomLetters(updated);
    try {
      localStorage.setItem('rocio_cv_custom_letters', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setCurrentEditText(defaultTemplates[selectedTarget].body);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-[#DCD5C9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="p-5 border-b border-[#E5DFD3] flex items-center justify-between bg-[#F5F2EB]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#14213D] text-[#C5A25D] shadow-xs">
              <Sparkles className="w-5 h-5 text-[#C5A25D]" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold uppercase tracking-wider text-[#14213D]">
                Carta de Presentación Ejecutiva
              </h3>
              <p className="text-xs text-slate-600">
                Adaptable y 100% editable para cualquier convocatoria
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Sector Switcher */}
        <div className="p-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTarget('mineria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                selectedTarget === 'mineria'
                  ? 'bg-[#0D1B2A] text-white font-bold shadow-xs'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Minería (Southern Perú / Exmel)</span>
            </button>

            <button
              onClick={() => setSelectedTarget('obras')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                selectedTarget === 'obras'
                  ? 'bg-[#0D1B2A] text-white font-bold shadow-xs'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Obras Viales & Construcción</span>
            </button>

            <button
              onClick={() => setSelectedTarget('regulador')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                selectedTarget === 'regulador'
                  ? 'bg-[#0D1B2A] text-white font-bold shadow-xs'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>OEFA / MINAM / Sector Público</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-2.5 py-1 text-xs font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Editar Carta</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-2 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 cursor-pointer"
                  title="Restablecer plantilla original"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-2.5 py-1 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-lg shadow-2xs cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Letter Text Preview Area */}
        <div className="p-6 overflow-y-auto font-sans text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 bg-slate-50 flex-1">
          <div className="text-xs text-[#1B263B] font-mono font-bold pb-2 border-b border-slate-200">
            {defaultTemplates[selectedTarget].subject}
          </div>

          {isEditing ? (
            <textarea
              rows={14}
              value={currentEditText}
              onChange={(e) => setCurrentEditText(e.target.value)}
              className="w-full p-4 text-xs sm:text-sm font-sans bg-white text-slate-900 border-2 border-[#C5A25D] rounded-2xl shadow-inner focus:outline-none leading-relaxed"
            />
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-xs sm:text-sm">
              {activeBody}
            </pre>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#2D5A34] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#2D5A34]" />
            <span>Alineada con CIP N° 322074</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0D1B2A] hover:bg-[#1B263B] shadow-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#D4CAA8]" /> : <Copy className="w-4 h-4 text-[#D4CAA8]" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Carta'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
