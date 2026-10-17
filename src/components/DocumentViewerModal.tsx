import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  Award, 
  Building, 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  CheckCircle2, 
  GraduationCap,
  Briefcase, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  AlertCircle, 
  FileUp, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ArrowRightLeft, 
  Columns2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useCvData } from '../context/CvDataContext';
import { 
  getStoredDocuments, 
  getStoredDocument,
  saveStoredDocumentSide, 
  saveStoredDocumentBothSides,
  removeStoredDocumentSide, 
  removeStoredDocument, 
  processUploadedFile, 
  subscribeToDocumentStorage,
  dataUrlToBlobUrl,
  StoredDocument, 
  StoredDocumentsMap, 
  DocumentSide 
} from '../utils/documentStorage';

interface DocumentViewerModalProps {
  documentId: string | null;
  onClose: () => void;
  onSelectDocument: (id: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  documentId,
  onClose,
  onSelectDocument,
}) => {
  const { cvData } = useCvData();
  const documents = cvData.officialDocuments;
  const currentIndex = documents.findIndex((d) => d.id === documentId);
  const doc = currentIndex !== -1 ? documents[currentIndex] : null;

  const [activeTab, setActiveTab] = useState<'digitalDoc' | 'technical'>('digitalDoc');
  const [activeSide, setActiveSide] = useState<DocumentSide>('front');
  const [viewBothSides, setViewBothSides] = useState<boolean>(true);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<StoredDocumentsMap>({});
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingSide, setProcessingSide] = useState<DocumentSide | 'both' | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Blob URLs for PDF rendering in sandboxed frames
  const [frontBlobUrl, setFrontBlobUrl] = useState<string | null>(null);
  const [backBlobUrl, setBackBlobUrl] = useState<string | null>(null);

  // Drag state for upload
  const [isDraggingDual, setIsDraggingDual] = useState<boolean>(false);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const dualInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subscribe to persistent storage updates
  useEffect(() => {
    setUploadedFiles(getStoredDocuments());
    const unsubscribe = subscribeToDocumentStorage((docs) => {
      setUploadedFiles(docs);
    });
    return unsubscribe;
  }, []);

  // Reset controls when active document changes
  useEffect(() => {
    setZoomLevel(1);
    setRotation(0);
    setUploadError(null);
    setViewBothSides(true);

    if (doc) {
      const stored = getStoredDocument(doc.id);
      if (stored?.front) {
        setActiveSide('front');
      } else if (stored?.back) {
        setActiveSide('back');
      } else {
        setActiveSide('front');
      }
    }
  }, [documentId, doc]);

  // Generate QR code for the current document
  useEffect(() => {
    if (!doc) return;

    const verificationPayload = [
      `ACREDITACIÓN PROFESIONAL OFICIAL`,
      `Documento: ${doc.documentTitle}`,
      `Título: ${doc.title}`,
      `Titular: ${doc.recipient}`,
      `Colegiatura: ${cvData.personal.cip}`,
      `Entidad: ${doc.institution}`,
      `Registro: ${doc.registrationNumber}`,
      `Fecha: ${doc.dateIssued}`,
      doc.grade ? `Calificación: ${doc.grade}` : '',
      doc.hoursOrCredits ? `Horas/Créditos: ${doc.hoursOrCredits}` : '',
      `Estado: ACREDITADO Y VERIFICADO`
    ].filter(Boolean).join('\n');

    QRCode.toDataURL(verificationPayload, {
      width: 180,
      margin: 1,
      color: {
        dark: '#14213D',
        light: '#FFFFFF'
      }
    }).then(setQrUrl).catch(() => setQrUrl(''));
  }, [doc]);

  // Keyboard navigation & escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if (!isFullscreen) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          onSelectDocument(documents[currentIndex - 1].id);
        }
        if (e.key === 'ArrowRight' && currentIndex < documents.length - 1) {
          onSelectDocument(documents[currentIndex + 1].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, documents, isFullscreen, onClose, onSelectDocument]);

  if (!doc) return null;

  const currentDocEntry: StoredDocument = uploadedFiles[doc.id] || { front: null, back: null };
  const hasFront = !!currentDocEntry.front;
  const hasBack = !!currentDocEntry.back;
  const hasAnySide = hasFront || hasBack;
  const hasBothSides = hasFront && hasBack;

  // Active side file
  const activeFile = activeSide === 'front' ? currentDocEntry.front : currentDocEntry.back;
  const isActivePdf = activeFile?.startsWith('data:application/pdf') ?? false;

  // Update blob URLs for PDF viewing whenever files change
  useEffect(() => {
    let fbUrl: string | null = null;
    let bbUrl: string | null = null;

    if (currentDocEntry.front?.startsWith('data:application/pdf')) {
      fbUrl = dataUrlToBlobUrl(currentDocEntry.front);
      setFrontBlobUrl(fbUrl);
    } else {
      setFrontBlobUrl(null);
    }

    if (currentDocEntry.back?.startsWith('data:application/pdf')) {
      bbUrl = dataUrlToBlobUrl(currentDocEntry.back);
      setBackBlobUrl(bbUrl);
    } else {
      setBackBlobUrl(null);
    }

    return () => {
      if (fbUrl && fbUrl.startsWith('blob:')) URL.revokeObjectURL(fbUrl);
      if (bbUrl && bbUrl.startsWith('blob:')) URL.revokeObjectURL(bbUrl);
    };
  }, [currentDocEntry.front, currentDocEntry.back]);

  const activePdfBlobUrl = activeSide === 'front' ? frontBlobUrl : backBlobUrl;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectDocument(documents[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < documents.length - 1) {
      onSelectDocument(documents[currentIndex + 1].id);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(doc.registrationNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUploadSingleSide = async (file: File, side: DocumentSide) => {
    setIsProcessing(true);
    setProcessingSide(side);
    setUploadError(null);
    setUploadSuccess(null);
    try {
      const dataUrl = await processUploadedFile(file);
      await saveStoredDocumentSide(doc.id, side, dataUrl, file.name);
      setActiveSide(side);
      setUploadSuccess(`✓ ${side === 'front' ? 'Cara 1' : 'Cara 2'} cargada correctamente.`);
      setTimeout(() => setUploadSuccess(null), 3500);
    } catch (err) {
      console.error(err);
      setUploadError('No se pudo procesar el archivo. Formatos permitidos: JPG, PNG, WEBP o PDF.');
    } finally {
      setIsProcessing(false);
      setProcessingSide(null);
    }
  };

  const handleUploadDualFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setProcessingSide('both');
    setUploadError(null);
    setUploadSuccess(null);

    try {
      if (files.length === 1) {
        // If 1 file was selected, assign to front if empty or the current side
        const file = files[0];
        const targetSide = !hasFront ? 'front' : (!hasBack ? 'back' : activeSide);
        const dataUrl = await processUploadedFile(file);
        await saveStoredDocumentSide(doc.id, targetSide, dataUrl, file.name);
        setActiveSide(targetSide);
        setUploadSuccess(`✓ Archivo cargado correctamente para ${targetSide === 'front' ? 'Cara 1' : 'Cara 2'}. Puedes subir la otra cara para completarlo.`);
        setTimeout(() => setUploadSuccess(null), 4500);
      } else {
        // Multiple files: First is Cara 1, Second is Cara 2
        const frontUrl = await processUploadedFile(files[0]);
        const backUrl = await processUploadedFile(files[1]);
        await saveStoredDocumentBothSides(doc.id, frontUrl, files[0].name, backUrl, files[1].name);

        setActiveSide('front');
        setViewBothSides(true);
        setUploadSuccess('✓ Ambas caras del documento cargadas correctamente.');
        setTimeout(() => setUploadSuccess(null), 4000);
      }
    } catch (err) {
      console.error(err);
      setUploadError('Error al procesar los archivos seleccionados. Verifica que sean imágenes (JPG, PNG, WEBP) o documentos PDF.');
    } finally {
      setIsProcessing(false);
      setProcessingSide(null);
    }
  };

  const handleRemoveCurrentSide = () => {
    removeStoredDocumentSide(doc.id, activeSide);
    setZoomLevel(1);
    setRotation(0);
    // Switch to the other side if available
    if (activeSide === 'front' && hasBack) {
      setActiveSide('back');
    } else if (activeSide === 'back' && hasFront) {
      setActiveSide('front');
    }
  };

  const handleRemoveAllSides = () => {
    removeStoredDocument(doc.id);
    setZoomLevel(1);
    setRotation(0);
    setViewBothSides(false);
  };

  const handleDownloadSide = (side: DocumentSide) => {
    const fileData = side === 'front' ? currentDocEntry.front : currentDocEntry.back;
    if (!fileData) return;
    const isPdf = fileData.startsWith('data:application/pdf');
    const extension = isPdf ? 'pdf' : 'jpg';
    const cleanReg = doc.registrationNumber.replace(/[^a-z0-9]/gi, '_') || doc.id;
    const sideLabel = side === 'front' ? 'Cara_1' : 'Cara_2';
    
    const a = document.createElement('a');
    a.href = fileData;
    a.download = `Doc_${cleanReg}_${sideLabel}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadBoth = () => {
    if (currentDocEntry.front) handleDownloadSide('front');
    if (currentDocEntry.back) {
      setTimeout(() => handleDownloadSide('back'), 400);
    }
  };

  const toggleSide = () => {
    setActiveSide(prev => prev === 'front' ? 'back' : 'front');
  };

  const isEstudio = doc ? (doc.type === 'titulo' || doc.type === 'colegiatura' || doc.type === 'especializacion') : false;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto no-print ${isFullscreen ? 'p-0' : ''}`}>
      <div 
        ref={containerRef}
        className={`relative w-full bg-[#F5F2EB] shadow-2xl border border-[#C5A25D]/50 flex flex-col my-auto transition-all ${
          isFullscreen 
            ? 'h-screen w-screen rounded-none max-w-none max-h-none' 
            : 'max-w-5xl rounded-2xl max-h-[94vh] overflow-hidden'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="bg-[#14213D] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#C5A25D]/40 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="p-1.5 rounded-lg bg-white/10 text-[#C5A25D] shrink-0">
              {isEstudio ? <GraduationCap className="w-5 h-5 text-[#C5A25D]" /> : <Briefcase className="w-5 h-5 text-[#52B788]" />}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Division Badge */}
                <span className={`text-[9.5px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isEstudio 
                    ? 'bg-[#0b132b] text-[#C5A25D] border-[#C5A25D]/60' 
                    : 'bg-[#143622] text-[#D8F3DC] border-[#2D6A4F]'
                }`}>
                  {isEstudio ? '🎓 DIVISIÓN ESTUDIOS' : '💼 DIVISIÓN LABORAL'}
                </span>

                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#C5A25D]">
                  {doc.category}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-mono">
                  {currentIndex + 1} de {documents.length}
                </span>
                
                {/* Two-sided status badges */}
                {hasBothSides ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Ambas Caras Cargadas (2/2)
                  </span>
                ) : hasFront ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Cara 1 Cargada (1/2)
                  </span>
                ) : hasBack ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Cara 2 Cargada (1/2)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Por adjuntar (Ambas Caras)
                  </span>
                )}
              </div>
              <h2 className="text-xs sm:text-sm font-bold truncate text-white max-w-xs sm:max-w-md md:max-w-lg">
                {doc.title}
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-[#C5A25D] border border-[#C5A25D]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copiar código de registro"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar Registro</span>
                </>
              )}
            </button>

            {hasAnySide && (
              <button
                onClick={hasBothSides ? handleDownloadBoth : () => handleDownloadSide(hasFront ? 'front' : 'back')}
                className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                title={hasBothSides ? 'Descargar ambas caras' : 'Descargar archivo digital'}
              >
                <Download className="w-3.5 h-3.5 text-[#C5A25D]" />
                <span className="hidden sm:inline">
                  {hasBothSides ? 'Descargar (2 Caras)' : 'Descargar'}
                </span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-[#C5A25D] hover:bg-[#b08e4d] text-[#14213D] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Imprimir ficha técnica o documento"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <div className="h-5 w-[1px] bg-white/20 mx-1 hidden sm:block" />

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hidden File Inputs for individual or dual upload with universal format support */}
        <input
          id="modal-upload-front"
          type="file"
          ref={frontInputRef}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUploadSingleSide(f, 'front');
            e.target.value = '';
          }}
          accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
          className="hidden"
        />

        <input
          id="modal-upload-back"
          type="file"
          ref={backInputRef}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUploadSingleSide(f, 'back');
            e.target.value = '';
          }}
          accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
          className="hidden"
        />

        <input
          id="modal-upload-dual"
          type="file"
          ref={dualInputRef}
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) handleUploadDualFiles(files);
            e.target.value = '';
          }}
          accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
          className="hidden"
        />

        {/* Sub-header Navigation & Tabs */}
        <div className="bg-[#ECE7DF] px-4 sm:px-6 py-2.5 border-b border-[#DCD5C9] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          
          {/* Main Tabs */}
          <div className="flex items-center gap-1 bg-[#DCD5C9]/60 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('digitalDoc')}
              className={`px-3 py-1 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'digitalDoc'
                  ? 'bg-white text-[#14213D] shadow-xs'
                  : 'text-slate-600 hover:text-[#14213D]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C5A25D]" />
              <span>Documento Digital (Ambas Caras)</span>
              {hasBothSides ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Ambas caras cargadas" />
              ) : hasAnySide ? (
                <span className="w-2 h-2 rounded-full bg-sky-500" title="1 cara cargada" />
              ) : null}
            </button>

            <button
              onClick={() => setActiveTab('technical')}
              className={`px-3 py-1 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'technical'
                  ? 'bg-white text-[#14213D] shadow-xs'
                  : 'text-slate-600 hover:text-[#14213D]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#2D5A34]" />
              <span>Ficha Técnica y Validez</span>
            </button>
          </div>

          {/* Prev / Next Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                currentIndex === 0
                  ? 'border-slate-300 text-slate-300 cursor-not-allowed bg-transparent'
                  : 'border-[#DCD5C9] bg-white text-[#14213D] hover:border-[#C5A25D]'
              }`}
              title="Documento anterior (Flecha Izquierda)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <span className="font-mono text-xs text-slate-500 font-semibold px-1">
              {currentIndex + 1} / {documents.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === documents.length - 1}
              className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                currentIndex === documents.length - 1
                  ? 'border-slate-300 text-slate-300 cursor-not-allowed bg-transparent'
                  : 'border-[#DCD5C9] bg-white text-[#14213D] hover:border-[#C5A25D]'
              }`}
              title="Siguiente documento (Flecha Derecha)"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* TAB 1: DOCUMENTO DIGITAL OFICIAL (Two-sided manager & viewer) */}
          {activeTab === 'digitalDoc' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Document Overview Bar */}
              <div className="bg-white rounded-2xl border border-[#DCD5C9] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#C5A25D]">
                      Acreditación Oficial
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-mono font-bold text-[#2D5A34]">
                      {doc.registrationNumber}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#14213D] leading-snug">
                    {doc.title}
                  </h3>
                  <div className="text-xs text-slate-600">
                    {doc.institution} · Titular: <strong className="text-[#14213D]">{doc.recipient}</strong> (CIP N° 322074)
                  </div>
                </div>

                {/* Quick side status chips */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <div className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 ${
                    hasFront 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {hasFront ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    <span>Cara 1: {hasFront ? 'Cargada ✓' : 'Pendiente'}</span>
                  </div>

                  <div className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 ${
                    hasBack 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {hasBack ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-2 h-2 rounded-full bg-slate-400" />}
                    <span>Cara 2: {hasBack ? 'Cargada ✓' : 'Pendiente'}</span>
                  </div>
                </div>
              </div>

              {/* Notice / Success / Error banner */}
              {uploadSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-2xs animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {uploadError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Case 1: At least one side is uploaded -> Viewer with Face Selector & Controls */}
              {hasAnySide ? (
                <div className="space-y-4">
                  
                  {/* Two-Sided Navigation & Visualizer Controls */}
                  <div className="bg-white rounded-2xl border border-[#DCD5C9] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                    
                    {/* Face selection tabs */}
                    <div className="flex items-center gap-1.5 bg-[#F5F2EB] p-1 rounded-xl border border-[#DCD5C9]">
                      <button
                        onClick={() => {
                          setActiveSide('front');
                          setViewBothSides(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeSide === 'front' && !viewBothSides
                            ? 'bg-[#14213D] text-[#C5A25D] shadow-xs'
                            : 'text-slate-700 hover:text-[#14213D] hover:bg-white/60'
                        }`}
                      >
                        <span>Cara 1</span>
                        {hasFront ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Cara 1 cargada" />
                        ) : (
                          <span className="text-[10px] text-amber-600 font-mono">(+ Subir)</span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setActiveSide('back');
                          setViewBothSides(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeSide === 'back' && !viewBothSides
                            ? 'bg-[#14213D] text-[#C5A25D] shadow-xs'
                            : 'text-slate-700 hover:text-[#14213D] hover:bg-white/60'
                        }`}
                      >
                        <span>Cara 2</span>
                        {hasBack ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Cara 2 cargada" />
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">(+ Subir)</span>
                        )}
                      </button>

                      {/* Flip Side shortcut if both exist */}
                      {hasBothSides && (
                        <button
                          onClick={toggleSide}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-[#14213D] hover:bg-white/60 flex items-center gap-1 transition-colors cursor-pointer border-l border-[#DCD5C9] ml-1"
                          title="Alternar entre Cara 1 y Cara 2"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5 text-[#C5A25D]" />
                          <span className="hidden sm:inline">Alternar</span>
                        </button>
                      )}

                      {/* View Both Sides side-by-side if both exist */}
                      {hasBothSides && (
                        <button
                          onClick={() => setViewBothSides(!viewBothSides)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            viewBothSides
                              ? 'bg-[#14213D] text-[#C5A25D] shadow-xs ring-2 ring-[#C5A25D]/60 font-extrabold'
                              : 'text-slate-700 hover:text-[#14213D] hover:bg-white/60'
                          }`}
                          title="Ver ambas caras simultáneamente en una sola visión"
                        >
                          <Columns2 className="w-3.5 h-3.5 text-[#C5A25D]" />
                          <span>Ambas Caras (Visión Unificada)</span>
                        </button>
                      )}
                    </div>

                    {/* Viewer Controls (Zoom, Rotate, Replace, Delete) */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {!viewBothSides && activeFile && !isActivePdf && (
                        <>
                          <button
                            onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                            className="p-1.5 rounded-lg border border-[#DCD5C9] bg-slate-50 hover:bg-white text-slate-700 hover:text-[#14213D] cursor-pointer transition-colors"
                            title="Reducir zoom"
                          >
                            <ZoomOut className="w-4 h-4" />
                          </button>

                          <span className="text-xs font-mono font-bold text-slate-600 px-1 min-w-[48px] text-center">
                            {Math.round(zoomLevel * 100)}%
                          </span>

                          <button
                            onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                            className="p-1.5 rounded-lg border border-[#DCD5C9] bg-slate-50 hover:bg-white text-slate-700 hover:text-[#14213D] cursor-pointer transition-colors"
                            title="Aumentar zoom"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setRotation(prev => (prev + 90) % 360)}
                            className="p-1.5 rounded-lg border border-[#DCD5C9] bg-slate-50 hover:bg-white text-slate-700 hover:text-[#14213D] cursor-pointer transition-colors"
                            title="Girar 90°"
                          >
                            <RotateCw className="w-4 h-4" />
                          </button>

                          <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />
                        </>
                      )}

                      {/* PDF shortcut button if viewing PDF */}
                      {!viewBothSides && isActivePdf && activePdfBlobUrl && (
                        <a
                          href={activePdfBlobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-[#DCD5C9] bg-slate-50 hover:bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Abrir PDF en pestaña separada"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#C5A25D]" />
                          <span className="hidden sm:inline">Abrir PDF</span>
                        </a>
                      )}

                      {/* Replace or upload button for current side */}
                      <label
                        htmlFor={activeSide === 'front' ? 'modal-upload-front' : 'modal-upload-back'}
                        className="px-3 py-1.5 rounded-lg bg-[#14213D] text-[#C5A25D] hover:bg-[#1E335C] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        title={activeFile ? `Reemplazar ${activeSide === 'front' ? 'Cara 1' : 'Cara 2'}` : `Subir ${activeSide === 'front' ? 'Cara 1' : 'Cara 2'}`}
                      >
                        <FileUp className="w-3.5 h-3.5" />
                        <span>{activeFile ? `Reemplazar ${activeSide === 'front' ? 'Cara 1' : 'Cara 2'}` : `Subir ${activeSide === 'front' ? 'Cara 1' : 'Cara 2'}`}</span>
                      </label>

                      {/* Delete button */}
                      {activeFile && (
                        <button
                          onClick={handleRemoveCurrentSide}
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title={`Quitar ${activeSide === 'front' ? 'Cara 1' : 'Cara 2'}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Missing Side Callout if only 1 side is uploaded */}
                  {!hasBothSides && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C5A25D] shrink-0" />
                        <span className="text-amber-950 font-medium">
                          {hasFront ? (
                            <><strong>Cara 1 cargada con éxito.</strong> Puedes adjuntar la <strong>Cara 2</strong> para completar ambas caras del documento.</>
                          ) : (
                            <><strong>Cara 2 cargada con éxito.</strong> Puedes adjuntar la <strong>Cara 1</strong> para completar ambas caras del documento.</>
                          )}
                        </span>
                      </div>
                      <label
                        htmlFor={!hasFront ? "modal-upload-front" : "modal-upload-back"}
                        className="px-3.5 py-1.5 rounded-xl bg-[#14213D] hover:bg-[#1E335C] text-[#C5A25D] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{hasFront ? '+ Subir Cara 2' : '+ Subir Cara 1'}</span>
                      </label>
                    </div>
                  )}

                  {/* Surface Display Area */}
                  {viewBothSides && hasBothSides ? (
                    /* Side-by-side Dual View */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Cara 1 Card */}
                      <div className="bg-slate-900/95 rounded-2xl border-2 border-[#C5A25D]/40 p-4 flex flex-col space-y-3 shadow-inner">
                        <div className="flex items-center justify-between text-xs text-white/90 pb-2 border-b border-white/10">
                          <span className="font-bold flex items-center gap-1.5 text-[#C5A25D]">
                            <Award className="w-3.5 h-3.5" />
                            Cara 1
                          </span>
                          <div className="flex items-center gap-2">
                            {currentDocEntry.front?.startsWith('data:application/pdf') && frontBlobUrl && (
                              <a
                                href={frontBlobUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-[#C5A25D] hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Abrir</span>
                              </a>
                            )}
                            <button
                              onClick={() => handleDownloadSide('front')}
                              className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-[#C5A25D]" />
                              <span>Descargar</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center min-h-[360px] max-h-[55vh] overflow-auto">
                          {currentDocEntry.front?.startsWith('data:application/pdf') ? (
                            <object 
                              data={frontBlobUrl || currentDocEntry.front} 
                              type="application/pdf"
                              className="w-full h-[50vh] bg-white rounded-lg border-0"
                            >
                              <div className="flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                                <FileText className="w-10 h-10 text-[#C5A25D]" />
                                <span className="font-bold text-xs">PDF Cara 1 ({currentDocEntry.frontName || 'documento.pdf'})</span>
                                <div className="flex gap-2">
                                  {frontBlobUrl && (
                                    <a href={frontBlobUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-[#C5A25D] text-[#14213D] font-bold text-xs">
                                      Abrir PDF
                                    </a>
                                  )}
                                  <button onClick={() => handleDownloadSide('front')} className="px-3 py-1 rounded-lg bg-white/20 text-white font-bold text-xs">
                                    Descargar
                                  </button>
                                </div>
                              </div>
                            </object>
                          ) : (
                            <img 
                              src={currentDocEntry.front!} 
                              alt="Cara 1" 
                              className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-xl bg-white"
                            />
                          )}
                        </div>
                      </div>

                      {/* Cara 2 Card */}
                      <div className="bg-slate-900/95 rounded-2xl border-2 border-[#C5A25D]/40 p-4 flex flex-col space-y-3 shadow-inner">
                        <div className="flex items-center justify-between text-xs text-white/90 pb-2 border-b border-white/10">
                          <span className="font-bold flex items-center gap-1.5 text-[#C5A25D]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A34]" />
                            Cara 2
                          </span>
                          <div className="flex items-center gap-2">
                            {currentDocEntry.back?.startsWith('data:application/pdf') && backBlobUrl && (
                              <a
                                href={backBlobUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-[#C5A25D] hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Abrir</span>
                              </a>
                            )}
                            <button
                              onClick={() => handleDownloadSide('back')}
                              className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-[#C5A25D]" />
                              <span>Descargar</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center min-h-[360px] max-h-[55vh] overflow-auto">
                          {currentDocEntry.back?.startsWith('data:application/pdf') ? (
                            <object 
                              data={backBlobUrl || currentDocEntry.back} 
                              type="application/pdf"
                              className="w-full h-[50vh] bg-white rounded-lg border-0"
                            >
                              <div className="flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                                <FileText className="w-10 h-10 text-[#C5A25D]" />
                                <span className="font-bold text-xs">PDF Cara 2 ({currentDocEntry.backName || 'documento.pdf'})</span>
                                <div className="flex gap-2">
                                  {backBlobUrl && (
                                    <a href={backBlobUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-[#C5A25D] text-[#14213D] font-bold text-xs">
                                      Abrir PDF
                                    </a>
                                  )}
                                  <button onClick={() => handleDownloadSide('back')} className="px-3 py-1 rounded-lg bg-white/20 text-white font-bold text-xs">
                                    Descargar
                                  </button>
                                </div>
                              </div>
                            </object>
                          ) : (
                            <img 
                              src={currentDocEntry.back!} 
                              alt="Cara 2" 
                              className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-xl bg-white"
                            />
                          )}
                        </div>
                      </div>

                    </div>
                  ) : activeFile ? (
                    /* Single Side Detailed Viewer */
                    <div className="bg-slate-900/90 rounded-2xl border-2 border-[#C5A25D]/40 p-3 sm:p-6 overflow-auto flex flex-col items-center justify-center min-h-[460px] max-h-[68vh] shadow-inner relative">
                      
                      {/* Active side indicator tag inside canvas */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#C5A25D] text-[11px] font-bold font-mono border border-white/10 flex items-center gap-1.5">
                          {activeSide === 'front' ? 'Cara 1' : 'Cara 2'}
                        </span>
                        {isActivePdf && (
                          <span className="px-2.5 py-1 rounded-full bg-[#14213D]/90 backdrop-blur-md text-slate-200 text-[10.5px] font-mono border border-[#C5A25D]/30 flex items-center gap-1">
                            <FileText className="w-3 h-3 text-[#C5A25D]" />
                            <span>Formato PDF Oficial</span>
                          </span>
                        )}
                      </div>

                      {isActivePdf ? (
                        <div className="w-full h-[62vh] bg-white rounded-xl overflow-hidden flex flex-col">
                          <object 
                            data={activePdfBlobUrl || activeFile} 
                            type="application/pdf"
                            className="w-full h-full border-0"
                          >
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-900 text-white space-y-4">
                              <FileText className="w-14 h-14 text-[#C5A25D]" />
                              <div className="space-y-1">
                                <h4 className="font-bold text-sm">
                                  Documento PDF ({activeSide === 'front' ? 'Cara 1' : 'Cara 2'})
                                </h4>
                                <p className="text-xs text-slate-300 font-mono">
                                  {currentDocEntry[activeSide === 'front' ? 'frontName' : 'backName'] || `${doc.title}.pdf`}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 pt-2">
                                {activePdfBlobUrl && (
                                  <a
                                    href={activePdfBlobUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-xl bg-[#C5A25D] hover:bg-[#b08e4d] text-[#14213D] font-bold text-xs flex items-center gap-2 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Abrir PDF Completo</span>
                                  </a>
                                )}
                                <button
                                  onClick={() => handleDownloadSide(activeSide)}
                                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-colors"
                                >
                                  <Download className="w-4 h-4 text-[#C5A25D]" />
                                  <span>Descargar PDF</span>
                                </button>
                              </div>
                            </div>
                          </object>
                        </div>
                      ) : (
                        <div 
                          className="transition-transform duration-200 ease-out origin-center flex items-center justify-center"
                          style={{
                            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
                          }}
                        >
                          <img 
                            src={activeFile} 
                            alt={`${doc.title} - ${activeSide === 'front' ? 'Cara 1' : 'Cara 2'}`}
                            className="max-h-[62vh] max-w-full object-contain rounded-lg shadow-2xl bg-white"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* The selected side is not yet uploaded -> Direct dropzone for this side */
                    <label 
                      htmlFor={activeSide === 'front' ? 'modal-upload-front' : 'modal-upload-back'}
                      className="bg-white rounded-3xl border-2 border-dashed border-[#C5A25D]/70 p-8 sm:p-12 text-center cursor-pointer hover:bg-slate-50 transition-colors shadow-xs block"
                    >
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#14213D] text-[#C5A25D] flex items-center justify-center shadow-md">
                          <Upload className="w-7 h-7" />
                        </div>
                        <h4 className="text-base font-bold text-[#14213D]">
                          Subir {activeSide === 'front' ? 'Cara 1' : 'Cara 2'}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Adjunta el archivo digital escaneado correspondiente a la {activeSide === 'front' ? 'Cara 1' : 'Cara 2'} de este documento.
                        </p>
                        <div
                          className="px-5 py-2.5 rounded-xl bg-[#14213D] hover:bg-[#1E335C] text-[#C5A25D] font-bold text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer w-fit shadow-xs"
                        >
                          <FileUp className="w-4 h-4" />
                          <span>Seleccionar archivo para {activeSide === 'front' ? 'Cara 1' : 'Cara 2'}</span>
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Summary & Dual Download Pill */}
                  <div className="bg-white rounded-2xl border border-[#DCD5C9] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-[#14213D] text-sm">
                        {doc.documentTitle} · {doc.institution}
                      </div>
                      <div className="text-slate-600">
                        Titular acreditado: <strong className="text-[#14213D]">{doc.recipient}</strong> (CIP N° 322074)
                      </div>
                      <div className="text-slate-500 font-mono text-[11px]">
                        Código oficial: {doc.registrationNumber} · Emisión: {doc.dateIssued}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      {hasBothSides ? (
                        <button
                          onClick={handleDownloadBoth}
                          className="px-3.5 py-2 rounded-xl bg-[#14213D] hover:bg-[#1E335C] text-[#C5A25D] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar Ambas Caras (2/2)</span>
                        </button>
                      ) : activeFile ? (
                        <button
                          onClick={() => handleDownloadSide(activeSide)}
                          className="px-3.5 py-2 rounded-xl bg-[#F5F2EB] hover:bg-[#14213D] text-[#14213D] hover:text-[#C5A25D] border border-[#DCD5C9] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C5A25D]" />
                          <span>Descargar {activeSide === 'front' ? 'Cara 1' : 'Cara 2'}</span>
                        </button>
                      ) : null}

                      <button
                        onClick={handleRemoveAllSides}
                        className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer"
                        title="Eliminar ambas caras de este documento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* Case 2: Neither side is uploaded -> Dedicated "Subir Ambas Caras" Upload Zone */
                <div className="space-y-6">
                  
                  {/* Top explanation header */}
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14213D] text-[#C5A25D] text-xs font-bold font-mono">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Carga Documentaria Digital</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#14213D]">
                      Subir Ambas Caras del Documento
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Carga los archivos digitales correspondientes a ambas caras del documento (PDF, JPG, PNG o WEBP). Puedes seleccionar ambos archivos a la vez o arrastrarlos a este espacio.
                    </p>
                  </div>

                  {/* Main Dropzone: Subir Ambas Caras */}
                  <label
                    htmlFor="modal-upload-dual"
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingDual(false);
                      const files = e.dataTransfer.files;
                      if (files && files.length > 0) handleUploadDualFiles(files);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingDual(true);
                    }}
                    onDragLeave={() => setIsDraggingDual(false)}
                    className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer bg-white group flex flex-col items-center justify-center space-y-4 shadow-xs block ${
                      isDraggingDual
                        ? 'border-[#C5A25D] bg-[#FFFBF2] scale-[1.01] shadow-lg ring-4 ring-[#C5A25D]/20'
                        : 'border-[#C5A25D]/70 hover:border-[#14213D] hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#14213D] text-[#C5A25D] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform mx-auto">
                      <Layers className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5 max-w-md mx-auto">
                      <h4 className="text-base sm:text-lg font-bold text-[#14213D]">
                        Arrastra o selecciona ambas caras aquí
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Haz clic para elegir las 2 caras de este documento o suéltalas en este recuadro.
                      </p>
                    </div>

                    <div className="pt-2">
                      <div
                        className="py-3 px-6 rounded-xl bg-[#14213D] group-hover:bg-[#1E335C] text-[#C5A25D] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md mx-auto w-fit"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Procesando archivos...</span>
                          </>
                        ) : (
                          <>
                            <FileUp className="w-4 h-4" />
                            <span>Subir Ambas Caras</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 pt-1">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                        Cara 1 + Cara 2
                      </span>
                      <span>·</span>
                      <span>Formatos: PDF, JPG, PNG o WEBP</span>
                    </div>
                  </label>

                  {/* Official Metadata Verification Card */}
                  <div className="bg-white rounded-2xl border border-[#DCD5C9] p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD3]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#2D5A34]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                          Datos Oficiales del Registro Acreditado:
                        </h4>
                      </div>
                      <span className="text-[11px] text-[#C5A25D] font-mono font-bold">
                        Colegiatura CIP N° 322074
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9]">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                          Institución Emisora
                        </span>
                        <div className="font-bold text-[#14213D]">
                          {doc.institution}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9]">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                          Registro / Folio
                        </span>
                        <div className="font-bold font-mono text-[#C5A25D]">
                          {doc.registrationNumber}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9]">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                          Horas / Calificación
                        </span>
                        <div className="font-bold text-[#2D5A34]">
                          {doc.grade || doc.hoursOrCredits || 'Acreditado Oficialmente'}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {doc.summaryText}
                    </p>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 2: FICHA TÉCNICA Y VALIDEZ DOCUMENTARIA */}
          {activeTab === 'technical' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#DCD5C9] p-6 sm:p-8 space-y-6 shadow-xs">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD3]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5A34]">
                    Ficha Técnica de Validez Documentaria
                  </span>
                  <h3 className="text-lg font-bold text-[#14213D]">
                    {doc.title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verificado
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9] space-y-1">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block">
                    Entidad Emisora
                  </span>
                  <div className="font-bold text-[#14213D] text-sm">
                    {doc.institution}
                  </div>
                  <div className="text-slate-600">
                    Tipo: {doc.category}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9] space-y-1">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block">
                    Código de Registro / Folio Oficial
                  </span>
                  <div className="font-bold text-[#C5A25D] text-sm font-mono flex items-center justify-between">
                    <span>{doc.registrationNumber}</span>
                    <button 
                      onClick={handleCopyCode}
                      className="text-slate-500 hover:text-[#14213D] cursor-pointer"
                      title="Copiar código"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-slate-600">
                    Fecha de Emisión: {doc.dateIssued}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9] space-y-1">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block">
                    Horas / Calificación
                  </span>
                  <div className="font-bold text-[#14213D] text-sm">
                    {doc.hoursOrCredits || 'Acreditación Profesional'}
                  </div>
                  <div className="text-emerald-700 font-semibold">
                    {doc.grade || 'Aprobado satisfactoriamente'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9] space-y-1">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block">
                    Titular / Acreditada
                  </span>
                  <div className="font-bold text-[#14213D] text-sm">
                    {doc.recipient}
                  </div>
                  <div className="text-[#C5A25D] font-mono font-bold">
                    {doc.recipientId} · CIP N° 322074
                  </div>
                </div>
              </div>

              {/* Text Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                  Certificación Detallada:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-[#F5F2EB]/50 p-4 rounded-xl border border-[#DCD5C9]">
                  {doc.summaryText}
                </p>
              </div>

              {/* Topics if available */}
              {doc.topicsOrModules && doc.topicsOrModules.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C5A25D]" />
                    <span>Contenidos y Alcances Técnicos Evaluados:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 bg-[#F5F2EB]/40 p-3.5 rounded-xl border border-[#DCD5C9]">
                    {doc.topicsOrModules.map((mod, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#2D5A34] font-bold shrink-0">✓</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Legal Norms */}
              {doc.legalArticlesOrNorms && doc.legalArticlesOrNorms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                    Marco Regulatorio & Leyes Aplicables:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.legalArticlesOrNorms.map((norm, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-[#14213D] text-[#C5A25D] text-xs font-mono font-bold">
                        {norm}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification QR Box */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#F5F2EB] p-4 rounded-xl border border-[#DCD5C9]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR de Verificación" className="w-20 h-20 shrink-0 bg-white p-1 rounded-lg border border-[#DCD5C9]" />
                ) : (
                  <div className="w-20 h-20 bg-slate-200 animate-pulse rounded" />
                )}
                <div className="text-xs space-y-1 text-center sm:text-left">
                  <div className="font-bold text-[#14213D] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#2D5A34]" />
                    <span>Acreditación Digital Verificable</span>
                  </div>
                  <div className="text-slate-600 font-mono text-[11px]">
                    Folio: {doc.registrationNumber} · CIP N° 322074
                  </div>
                  <div className="text-emerald-700 font-bold text-[11px]">
                    ● Documento con validez legal acreditada
                  </div>
                </div>
              </div>

              {/* Signatories */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD3]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                  Autoridades Firmantes Oficiales:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {doc.signatures.map((sig, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-[#DCD5C9] bg-slate-50">
                      <div className="font-bold text-[#14213D]">{sig.name}</div>
                      <div className="text-slate-600 text-[11px]">{sig.title}</div>
                      <div className="text-[#C5A25D] text-[10.5px] font-semibold">{sig.entity}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-[#14213D] text-slate-300 px-4 sm:px-6 py-3 border-t border-[#C5A25D]/30 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#C5A25D]" />
            <span>Gestión y Visualización de Documentos Digitales (Ambas Caras) · Ing. Rocío Milagros Paredes Gamarra</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer text-xs"
            >
              Cerrar Visor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
