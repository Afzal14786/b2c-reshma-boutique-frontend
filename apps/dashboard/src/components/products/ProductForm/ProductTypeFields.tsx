import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Card } from '@repo/ui';
import { productTypeConfig } from './productTypeConfig';

export const ProductTypeFields: React.FC<{ itemType: string }> = ({ itemType }) => {
  const { register, formState: { errors } } = useFormContext();
  const fields = productTypeConfig[itemType] || [];

  if (fields.length === 0) return null;

  return (
    <Card variant="glass" className="p-6">
      <h2 className="font-serif text-lg font-semibold text-primary dark:text-primary/90 mb-4">
        {itemType} Details
      </h2>
      <div className="space-y-4">
        {fields.map(field => {
          switch (field.type) {
            case 'multiCheckbox':
              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary/80 mb-1.5">
                    {field.label}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {field.options?.map(opt => (
                      <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          value={opt}
                          {...register(field.key)}
                          className="w-4 h-4 rounded border-glass-border bg-[rgba(246,246,246,0.3)] dark:bg-[rgba(30,30,30,0.2)] text-secondary focus:ring-secondary/30 focus:ring-2 transition-colors"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors[field.key] && (
                    <p className="text-error text-sm mt-1">{errors[field.key]?.message as string}</p>
                  )}
                </div>
              );
            case 'checkbox':
              return (
                <div key={field.key} className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register(field.key)}
                      className="w-4 h-4 rounded border-glass-border bg-[rgba(246,246,246,0.3)] dark:bg-[rgba(30,30,30,0.2)] text-secondary focus:ring-secondary/30 focus:ring-2 transition-colors"
                      disabled={field.disabled}
                    />
                    {field.label}
                  </label>
                </div>
              );
            default:
              return (
                <Input
                  key={field.key}
                  label={field.label}
                  type={field.type === 'number' ? 'number' : 'text'}
                  step={field.type === 'number' ? '0.01' : undefined}
                  {...register(field.key, field.type === 'number' ? { valueAsNumber: true } : {})}
                  errorMessage={errors[field.key]?.message as string}
                  helperText={field.helpText}
                  className="glass"
                />
              );
          }
        })}
      </div>
    </Card>
  );
};