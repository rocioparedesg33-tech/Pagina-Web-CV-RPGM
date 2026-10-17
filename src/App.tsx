import React, { useState } from 'react';
import { CvDataProvider, useCvData } from './context/CvDataContext';
import { Navbar } from './components/Navbar';
import { EditModeBanner } from './components/EditModeBanner';
import { EditModal } from './components/EditModal';
import { EditAuthModal } from './components/EditAuthModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { ExecutiveHero } from './components/ExecutiveHero';
import { QuantifiedMetrics } from './components/QuantifiedMetrics';
import { AISpecialtyBanner } from './components/AISpecialtyBanner';
import { SoftSkillsSection } from './components/SoftSkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsGrid } from './components/SkillsGrid';
import { CertificationsDossier } from './components/CertificationsDossier';
import { AtsScannerView } from './components/AtsScannerView';
import { CoverLetterModal } from './components/CoverLetterModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { PrintCvDocument } from './components/PrintCvDocument';
import { FooterContactQr } from './components/FooterContactQr';
import { 
  Mail, 
  Phone, 
  ChevronUp, 
  MapPin, 
  ShieldCheck, 
  Award 
} from 'lucide-react';

function AppContent() {
  const { cvData } = useCvData();
  const [currentView, setCurrentView] = useState<'executive' | 'ats' | 'certifications'>('executive');
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ECE7DF] text-[#14213D] flex flex-col font-sans selection:bg-[#C5A25D]/30 selection:text-[#14213D]">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
      />

      {/* Edit Mode Sticky Banner & Toolbar */}
      <EditModeBanner />

      {/* Main Screen Content */}
      <main className="flex-1 no-print">
        {currentView === 'ats' ? (
          <AtsScannerView />
        ) : currentView === 'certifications' ? (
          <div>
            {/* Quick Breadcrumb to return to full CV */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
              <button
                onClick={() => setCurrentView('executive')}
                className="text-xs text-[#14213D] hover:text-[#C5A25D] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                ← Volver al Dossier Ejecutivo Principal
              </button>
            </div>
            <CertificationsDossier onViewDocument={setSelectedDocId} />
          </div>
        ) : (
          <div>
            {/* Executive Hero (Amelia Foster Layout) */}
            <ExecutiveHero
              onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
              onSelectView={setCurrentView}
            />

            {/* Quantified Real Metrics Showcase */}
            <QuantifiedMetrics />

            {/* AI Environmental Specialty Spotlight */}
            <AISpecialtyBanner />

            {/* Soft Skills Section prominently displayed */}
            <SoftSkillsSection />

            {/* Work Experience */}
            <ExperienceSection onViewDocument={setSelectedDocId} />

            {/* Key Technical Skills */}
            <SkillsGrid />

            {/* Verified Certifications Dossier */}
            <CertificationsDossier onViewDocument={setSelectedDocId} />
          </div>
        )}
      </main>

      {/* Dedicated Print Layout (shown only during window.print()) */}
      <PrintCvDocument />

      {/* Universal Content Editor Modal */}
      <EditModal />

      {/* Password Authentication Modal for Edit Mode */}
      <EditAuthModal />

      {/* Safe Deletion Confirmation Dialog */}
      <ConfirmDeleteModal />

      {/* Cover Letter Generator Modal */}
      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
      />

      {/* Official Document and Certificate Visualizer Modal */}
      {selectedDocId && (
        <DocumentViewerModal
          documentId={selectedDocId}
          onClose={() => setSelectedDocId(null)}
          onSelectDocument={setSelectedDocId}
        />
      )}

      {/* Executive Footer with QR Contact Dossier & Amelia Foster Aesthetic */}
      <footer className="no-print bg-[#F5F2EB] border-t border-[#DCD5C9] pt-12 pb-10 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* QR Contact Generation Dossier for Recruiters */}
          <FooterContactQr />

          {/* Bottom Bar with Links & Identity */}
          <div className="pt-8 border-t border-[#DCD5C9] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
                <span className="font-serif-luxury font-extrabold uppercase tracking-[0.06em] text-[#14213D] text-sm">
                  {cvData.personal.fullName}
                </span>
                <span className="text-[#DCD5C9]">·</span>
                <span className="text-[#C5A25D] font-bold uppercase tracking-wider text-[11px]">
                  {cvData.personal.title}
                </span>
                <span className="text-[#DCD5C9]">·</span>
                <span className="font-mono text-[#2D5A34] font-bold">
                  {cvData.personal.cip}
                </span>
              </div>
              <p className="text-slate-500">
                Ingeniera Ambiental Colegiada · Supervisión SSOMA en Minería, IGA, Fiscalización OEFA y Programación con IA Ambiental
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a
                href={`mailto:${cvData.personal.email}`}
                className="hover:text-[#C5A25D] transition-colors flex items-center gap-1.5 text-slate-700 font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A25D]" />
                <span>{cvData.personal.email}</span>
              </a>
              <span className="text-[#DCD5C9]">·</span>
              <a
                href={`tel:${cvData.personal.phone.replace(/\s+/g, '')}`}
                className="hover:text-[#C5A25D] transition-colors flex items-center gap-1.5 font-mono text-slate-700 font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A25D]" />
                <span>{cvData.personal.phone}</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-white hover:bg-slate-50 text-[#14213D] transition-colors border border-[#DCD5C9] cursor-pointer shadow-2xs"
                title="Volver arriba"
                aria-label="Volver arriba"
              >
                <ChevronUp className="w-4 h-4 text-[#C5A25D]" />
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <CvDataProvider>
      <AppContent />
    </CvDataProvider>
  );
}
