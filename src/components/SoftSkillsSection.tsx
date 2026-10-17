import React from 'react';
import { useCvData } from '../context/CvDataContext';
import { EditableText } from './EditableText';
import { 
  Users, 
  MessageSquare, 
  HeartHandshake, 
  Ear, 
  Compass, 
  Flame, 
  Scale, 
  FileText, 
  Sparkles,
  ShieldCheck,
  Brain,
  Pencil,
  Trash2,
  Plus
} from 'lucide-react';

export const SoftSkillsSection: React.FC = () => {
  const { cvData, isEditMode, openEditor, requestDelete, deleteSoftSkill, updateSoftSkillField } = useCvData();
  const { softSkills } = cvData;

  // Icon mapping for each soft skill
  const iconMap: { [key: string]: React.ElementType } = {
    'Liderazgo de Equipos Técnicos': Users,
    'Trabajo en Equipo': HeartHandshake,
    'Comunicación Asertiva': MessageSquare,
    'Escucha Activa': Ear,
    'Empatía': Compass,
    'Resolución de Conflictos': Scale,
    'Adaptabilidad y Flexibilidad': Compass,
    'Inteligencia Emocional': Brain,
    'Gestión Documentaria Regulatoria': FileText,
    'Ejecución Bajo Presión': Flame,
  };

  return (
    <section id="habilidades-blandas" className="py-14 sm:py-18 bg-[#F5F2EB] border-b border-[#DCD5C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="max-w-3xl">
            <div className="w-16 h-[2px] bg-[#C5A25D] mb-3" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
              <HeartHandshake className="w-4 h-4 text-[#C5A25D]" />
              <span>Competencias Interpersonales & Liderazgo Estratégico</span>
            </div>
            <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14213D] tracking-[0.04em]">
              Habilidades Blandas & Gestión de Personas
            </h2>
            <p className="mt-2 text-slate-700 text-sm sm:text-base leading-relaxed">
              Habilidades humanas y de liderazgo estratégico demostradas en campo: concertación con comunidades, conducción de cuadrillas bajo estándares de minería y ejecución rigurosa bajo presión.
            </p>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={() => openEditor({ type: 'softSkill', isNew: true, data: {} })}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start md:self-end whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>+ Agregar Habilidad</span>
            </button>
          )}
        </div>

        {/* Soft Skills Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {softSkills.map((skill, index) => {
            const Icon = iconMap[skill.name] || Users;

            return (
              <div
                key={skill.name + index}
                className="bg-white border border-[#DCD5C9] hover:border-[#C5A25D] rounded-2xl p-5.5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Edit Controls if isEditMode */}
                  {isEditMode && (
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5DFD3] text-xs">
                      <span className="font-mono text-[10px] text-[#C5A25D] font-bold">Modo Edición</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditor({ type: 'softSkill', isNew: false, index, data: skill })}
                          className="px-2 py-0.5 text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          title="Modificar esta habilidad"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete(
                            'Eliminar Habilidad Blanda',
                            skill.name,
                            () => deleteSoftSkill(index)
                          )}
                          className="px-2 py-0.5 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded flex items-center gap-1 cursor-pointer transition-colors"
                          title="Borrar esta habilidad"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Borrar</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#14213D] text-[#C5A25D] group-hover:bg-[#C5A25D] group-hover:text-[#14213D] transition-colors shrink-0 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <EditableText
                      value={skill.name}
                      onSave={(val) => updateSoftSkillField(index, 'name', val)}
                      isEditMode={isEditMode}
                      tag="h3"
                      className="text-sm sm:text-base font-bold text-[#14213D] tracking-tight group-hover:text-[#C5A25D] transition-colors flex-1 block"
                      label="Nombre de la Habilidad"
                    />
                  </div>

                  <EditableText
                    value={skill.definition}
                    onSave={(val) => updateSoftSkillField(index, 'definition', val)}
                    isEditMode={isEditMode}
                    multiline={true}
                    rows={2}
                    tag="p"
                    className="text-xs text-slate-600 leading-relaxed block"
                    label="Definición"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DFD3]">
                  <span className="text-[10.5px] font-bold text-[#2D5A34] uppercase tracking-wider block mb-1">
                    Aplicación Real en Terreno:
                  </span>
                  <div className="text-xs text-slate-700 italic leading-snug pl-3 border-l-2 border-[#C5A25D] bg-[#F5F2EB]/50 py-1.5 rounded-r">
                    <EditableText
                      value={skill.application}
                      onSave={(val) => updateSoftSkillField(index, 'application', val)}
                      isEditMode={isEditMode}
                      multiline={true}
                      rows={2}
                      tag="span"
                      label="Aplicación en Terreno"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Soft Skill Card in Edit Mode */}
          {isEditMode && (
            <button
              type="button"
              onClick={() => openEditor({ type: 'softSkill', isNew: true, data: {} })}
              className="bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] border-2 border-dashed border-[#C5A25D] hover:border-[#14213D] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-2xs group min-h-[180px]"
            >
              <div className="w-10 h-10 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#14213D] group-hover:text-[#C5A25D] transition-colors">
                + Agregar Nueva Habilidad Blanda
              </span>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Añade competencias como liderazgo, mediación, trabajo en equipo o empatía.
              </p>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
