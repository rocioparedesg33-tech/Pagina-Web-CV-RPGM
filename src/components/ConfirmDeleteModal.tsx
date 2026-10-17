import React from 'react';
import { useCvData } from '../context/CvDataContext';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export const ConfirmDeleteModal: React.FC = () => {
  const { deleteDialog, closeDeleteDialog } = useCvData();

  if (!deleteDialog) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-red-200 shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        {/* Header */}
        <div className="bg-red-50/80 px-6 py-4 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-red-700">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 id="delete-dialog-title" className="font-bold text-base text-red-900">
              {deleteDialog.title || 'Confirmar eliminación'}
            </h3>
          </div>
          <button
            onClick={closeDeleteDialog}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-red-100/50 transition-colors cursor-pointer"
            aria-label="Cerrar diálogo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            ¿Estás completamente seguro de que deseas eliminar este elemento de tu página?
          </p>

          <div className="bg-[#F5F2EB] p-3.5 rounded-xl border border-[#DCD5C9] text-xs text-[#14213D] font-medium font-mono">
            {deleteDialog.itemDescription}
          </div>

          <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            Nota: La información se eliminará de la vista actual. Puedes restablecer los valores originales en cualquier momento desde el botón superior de restablecer.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeDeleteDialog}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={deleteDialog.onConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Sí, Borrar Elemento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
