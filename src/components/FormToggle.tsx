interface FormToggleProps {
  requestType: 'buy' | 'sell';
  onChange: (type: 'buy' | 'sell') => void;
}

export default function FormToggle({ requestType, onChange }: FormToggleProps) {
  return (
    <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl w-fit mx-auto">
      <button
        onClick={() => onChange('buy')}
        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
          requestType === 'buy'
            ? 'bg-white text-blue-600 shadow-md shadow-blue-100'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Alım
      </button>
      <button
        onClick={() => onChange('sell')}
        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
          requestType === 'sell'
            ? 'bg-white text-blue-600 shadow-md shadow-blue-100'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Satım
      </button>
    </div>
  );
}
