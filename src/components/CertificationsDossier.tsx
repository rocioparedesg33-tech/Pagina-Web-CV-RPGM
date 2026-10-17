import React, { useState, useEffect } from 'react';
import { useCvData } from '../context/CvDataContext';
import { DocumentViewerModal } from './DocumentViewerModal';
import { EditableText } from './EditableText';
import { 
  ShieldCheck, 
  GraduationCap, 
  Clock, 
  Building, 
  Search, 
  Award, 
  Eye, 
  FileText, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  Layers, 
  Loader2, 
  Pencil, 
  Trash2, 
  Plus,
  CheckCircle,
  FileCheck,
  Filter,
  Check
} from 'lucide-react';
import { 
  getStoredDocuments, 
  subscribeToDocumentStorage, 
  StoredDocumentsMap, 
  saveStoredDocumentBothSides, 
  saveStoredDocumentSide, 
  processUploadedFile 
} from '../utils/documentStorage';
import { OfficialDocument } from '../data/documentsData';

interface CertificationsDossierProps {
  onViewDocument?: (docId: string) => void;
}

export const isEstudiosDoc = (doc: OfficialDocument): boolean => {
  return doc.type === 'titulo' || doc.type === 'colegiatura' || doc.type === 'especializacion';
};

export const isLaboralDoc = (doc: OfficialDocument): boolean => {
  return doc.type === 'trabajo' || doc.type === 'reconocimiento' || doc.category === 'Constancia Laboral' || doc.category === 'Reconocimiento Oficial';
};

export const CertificationsDossier: React.FC<CertificationsDossierProps> = ({
  onViewDocument,
}) => {
  const { cvData, isEditMode, openEditor, requestDelete, deleteOfficialDocument, updateOfficialDocumentField } = useCvData();
  const { officialDocuments, personal, workExperience } = cvData;

  // Primary Division: ESTUDIOS vs LABORALES vs TODOS (Ambos)
  const [mainDivision, setMainDivision] = useState<'estudios' | 'laborales' | 'todos'>('todos');
  
  // Independent filters for each division
  const [estudiosSubCategory, setEstudiosSubCategory] = useState<string>('Todos');
  const [laboralesSubCategory, setLaboralesSubCategory] = useState<string>('Todos');

  const [search, setSearch] = useState<string>('');
  const [modalDocId, setModalDocId] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<StoredDocumentsMap>({});
  const [cardProcessingId, setCardProcessingId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  useEffect(() => {
    setUploadedDocs(getStoredDocuments());
    const unsub = subscribeToDocumentStorage((docs) => {
      setUploadedDocs(docs);
    });
    return unsub;
  }, []);

  const handleOpenDoc = (id: string) => {
    if (onViewDocument) {
      onViewDocument(id);
    } else {
      setModalDocId(id);
    }
  };

  const handleCardUpload = async (docId: string, files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setCardProcessingId(docId);
    try {
      if (files.length === 1) {
        const file = files[0];
        const dataUrl = await processUploadedFile(file);
        await saveStoredDocumentSide(docId, 'front', dataUrl, file.name);
      } else {
        const file1 = files[0];
        const file2 = files[1];
        const frontUrl = await processUploadedFile(file1);
        const backUrl = await processUploadedFile(file2);
        await saveStoredDocumentBothSides(docId, frontUrl, file1.name, backUrl, file2.name);
      }
      handleOpenDoc(docId);
    } catch (err) {
      console.error('Error uploading document from card:', err);
    } finally {
      setCardProcessingId(null);
    }
  };

  // Helper to map work document to its sector
  const getLaboralSector = (doc: OfficialDocument): string => {
    if (doc.relatedExperienceId) {
      const match = workExperience.find((w) => w.id === doc.relatedExperienceId);
      if (match) return match.sector;
    }
    const text = `${doc.institution} ${doc.title} ${doc.projectOrContext || ''} ${doc.summaryText}`.toLowerCase();
    if (text.includes('minera') || text.includes('southern') || text.includes('cuajone') || text.includes('yanaquihua')) {
      return 'Minería';
    }
    if (text.includes('vial') || text.includes('construct') || text.includes('livit') || text.includes('bustamante') || text.includes('obra')) {
      return 'Obras e Infraestructura';
    }
    if (text.includes('sernanp') || text.includes('machiguenga') || text.includes('municipalidad') || text.includes('echarati') || text.includes('bella unión')) {
      return 'Sector Público & ANP';
    }
    return 'Consultoría & Laboratorio';
  };

  // Two primary sets
  const estudiosList = officialDocuments.filter(isEstudiosDoc);
  const laboralesList = officialDocuments.filter(isLaboralDoc);

  // Sub-filter categories
  const estudiosCategories = [
    'Todos',
    'Títulos & Colegiatura',
    'Fiscalización & Control',
    'SSOMA & Seguridad',
    'Geoespacial & Tecnológico',
    'Calidad & Ecoeficiencia',
    'Monitoreo & Recursos',
  ];

  const laboralesCategories = [
    'Todos',
    'Minería',
    'Obras e Infraestructura',
    'Sector Público & ANP',
    'Consultoría & Laboratorio',
  ];

  // Filter single doc against search and category
  const docMatchesFilter = (doc: OfficialDocument, isEstudio: boolean) => {
    const query = search.toLowerCase().trim();
    const matchesSearch = query === '' ||
      doc.title.toLowerCase().includes(query) ||
      doc.institution.toLowerCase().includes(query) ||
      doc.summaryText.toLowerCase().includes(query) ||
      doc.registrationNumber.toLowerCase().includes(query) ||
      (doc.grade && doc.grade.toLowerCase().includes(query)) ||
      (doc.roleOrDesignation && doc.roleOrDesignation.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (isEstudio) {
      if (estudiosSubCategory === 'Todos') return true;
      if (estudiosSubCategory === 'Títulos & Colegiatura') {
        return doc.type === 'titulo' || doc.type === 'colegiatura';
      }
      return doc.category === estudiosSubCategory;
    } else {
      if (laboralesSubCategory === 'Todos') return true;
      const sector = getLaboralSector(doc);
      return sector === laboralesSubCategory;
    }
  };

  const estudiosFiltered = estudiosList.filter((d) => docMatchesFilter(d, true));
  const laboralesFiltered = laboralesList.filter((d) => docMatchesFilter(d, false));

  const totalUploadedCount = Object.values(uploadedDocs).filter((d) => d.front || d.back).length;
  const tituloDoc = uploadedDocs['doc-titulo-ucv'];
  const cipDoc = uploadedDocs['doc-colegiatura-cip'];

  // Universal Card renderer
  const renderCard = (item: OfficialDocument) => {
    const docEntry = uploadedDocs[item.id];
    const hasFront = !!docEntry?.front;
    const hasBack = !!docEntry?.back;
    const hasBoth = hasFront && hasBack;
    const hasAny = hasFront || hasBack;

    const isDraggingThisCard = draggedCardId === item.id;
    const isProcessingThisCard = cardProcessingId === item.id;
    const isEstudio = isEstudiosDoc(item);

    return (
      <div
        key={item.id}
        onClick={() => handleOpenDoc(item.id)}
        onDragOver={(e) => {
          e.preventDefault();
          setDraggedCardId(item.id);
        }}
        onDragLeave={() => {
          if (draggedCardId === item.id) setDraggedCardId(null);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDraggedCardId(null);
          const files = e.dataTransfer.files;
          if (files && files.length > 0) {
            handleCardUpload(item.id, files);
          }
        }}
        className={`bg-white border rounded-2xl p-5.5 flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-md cursor-pointer relative ${
          isDraggingThisCard 
            ? 'border-[#C5A25D] bg-[#FFFBF2] scale-[1.01] ring-2 ring-[#C5A25D]/40' 
            : 'border-[#DCD5C9] hover:border-[#C5A25D]'
        }`}
      >
        <div>
          {/* Edit Controls if isEditMode */}
          {isEditMode && (
            <div 
              className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DFD3] text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-[10px] text-[#C5A25D] font-bold">Modo Edición</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openEditor({ type: 'officialDocument', isNew: false, id: item.id, data: item })}
                  className="px-2 py-0.5 text-[11px] font-bold text-[#14213D] bg-[#C5A25D] hover:bg-[#b08e4b] rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  title="Modificar este documento"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Editar</span>
                </button>
                <button
                  type="button"
                  onClick={() => requestDelete(
                    'Eliminar Documento Oficial',
                    `${item.title} (${item.institution})`,
                    () => deleteOfficialDocument(item.id)
                  )}
                  className="px-2 py-0.5 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded flex items-center gap-1 cursor-pointer transition-colors"
                  title="Borrar este documento"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Borrar</span>
                </button>
              </div>
            </div>
          )}

          {/* Header: Division Badge, Category & Year */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2.5 border-b border-[#E5DFD3] gap-2">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span 
                className="font-mono text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-md border shrink-0 flex items-center gap-1 bg-[#14213D] text-[#C5A25D] border-[#C5A25D]/40 shadow-2xs"
              >
                {isEstudio ? (
                  <>
                    <GraduationCap className="w-3 h-3" />
                    <span>ESTUDIOS</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-3 h-3" />
                    <span>LABORAL</span>
                  </>
                )}
              </span>
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] truncate">
                {isEstudio ? item.category : getLaboralSector(item)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {hasBoth ? (
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded flex items-center gap-1" title="Ambas caras cargadas">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  2 Caras
                </span>
              ) : hasAny ? (
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 border border-sky-300 px-1.5 py-0.5 rounded flex items-center gap-1" title="1 cara cargada">
                  <CheckCircle2 className="w-3 h-3 text-sky-600" />
                  1 Cara
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Upload className="w-2.5 h-2.5 text-[#C5A25D]" />
                  Por subir
                </span>
              )}
              <span className="font-mono text-[#C5A25D] font-bold">
                {item.year}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="mt-3">
            <EditableText
              value={item.title}
              onSave={(val) => updateOfficialDocumentField(item.id, 'title', val)}
              isEditMode={isEditMode}
              tag="h4"
              className="text-sm sm:text-base font-bold text-[#14213D] group-hover:text-[#C5A25D] transition-colors leading-snug block"
              label="Título del Documento"
            />
          </div>

          {/* Institution */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-700 font-medium">
            <Building className="w-3.5 h-3.5 text-[#C5A25D] shrink-0" />
            <EditableText
              value={item.institution}
              onSave={(val) => updateOfficialDocumentField(item.id, 'institution', val)}
              isEditMode={isEditMode}
              tag="span"
              className="font-semibold"
              label="Institución Emisora"
            />
          </div>

          {/* Role or Context */}
          {item.roleOrDesignation && (
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#2D5A34] font-bold">
              <ShieldCheck className="w-3 h-3 text-[#2D5A34] shrink-0" />
              <EditableText
                value={item.roleOrDesignation}
                onSave={(val) => updateOfficialDocumentField(item.id, 'roleOrDesignation', val)}
                isEditMode={isEditMode}
                tag="span"
                label="Cargo / Designación"
              />
            </div>
          )}

          {/* Grade or Hours badge */}
          {(item.grade || item.hoursOrCredits) && (
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              {item.grade && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  <Award className="w-3 h-3 text-emerald-600" />
                  <EditableText
                    value={item.grade}
                    onSave={(val) => updateOfficialDocumentField(item.id, 'grade', val)}
                    isEditMode={isEditMode}
                    tag="span"
                    label="Calificación"
                  />
                </span>
              )}
              {item.hoursOrCredits && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <EditableText
                    value={item.hoursOrCredits}
                    onSave={(val) => updateOfficialDocumentField(item.id, 'hoursOrCredits', val)}
                    isEditMode={isEditMode}
                    tag="span"
                    label="Horas / Créditos"
                  />
                </span>
              )}
            </div>
          )}

          {/* Summary */}
          <div className="mt-3">
            <EditableText
              value={item.summaryText}
              onSave={(val) => updateOfficialDocumentField(item.id, 'summaryText', val)}
              isEditMode={isEditMode}
              multiline={true}
              rows={3}
              tag="p"
              className="text-xs text-slate-600 leading-relaxed block"
              label="Resumen de la Certificación"
            />
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-5 pt-3 border-t border-[#E5DFD3] flex items-center justify-between text-xs">
          <span className="font-mono text-[10.5px] text-slate-500 truncate max-w-[170px]" title={item.registrationNumber}>
            {item.registrationNumber}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#14213D] group-hover:text-[#C5A25D] transition-colors flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Certificado</span>
            </span>

            {/* Quick upload trigger button */}
            <label
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#14213D] text-slate-600 hover:text-white transition-colors cursor-pointer"
              title="Subir archivo digital (Anverso o Reverso)"
            >
              {isProcessingThisCard ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A25D]" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
                className="hidden"
                disabled={isProcessingThisCard}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleCardUpload(item.id, e.target.files);
                    e.target.value = '';
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="dossier" className="py-14 sm:py-20 bg-[#F5F2EB] border-b border-[#DCD5C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. SECTION HEADER
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DFD3]">
          <div>
            <div className="w-16 h-[2px] bg-[#C5A25D] mb-3" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
              <Award className="w-4 h-4 text-[#C5A25D]" />
              <span>Dossier Oficial de Acreditaciones</span>
            </div>
            <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14213D] tracking-[0.04em]">
              Documentos, Diplomas y Certificados Oficiales
            </h2>
            <p className="mt-2 text-slate-700 text-sm sm:text-base max-w-3xl leading-relaxed">
              Dossier dividido en dos secciones oficiales independientes: <strong>1. ESTUDIOS</strong> (Títulos, Colegiatura CIP y Diplomados Académicos) y <strong>2. LABORALES</strong> (Certificados de Trabajo y Constancias de Supervisión en Obra y Minería).
            </p>
          </div>

          {/* Search Box & Edit Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start md:self-end">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#C5A25D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por título, entidad o nota..."
                className="w-full bg-white border border-[#DCD5C9] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#14213D] placeholder-slate-400 focus:outline-none focus:border-[#C5A25D] transition-colors shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            2. TWO-DIVISION PRIMARY DASHBOARD (ESTUDIOS vs LABORALES)
            ======================================================== */}
        <div className="mt-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CARD 1: SECCIÓN ESTUDIOS */}
            <div
              onClick={() => setMainDivision('estudios')}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xs relative overflow-hidden group ${
                mainDivision === 'estudios'
                  ? 'bg-[#14213D] text-white border-[#C5A25D] ring-2 ring-[#C5A25D]/40 shadow-lg'
                  : 'bg-white hover:bg-[#FFFDF9] text-[#14213D] border-[#DCD5C9] hover:border-[#C5A25D]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${
                    mainDivision === 'estudios'
                      ? 'bg-[#C5A25D] text-[#14213D] border-[#C5A25D]'
                      : 'bg-[#14213D] text-[#C5A25D] border-transparent'
                  }`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-mono font-extrabold uppercase tracking-widest text-[#C5A25D] block">
                      SECCIÓN 1 DE 2
                    </span>
                    <h3 className={`font-serif-luxury text-lg sm:text-xl font-extrabold uppercase tracking-wide ${
                      mainDivision === 'estudios' ? 'text-white' : 'text-[#14213D]'
                    }`}>
                      ESTUDIOS & DIPLOMAS
                    </h3>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold border ${
                  mainDivision === 'estudios'
                    ? 'bg-[#C5A25D] text-[#14213D] border-[#C5A25D]'
                    : 'bg-[#F5F2EB] text-[#14213D] border-[#DCD5C9]'
                }`}>
                  {estudiosList.length} Documentos
                </span>
              </div>

              <p className={`mt-3 text-xs leading-relaxed ${
                mainDivision === 'estudios' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Título Profesional UCV, Colegiatura CIP N° 322074, Diplomado en Minería (240h), Cursos OEFA y Contraloría (20/20), MTPE (20/20), MINAM (18/20) y Especialista UNI ArcGIS (80h).
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-[#C5A25D] flex items-center gap-1">
                  <span>Ver documentos de estudios</span>
                  <span className="text-sm">→</span>
                </span>
                {mainDivision === 'estudios' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C5A25D]/20 text-[#C5A25D] text-[10px] font-bold border border-[#C5A25D]/40">
                    Actualmente activo
                  </span>
                )}
              </div>
            </div>

            {/* CARD 2: SECCIÓN LABORALES */}
            <div
              onClick={() => setMainDivision('laborales')}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xs relative overflow-hidden group ${
                mainDivision === 'laborales'
                  ? 'bg-[#14213D] text-white border-[#C5A25D] ring-2 ring-[#C5A25D]/40 shadow-lg'
                  : 'bg-white hover:bg-[#FFFDF9] text-[#14213D] border-[#DCD5C9] hover:border-[#C5A25D]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${
                    mainDivision === 'laborales'
                      ? 'bg-[#C5A25D] text-[#14213D] border-[#C5A25D]'
                      : 'bg-[#14213D] text-[#C5A25D] border-transparent'
                  }`}>
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-mono font-extrabold uppercase tracking-widest text-[#C5A25D] block">
                      SECCIÓN 2 DE 2
                    </span>
                    <h3 className={`font-serif-luxury text-lg sm:text-xl font-extrabold uppercase tracking-wide ${
                      mainDivision === 'laborales' ? 'text-white' : 'text-[#14213D]'
                    }`}>
                      CERTIFICADOS LABORALES
                    </h3>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold border ${
                  mainDivision === 'laborales'
                    ? 'bg-[#C5A25D] text-[#14213D] border-[#C5A25D]'
                    : 'bg-[#F5F2EB] text-[#14213D] border-[#DCD5C9]'
                }`}>
                  {laboralesList.length} Certificados
                </span>
              </div>

              <p className={`mt-3 text-xs leading-relaxed ${
                mainDivision === 'laborales' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Acreditaciones emitidas por Southern Perú (Villa Cuajone - Cero Accidentes), Consorcio Vial Bustamante, RIMACHI Hermanos SAC, ECA MAENI (SERNANP) y Municipalidades.
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-[#C5A25D] flex items-center gap-1">
                  <span>Ver certificados de trabajo</span>
                  <span className="text-sm">→</span>
                </span>
                {mainDivision === 'laborales' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C5A25D]/20 text-[#C5A25D] text-[10px] font-bold border border-[#C5A25D]/40">
                    Actualmente activo
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* VIEW CONTROLLER PILL BAR */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 bg-[#E4DDCF] p-2 rounded-2xl border border-[#DCD5C9]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-700 px-2 uppercase tracking-wider text-[11px]">
                Filtrar Vista:
              </span>
              <button
                type="button"
                onClick={() => setMainDivision('estudios')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mainDivision === 'estudios'
                    ? 'bg-[#14213D] text-[#C5A25D] shadow-xs'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Solo ESTUDIOS ({estudiosList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMainDivision('laborales')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mainDivision === 'laborales'
                    ? 'bg-[#14213D] text-[#C5A25D] shadow-xs'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Solo LABORALES ({laboralesList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMainDivision('todos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mainDivision === 'todos'
                    ? 'bg-[#14213D] text-[#C5A25D] shadow-xs'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Ver Ambas Divisiones Continuas ({officialDocuments.length})</span>
              </button>
            </div>

            {/* Quick Upload Indicator */}
            <div className="text-[11px] text-slate-600 font-mono flex items-center gap-1.5 px-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A34]" />
              <span>{totalUploadedCount} de {officialDocuments.length} digitalizados</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. CONTENT RENDERING: ESTUDIOS & LABORALES
            ======================================================== */}
        
        {/* ----------------------------------------------------
            SECCIÓN 1: ESTUDIOS
            ---------------------------------------------------- */}
        {(mainDivision === 'todos' || mainDivision === 'estudios') && (
          <div className="mt-10 pt-4 pb-8">
            {/* Division Header */}
            <div className="rounded-2xl bg-[#14213D] text-white p-6 sm:p-7 mb-6 border border-[#C5A25D]/40 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-white/10 text-[#C5A25D] border border-[#C5A25D]/40 shrink-0">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
                      <span>División 1 de 2 Oficial</span>
                    </div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-extrabold uppercase text-white tracking-wide">
                      ESTUDIOS, DIPLOMAS Y CERTIFICADOS ACADÉMICOS
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Título Profesional Universitario registrado ante Sunedu, Colegiatura CIP N° 322074 (Habilitada) y certificaciones de alta especialización en fiscalización OEFA, SSOMA y gestión hídrica.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => openEditor({ 
                        type: 'officialDocument', 
                        isNew: true, 
                        data: { type: 'especializacion', category: 'Fiscalización & Control' } 
                      })}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Agregar Documento de Estudios</span>
                    </button>
                  )}
                  <span className="font-mono text-xs font-bold text-[#14213D] bg-white px-3 py-2 rounded-xl shadow-2xs">
                    {estudiosFiltered.length} de {estudiosList.length}
                  </span>
                </div>
              </div>

              {/* Sub-category Filter Chips for ESTUDIOS */}
              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-[#C5A25D]" />
                  <span>Especialidad:</span>
                </span>
                {estudiosCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setEstudiosSubCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      estudiosSubCategory === cat
                        ? 'bg-[#C5A25D] text-[#14213D] shadow-xs'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Estudios Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {estudiosFiltered.map(renderCard)}

              {/* Add card for Estudios in Edit Mode */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => openEditor({ 
                    type: 'officialDocument', 
                    isNew: true, 
                    data: { type: 'especializacion', category: 'Fiscalización & Control' } 
                  })}
                  className="bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] border-2 border-dashed border-[#C5A25D] hover:border-[#14213D] rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-2xs group min-h-[260px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-[#14213D] group-hover:text-[#C5A25D] transition-colors">
                    + Agregar Documento de Estudios
                  </span>
                  <p className="mt-1 text-xs text-slate-500 max-w-xs">
                    Añade títulos, certificados oficiales de especialización o cursos de capacitación.
                  </p>
                </button>
              )}
            </div>

            {estudiosFiltered.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#DCD5C9] p-8 text-center text-slate-500 text-xs">
                No se encontraron documentos de estudios con los filtros aplicados.
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------
            SECCIÓN 2: LABORALES
            ---------------------------------------------------- */}
        {(mainDivision === 'todos' || mainDivision === 'laborales') && (
          <div className="mt-10 pt-4 pb-8">
            {/* Division Header */}
            <div className="rounded-2xl bg-gradient-to-br from-[#14213D] via-[#1E335C] to-[#0D1B2A] text-white p-6 sm:p-7 mb-6 border border-[#C5A25D]/40 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-[#C5A25D]/20 text-[#C5A25D] border border-[#C5A25D]/40 shrink-0">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A25D]">
                      <span>División 2 de 2 Oficial</span>
                    </div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-extrabold uppercase text-white tracking-wide">
                      CERTIFICADOS Y CONSTANCIAS LABORALES
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                      Certificados de trabajo emitidos por empresas contratistas mineras (Southern Perú), consorcios de obras viales, consultoras ambientales y entidades del Estado peruano (SERNANP, Municipalidades).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => openEditor({ 
                        type: 'officialDocument', 
                        isNew: true, 
                        data: { type: 'trabajo', category: 'Constancia Laboral' } 
                      })}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#C5A25D] hover:bg-[#b08e4b] text-[#14213D] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Agregar Certificado Laboral</span>
                    </button>
                  )}
                  <span className="font-mono text-xs font-bold text-[#14213D] bg-white px-3 py-2 rounded-xl shadow-2xs">
                    {laboralesFiltered.length} de {laboralesList.length}
                  </span>
                </div>
              </div>

              {/* Sub-category Filter Chips for LABORALES */}
              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A25D] mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-[#C5A25D]" />
                  <span>Sector Productivo:</span>
                </span>
                {laboralesCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setLaboralesSubCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      laboralesSubCategory === cat
                        ? 'bg-[#C5A25D] text-[#14213D] shadow-xs'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Laborales Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {laboralesFiltered.map(renderCard)}

              {/* Add card for Laborales in Edit Mode */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => openEditor({ 
                    type: 'officialDocument', 
                    isNew: true, 
                    data: { type: 'trabajo', category: 'Constancia Laboral' } 
                  })}
                  className="bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] border-2 border-dashed border-[#C5A25D] hover:border-[#14213D] rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-2xs group min-h-[260px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-[#14213D] group-hover:text-[#C5A25D] transition-colors">
                    + Agregar Certificado Laboral
                  </span>
                  <p className="mt-1 text-xs text-slate-500 max-w-xs">
                    Añade constancias laborales emitidas por empresas, obras o entidades públicas.
                  </p>
                </button>
              )}
            </div>

            {laboralesFiltered.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#DCD5C9] p-8 text-center text-slate-500 text-xs">
                No se encontraron certificados laborales con los filtros aplicados.
              </div>
            )}
          </div>
        )}

        {/* Standalone Modal Fallback */}
        {modalDocId && (
          <DocumentViewerModal
            documentId={modalDocId}
            onClose={() => setModalDocId(null)}
            onSelectDocument={setModalDocId}
          />
        )}

      </div>
    </section>
  );
};
