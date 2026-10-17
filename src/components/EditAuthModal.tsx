import React, { useState, useEffect, useRef } from 'react';
import { useCvData } from '../context/CvDataContext';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const EditAuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    verifyAndUnlockEdit,
    updateEditPassword,
    cvData
  } = useCvData();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [changeSuccess, setChangeSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      setPasswordInput('');
      setErrorMessage(null);
      setSuccessMessage(null);
      setChangeSuccess(null);
      setIsChangingPassword(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!passwordInput.trim()) {
      setErrorMessage('Por favor ingresa la contraseña de registro.');
      return;
    }

    const success = verifyAndUnlockEdit(passwordInput);
    if (success) {
      setSuccessMessage('¡Acceso concedido! Activando modo edición...');
    } else {
      setErrorMessage('Contraseña incorrecta. Verifica tu número de colegiatura CIP o clave asignada.');
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 4) {
      setErrorMessage('La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }

    updateEditPassword(newPasswordInput.trim());
    setChangeSuccess('¡Contraseña actualizada con éxito! Úsala la próxima vez que ingreses.');
    setNewPasswordInput('');
    setIsChangingPassword(false);
    setTimeout(() => setChangeSuccess(null), 4000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-sm animate-fadeIn"
      onClick={closeAuthModal}
    >
      <div 
        className="bg-white rounded-3xl border border-[#C5A25D]/40 shadow-2xl max-w-md w-full overflow-hidden transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14213D] via-[#1E335C] to-[#0D1B2A] text-white p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A25D]/20 border border-[#C5A25D]/40 flex items-center justify-center text-[#C5A25D] shrink-0 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A25D] block">
                Seguridad & Acreditación
              </span>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                Acceso al Modo Edición
              </h3>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-200 leading-relaxed">
            Ingresa tu contraseña de registro profesional para habilitar la edición completa del CV.
          </p>
        </div>

        {/* Content & Form */}
        <div className="p-6 space-y-4">
          
          {changeSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{changeSuccess}</span>
            </div>
          )}

          {successMessage ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="reg-password-input"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Contraseña de Registro:
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4 text-[#C5A25D]" />
                  </div>
                  
                  <input
                    ref={inputRef}
                    id="reg-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Ingresa tu contraseña de registro..."
                    className="w-full pl-10 pr-12 py-3 bg-[#F5F2EB]/60 border border-[#DCD5C9] focus:border-[#C5A25D] focus:ring-2 focus:ring-[#C5A25D]/30 rounded-xl text-sm font-medium text-[#14213D] transition-all outline-none"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {errorMessage && (
                  <div className="mt-2 text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Informative Hint */}
              <div className="p-3.5 rounded-xl bg-[#F5F2EB] border border-[#DCD5C9] text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#14213D]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A25D]" />
                  <span>Contraseña de Registro CIP</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600">
                  Por defecto puedes ingresar tu número de registro / colegiatura oficial CIP: <strong className="text-[#14213D] font-mono font-bold">322074</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="w-1/3 py-2.5 px-3 rounded-xl border border-[#DCD5C9] text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="w-2/3 py-2.5 px-4 rounded-xl bg-[#14213D] hover:bg-[#1E335C] text-[#C5A25D] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Desbloquear Edición</span>
                </button>
              </div>
            </form>
          )}

          {/* Collapsible: Cambiar contraseña */}
          <div className="pt-2 border-t border-[#DCD5C9]">
            <button
              type="button"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-xs font-bold text-slate-600 hover:text-[#14213D] flex items-center justify-between w-full cursor-pointer py-1"
            >
              <span className="flex items-center gap-1.5 text-[11.5px]">
                <KeyRound className="w-3.5 h-3.5 text-[#C5A25D]" />
                ¿Deseas personalizar tu contraseña de acceso?
              </span>
              {isChangingPassword ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isChangingPassword && (
              <form onSubmit={handleChangePasswordSubmit} className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs animate-fadeIn">
                <label className="block text-[11px] font-bold text-slate-700">
                  Nueva contraseña personalizada:
                </label>
                <input
                  type="text"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Mínimo 4 caracteres..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:border-[#C5A25D] outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 px-3 rounded-lg bg-[#C5A25D] hover:bg-[#b08e4d] text-[#14213D] font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Guardar Nueva Contraseña
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
