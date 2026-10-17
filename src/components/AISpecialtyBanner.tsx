import React, { useState } from 'react';
import { useCvData } from '../context/CvDataContext';
import { EditableText } from './EditableText';
import { 
  Sparkles, 
  Terminal, 
  Satellite, 
  Layers, 
  Code2, 
  CheckCircle,
  Database,
  BrainCircuit,
  Pencil,
  Trash2,
  Plus
} from 'lucide-react';

export const AISpecialtyBanner: React.FC = () => {
  const { 
    cvData, 
    isEditMode, 
    openEditor,
    updateAISpecialtyField,
    updateAISpecialtyPillar,
    addAISpecialtyPillar,
    deleteAISpecialtyPillar,
    requestDelete
  } = useCvData();

  const { aiEnvironmentalSpecialty } = cvData;
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);

  const icons = [Terminal, Database, Satellite];

  const handleAddToolToPillar = (pillarIndex: number, toolName: string) => {
    if (!toolName.trim()) return;
    const currentTools = aiEnvironmentalSpecialty.pillars[pillarIndex]?.tools || [];
    updateAISpecialtyPillar(pillarIndex, 'tools', [...currentTools, toolName.trim()]);
  };

  const handleDeleteTool = (pillarIndex: number, toolIndex: number) => {
    const currentTools = aiEnvironmentalSpecialty.pillars[pillarIndex]?.tools || [];
    updateAISpecialtyPillar(
      pillarIndex, 
      'tools', 
      currentTools.filter((_, idx) => idx !== toolIndex)
    );
  };

  const handleAddNewPillar = () => {
    addAISpecialtyPillar({
      title: 'Nuevo Pilar Tecnológico en IA',
      detail: 'Detalle de la aplicación de programación y algoritmos de IA en gestión y fiscalización ambiental.',
      tools: ['Python', 'IA Ambiental', 'Reportes']
    });
  };

  return (
    <section id="especialidad-ia" className="py-14 sm:py-18 relative overflow-hidden bg-white border-b border-[#DCD5C9]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD3]">
          <div className="flex-1">
            <div className="w-16 h-[2px] bg-[#C5A25D] mb-3" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D] mb-2">
              <BrainCircuit className="w-4 h-4 text-[#C5A25D]" />
              <span>Vanguardia Tecnológica & Ciencias Ambientales</span>
            </div>
            
            <EditableText
              value={aiEnvironmentalSpecialty.title}
              onSave={(val) => updateAISpecialtyField('title', val)}
              isEditMode={isEditMode}
              tag="h2"
              className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14213D] tracking-[0.04em] block"
              label="Título de la Especialidad"
            />
            
            <EditableText
              value={aiEnvironmentalSpecialty.description}
              onSave={(val) => updateAISpecialtyField('description', val)}
              isEditMode={isEditMode}
              multiline={true}
              rows={2}
              tag="p"
              className="mt-2 text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed block"
              label="Descripción de la Especialidad"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end shrink-0">
            {isEditMode && (
              <button
                type="button"
                onClick={() => openEditor({ type: 'aiSpecialty', data: aiEnvironmentalSpecialty })}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Editar Especialidad Completa</span>
              </button>
            )}

            <div className="flex items-center gap-3 bg-[#F5F2EB] border border-[#DCD5C9] rounded-2xl p-3.5 text-xs shadow-2xs">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2D5A34] animate-pulse" />
              <div>
                <span className="font-bold text-[#14213D] block uppercase tracking-wider text-[10px]">Estado Actual</span>
                <EditableText
                  value={aiEnvironmentalSpecialty.status}
                  onSave={(val) => updateAISpecialtyField('status', val)}
                  isEditMode={isEditMode}
                  tag="span"
                  className="text-[#C5A25D] font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiEnvironmentalSpecialty.pillars.map((pillar, index) => {
            const Icon = icons[index % icons.length];
            const isSelected = selectedPillarIndex === index;

            return (
              <div
                key={pillar.title + index}
                onClick={() => setSelectedPillarIndex(index)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#C5A25D] shadow-md ring-2 ring-[#C5A25D]/20'
                    : 'bg-[#F5F2EB]/50 hover:bg-white border-[#DCD5C9] hover:border-[#C5A25D]/60 shadow-2xs'
                }`}
              >
                <div>
                  {/* Delete pillar in edit mode */}
                  {isEditMode && (
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DFD3] text-xs">
                      <span className="text-[10px] font-mono font-bold text-[#C5A25D]">Pilar #{index + 1}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          requestDelete(
                            'Eliminar Pilar de Especialidad',
                            pillar.title,
                            () => deleteAISpecialtyPillar(index)
                          );
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                        title="Borrar pilar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#14213D] text-[#C5A25D] shrink-0 shadow-xs">
                      <Icon className="w-5 h-5 text-[#C5A25D]" />
                    </div>
                    <EditableText
                      value={pillar.title}
                      onSave={(val) => updateAISpecialtyPillar(index, 'title', val)}
                      isEditMode={isEditMode}
                      tag="h3"
                      className="text-sm sm:text-base font-bold text-[#14213D] tracking-tight leading-snug flex-1 block"
                      label="Título del Pilar"
                    />
                  </div>

                  <EditableText
                    value={pillar.detail}
                    onSave={(val) => updateAISpecialtyPillar(index, 'detail', val)}
                    isEditMode={isEditMode}
                    multiline={true}
                    rows={3}
                    tag="p"
                    className="text-xs text-slate-600 leading-relaxed mt-2 block"
                    label="Detalle del Pilar"
                  />
                </div>

                <div className="mt-5 pt-3 border-t border-[#E5DFD3]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {pillar.tools.map((tool, tIdx) => (
                      <span
                        key={tool + tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#14213D] border border-[#DCD5C9] shadow-2xs font-semibold flex items-center gap-1 group/tool"
                      >
                        <span>{tool}</span>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTool(index, tIdx);
                            }}
                            className="text-slate-400 hover:text-red-600 ml-0.5 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}

                    {isEditMode && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const tool = prompt('Nombre de la nueva herramienta o tecnología:');
                          if (tool) handleAddToolToPillar(index, tool);
                        }}
                        className="text-[10.5px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        + Herramienta
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Pillar in Edit Mode */}
        {isEditMode && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleAddNewPillar}
              className="px-4 py-2 text-xs font-bold text-[#14213D] bg-[#F5F2EB] hover:bg-[#EAE4D8] border border-[#C5A25D] rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#C5A25D]" />
              <span>+ Agregar Nuevo Pilar de Especialidad IA</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
