export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'multiCheckbox' | 'textarea';
  options?: string[];
  helpText?: string;
  required?: boolean;
  defaultValue?: any;
  disabled?: boolean;
}

export const productTypeConfig: Record<string, FieldDef[]> = {
  BANGLE: [
    {
      key: 'bangleSizes',
      label: 'Bangle Sizes',
      type: 'multiCheckbox',
      options: ['2.2', '2.4', '2.6', '2.8'],
      required: true,
    },
    {
      key: 'packSize',
      label: 'Pack Size',
      type: 'number',
      required: true,
      defaultValue: 12,
    },
  ],
  APPAREL: [
    {
      key: 'sizes',
      label: 'Sizes',
      type: 'multiCheckbox',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', '34', '36', '38', '40'],
      required: true,
    },
    {
      key: 'customTailoring',
      label: 'Custom Tailoring Available',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      key: 'careInstructions',
      label: 'Care Instructions',
      type: 'textarea',
    },
  ],
  FABRIC: [
    {
      key: 'lengthMeters',
      label: 'Length (meters)',
      type: 'number',
      required: true,
      defaultValue: 0.1,
    },
    {
      key: 'customTailoring',
      label: 'Custom Tailoring Available',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  INNERWEAR: [
    {
      key: 'cupSizes',
      label: 'Cup Sizes',
      type: 'multiCheckbox',
      options: ['32B', '34B', '36C', '34C', '36D'],
      required: true,
    },
    {
      key: 'isReturnable',
      label: 'Is Returnable',
      type: 'checkbox',
      defaultValue: false,
      disabled: true,
    },
  ],
  ACCESSORY: [
    {
      key: 'sizeDetails',
      label: 'Size Details',
      type: 'text',
      required: true,
      helpText: 'e.g., Adjustable, One Size, etc.',
    },
  ],
};