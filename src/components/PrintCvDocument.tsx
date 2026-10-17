import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useCvData } from '../context/CvDataContext';
import rocioExecutiveAvatar from '../assets/images/rocio_executive_avatar_1790208523556.jpg';
import { Phone, Mail, MapPin, ShieldCheck, GraduationCap, Award, QrCode } from 'lucide-react';

export const PrintCvDocument: React.FC = () => {
  const { cvData } = useCvData();
  const { personal, strategicProfile, aiEnvironmentalSpecialty, workExperience, certifications, softSkills } = cvData;
  const [printQrUrl, setPrintQrUrl] = useState<string>('');

  useEffect(() => {
    const phoneDigits = personal.phone.replace(/\s+/g, '');
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Paredes Gamarra;Rocío;Milagros;Ing.;',
      'FN:Ing. Rocío Milagros Paredes Gamarra',
      'ORG:Ingeniería Ambiental & SSOMA en Minería',
      'TITLE:Ingeniera Ambiental · CIP N° 322074 (Habilitada)',
      `TEL;TYPE=CELL,VOICE,PREF:+51${phoneDigits}`,
      `EMAIL;TYPE=WORK,INTERNET,PREF:${personal.email}`,
      `ADR;TYPE=WORK,POSTAL:;;${personal.location};;;Perú`,
      `NOTE:Ingeniera Ambiental CIP N° 322074. Supervisión SSOMA, IGA, Fiscalización OEFA y Programación con IA Ambiental.`,
      'END:VCARD'
    ].join('\r\n');

    QRCode.toDataURL(vCard, {
      width: 240,
      margin: 1,
      color: {
        dark: '#14213D',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    }).then(url => setPrintQrUrl(url)).catch(() => {});
  }, [personal]);

  return (
    <div className="print-only text-[#14213D] bg-white p-6 max-w-[210mm] mx-auto text-[9pt] leading-normal font-sans">
      
      {/* Two Column Container */}
      <div className="flex border border-[#DCD5C9] rounded-xl overflow-hidden shadow-none">
        
        {/* Left Column (Cream/Linen background ~34% width) */}
        <div className="w-[34%] bg-[#F5F2EB] p-5 border-r border-[#E5DFD3] flex flex-col justify-between space-y-5">
          
          {/* Top Arch Photo Container */}
          <div className="flex flex-col items-center text-center -mx-5 -mt-5 pt-5 pb-4 px-4 bg-[#EBE5DB]/70 rounded-br-[36px] border-b border-[#DCD5C9]">
            <div className="w-28 h-28 rounded-full p-1 border-2 border-[#C5A25D] bg-white shadow-sm overflow-hidden mb-2">
              <img
                src={
                  personal.avatarUrl && !personal.avatarUrl.startsWith('/src/')
                    ? personal.avatarUrl
                    : rocioExecutiveAvatar
                }
                alt="Ing. Rocío Milagros Paredes Gamarra"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== rocioExecutiveAvatar) {
                    target.src = rocioExecutiveAvatar;
                  }
                }}
              />
            </div>
            <span className="text-[8pt] font-mono font-bold text-[#14213D] bg-white px-2 py-0.5 rounded border border-[#C5A25D]/50 shadow-2xs">
              CIP N° 322074
            </span>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[8.5pt] font-bold tracking-[0.2em] text-[#14213D] uppercase pb-1 border-b border-[#C5A25D] mb-2.5">
              CONTACTO
            </h3>
            <div className="space-y-2 text-[8pt] text-[#2B3545]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0">
                  <Phone className="w-2.5 h-2.5" />
                </div>
                <span>{personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0">
                  <Mail className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">{personal.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0">
                  <MapPin className="w-2.5 h-2.5" />
                </div>
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#14213D] text-[#C5A25D] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
                <span>Habilitada · Disponibilidad Inmediata</span>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-[8.5pt] font-bold tracking-[0.2em] text-[#14213D] uppercase pb-1 border-b border-[#C5A25D] mb-2">
              EDUCACIÓN
            </h3>
            <div className="text-[8pt] text-[#2B3545] space-y-1">
              <div className="font-bold text-[#14213D]">
                Título Profesional de Ingeniera Ambiental
              </div>
              <div className="text-slate-600">
                {personal.university}
              </div>
              <div className="text-[7.5pt] font-mono text-[#C5A25D] font-bold">
                Aprobación por Sustentación de Tesis
              </div>
            </div>
          </div>

          {/* Core Competencies Section */}
          <div>
            <h3 className="text-[8.5pt] font-bold tracking-[0.2em] text-[#14213D] uppercase pb-1 border-b border-[#C5A25D] mb-2">
              COMPETENCIAS CLAVE
            </h3>
            <ul className="space-y-1 text-[7.8pt] text-[#2B3545]">
              <li>• Supervisión SSOMA en Minería (D.S. 024)</li>
              <li>• Gestión de IGA (DIA, EIA, IGAFEM, ITS)</li>
              <li>• Fiscalización OEFA y Normativa Sunafil</li>
              <li>• Monitoreo de Agua, Aire, Suelo y Ruido</li>
              <li>• SIG Geoespacial (ArcGIS Pro, QGIS)</li>
              <li>• Programación Python & IA Ambiental</li>
              <li>• Planes de Manejo de Residuos Sólidos</li>
              <li>• Concertación & Relaciones Comunitarias</li>
            </ul>
          </div>

          {/* Languages Section */}
          <div>
            <h3 className="text-[8.5pt] font-bold tracking-[0.2em] text-[#14213D] uppercase pb-1 border-b border-[#C5A25D] mb-2">
              IDIOMAS
            </h3>
            <div className="space-y-1 text-[8pt] text-[#2B3545]">
              {personal.languages.map((l) => (
                <div key={l.name} className="flex justify-between">
                  <span className="font-semibold">{l.name}</span>
                  <span className="text-slate-500 font-medium">({l.level})</span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code for Recruiter Contact */}
          {printQrUrl && (
            <div className="pt-2 border-t border-[#DCD5C9] flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white p-1 rounded-lg border border-[#C5A25D]/60 shadow-2xs mb-1 flex items-center justify-center">
                <img 
                  src={printQrUrl} 
                  alt="QR Contacto vCard" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-[7pt] font-mono text-[#14213D] font-bold">
                Escanear para Guardar Contacto
              </span>
              <span className="text-[6.5pt] text-slate-500">
                vCard 3.0 · Celular / Email / CIP
              </span>
            </div>
          )}

          {/* CIP Certification Seal */}
          <div className="pt-1.5 border-t border-[#DCD5C9] text-[7.5pt] text-slate-500 text-center">
            Incorporación CIP: 17/10/2023 · Registro Oficial
          </div>

        </div>

        {/* Right Column (Pure White background ~66% width) */}
        <div className="w-[66%] bg-white p-6 flex flex-col justify-between space-y-4">
          
          {/* Header Name & Subtitle */}
          <div>
            {/* Top gold rule */}
            <div className="w-24 h-[2px] bg-[#C5A25D] mb-3" />
            
            <h1 className="font-serif-luxury text-2xl font-extrabold uppercase text-[#14213D] tracking-[0.06em] leading-none">
              {personal.fullName}
            </h1>
            
            <div className="text-[9pt] font-bold uppercase tracking-[0.22em] text-[#C5A25D] mt-1.5">
              {personal.title} · {personal.cip}
            </div>

            {/* Diamond ornament divider */}
            <div className="flex items-center gap-2 my-2.5">
              <div className="h-[1px] bg-slate-200 flex-1" />
              <span className="text-[#C5A25D] text-[10px]">✦</span>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-[8.5pt] font-bold tracking-[0.2em] text-[#14213D] uppercase pb-0.5 border-b border-[#C5A25D]/50 mb-1.5">
              RESUMEN PROFESIONAL
            </h2>
            <p className="text-[8pt] text-[#2B3545] text-justify leading-relaxed">
              {strategicProfile.executiveSummary}
            </p>
          </div>

          {/* AI Environmental Specialty Highlight */}
          <div className="bg-[#F5F2EB]/60 border border-[#DCD5C9] rounded p-2 text-[7.8pt] text-[#2B3545]">
            <div className="flex items-center gap-1.5 font-bold text-[#14213D] mb-0.5">
              <span className="text-[#C5A25D]">✦</span>
              <span className="uppercase tracking-wider">Especialidad Activa: Programación con IA Ambiental</span>
            </div>
            <p className="text-slate-600 leading-tight">
              Desarrollo de scripts en Python para geoprocesamiento geoespacial (ArcGIS/QGIS), automatización de reportes ECA y modelamiento de datos ambientales para fiscalización e IGA.
            </p>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-[8.5pt] font-bold tracking-[0.2em] text-[#14213D] uppercase pb-0.5 border-b border-[#C5A25D]/50 mb-2">
              EXPERIENCIA LABORAL
            </h2>

            {/* Vertical timeline */}
            <div className="relative pl-4 border-l border-[#C5A25D] space-y-3">
              {workExperience.slice(0, 5).map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Gold dot */}
                  <div className="absolute -left-[20.5px] top-1 w-2 h-2 rounded-full bg-[#C5A25D] ring-2 ring-white" />
                  
                  <div className="flex justify-between items-baseline text-[8pt]">
                    <span className="font-bold text-[#14213D]">{exp.role}</span>
                    <span className="text-[7.5pt] font-mono text-[#C5A25D] font-bold">{exp.period}</span>
                  </div>
                  
                  <div className="text-[7.5pt] text-slate-600 font-medium">
                    {exp.company} | {exp.location}
                  </div>

                  <ul className="mt-1 text-[7.5pt] text-[#2B3545] space-y-0.5">
                    {exp.responsibilitiesAndAchievements.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-[#C5A25D] leading-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Highlighted Certifications & Reference Divided into ESTUDIOS & LABORALES */}
          <div className="pt-2 border-t border-slate-200">
            <h2 className="text-[8pt] font-bold tracking-[0.2em] text-[#14213D] uppercase mb-1">
              DOSSIER OFICIAL: ESTUDIOS & LABORALES (27 ACREDITACIONES)
            </h2>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[7.5pt] text-[#2B3545]">
              <div>
                <strong className="text-[#14213D] font-mono text-[7pt] block uppercase tracking-wider text-[#C5A25D]">
                  🎓 ESTUDIOS (16):
                </strong>
                <div>• OEFA / Contraloría: Fiscalización (20/20)</div>
                <div>• MTPE: Prevención Riesgos (20/20)</div>
                <div>• UNI: Especialista ArcGIS Pro (80h)</div>
              </div>
              <div>
                <strong className="text-[#14213D] font-mono text-[7pt] block uppercase tracking-wider text-[#2D5A34]">
                  💼 LABORALES (11):
                </strong>
                <div>• Southern Perú: SSOMA Cuajone (Cero Acc.)</div>
                <div>• Consorcio Vial Bustamante: Obra Vial</div>
                <div>• ECA MAENI / SERNANP: ANP Machiguenga</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

