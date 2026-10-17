import React, { useState, useEffect } from 'react';
import { useCvData } from '../context/CvDataContext';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  User, 
  Sparkles, 
  FileText, 
  Award, 
  HeartHandshake,
  CheckCircle2,
  Calendar,
  MapPin,
  Building
} from 'lucide-react';
import { WorkExperience, SoftSkillItem } from '../data/cvData';
import { OfficialDocument } from '../data/documentsData';

export const EditModal: React.FC = () => {
  const { 
    editingTarget, 
    closeEditor, 
    updatePersonal, 
    updateStrategicProfile, 
    updateAISpecialty,
    saveWorkExperience,
    saveOfficialDocument,
    saveSoftSkill,
    saveAchievement,
    saveTechnicalSkill
  } = useCvData();

  if (!editingTarget) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#14213D]/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-[#DCD5C9] shadow-2xl max-w-3xl w-full my-auto max-h-[92vh] flex flex-col overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Render the specific edit subform depending on editingTarget.type */}
        {editingTarget.type === 'personal' && (
          <PersonalEditForm initialData={editingTarget.data} onClose={closeEditor} onSave={updatePersonal} />
        )}

        {editingTarget.type === 'strategicProfile' && (
          <StrategicProfileEditForm initialData={editingTarget.data} onClose={closeEditor} onSave={updateStrategicProfile} />
        )}

        {editingTarget.type === 'aiSpecialty' && (
          <AISpecialtyEditForm initialData={editingTarget.data} onClose={closeEditor} onSave={updateAISpecialty} />
        )}

        {editingTarget.type === 'workExperience' && (
          <WorkExperienceEditForm 
            initialData={editingTarget.data} 
            isNew={editingTarget.isNew} 
            onClose={closeEditor} 
            onSave={saveWorkExperience} 
          />
        )}

        {editingTarget.type === 'officialDocument' && (
          <OfficialDocumentEditForm 
            initialData={editingTarget.data} 
            isNew={editingTarget.isNew} 
            onClose={closeEditor} 
            onSave={saveOfficialDocument} 
          />
        )}

        {editingTarget.type === 'softSkill' && (
          <SoftSkillEditForm 
            initialData={editingTarget.data} 
            isNew={editingTarget.isNew} 
            index={editingTarget.index}
            onClose={closeEditor} 
            onSave={saveSoftSkill} 
          />
        )}

        {editingTarget.type === 'achievement' && (
          <AchievementEditForm 
            initialData={editingTarget.data} 
            isNew={editingTarget.isNew} 
            index={editingTarget.index}
            onClose={closeEditor} 
            onSave={saveAchievement} 
          />
        )}
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   1. FORM: DATOS PERSONALES
   ---------------------------------------------------- */
interface PersonalFormProps {
  initialData: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const PersonalEditForm: React.FC<PersonalFormProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...initialData });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">Editar Datos Personales y Contacto</h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nombre Completo</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Título Profesional</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Colegiatura CIP</label>
            <input
              type="text"
              value={formData.cip}
              onChange={(e) => setFormData({ ...formData, cip: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Estado de Colegiatura</label>
            <input
              type="text"
              value={formData.colegiaturaStatus}
              onChange={(e) => setFormData({ ...formData, colegiaturaStatus: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Universidad & Grado Académico</label>
          <input
            type="text"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Teléfono Móvil</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Ubicación / Ciudad</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Disponibilidad & Movilidad</label>
          <input
            type="text"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </form>
  );
};

/* ----------------------------------------------------
   2. FORM: PERFIL ESTRATÉGICO
   ---------------------------------------------------- */
interface StrategicProfileFormProps {
  initialData: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const StrategicProfileEditForm: React.FC<StrategicProfileFormProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...initialData });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">Editar Perfil Estratégico y Resumen</h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Título de Encabezado Estratégico</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Resumen Ejecutivo</label>
          <textarea
            rows={5}
            value={formData.executiveSummary}
            onChange={(e) => setFormData({ ...formData, executiveSummary: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D] leading-relaxed"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Propuesta de Valor Clave</label>
          <textarea
            rows={3}
            value={formData.valueProposition}
            onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D] leading-relaxed"
            required
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </form>
  );
};

/* ----------------------------------------------------
   3. FORM: ESPECIALIDAD IA
   ---------------------------------------------------- */
interface AISpecialtyFormProps {
  initialData: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AISpecialtyEditForm: React.FC<AISpecialtyFormProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...initialData });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">Editar Especialidad en IA Aplicada</h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Título de la Especialidad</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Estado de la Especialidad</label>
          <input
            type="text"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Descripción General</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D] leading-relaxed"
            required
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </form>
  );
};

/* ----------------------------------------------------
   4. FORM: EXPERIENCIA LABORAL
   ---------------------------------------------------- */
interface WorkExperienceFormProps {
  initialData: Partial<WorkExperience>;
  isNew?: boolean;
  onClose: () => void;
  onSave: (data: WorkExperience, isNew?: boolean) => void;
}

const WorkExperienceEditForm: React.FC<WorkExperienceFormProps> = ({ initialData, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<WorkExperience>({
    id: initialData.id || `exp-user-${Date.now()}`,
    role: initialData.role || '',
    company: initialData.company || '',
    location: initialData.location || 'Arequipa, Perú',
    period: initialData.period || '',
    startYear: initialData.startYear || new Date().getFullYear(),
    sector: initialData.sector || 'Minería',
    project: initialData.project || '',
    responsibilitiesAndAchievements: initialData.responsibilitiesAndAchievements || [''],
    technologiesAndKeywords: initialData.technologiesAndKeywords || [''],
    certificateRef: initialData.certificateRef || '',
  });

  const handleRespChange = (index: number, val: string) => {
    const updated = [...formData.responsibilitiesAndAchievements];
    updated[index] = val;
    setFormData({ ...formData, responsibilitiesAndAchievements: updated });
  };

  const addResp = () => {
    setFormData({
      ...formData,
      responsibilitiesAndAchievements: [...formData.responsibilitiesAndAchievements, ''],
    });
  };

  const removeResp = (index: number) => {
    setFormData({
      ...formData,
      responsibilitiesAndAchievements: formData.responsibilitiesAndAchievements.filter((_, i) => i !== index),
    });
  };

  const handleKeywordsChange = (val: string) => {
    const tags = val.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData({ ...formData, technologiesAndKeywords: tags });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        ...formData,
        responsibilitiesAndAchievements: formData.responsibilitiesAndAchievements.filter((r) => r.trim().length > 0),
      },
      isNew
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">
            {isNew ? 'Agregar Nueva Experiencia Laboral' : 'Modificar Experiencia Laboral'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Cargo / Puesto Desempeñado</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Ej: Jefa de SSOMA / Supervisora Ambiental"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Empresa / Institución / Consorcio</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Ej: EXMEL EIRL — Unidad Villa Cuajone"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Sector Operativo</label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value as any })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D] bg-white"
            >
              <option value="Minería">Minería</option>
              <option value="Obras e Infraestructura">Obras e Infraestructura</option>
              <option value="Sector Público & ANP">Sector Público & ANP</option>
              <option value="Consultoría & Laboratorio">Consultoría & Laboratorio</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Periodo (Texto)</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="Ej: Mayo – Noviembre 2025"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Ubicación</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ej: Arequipa, Perú"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Proyecto u Obra Específica (Opcional)</label>
          <textarea
            rows={2}
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            placeholder="Ej: Obra: Mejoramiento de servicio de movilidad urbana..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold text-slate-700">Funciones y Logros Destacados</label>
            <button
              type="button"
              onClick={addResp}
              className="text-[#C5A25D] hover:text-[#14213D] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Función</span>
            </button>
          </div>
          <div className="space-y-2">
            {formData.responsibilitiesAndAchievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleRespChange(idx, e.target.value)}
                  placeholder={`Función o logro #${idx + 1}`}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D]"
                />
                {formData.responsibilitiesAndAchievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResp(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar función"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Palabras Clave / Competencias Técnicas (Separadas por comas)
          </label>
          <input
            type="text"
            value={formData.technologiesAndKeywords.join(', ')}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            placeholder="SSOMA, Cero Accidentes, IGA, Normativa OEFA, ArcGIS"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Referencia a Documento de Respaldo</label>
          <input
            type="text"
            value={formData.certificateRef || ''}
            onChange={(e) => setFormData({ ...formData, certificateRef: e.target.value })}
            placeholder="Ej: Certificado de Trabajo Consorcio Vial Bustamante"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>{isNew ? 'Crear Experiencia' : 'Guardar Cambios'}</span>
        </button>
      </div>
    </form>
  );
};

/* ----------------------------------------------------
   5. FORM: DOCUMENTO / CERTIFICADO OFICIAL
   ---------------------------------------------------- */
interface OfficialDocumentFormProps {
  initialData: Partial<OfficialDocument>;
  isNew?: boolean;
  onClose: () => void;
  onSave: (data: OfficialDocument, isNew?: boolean) => void;
}

const OfficialDocumentEditForm: React.FC<OfficialDocumentFormProps> = ({ initialData, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<OfficialDocument>({
    id: initialData.id || `doc-custom-${Date.now()}`,
    type: initialData.type || 'especializacion',
    category: initialData.category || 'Fiscalización & Control',
    title: initialData.title || '',
    institution: initialData.institution || '',
    issuerLogoType: initialData.issuerLogoType || 'oefa',
    documentTitle: initialData.documentTitle || 'CERTIFICADO OFICIAL',
    subTitle: initialData.subTitle || '',
    recipient: initialData.recipient || 'Rocío Milagros Paredes Gamarra',
    recipientId: initialData.recipientId || 'D.N.I. N° 71332551',
    dateIssued: initialData.dateIssued || new Date().getFullYear().toString(),
    year: initialData.year || new Date().getFullYear().toString(),
    validity: initialData.validity || 'Acreditación Oficial Registrada',
    registrationNumber: initialData.registrationNumber || '',
    hoursOrCredits: initialData.hoursOrCredits || '',
    grade: initialData.grade || '',
    roleOrDesignation: initialData.roleOrDesignation || '',
    summaryText: initialData.summaryText || '',
    signatures: initialData.signatures || [],
    verificationBadge: initialData.verificationBadge || 'Acreditación Registrada',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, isNew);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">
            {isNew ? 'Agregar Nuevo Diploma / Certificado' : 'Modificar Documento / Certificado'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        {/* Division Selector: ESTUDIOS vs LABORALES */}
        <div>
          <label className="font-bold text-slate-700 block mb-1.5">Ámbito de la Acreditación</label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setFormData({ 
                ...formData, 
                type: 'especializacion', 
                category: 'Fiscalización & Control' 
              })}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
                formData.type === 'titulo' || formData.type === 'colegiatura' || formData.type === 'especializacion'
                  ? 'bg-[#14213D] text-[#C5A25D] border-[#14213D] ring-2 ring-[#C5A25D]/30'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#C5A25D]" />
              <span>ESTUDIOS (Académico)</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ 
                ...formData, 
                type: 'trabajo', 
                category: 'Constancia Laboral' 
              })}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
                formData.type === 'trabajo' || formData.type === 'reconocimiento'
                  ? 'bg-[#14213D] text-[#C5A25D] border-[#14213D] ring-2 ring-[#C5A25D]/30'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#C5A25D]" />
              <span>LABORALES (Trabajo)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Título del Certificado / Diploma</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={formData.type === 'trabajo' ? "Ej: Certificado de Trabajo - Especialista Ambiental" : "Ej: Curso de Especialización en Fiscalización OEFA"}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Institución / Empresa Emisora</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder={formData.type === 'trabajo' ? "Ej: Consorcio Vial / Empresa Minera" : "Ej: OEFA / Colegio de Ingenieros del Perú"}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Tipo de Documento</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D] bg-white"
            >
              <optgroup label="ESTUDIOS">
                <option value="titulo">Título Universitario</option>
                <option value="colegiatura">Colegiatura CIP</option>
                <option value="especializacion">Especialización / Diplomado / Curso</option>
              </optgroup>
              <optgroup label="LABORALES">
                <option value="trabajo">Certificado / Constancia de Trabajo</option>
                <option value="reconocimiento">Reconocimiento Laboral</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Categoría</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D] bg-white"
            >
              {formData.type === 'trabajo' || formData.type === 'reconocimiento' ? (
                <>
                  <option value="Constancia Laboral">Constancia Laboral</option>
                  <option value="Reconocimiento Oficial">Reconocimiento Oficial</option>
                  <option value="Minería">Minería</option>
                  <option value="Obras e Infraestructura">Obras e Infraestructura</option>
                  <option value="Sector Público & ANP">Sector Público & ANP</option>
                  <option value="Consultoría & Laboratorio">Consultoría & Laboratorio</option>
                </>
              ) : (
                <>
                  <option value="Fiscalización & Control">Fiscalización & Control</option>
                  <option value="SSOMA & Seguridad">SSOMA & Seguridad</option>
                  <option value="Geoespacial & Tecnológico">Geoespacial & Tecnológico</option>
                  <option value="Calidad & Ecoeficiencia">Calidad & Ecoeficiencia</option>
                  <option value="Monitoreo & Recursos">Monitoreo & Recursos</option>
                  <option value="Título Universitario">Título Universitario</option>
                  <option value="Colegiatura CIP">Colegiatura CIP</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Año</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="Ej: 2024"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Horas o Créditos</label>
            <input
              type="text"
              value={formData.hoursOrCredits || ''}
              onChange={(e) => setFormData({ ...formData, hoursOrCredits: e.target.value })}
              placeholder="Ej: 120 horas académicas"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Calificación / Nota Obtenida</label>
            <input
              type="text"
              value={formData.grade || ''}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              placeholder="Ej: Nota 20/20 / Sobresaliente"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Número de Registro / Folio</label>
            <input
              type="text"
              value={formData.registrationNumber || ''}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              placeholder="Ej: Reg. N° 4582-2023"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Descripción / Resumen de Competencias</label>
          <textarea
            rows={3}
            value={formData.summaryText}
            onChange={(e) => setFormData({ ...formData, summaryText: e.target.value })}
            placeholder="Describe brevemente el alcance de la certificación..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D] leading-relaxed"
            required
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>{isNew ? 'Crear Documento' : 'Guardar Cambios'}</span>
        </button>
      </div>
    </form>
  );
};

/* ----------------------------------------------------
   6. FORM: HABILIDAD BLANDA
   ---------------------------------------------------- */
interface SoftSkillFormProps {
  initialData: Partial<SoftSkillItem>;
  isNew?: boolean;
  index?: number;
  onClose: () => void;
  onSave: (data: SoftSkillItem, isNew?: boolean, index?: number) => void;
}

const SoftSkillEditForm: React.FC<SoftSkillFormProps> = ({ initialData, isNew, index, onClose, onSave }) => {
  const [formData, setFormData] = useState<SoftSkillItem>({
    name: initialData.name || '',
    definition: initialData.definition || '',
    application: initialData.application || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, isNew, index);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">
            {isNew ? 'Agregar Habilidad Blanda' : 'Modificar Habilidad Blanda'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Nombre de la Habilidad</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Liderazgo de Equipos Técnicos"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Definición / Significado</label>
          <textarea
            rows={2}
            value={formData.definition}
            onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
            placeholder="Capacidad para guiar, coordinar y alinear a cuadrillas de campo..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Aplicación en Proyectos / Terreno</label>
          <textarea
            rows={2}
            value={formData.application}
            onChange={(e) => setFormData({ ...formData, application: e.target.value })}
            placeholder="Ej: Liderazgo de cuadrillas en obra minera (Villa Cuajone - Southern Perú)..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>{isNew ? 'Crear Habilidad' : 'Guardar Cambios'}</span>
        </button>
      </div>
    </form>
  );
};

/* ----------------------------------------------------
   7. FORM: LOGRO CUANTIFICABLE
   ---------------------------------------------------- */
interface AchievementFormProps {
  initialData: any;
  isNew?: boolean;
  index?: number;
  onClose: () => void;
  onSave: (data: any, isNew?: boolean, index?: number) => void;
}

const AchievementEditForm: React.FC<AchievementFormProps> = ({ initialData, isNew, index, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    metric: initialData.metric || '',
    context: initialData.context || '',
    description: initialData.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, isNew, index);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#14213D] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#C5A25D]" />
          <h3 className="font-bold text-base tracking-wide">
            {isNew ? 'Agregar Logro Cuantificable' : 'Modificar Logro Cuantificable'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Métrica Destacada (Cifra o Indicador)</label>
            <input
              type="text"
              value={formData.metric}
              onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
              placeholder="Ej: 0 Accidentes / 100% / +10 Años"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-[#2D5A34] focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Título del Logro</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Cero Accidentes en Operaciones de Minería"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Contexto / Empresa / Proyecto</label>
          <input
            type="text"
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            placeholder="Ej: EXMEL EIRL — Villa Cuajone, Southern Perú"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Descripción Detallada</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe el resultado cuantitativo o logro alcanzado..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-normal text-slate-900 focus:outline-none focus:border-[#C5A25D]"
            required
          />
        </div>
      </div>

      <div className="bg-[#F5F2EB] px-6 py-3.5 border-t border-[#DCD5C9] flex items-center justify-end gap-3 shrink-0">
        <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-[#DCD5C9] rounded-xl hover:bg-slate-50 cursor-pointer">
          Cancelar
        </button>
        <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Save className="w-4 h-4 text-[#C5A25D]" />
          <span>{isNew ? 'Crear Logro' : 'Guardar Cambios'}</span>
        </button>
      </div>
    </form>
  );
};
