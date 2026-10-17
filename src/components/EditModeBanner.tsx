import React, { useState, useRef } from 'react';
import { useCvData } from '../context/CvDataContext';
import { 
  Pencil, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  HeartHandshake, 
  Check, 
  X,
  Lock
} from 'lucide-react';

export const EditModeBanner: React.FC = () => {
  const { 
    isEditMode, 
    setIsEditMode, 
    toggleEditMode,
    hasCustomChanges, 
    resetToDefaults, 
    exportDataJson, 
    importDataJson,
    openEditor,
    cvData,
    requestDelete
  } = useCvData();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataJson(content);
        if (success) {
          setImportStatus('¡Datos importados con éxito!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Error: El formato del archivo JSON no es válido.');
          setTimeout(() => setImportStatus(null), 4000);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    requestDelete(
      'Restablecer contenido original',
      'Se borrarán las modificaciones manuales y se restaurarán los textos, experiencias y certificaciones originales de Rocío Paredes.',
      () => {
        resetToDefaults();
      }
    );
  };

  if (!isEditMode) {
    return (
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button
          onClick={() => setIsEditMode(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14213D] text-[#C5A25D] hover:bg-[#1E335C] border-2 border-[#C5A25D] shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-xs sm:text-sm cursor-pointer hover:scale-105 active:scale-95 group"
          title="Activar Modo Edición para modificar cada letra o sección"
        >
          <Pencil className="w-4 h-4 text-[#C5A25D] group-hover:rotate-12 transition-transform" />
          <span>Editar Página</span>
          {hasCustomChanges && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Tienes cambios guardados" />
          )}
        </button>
      </div>
    );
  }

  return (
    <>
      <aside 
        aria-label="Panel de Edición" 
        className="sticky top-16 z-40 bg-[#0D1B2A] text-white border-b-2 border-[#C5A25D] shadow-lg no-print transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Edit Mode Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-[#C5A25D]">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span>Modo Edición Activo</span>
            </div>

            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

            <span className="hidden lg:inline text-slate-300 text-[11px]">
              · Haz clic en cualquier texto o certificado para modificarlo
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Quick Add Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar</span>
              </button>

              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-fadeIn"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => openEditor({ type: 'workExperience', isNew: true, data: {} })}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 text-xs font-semibold"
                  >
                    <Briefcase className="w-4 h-4 text-[#C5A25D]" />
                    <span>Nueva Experiencia Laboral</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditor({ type: 'officialDocument', isNew: true, data: {} })}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 text-xs font-semibold"
                  >
                    <GraduationCap className="w-4 h-4 text-[#C5A25D]" />
                    <span>Nuevo Certificado / Diploma</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditor({ type: 'achievement', isNew: true, data: {} })}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 text-xs font-semibold"
                  >
                    <Award className="w-4 h-4 text-[#C5A25D]" />
                    <span>Nuevo Logro Cuantificable</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditor({ type: 'softSkill', isNew: true, data: {} })}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 text-xs font-semibold"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#C5A25D]" />
                    <span>Nueva Habilidad Blanda</span>
                  </button>
                </div>
              )}
            </div>

            {/* Edit Personal Data */}
            <button
              type="button"
              onClick={() => openEditor({ type: 'personal', data: cvData.personal })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              title="Modificar Nombre, Título, CIP, Teléfono, Correo, etc."
            >
              <User className="w-3.5 h-3.5 text-[#C5A25D]" />
              <span className="hidden sm:inline">Datos Personales</span>
            </button>

            {/* Export JSON Backup */}
            <button
              type="button"
              onClick={exportDataJson}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              title="Descargar copia de seguridad en JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A25D]" />
              <span className="hidden sm:inline">Respaldo</span>
            </button>

            {/* Import JSON Backup */}
            <label 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              title="Cargar copia de seguridad en JSON"
            >
              <Upload className="w-3.5 h-3.5 text-[#C5A25D]" />
              <span className="hidden sm:inline">Importar</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>

            {/* Reset to Factory Defaults */}
            {hasCustomChanges && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-500/40 font-medium transition-colors cursor-pointer"
                title="Restablecer contenido original del CV"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            )}

            <div className="h-4 w-[1px] bg-white/20" />

            {/* Close / Lock Edit Mode */}
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors cursor-pointer shadow-xs"
              title="Guardar y bloquear modo edición"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear / Salir</span>
            </button>
          </div>
        </div>

        {importStatus && (
          <div className="bg-[#1E335C] px-4 py-1.5 text-center text-xs text-[#C5A25D] font-semibold border-t border-[#C5A25D]/30">
            {importStatus}
          </div>
        )}
      </aside>
    </>
  );
};
