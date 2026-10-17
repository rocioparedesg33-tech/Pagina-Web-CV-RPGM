import React, { useState } from 'react';
import { useCvData } from '../context/CvDataContext';
import { EditableText } from './EditableText';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  CheckCircle2,
  Briefcase,
  Eye,
  Pencil,
  Trash2,
  Plus
} from 'lucide-react';

interface ExperienceSectionProps {
  onViewDocument?: (docId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onViewDocument }) => {
  const { 
    cvData, 
    isEditMode, 
    openEditor, 
    requestDelete, 
    deleteWorkExperience,
    updateWorkExperienceField,
    updateWorkExperienceResponsibility,
    addWorkExperienceResponsibility,
    deleteWorkExperienceResponsibility
  } = useCvData();

  const { workExperience } = cvData;
  const [selectedSector, setSelectedSector] = useState<string>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>('exp-bustamante');
  const [newRespTexts, setNewRespTexts] = useState<Record<string, string>>({});
  const [addingRespForId, setAddingRespForId] = useState<string | null>(null);

  const expToDocMap: Record<string, string> = {
    'exp-bustamante': 'doc-work-bustamante',
    'exp-exmel': 'doc-work-exmel',
    'exp-rimachi': 'doc-work-rimachi',
    'exp-echarati-2022': 'doc-work-echarati-2022',
    'exp-sas': 'doc-work-sas',
    'exp-machiguenga': 'doc-work-machiguenga',
    'exp-bella-union': 'doc-work-bella-union',
    'exp-yanaquihua': 'doc-work-yanaquihua',
    'exp-livit': 'doc-work-livit',
    'exp-echarati-2014': 'doc-work-echarati-2014',
    'exp-sernanp': 'doc-work-sernanp',
  };

  const sectors = [
    'Todos',
    'Minería',
    'Obras e Infraestructura',
    'Sector Público & ANP',
    'Consultoría & Laboratorio',
  ];

  const filteredExperiences = selectedSector === 'Todos'
    ? workExperience
    : workExperience.filter((item) => item.sector === selectedSector);

  const handleAddResp = (expId: string) => {
    const text = newRespTexts[expId];
    if (text && text.trim()) {
      addWorkExperienceResponsibility(expId, text.trim());
      setNewRespTexts(prev => ({ ...prev, [expId]: '' }));
      setAddingRespForId(null);
    }
  };

  return (
    <section id="experiencia" className="py-14 sm:py-18 bg-white border-b border-[#DCD5C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DFD3]">
          <div>
            <div className="w-16 h-[2px] bg-[#C5A25D] mb-3" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
              <Briefcase className="w-4 h-4 text-[#C5A25D]" />
              <span>Trayectoria Multisectorial Comprobada</span>
            </div>
            <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14213D] tracking-[0.04em]">
              Experiencia Laboral
            </h2>
            <p className="mt-2 text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed">
              Más de una década liderando la supervisión ambiental, gestión SSOMA y fiscalización en proyectos de minería, infraestructura vial, edificaciones y áreas naturales protegidas.
            </p>
          </div>

          {/* Interactive Sector Filter and Edit Action */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {isEditMode && (
              <button
                type="button"
                onClick={() => openEditor({ type: 'workExperience', isNew: true, data: {} })}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar Experiencia</span>
              </button>
            )}

            <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#F5F2EB] border border-[#DCD5C9] rounded-2xl">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                    selectedSector === sector
                      ? 'bg-[#14213D] text-[#C5A25D] shadow-xs'
                      : 'text-[#14213D] hover:bg-white'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="mt-8 space-y-4">
          {filteredExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-[#C5A25D] shadow-md ring-2 ring-[#C5A25D]/20'
                    : 'bg-[#F5F2EB]/40 hover:bg-white border-[#DCD5C9] shadow-2xs'
                }`}
              >
                {/* Header Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-[#2D5A34] uppercase tracking-wider text-[11px] bg-[#2D5A34]/10 px-2 py-0.5 rounded">
                        {exp.sector}
                      </span>
                      <span className="text-[#DCD5C9]">·</span>
                      <span className="text-slate-600 font-mono font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A25D]" />
                        <EditableText
                          value={exp.period}
                          onSave={(val) => updateWorkExperienceField(exp.id, 'period', val)}
                          isEditMode={isEditMode}
                          tag="span"
                          label="Periodo de Trabajo"
                        />
                      </span>
                      <span className="text-[#DCD5C9]">·</span>
                      <span className="text-slate-600 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A25D]" />
                        <EditableText
                          value={exp.location}
                          onSave={(val) => updateWorkExperienceField(exp.id, 'location', val)}
                          isEditMode={isEditMode}
                          tag="span"
                          label="Ubicación"
                        />
                      </span>
                    </div>

                    <EditableText
                      value={exp.role}
                      onSave={(val) => updateWorkExperienceField(exp.id, 'role', val)}
                      isEditMode={isEditMode}
                      tag="h3"
                      className="text-base sm:text-lg font-bold text-[#14213D] tracking-tight block"
                      label="Cargo Desempeñado"
                    />

                    <div className="text-xs sm:text-sm font-semibold text-[#C5A25D]">
                      <EditableText
                        value={exp.company}
                        onSave={(val) => updateWorkExperienceField(exp.id, 'company', val)}
                        isEditMode={isEditMode}
                        tag="span"
                        label="Empresa o Entidad"
                      />
                    </div>

                    {exp.project && (
                      <div className="text-xs text-slate-500 italic mt-0.5">
                        <EditableText
                          value={exp.project}
                          onSave={(val) => updateWorkExperienceField(exp.id, 'project', val)}
                          isEditMode={isEditMode}
                          tag="span"
                          label="Proyecto u Obra"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                    {isEditMode && (
                      <div className="flex items-center gap-1.5 mr-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => openEditor({ type: 'workExperience', isNew: false, id: exp.id, data: exp })}
                          className="px-2.5 py-1 text-xs font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded-lg flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
                          title="Modificar esta experiencia"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete(
                            'Eliminar Experiencia Laboral',
                            `${exp.role} en ${exp.company} (${exp.period})`,
                            () => deleteWorkExperience(exp.id)
                          )}
                          className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          title="Borrar esta experiencia"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Borrar</span>
                        </button>
                      </div>
                    )}

                    {exp.certificateRef && (
                      <span className="text-[11px] font-bold text-[#14213D] bg-white border border-[#C5A25D] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A34]" />
                        Acreditado
                      </span>
                    )}

                    <button
                      className="p-2 rounded-xl bg-white border border-[#DCD5C9] text-[#14213D] hover:bg-[#F5F2EB] transition-colors"
                      aria-label="Expandir detalles"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E5DFD3] space-y-4 animate-fadeIn">
                    
                    {exp.project && (
                      <div className="bg-[#F5F2EB] rounded-xl p-3.5 border border-[#DCD5C9] text-xs text-slate-700">
                        <span className="font-bold text-[#14213D] block mb-0.5 uppercase tracking-wider text-[10.5px]">
                          Proyecto / Obra:
                        </span>
                        <EditableText
                          value={exp.project}
                          onSave={(val) => updateWorkExperienceField(exp.id, 'project', val)}
                          isEditMode={isEditMode}
                          multiline={true}
                          rows={2}
                          tag="p"
                          label="Proyecto / Contexto"
                        />
                      </div>
                    )}

                    {/* Responsibilities & Real Achievements */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#14213D]">
                          Funciones & Logros Ejecutados:
                        </h4>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => setAddingRespForId(exp.id)}
                            className="text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Añadir Función</span>
                          </button>
                        )}
                      </div>

                      {/* Add new responsibility inline input */}
                      {isEditMode && addingRespForId === exp.id && (
                        <div className="mb-3 p-3 bg-[#F5F2EB] rounded-xl border border-[#C5A25D] space-y-2 animate-fadeIn text-xs">
                          <span className="font-bold text-[#14213D] block">Nueva Función o Logro:</span>
                          <textarea
                            rows={2}
                            value={newRespTexts[exp.id] || ''}
                            onChange={(e) => setNewRespTexts({ ...newRespTexts, [exp.id]: e.target.value })}
                            placeholder="Describe la responsabilidad o hito alcanzado..."
                            className="w-full p-2 bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#C5A25D]"
                          />
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setAddingRespForId(null)}
                              className="px-2.5 py-1 text-slate-600 hover:text-slate-800 font-bold"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddResp(exp.id)}
                              className="px-3 py-1 bg-[#14213D] text-[#C5A25D] font-bold rounded shadow-2xs"
                            >
                              Guardar Función
                            </button>
                          </div>
                        </div>
                      )}

                      <ul className="space-y-2">
                        {exp.responsibilitiesAndAchievements.map((item, idx) => (
                          <li key={idx} className="flex items-start justify-between gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed group/resp">
                            <div className="flex items-start gap-2.5 flex-1">
                              <CheckCircle2 className="w-4 h-4 text-[#2D5A34] shrink-0 mt-0.5" />
                              <EditableText
                                value={item}
                                onSave={(val) => updateWorkExperienceResponsibility(exp.id, idx, val)}
                                isEditMode={isEditMode}
                                multiline={true}
                                rows={2}
                                tag="span"
                                label={`Función #${idx + 1}`}
                              />
                            </div>
                            {isEditMode && (
                              <button
                                type="button"
                                onClick={() => requestDelete(
                                  'Eliminar Función de Trabajo',
                                  item,
                                  () => deleteWorkExperienceResponsibility(exp.id, idx)
                                )}
                                className="opacity-0 group-hover/resp:opacity-100 p-1 text-slate-400 hover:text-red-600 rounded transition-opacity cursor-pointer shrink-0"
                                title="Borrar función"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Keywords */}
                    <div className="pt-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                        Palabras Clave & Herramientas Aplicadas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologiesAndKeywords.map((tag, tIdx) => (
                          <span
                            key={tag + tIdx}
                            className="text-xs text-[#14213D] bg-[#F5F2EB] px-2.5 py-0.5 rounded-lg border border-[#DCD5C9] font-medium flex items-center gap-1 group/tag"
                          >
                            <span>{tag}</span>
                            {isEditMode && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = exp.technologiesAndKeywords.filter((_, i) => i !== tIdx);
                                  updateWorkExperienceField(exp.id, 'technologiesAndKeywords', updated);
                                }}
                                className="text-slate-400 hover:text-red-600 cursor-pointer ml-0.5"
                              >
                                ×
                              </button>
                            )}
                          </span>
                        ))}

                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => {
                              const tag = prompt('Nueva palabra clave o tecnología:');
                              if (tag && tag.trim()) {
                                updateWorkExperienceField(exp.id, 'technologiesAndKeywords', [...exp.technologiesAndKeywords, tag.trim()]);
                              }
                            }}
                            className="text-[10.5px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] px-2 py-0.5 rounded cursor-pointer transition-colors"
                          >
                            + Tag
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Certificate Anchor */}
                    {exp.certificateRef && (
                      <div className="pt-3 border-t border-[#E5DFD3] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                        <span>
                          <strong className="text-[#14213D]">Documento de Respaldo:</strong>{' '}
                          <EditableText
                            value={exp.certificateRef}
                            onSave={(val) => updateWorkExperienceField(exp.id, 'certificateRef', val)}
                            isEditMode={isEditMode}
                            tag="span"
                          />
                        </span>
                        
                        {expToDocMap[exp.id] && (
                          <button
                            type="button"
                            onClick={() => {
                              if (onViewDocument) {
                                onViewDocument(expToDocMap[exp.id]);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A25D] hover:text-[#14213D] bg-white border border-[#C5A25D] px-3 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#C5A25D]" />
                            <span>Ver Certificado Oficial (Ambas Caras)</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Experience Card for Edit Mode */}
          {isEditMode && (
            <button
              type="button"
              onClick={() => openEditor({ type: 'workExperience', isNew: true, data: {} })}
              className="w-full bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] border-2 border-dashed border-[#C5A25D] hover:border-[#14213D] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-2xs group min-h-[120px]"
            >
              <div className="w-10 h-10 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#14213D] group-hover:text-[#C5A25D] transition-colors">
                + Agregar Nueva Experiencia Laboral
              </span>
              <p className="mt-1 text-xs text-slate-500">
                Añade cargos en minería, carreteras, consultoría o entidades públicas.
              </p>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
