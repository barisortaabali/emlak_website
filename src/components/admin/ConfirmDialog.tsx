import { AlertCircle, Trash2 } from 'lucide-react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  title,
  message,
  isDangerous = false,
  onConfirm,
  onCancel,
  confirmText = 'Onayla',
  cancelText = 'İptal Et',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-fade-in-up">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-6 mx-auto">
          {isDangerous ? (
            <Trash2 className="w-6 h-6 text-red-600" strokeWidth={2} />
          ) : (
            <AlertCircle className="w-6 h-6 text-blue-600" strokeWidth={2} />
          )}
        </div>

        <h2 className="text-xl font-medium text-gray-900 text-center mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-center mb-8 font-light">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-medium transition-all duration-300 hover:border-gray-300 active:scale-95 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-3 rounded-2xl text-white font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 ${
              isDangerous
                ? 'bg-red-600 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300'
                : 'bg-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
