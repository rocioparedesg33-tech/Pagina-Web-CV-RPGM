import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditMode: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  label?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  isEditMode,
  multiline = false,
  rows = 3,
  className = '',
  inputClassName = '',
  placeholder = 'Haz clic para escribir...',
  tag = 'span',
  label,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [justSaved, setJustSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    if (currentValue !== value) {
      onSave(currentValue);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      handleCancel();
    } else if (e.key === 'Enter' && !multiline) {
      e.stopPropagation();
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && multiline && (e.ctrlKey || e.metaKey)) {
      e.stopPropagation();
      e.preventDefault();
      handleSave();
    }
  };

  // When not in edit mode, render cleanly
  if (!isEditMode) {
    const Tag = tag as any;
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  // When actively editing inline
  if (isEditing) {
    return (
      <div 
        className="inline-flex flex-col w-full my-1 z-30 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {label && (
          <span className="text-[10px] font-mono font-bold text-[#C5A25D] uppercase tracking-wider mb-1">
            Editando: {label}
          </span>
        )}

        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={currentValue}
            rows={rows}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full p-2.5 text-xs bg-white text-slate-900 border-2 border-[#C5A25D] rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C5A25D]/40 font-normal leading-relaxed ${inputClassName}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full px-2.5 py-1.5 text-xs bg-white text-slate-900 border-2 border-[#C5A25D] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#C5A25D]/40 font-medium ${inputClassName}`}
          />
        )}

        <div className="flex items-center justify-between gap-2 mt-1.5 text-[10px]">
          <span className="text-slate-500 font-mono">
            {multiline ? 'Ctrl+Enter para guardar · Esc para cancelar' : 'Enter para guardar · Esc para cancelar'}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-2.5 py-0.5 rounded bg-[#14213D] hover:bg-[#1E335C] text-[#C5A25D] font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1"
            >
              <Check className="w-3 h-3 text-[#C5A25D]" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // In Edit Mode, but not currently typing: render with hover affordance and pencil trigger
  const Tag = tag as any;

  return (
    <Tag
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="Haz clic para modificar este texto"
      className={`group/edit cursor-pointer transition-all relative rounded px-1 -mx-1 border border-dashed border-transparent hover:border-[#C5A25D] hover:bg-[#C5A25D]/10 hover:shadow-2xs ${
        justSaved ? 'ring-2 ring-emerald-400 bg-emerald-50' : ''
      } ${className}`}
    >
      <span>{value || <span className="italic text-slate-400">{placeholder}</span>}</span>
      <span className="inline-flex items-center ml-1.5 opacity-0 group-hover/edit:opacity-100 transition-opacity text-[#C5A25D] bg-[#14213D] p-0.5 rounded shadow-2xs text-[10px]">
        <Pencil className="w-2.5 h-2.5" />
      </span>
      {justSaved && (
        <span className="absolute -top-3 right-0 text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1 rounded shadow-2xs animate-fadeIn">
          ✓ Guardado
        </span>
      )}
    </Tag>
  );
};
