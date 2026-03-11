import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  requiredFields?: string[];
  errors?: Record<string, string>;
}

export default function FormSection({ title, children, requiredFields = [] }: FormSectionProps) {
  const isRequired = requiredFields.length > 0;

  return (
    <div className="relative">
      <label className="block">
        <span className="text-gray-700 font-medium block mb-3">
          {title}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </span>
        {children}
      </label>
    </div>
  );
}
