import React from 'react';
import { useCvData } from '../context/CvDataContext';
import { EditableText } from './EditableText';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Award, 
  Clock, 
  Layers, 
  GraduationCap,
  Pencil,
  Trash2,
  Plus
} from 'lucide-react';

export const QuantifiedMetrics: React.FC = () => {
  const { cvData, isEditMode, openEditor, requestDelete, deleteAchievement, updateAchievementField } = useCvData();
  const { quantifiedAchievements } = cvData;

  const icons = [ShieldAlert, CheckCircle2, GraduationCap, Award, Layers, Clock];

  return (
    <section id="logros" className="py-14 sm:py-18 bg-[#F5F2EB] border-b border-[#DCD5C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Amelia Foster touches */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="max-w-3xl">
            <div className="w-16 h-[2px] bg-[#C5A25D] mb-3" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
              <span>Datos Reales y Verificables</span>
              <span className="text-[#DCD5C9]">·</span>
              <span>Rendimiento Técnico Demostrable</span>
            </div>
            <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14213D] tracking-[0.04em]">
              Logros Reales & Desempeño Cuantificable
            </h2>
            <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
              Resultados fácticos respaldados en certificados de trabajo y acreditaciones oficiales que garantizan solvencia técnica, cumplimiento regulatorio y seguridad operacional.
            </p>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={() => openEditor({ type: 'achievement', isNew: true, data: {} })}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start md:self-end whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>+ Agregar Logro</span>
            </button>
          )}
        </div>

        {/* Real Metrics Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quantifiedAchievements.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={item.title + index}
                className="bg-white border border-[#DCD5C9] hover:border-[#C5A25D] rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  {/* Edit Controls if isEditMode */}
                  {isEditMode && (
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5DFD3] text-xs">
                      <span className="font-mono text-[10px] text-[#C5A25D] font-bold">Modo Edición</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditor({ type: 'achievement', isNew: false, index, data: item })}
                          className="px-2 py-0.5 text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          title="Modificar este logro"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete(
                            'Eliminar Logro Cuantificable',
                            `${item.metric} — ${item.title}`,
                            () => deleteAchievement(index)
                          )}
                          className="px-2 py-0.5 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded flex items-center gap-1 cursor-pointer transition-colors"
                          title="Borrar este logro"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Borrar</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <EditableText
                        value={item.metric}
                        onSave={(val) => updateAchievementField(index, 'metric', val)}
                        isEditMode={isEditMode}
                        tag="span"
                        className="text-2xl sm:text-3xl font-extrabold text-[#14213D] font-mono tracking-tight block group-hover:text-[#C5A25D] transition-colors"
                        label="Métrica (Número/Valor)"
                      />
                      <EditableText
                        value={item.context}
                        onSave={(val) => updateAchievementField(index, 'context', val)}
                        isEditMode={isEditMode}
                        tag="span"
                        className="text-[11px] font-bold text-[#2D5A34] uppercase tracking-wider mt-1 block"
                        label="Contexto de la métrica"
                      />
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#14213D] text-[#C5A25D] group-hover:bg-[#C5A25D] group-hover:text-[#14213D] transition-colors shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <EditableText
                    value={item.title}
                    onSave={(val) => updateAchievementField(index, 'title', val)}
                    isEditMode={isEditMode}
                    tag="h3"
                    className="mt-4 text-sm sm:text-base font-bold text-[#14213D] block"
                    label="Título del logro"
                  />
                  
                  <EditableText
                    value={item.description}
                    onSave={(val) => updateAchievementField(index, 'description', val)}
                    isEditMode={isEditMode}
                    multiline={true}
                    rows={3}
                    tag="p"
                    className="mt-2 text-xs text-slate-600 leading-relaxed block"
                    label="Descripción detallada"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DFD3] flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A34]" />
                  <span>Dato fáctico respaldado documentalmente</span>
                </div>
              </div>
            );
          })}

          {/* Add Achievement Card in Edit Mode */}
          {isEditMode && (
            <button
              type="button"
              onClick={() => openEditor({ type: 'achievement', isNew: true, data: {} })}
              className="bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] border-2 border-dashed border-[#C5A25D] hover:border-[#14213D] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-2xs group min-h-[180px]"
            >
              <div className="w-10 h-10 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#14213D] group-hover:text-[#C5A25D] transition-colors">
                + Agregar Nuevo Logro Cuantificable
              </span>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Añade indicadores de horas, calificaciones, accidentabilidad o cumplimiento.
              </p>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
