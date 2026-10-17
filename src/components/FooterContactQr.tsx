import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Smartphone, 
  Globe, 
  MessageSquare, 
  ExternalLink, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Maximize2, 
  X, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useCvData } from '../context/CvDataContext';

type QrMode = 'vcard' | 'website' | 'whatsapp';

export const FooterContactQr: React.FC = () => {
  const { cvData } = useCvData();
  const [activeMode, setActiveMode] = useState<QrMode>('vcard');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const phoneDigits = cvData.personal.phone.replace(/\s+/g, '');
  const internationalPhone = `+51${phoneDigits}`;
  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-wzbleyewlww7ndp4pjyley-470984393467.us-west1.run.app';

  // Construct standard vCard 3.0 string
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Paredes Gamarra;Rocío;Milagros;Ing.;',
    'FN:Ing. Rocío Milagros Paredes Gamarra',
    'ORG:Ingeniería Ambiental & SSOMA en Minería',
    'TITLE:Ingeniera Ambiental · CIP N° 322074 (Habilitada)',
    `TEL;TYPE=CELL,VOICE,PREF:${internationalPhone}`,
    `EMAIL;TYPE=WORK,INTERNET,PREF:${cvData.personal.email}`,
    `ADR;TYPE=WORK,POSTAL:;;${cvData.personal.location};;;Perú`,
    `NOTE:Ingeniera Ambiental Colegiada CIP N° 322074. Especialista en Supervisión SSOMA Minería, IGA, Fiscalización OEFA y Programación con IA Ambiental.`,
    `URL:${siteUrl}`,
    'END:VCARD'
  ].join('\r\n');

  // WhatsApp link with pre-filled message
  const whatsappUrl = `https://wa.me/51${phoneDigits}?text=${encodeURIComponent(
    'Hola Ing. Rocío Paredes, revisé su perfil profesional ejecutivo y me gustaría ponerme en contacto con usted.'
  )}`;

  // Determine payload string based on mode
  const getPayload = (mode: QrMode): string => {
    switch (mode) {
      case 'vcard':
        return vCardContent;
      case 'website':
        return siteUrl;
      case 'whatsapp':
        return whatsappUrl;
    }
  };

  // Generate QR Code data URL
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const payload = getPayload(activeMode);
    
    QRCode.toDataURL(payload, {
      width: 480,
      margin: 1.5,
      color: {
        dark: '#14213D', // Deep Luxury Navy
        light: '#FFFFFF', // Pure White for crisp scan contrast
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeMode, siteUrl]);

  // Download .vcf file directly
  const handleDownloadVCard = () => {
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ing_Rocio_Paredes_Gamarra_CIP_322074.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy contact details to clipboard
  const handleCopyContact = () => {
    const contactText = [
      `Ing. ${cvData.personal.fullName}`,
      `Colegiatura: ${cvData.personal.cip} (Habilitada)`,
      `Título: ${cvData.personal.title}`,
      `Teléfono: +51 ${cvData.personal.phone}`,
      `Email: ${cvData.personal.email}`,
      `Ubicación: ${cvData.personal.location}`,
      `Perfil Digital: ${siteUrl}`
    ].join('\n');

    navigator.clipboard.writeText(contactText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section aria-label="Código QR de Contacto Ejecutivo" className="w-full">
      {/* Luxury Editorial Dossier Card */}
      <div className="bg-white border border-[#DCD5C9] rounded-2xl shadow-sm overflow-hidden">
        
        {/* Top Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#C5A25D] via-[#D8B46E] to-[#C5A25D]" />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Context & Value for Recruiters (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Badge & CIP Habilitada */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#14213D] text-[#C5A25D]">
                  <QrCode className="w-3.5 h-3.5" />
                  Contacto Instantáneo
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#2D5A34]/10 text-[#2D5A34] border border-[#2D5A34]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  CIP N° 322074 Habilitada
                </span>
              </div>

              {/* Editorial Heading */}
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-[0.02em] leading-tight">
                  Guarda mi Contacto Directo en tu Agenda
                </h3>
                <p className="mt-2 text-sm text-[#2B3545] leading-relaxed">
                  Escanea el código QR con la cámara de tu smartphone para agregar automáticamente los datos 
                  profesionales de la <strong className="text-[#14213D]">Ing. Rocío Paredes Gamarra</strong> a tus contactos 
                  (nombre, CIP, correo, teléfono celular y enlace al CV digital) sin necesidad de tipear nada.
                </p>
              </div>

              {/* Mode Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveMode('vcard')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    activeMode === 'vcard'
                      ? 'bg-[#14213D] text-[#C5A25D] border-[#14213D] shadow-xs'
                      : 'bg-[#F5F2EB] text-[#14213D] border-[#DCD5C9] hover:bg-[#EBE5DB]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Guardar Contacto (vCard)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMode('whatsapp')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    activeMode === 'whatsapp'
                      ? 'bg-[#2D5A34] text-white border-[#2D5A34] shadow-xs'
                      : 'bg-[#F5F2EB] text-[#14213D] border-[#DCD5C9] hover:bg-[#EBE5DB]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Directo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMode('website')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    activeMode === 'website'
                      ? 'bg-[#14213D] text-[#C5A25D] border-[#14213D] shadow-xs'
                      : 'bg-[#F5F2EB] text-[#14213D] border-[#DCD5C9] hover:bg-[#EBE5DB]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Enlace Web del CV</span>
                </button>
              </div>

              {/* Action Buttons: vCard Download & Copy */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="px-4 py-2.5 rounded-xl bg-[#C5A25D] hover:bg-[#b08e48] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Tarjeta vCard (.vcf)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyContact}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5F2EB] text-[#14213D] border border-[#DCD5C9] text-xs font-bold transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2D5A34]" />
                      <span className="text-[#2D5A34]">¡Datos Copiados!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C5A25D]" />
                      <span>Copiar Datos de Contacto</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Contact Micro-Dossier */}
              <div className="pt-4 border-t border-[#E5DFD3] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-[#C5A25D] shrink-0" />
                  <a href={`tel:${internationalPhone}`} className="font-mono font-bold hover:text-[#C5A25D] transition-colors">
                    +51 {cvData.personal.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-[#C5A25D] shrink-0" />
                  <a href={`mailto:${cvData.personal.email}`} className="truncate font-medium hover:text-[#C5A25D] transition-colors">
                    {cvData.personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A25D] shrink-0" />
                  <span className="font-medium">{cvData.personal.location}</span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Resolution Luxury QR Frame (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              <div className="relative bg-[#F5F2EB] p-5 sm:p-6 rounded-2xl border-2 border-[#C5A25D]/60 shadow-md text-center max-w-xs w-full">
                
                {/* Header Tag */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#14213D] bg-white px-2.5 py-0.5 rounded-full border border-[#DCD5C9]">
                    {activeMode === 'vcard' ? 'Formato vCard 3.0' : activeMode === 'whatsapp' ? 'Chat WhatsApp' : 'Navegación Web'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-slate-500 hover:text-[#14213D] transition-colors p-1"
                    title="Ampliar Código QR"
                    aria-label="Ampliar Código QR"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* QR Code Container */}
                <div className="relative mx-auto bg-white p-3 rounded-xl border border-[#DCD5C9] shadow-inner flex items-center justify-center w-52 h-52 group cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  {isLoading ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <div className="w-6 h-6 border-2 border-[#C5A25D] border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-[10px] font-mono">Generando QR...</span>
                    </div>
                  ) : qrDataUrl ? (
                    <>
                      <img 
                        src={qrDataUrl} 
                        alt="Código QR de Contacto Ejecutivo - Ing. Rocío Paredes Gamarra" 
                        className="w-full h-full object-contain transition duration-300 group-hover:scale-102"
                      />
                      {/* Centered Monogram / Seal Icon */}
                      <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#14213D] border-2 border-[#C5A25D] flex items-center justify-center shadow-md pointer-events-none">
                        <span className="text-[11px] font-serif-luxury font-bold text-[#C5A25D] tracking-tight">RP</span>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Scanner Instructions */}
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-bold text-[#14213D] flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C5A25D]" />
                    <span>Apunta la cámara de tu teléfono</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Compatible con iOS (iPhone), Android y lectores vCard
                  </p>
                </div>

                {/* Direct quick action under QR */}
                <div className="mt-4 pt-3 border-t border-[#DCD5C9] flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-xs font-bold text-[#14213D] hover:text-[#C5A25D] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver pantalla completa</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Expanded Modal for High-Visibility QR Presentation */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/80 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#F5F2EB] border border-[#C5A25D] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="bg-[#14213D] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A25D]">
                  Dossier de Contacto Ejecutivo
                </span>
                <h4 className="font-serif-luxury text-lg font-bold">
                  Ing. Rocío Milagros Paredes G.
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-center space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#DCD5C9] shadow-md inline-block">
                {qrDataUrl && (
                  <div className="relative">
                    <img 
                      src={qrDataUrl} 
                      alt="Código QR de Contacto Ejecutivo" 
                      className="w-64 h-64 mx-auto object-contain"
                    />
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#14213D] border-2 border-[#C5A25D] flex items-center justify-center shadow-lg pointer-events-none">
                      <span className="text-xs font-serif-luxury font-bold text-[#C5A25D] tracking-tight">RP</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5A34]/10 text-[#2D5A34] border border-[#2D5A34]/30 text-xs font-bold uppercase mb-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Contacto Directo para Reclutadores</span>
                </div>
                <p className="text-xs text-[#2B3545] leading-relaxed max-w-xs mx-auto">
                  Al escanear con la cámara se abrirá la opción de <strong className="text-[#14213D]">«Crear Contacto»</strong> con 
                  todos sus antecedentes profesionales y credenciales CIP registrados.
                </p>
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="px-4 py-2.5 rounded-xl bg-[#C5A25D] hover:bg-[#b08e48] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar .vcf</span>
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#2D5A34] hover:bg-[#234528] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Abrir WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#EBE5DB] px-6 py-3 border-t border-[#DCD5C9] text-center">
              <span className="text-[11px] font-mono text-[#14213D] font-bold">
                CIP N° 322074 · Habilitada · Arequipa, Perú
              </span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
