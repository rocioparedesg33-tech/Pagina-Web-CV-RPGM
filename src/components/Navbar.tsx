import React from 'react';
import { 
  Download, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  HeartHandshake, 
  Pencil,
  Eye,
  UserCheck
} from 'lucide-react';
import { useCvData } from '../context/CvDataContext';

interface NavbarProps {
  currentView: 'executive' | 'ats' | 'certifications';
  setCurrentView: (view: 'executive' | 'ats' | 'certifications') => void;
  onOpenCoverLetter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenCoverLetter,
}) => {
  const { cvData, isEditMode, toggleEditMode } = useCvData();
  const certCount = cvData.officialDocuments.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#DCD5C9] shadow-xs no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Zone 1: Wordmark with luxury serif typography */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={() => setCurrentView('executive')}
            className="group flex items-baseline gap-2 cursor-pointer"
          >
            <span className="font-serif-luxury text-base sm:text-lg font-extrabold uppercase tracking-[0.06em] text-[#14213D] group-hover:text-[#C5A25D] transition-colors whitespace-nowrap">
              {cvData.personal.fullName}
            </span>
            <span className="text-xs font-bold text-[#C5A25D] uppercase tracking-wider hidden md:inline-block">
              · {cvData.personal.title}
            </span>
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#14213D] bg-white border border-[#C5A25D]/60 px-2.5 py-0.5 rounded shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A34]" />
            {cvData.personal.cip}
          </span>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-wider font-bold text-slate-600">
          <button
            onClick={() => setCurrentView('executive')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              currentView === 'executive'
                ? 'text-[#14213D] border-b-2 border-[#C5A25D]'
                : 'hover:text-[#14213D]'
            }`}
          >
            Perfil
          </button>
          
          <a
            href="#logros"
            onClick={() => setCurrentView('executive')}
            className="hover:text-[#14213D] transition-colors whitespace-nowrap"
          >
            Logros
          </a>

          <a
            href="#especialidad-ia"
            onClick={() => setCurrentView('executive')}
            className="hover:text-[#14213D] transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A25D]" />
            Especialidad IA
          </a>

          <a
            href="#habilidades-blandas"
            onClick={() => setCurrentView('executive')}
            className="hover:text-[#14213D] transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-[#2D5A34]" />
            Habilidades Blandas
          </a>

          <a
            href="#experiencia"
            onClick={() => setCurrentView('executive')}
            className="hover:text-[#14213D] transition-colors whitespace-nowrap"
          >
            Experiencia
          </a>

          <button
            onClick={() => setCurrentView('certifications')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              currentView === 'certifications'
                ? 'text-[#14213D] border-b-2 border-[#C5A25D]'
                : 'hover:text-[#14213D]'
            }`}
          >
            Estudios & Laborales ({certCount})
          </button>

          <button
            onClick={() => setCurrentView('ats')}
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer pb-1 ${
              currentView === 'ats'
                ? 'text-[#14213D] border-b-2 border-[#C5A25D]'
                : 'text-[#C5A25D] hover:text-[#14213D]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Modo ATS
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Modo Edición button */}
          <button
            onClick={toggleEditMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
              isEditMode
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 font-extrabold'
                : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-[#14213D] border border-[#DCD5C9]'
            }`}
            title={isEditMode ? 'Desactivar Modo Edición' : 'Activar Modo Edición para modificar cada letra o sección'}
          >
            <Pencil className={`w-3.5 h-3.5 ${isEditMode ? 'text-white' : 'text-[#C5A25D]'}`} />
            <span>{isEditMode ? 'Edición: ON' : 'Editar Página'}</span>
          </button>

          <button
            onClick={onOpenCoverLetter}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#14213D] bg-white hover:bg-slate-50 border border-[#DCD5C9] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            title="Generar carta de presentación ejecutiva"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A25D]" />
            <span className="hidden xl:inline">Carta Ejecutiva</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E335C] rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Imprimir o guardar CV en PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#C5A25D]" />
            <span className="hidden md:inline">Imprimir / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
