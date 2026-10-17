import React, { useState } from 'react';
import { useCvData } from '../context/CvDataContext';
import { EditableText } from './EditableText';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  Award, 
  CheckCircle,
  FileCheck,
  ChevronRight,
  BrainCircuit,
  HeartHandshake,
  Download,
  Printer,
  Pencil,
  Trash2,
  Plus,
  Camera,
  Upload,
  Check,
  X
} from 'lucide-react';

interface ExecutiveHeroProps {
  onOpenCoverLetter: () => void;
  onSelectView: (view: 'ats' | 'certifications') => void;
}

export const ExecutiveHero: React.FC<ExecutiveHeroProps> = ({
  onOpenCoverLetter,
  onSelectView,
}) => {
  const { 
    cvData, 
    isEditMode, 
    openEditor,
    updatePersonalField,
    updateStrategicProfileField,
    updateCoreCompetency,
    addCoreCompetency,
    deleteCoreCompetency,
    updateLanguage,
    addLanguage,
    deleteLanguage,
    requestDelete
  } = useCvData();

  const { personal, strategicProfile, aiEnvironmentalSpecialty, workExperience } = cvData;

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [newCompetencyText, setNewCompetencyText] = useState('');
  const [isAddingCompetency, setIsAddingCompetency] = useState(false);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [newLangName, setNewLangName] = useState('');
  const [newLangLevel, setNewLangLevel] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updatePersonalField('avatarUrl', reader.result);
          setIsPhotoModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhotoUrl = () => {
    if (photoUrlInput.trim()) {
      updatePersonalField('avatarUrl', photoUrlInput.trim());
      setPhotoUrlInput('');
      setIsPhotoModalOpen(false);
    }
  };

  const handleAddCompetency = () => {
    if (newCompetencyText.trim()) {
      addCoreCompetency(newCompetencyText.trim());
      setNewCompetencyText('');
      setIsAddingCompetency(false);
    }
  };

  const handleAddLang = () => {
    if (newLangName.trim()) {
      addLanguage({
        name: newLangName.trim(),
        level: newLangLevel.trim() || 'Básico',
      });
      setNewLangName('');
      setNewLangLevel('');
      setIsAddingLanguage(false);
    }
  };

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-[#ECE7DF] border-b border-[#DCD5C9]">
      
      {/* Top micro bar for recruiters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[#14213D]">Perfil Ejecutivo Verificado</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 hidden sm:inline">
            Inspirado en dossier de alta gerencia con validación técnica oficial
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCoverLetter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#14213D] bg-[#F5F2EB] hover:bg-[#EAE4D8] border border-[#DCD5C9] rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A25D]" />
            <span>Carta de Presentación</span>
          </button>

          <button
            onClick={() => onSelectView('ats')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#14213D] bg-white hover:bg-slate-50 border border-[#DCD5C9] rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#C5A25D]" />
            <span>Modo ATS</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#C5A25D]" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Luxury Dossier Sheet (Amelia Foster Layout) */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(20,33,61,0.12)] border border-[#DCD5C9]">
        <div className="flex flex-col lg:flex-row">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR (Warm Cream Background - ~35% width on desktop) */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[35%] bg-[#F5F2EB] p-6 sm:p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-[#E5DFD3] flex flex-col justify-between space-y-7">
            
            {/* Top Organic Arch with Circular Headshot */}
            <div className="-mx-6 sm:-mx-8 lg:-mx-9 -mt-6 sm:-mt-8 lg:-mt-9 pt-8 pb-7 px-6 bg-[#EBE5DB]/75 rounded-br-[44px] border-b border-[#DCD5C9] flex flex-col items-center text-center relative">
              
              {/* Circular Headshot with Luxury Gold Ring */}
              <div className="relative group mb-3">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 border-2 border-[#C5A25D] bg-white shadow-md overflow-hidden relative">
                  <img
                    src={personal.avatarUrl || "/src/assets/images/rocio_executive_avatar_1790208523556.jpg"}
                    alt={personal.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#14213D] to-[#1E335C] flex flex-col items-center justify-center -z-10 p-4">
                    <Award className="w-10 h-10 text-[#C5A25D] mb-1" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{personal.fullName}</span>
                    <span className="text-[11px] text-[#C5A25D] font-mono">{personal.cip}</span>
                  </div>

                  {/* Photo Edit Overlay in Edit Mode */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="absolute inset-0 bg-[#14213D]/70 text-[#C5A25D] flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold"
                      title="Cambiar foto de perfil"
                    >
                      <Camera className="w-6 h-6 mb-1 text-[#C5A25D]" />
                      <span>Cambiar Foto</span>
                    </button>
                  )}
                </div>

                {/* Habilitada Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white border border-[#C5A25D] shadow-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#2D5A34] animate-pulse" />
                  <EditableText
                    value={personal.colegiaturaStatus}
                    onSave={(val) => updatePersonalField('colegiaturaStatus', val)}
                    isEditMode={isEditMode}
                    tag="span"
                    className="text-[10px] font-bold text-[#14213D] uppercase tracking-wider"
                  />
                </div>
              </div>

              {/* Official Seal Info */}
              <div className="mt-2 text-center">
                <div className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
                  Colegio de Ingenieros del Perú
                </div>
                <div className="text-[11px] font-mono text-[#C5A25D] font-bold mt-0.5 flex items-center justify-center gap-1">
                  <EditableText
                    value={personal.cip}
                    onSave={(val) => updatePersonalField('cip', val)}
                    isEditMode={isEditMode}
                    tag="span"
                  />
                  <span>· Reg. Ordinario</span>
                </div>
              </div>

            </div>

            {/* CONTACT SECTION */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#C5A25D] mb-4">
                <h3 className="text-xs font-bold tracking-[0.25em] text-[#14213D] uppercase">
                  CONTACTO
                </h3>
                {isEditMode ? (
                  <button
                    onClick={() => openEditor({ type: 'personal', data: personal })}
                    className="inline-flex items-center gap-1 text-[11px] text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors shadow-2xs"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Panel de Contacto</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-[#C5A25D] font-mono">OFICIAL</span>
                )}
              </div>

              <div className="space-y-3.5 text-xs text-[#2B3545]">
                {/* Phone */}
                <div className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#C5A25D] group-hover:text-[#14213D] transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Teléfono / WhatsApp</span>
                    <EditableText
                      value={personal.phone}
                      onSave={(val) => updatePersonalField('phone', val)}
                      isEditMode={isEditMode}
                      tag="span"
                      className="font-mono font-bold text-[#14213D] hover:text-[#C5A25D]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#C5A25D] group-hover:text-[#14213D] transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Correo Electrónico</span>
                    <EditableText
                      value={personal.email}
                      onSave={(val) => updatePersonalField('email', val)}
                      isEditMode={isEditMode}
                      tag="span"
                      className="font-semibold text-[#14213D] hover:text-[#C5A25D] truncate block"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#C5A25D] group-hover:text-[#14213D] transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Ubicación y Base</span>
                    <EditableText
                      value={personal.location}
                      onSave={(val) => updatePersonalField('location', val)}
                      isEditMode={isEditMode}
                      tag="span"
                      className="font-medium text-[#14213D]"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-3 group pt-1">
                  <div className="w-7 h-7 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#C5A25D] group-hover:text-[#14213D] transition-colors mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Disponibilidad Operativa</span>
                    <EditableText
                      value={personal.availability}
                      onSave={(val) => updatePersonalField('availability', val)}
                      isEditMode={isEditMode}
                      multiline={true}
                      tag="span"
                      className="font-semibold text-[#2D5A34] leading-snug block"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* EDUCATION SECTION */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#C5A25D] mb-3">
                <h3 className="text-xs font-bold tracking-[0.25em] text-[#14213D] uppercase">
                  EDUCACIÓN
                </h3>
              </div>

              <div className="text-xs text-[#2B3545] space-y-2">
                <div className="bg-white/80 border border-[#DCD5C9] rounded-xl p-3 shadow-2xs">
                  <div className="font-bold text-[#14213D] text-xs sm:text-sm leading-snug">
                    Título Profesional de Ingeniera Ambiental
                  </div>
                  <div className="text-slate-600 mt-0.5 text-[11px] font-medium">
                    <EditableText
                      value={personal.university}
                      onSave={(val) => updatePersonalField('university', val)}
                      isEditMode={isEditMode}
                      tag="span"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10.5px] text-[#C5A25D] font-mono font-semibold pt-1 border-t border-slate-100">
                    <span>Sustentación de Tesis Aprobada</span>
                    <span className="text-[#2D5A34]">✓ Registrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CORE COMPETENCIES SECTION */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#C5A25D] mb-3">
                <h3 className="text-xs font-bold tracking-[0.25em] text-[#14213D] uppercase">
                  COMPETENCIAS CLAVE
                </h3>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsAddingCompetency(true)}
                    className="text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Añadir</span>
                  </button>
                )}
              </div>

              {/* Add Competency Inline Form */}
              {isEditMode && isAddingCompetency && (
                <div className="mb-3 p-2.5 bg-white border border-[#C5A25D] rounded-xl shadow-xs space-y-2 animate-fadeIn text-xs">
                  <span className="font-bold text-[#14213D] block text-[11px]">Nueva Competencia:</span>
                  <input
                    type="text"
                    value={newCompetencyText}
                    onChange={(e) => setNewCompetencyText(e.target.value)}
                    placeholder="Ej: Gestión de IGA (EIA, DIA)"
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#C5A25D]"
                  />
                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingCompetency(false)}
                      className="px-2 py-0.5 text-[10.5px] font-bold text-slate-600 hover:text-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleAddCompetency}
                      className="px-2.5 py-0.5 text-[10.5px] font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )}

              <ul className="space-y-2 text-xs text-[#2B3545]">
                {(personal.coreCompetencies || []).map((comp, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-1.5 group/item">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A25D] shrink-0 mt-1.5" />
                      <EditableText
                        value={comp}
                        onSave={(val) => updateCoreCompetency(idx, val)}
                        isEditMode={isEditMode}
                        tag="span"
                        className="leading-snug"
                      />
                    </div>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => requestDelete(
                          'Eliminar Competencia Clave',
                          comp,
                          () => deleteCoreCompetency(idx)
                        )}
                        className="opacity-0 group-hover/item:opacity-100 p-0.5 text-slate-400 hover:text-red-600 rounded transition-opacity cursor-pointer shrink-0"
                        title="Borrar competencia"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* LANGUAGES SECTION */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#C5A25D] mb-3">
                <h3 className="text-xs font-bold tracking-[0.25em] text-[#14213D] uppercase">
                  IDIOMAS
                </h3>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsAddingLanguage(true)}
                    className="text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Añadir</span>
                  </button>
                )}
              </div>

              {/* Add Language Inline Form */}
              {isEditMode && isAddingLanguage && (
                <div className="mb-3 p-2.5 bg-white border border-[#C5A25D] rounded-xl shadow-xs space-y-2 animate-fadeIn text-xs">
                  <span className="font-bold text-[#14213D] block text-[11px]">Nuevo Idioma:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newLangName}
                      onChange={(e) => setNewLangName(e.target.value)}
                      placeholder="Idioma (ej: Quechua)"
                      className="px-2 py-1 border border-slate-300 rounded text-slate-900"
                    />
                    <input
                      type="text"
                      value={newLangLevel}
                      onChange={(e) => setNewLangLevel(e.target.value)}
                      placeholder="Nivel (ej: Intermedio)"
                      className="px-2 py-1 border border-slate-300 rounded text-slate-900"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingLanguage(false)}
                      className="px-2 py-0.5 text-[10.5px] font-bold text-slate-600 hover:text-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleAddLang}
                      className="px-2.5 py-0.5 text-[10.5px] font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#2B3545]">
                {personal.languages.map((l, idx) => (
                  <div key={idx} className="flex items-center justify-between group/lang p-1 hover:bg-white/40 rounded">
                    <div className="flex items-center gap-2">
                      <EditableText
                        value={l.name}
                        onSave={(val) => updateLanguage(idx, 'name', val)}
                        isEditMode={isEditMode}
                        tag="span"
                        className="font-bold text-[#14213D]"
                      />
                      <span className="text-slate-400">·</span>
                      <EditableText
                        value={l.level}
                        onSave={(val) => updateLanguage(idx, 'level', val)}
                        isEditMode={isEditMode}
                        tag="span"
                        className="text-slate-600"
                      />
                    </div>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => requestDelete('Eliminar Idioma', l.name, () => deleteLanguage(idx))}
                        className="opacity-0 group-hover/lang:opacity-100 p-0.5 text-slate-400 hover:text-red-600 rounded transition-opacity cursor-pointer"
                        title="Borrar idioma"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (Main Content Dossier - ~65% width) */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[65%] p-6 sm:p-9 lg:p-10 flex flex-col justify-between space-y-7">
            
            {/* Top Header: Classical Roman Serif Name, Gold Subtitle & Diamond */}
            <div>
              {/* Slender Gold Accent Line */}
              <div className="w-32 sm:w-48 h-[2.5px] bg-[#C5A25D] mb-4" />

              {/* Classical Roman Serif Name - Fully Editable In-Place */}
              <div>
                <EditableText
                  value={personal.fullName}
                  onSave={(val) => updatePersonalField('fullName', val)}
                  isEditMode={isEditMode}
                  tag="h1"
                  className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-extrabold uppercase text-[#14213D] tracking-[0.06em] leading-tight block"
                  label="Nombre Completo"
                />
              </div>

              {/* Subtitle in Warm Gold Tracking - Fully Editable In-Place */}
              <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#C5A25D] mt-2.5 flex flex-wrap items-center gap-2">
                <EditableText
                  value={personal.title}
                  onSave={(val) => updatePersonalField('title', val)}
                  isEditMode={isEditMode}
                  tag="span"
                  label="Título Profesional"
                />
                <span>·</span>
                <EditableText
                  value={personal.cip}
                  onSave={(val) => updatePersonalField('cip', val)}
                  isEditMode={isEditMode}
                  tag="span"
                  className="font-mono"
                  label="Número de Colegiatura CIP"
                />
              </div>

              {/* Centered Diamond Accent Line */}
              <div className="flex items-center gap-3 my-5">
                <div className="h-[1px] bg-[#E5DFD3] flex-1" />
                <span className="text-[#C5A25D] text-xs">✦</span>
                <div className="h-[1px] bg-[#E5DFD3] flex-1" />
              </div>
            </div>

            {/* PROFESSIONAL SUMMARY */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#C5A25D] mb-3">
                <h2 className="text-xs font-bold tracking-[0.25em] text-[#14213D] uppercase">
                  RESUMEN PROFESIONAL
                </h2>
                <div className="flex items-center gap-2">
                  {isEditMode && (
                    <button
                      onClick={() => openEditor({ type: 'strategicProfile', data: strategicProfile })}
                      className="inline-flex items-center gap-1 text-[11px] text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors shadow-2xs"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Panel Resumen</span>
                    </button>
                  )}
                  <span className="text-[11px] text-[#2D5A34] font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    +10 Años de Experiencia
                  </span>
                </div>
              </div>

              {/* Editable Executive Summary Paragraph */}
              <EditableText
                value={strategicProfile.executiveSummary}
                onSave={(val) => updateStrategicProfileField('executiveSummary', val)}
                isEditMode={isEditMode}
                multiline={true}
                rows={5}
                tag="p"
                className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify block"
                label="Resumen Profesional Ejecutivo"
              />

              {/* Strategic Value Proposition Quote */}
              <div className="mt-3.5 pl-4 border-l-2 border-[#C5A25D] py-1.5 bg-[#F5F2EB]/50 rounded-r-lg text-xs sm:text-[13px] text-[#14213D]">
                <strong className="not-italic font-bold text-[#14213D] block text-[11px] uppercase tracking-wider mb-0.5">
                  Propuesta de Valor Estratégica:
                </strong>
                <EditableText
                  value={strategicProfile.valueProposition}
                  onSave={(val) => updateStrategicProfileField('valueProposition', val)}
                  isEditMode={isEditMode}
                  multiline={true}
                  rows={3}
                  tag="p"
                  className="italic text-slate-800 leading-relaxed block"
                  label="Propuesta de Valor"
                />
              </div>
            </div>

            {/* AI ENVIRONMENTAL SPECIALTY (Active Vanguard Showcase) */}
            <div className="bg-gradient-to-r from-[#F5F2EB] via-white to-[#F5F2EB]/60 border border-[#C5A25D] rounded-2xl p-4.5 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#C5A25D] shrink-0 mt-0.5 shadow-xs">
                  <BrainCircuit className="w-5 h-5 text-[#C5A25D]" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A25D] bg-[#14213D] px-2 py-0.5 rounded">
                        Especialidad Tecnológica Activa
                      </span>
                      <EditableText
                        value={aiEnvironmentalSpecialty.status}
                        onSave={(val) => updateStrategicProfileField('status' as any, val)}
                        isEditMode={isEditMode}
                        tag="span"
                        className="text-[11px] font-semibold text-[#2D5A34]"
                      />
                    </div>

                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => openEditor({ type: 'aiSpecialty', data: aiEnvironmentalSpecialty })}
                        className="text-[10.5px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Editar Especialidad</span>
                      </button>
                    )}
                  </div>

                  <EditableText
                    value={aiEnvironmentalSpecialty.title}
                    onSave={(val) => updateStrategicProfileField('title' as any, val)}
                    isEditMode={isEditMode}
                    tag="h3"
                    className="text-sm sm:text-base font-bold text-[#14213D] block"
                  />

                  <EditableText
                    value={aiEnvironmentalSpecialty.description}
                    onSave={(val) => updateStrategicProfileField('description' as any, val)}
                    isEditMode={isEditMode}
                    multiline={true}
                    rows={2}
                    tag="p"
                    className="text-xs text-slate-600 leading-relaxed block"
                  />
                </div>
              </div>
            </div>

            {/* PROFESSIONAL EXPERIENCE TIMELINE (Amelia Foster Style) */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#C5A25D] mb-5">
                <h2 className="text-xs font-bold tracking-[0.25em] text-[#14213D] uppercase">
                  EXPERIENCIA LABORAL
                </h2>
                <a
                  href="#experiencia"
                  className="text-[11px] font-bold text-[#C5A25D] hover:text-[#14213D] transition-colors flex items-center gap-1"
                >
                  <span>Ver Todos los Cargos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Vertical Timeline Track with Gold Line & Circular Dots */}
              <div className="relative pl-6 sm:pl-7 border-l-2 border-[#C5A25D] space-y-6 sm:space-y-7">
                {workExperience.slice(0, 4).map((exp) => (
                  <div key={exp.id} className="relative group">
                    {/* Gold Circular Dot on the Timeline */}
                    <div className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-3 h-3 rounded-full bg-[#C5A25D] ring-4 ring-white shadow-2xs group-hover:scale-125 transition-transform" />

                    {/* Timeline Item Content */}
                    <div className="space-y-1">
                      {/* Date & Sector */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#C5A25D] tracking-wider block">
                          {exp.period}
                        </span>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => openEditor({ type: 'workExperience', isNew: false, id: exp.id, data: exp })}
                            className="p-1 text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded text-[10px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Editar</span>
                          </button>
                        )}
                      </div>

                      {/* Job Title */}
                      <h3 className="text-sm sm:text-base font-bold text-[#14213D] tracking-tight leading-snug">
                        {exp.role}
                      </h3>

                      {/* Company & Location */}
                      <div className="text-xs font-semibold text-slate-600 flex flex-wrap items-center gap-2">
                        <span className="text-[#14213D]">{exp.company}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-normal">{exp.location}</span>
                        {exp.sector && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-[10px] font-mono font-bold uppercase text-[#2D5A34] bg-[#2D5A34]/10 px-1.5 py-0.5 rounded">
                              {exp.sector}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Bulleted Achievements */}
                      <ul className="mt-2 space-y-1 text-xs text-slate-700">
                        {exp.responsibilitiesAndAchievements.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-[#C5A25D] font-bold leading-none mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REFERENCES & OFFICIAL BACKING (Bottom Note in Amelia Foster Style) */}
            <div className="pt-4 border-t border-[#E5DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                <strong className="text-[#14213D] uppercase tracking-wider text-[11px] block">
                  Acreditación Documental:
                </strong>
                <span>Certificados de trabajo, resoluciones oficiales y notas de 20/20 verificables.</span>
              </div>
              <a
                href="#dossier"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#14213D] bg-[#F5F2EB] hover:bg-[#EAE4D8] border border-[#DCD5C9] transition-colors whitespace-nowrap self-start sm:self-center"
              >
                <span>Explorar Dossier Oficial</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A25D]" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Photo Change Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#DCD5C9] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD3]">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#C5A25D]" />
                <h3 className="font-bold text-sm text-[#14213D] uppercase tracking-wide">
                  Cambiar Foto de Perfil
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsPhotoModalOpen(false)} 
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option 1: Upload from computer */}
              <div className="p-4 bg-[#F5F2EB] rounded-xl border border-[#DCD5C9] text-center space-y-2">
                <Upload className="w-6 h-6 text-[#C5A25D] mx-auto" />
                <span className="font-bold text-[#14213D] block">Subir imagen desde tu computadora</span>
                <p className="text-[11px] text-slate-500">Formatos recomendados: JPG, PNG o WEBP</p>
                <label className="inline-block px-4 py-2 bg-[#14213D] text-[#C5A25D] font-bold rounded-lg cursor-pointer hover:bg-[#1E335C] transition-colors shadow-xs">
                  <span>Seleccionar Archivo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option 2: Enter image URL */}
              <div className="space-y-2">
                <span className="font-bold text-[#14213D] block">O ingresa un enlace (URL) de imagen:</span>
                <input
                  type="url"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="https://ejemplo.com/mi-foto.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#C5A25D]"
                />
                <button
                  type="button"
                  onClick={handleSavePhotoUrl}
                  className="w-full py-2 bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Guardar Enlace de Foto
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#E5DFD3]">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
