import React, { useState } from 'react';
import { useCvData } from '../context/CvDataContext';
import { EditableText } from './EditableText';
import { 
  Cpu, 
  Scale, 
  TestTubes, 
  Database, 
  Search, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Trash2,
  Plus,
  Pencil
} from 'lucide-react';

export const SkillsGrid: React.FC = () => {
  const { 
    cvData, 
    isEditMode, 
    saveTechnicalSkill, 
    updateTechnicalSkill,
    deleteTechnicalSkill, 
    updateTechnicalCategoryField,
    addTechnicalCategory,
    deleteTechnicalCategory,
    requestDelete 
  } = useCvData();

  const { technicalSkillsCategories } = cvData;
  const [searchQuery, setSearchQuery] = useState('');
  const [addingToCategory, setAddingToCategory] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const icons = [Cpu, Scale, TestTubes, Database];

  const handleAddSkill = (categoryName: string) => {
    if (!newSkillName.trim()) return;
    saveTechnicalSkill(categoryName, {
      name: newSkillName.trim(),
      level: newSkillLevel.trim() || 'Avanzado',
      isAtsKeyword: true,
    });
    setNewSkillName('');
    setNewSkillLevel('');
    setAddingToCategory(null);
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    addTechnicalCategory({
      name: newCategoryName.trim(),
      description: newCategoryDesc.trim() || 'Competencias y herramientas técnicas clave.',
      skills: []
    });
    setNewCategoryName('');
    setNewCategoryDesc('');
    setIsAddingNewCategory(false);
  };

  return (
    <section id="habilidades-tecnicas" className="py-14 sm:py-18 bg-[#F5F2EB] border-b border-[#DCD5C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD3]">
          <div>
            <div className="w-16 h-[2px] bg-[#C5A25D] mb-3" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
              <Layers className="w-4 h-4 text-[#C5A25D]" />
              <span>Competencias Técnicas Verificables</span>
            </div>
            <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14213D] tracking-[0.04em]">
              Habilidades Técnicas Clave
            </h2>
            <p className="mt-2 text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed">
              Dominio comprobado en normativas ambientales y de seguridad, manejo avanzado de SIG geoespacial, gestión de instrumentos IGA y especialización en programación con IA.
            </p>
          </div>

          {/* Search bar & Add Category */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start md:self-end">
            {isEditMode && (
              <button
                type="button"
                onClick={() => setIsAddingNewCategory(true)}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nueva Categoría</span>
              </button>
            )}

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#C5A25D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar habilidad o normativa..."
                className="w-full bg-white border border-[#DCD5C9] rounded-xl pl-9 pr-4 py-2 text-xs text-[#14213D] placeholder-slate-400 focus:outline-none focus:border-[#C5A25D] transition-colors shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Modal/Form to Add New Category */}
        {isEditMode && isAddingNewCategory && (
          <div className="mt-6 p-4 bg-white border-2 border-[#C5A25D] rounded-2xl shadow-md space-y-3 animate-fadeIn text-xs">
            <h4 className="font-bold text-sm text-[#14213D]">Crear Nueva Categoría de Habilidades Técnicas:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nombre de la Categoría (ej: Automatización & Sensores)"
                className="px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
              />
              <input
                type="text"
                value={newCategoryDesc}
                onChange={(e) => setNewCategoryDesc(e.target.value)}
                placeholder="Descripción breve del área..."
                className="px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNewCategory(false)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateCategory}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-lg shadow-xs"
              >
                Crear Categoría
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {technicalSkillsCategories.map((category, idx) => {
            const Icon = icons[idx % icons.length];
            
            const filteredSkills = searchQuery.trim() === ''
              ? category.skills
              : category.skills.filter((s) =>
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.level.toLowerCase().includes(searchQuery.toLowerCase())
                );

            if (searchQuery.trim() !== '' && filteredSkills.length === 0) {
              return null;
            }

            return (
              <div
                key={category.name + idx}
                className="bg-white border border-[#DCD5C9] hover:border-[#C5A25D] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E5DFD3]">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2.5 rounded-xl bg-[#14213D] text-[#C5A25D] shrink-0 shadow-xs">
                        <Icon className="w-5 h-5 text-[#C5A25D]" />
                      </div>
                      <div className="flex-1">
                        <EditableText
                          value={category.name}
                          onSave={(val) => updateTechnicalCategoryField(idx, 'name', val)}
                          isEditMode={isEditMode}
                          tag="h3"
                          className="text-base font-bold text-[#14213D] tracking-tight block"
                          label="Nombre de Categoría"
                        />
                        <EditableText
                          value={category.description}
                          onSave={(val) => updateTechnicalCategoryField(idx, 'description', val)}
                          isEditMode={isEditMode}
                          multiline={true}
                          rows={2}
                          tag="p"
                          className="text-xs text-slate-600 mt-0.5 leading-relaxed block"
                          label="Descripción de Categoría"
                        />
                      </div>
                    </div>

                    {isEditMode && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setAddingToCategory(addingToCategory === category.name ? null : category.name)}
                          className="px-2.5 py-1 text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Habilidad</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete(
                            'Eliminar Categoría Técnica',
                            category.name,
                            () => deleteTechnicalCategory(idx)
                          )}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                          title="Borrar categoría entera"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Add skill inline form in edit mode */}
                  {isEditMode && addingToCategory === category.name && (
                    <div className="mt-3 p-3 bg-[#F5F2EB] rounded-xl border border-[#C5A25D] space-y-2 animate-fadeIn text-xs">
                      <span className="font-bold text-[#14213D] block">Nueva Habilidad en {category.name}:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          placeholder="Nombre (ej. ArcGIS Pro)"
                          className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#C5A25D]"
                        />
                        <input
                          type="text"
                          value={newSkillLevel}
                          onChange={(e) => setNewSkillLevel(e.target.value)}
                          placeholder="Nivel (ej. Avanzado)"
                          className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#C5A25D]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setAddingToCategory(null)}
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-800"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSkill(category.name)}
                          className="px-3 py-1 text-[11px] font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-lg shadow-2xs"
                        >
                          Guardar Habilidad
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-3.5 space-y-2">
                    {filteredSkills.map((skill, sIdx) => (
                      <div
                        key={skill.name + sIdx}
                        className="p-2.5 rounded-xl bg-[#F5F2EB]/50 border border-[#DCD5C9] flex flex-col sm:flex-row sm:items-center justify-between gap-1 group/skill"
                      >
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A25D]" />
                          <EditableText
                            value={skill.name}
                            onSave={(val) => updateTechnicalSkill(category.name, sIdx, { ...skill, name: val })}
                            isEditMode={isEditMode}
                            tag="span"
                            className="font-semibold text-xs text-[#14213D]"
                          />
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <EditableText
                            value={skill.level}
                            onSave={(val) => updateTechnicalSkill(category.name, sIdx, { ...skill, level: val })}
                            isEditMode={isEditMode}
                            tag="span"
                            className="text-[11px] font-mono text-[#14213D] bg-white px-2 py-0.5 rounded border border-[#DCD5C9] shadow-2xs font-medium"
                          />
                          {isEditMode && (
                            <button
                              type="button"
                              onClick={() => requestDelete(
                                'Eliminar Habilidad Técnica',
                                `${skill.name} de ${category.name}`,
                                () => deleteTechnicalSkill(category.name, skill.name)
                              )}
                              className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                              title="Borrar habilidad"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DFD3] flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-[#2D5A34] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A34]" />
                    <span>Con respaldo en certificados</span>
                  </span>
                  <span className="text-[#C5A25D] font-mono text-[11px] font-bold">
                    ATS Indexado
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
