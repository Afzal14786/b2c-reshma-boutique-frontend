'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Card, FileUpload, Spinner } from '@repo/ui';
import { productsApi, type Product, TaxProfile } from '@repo/shared';
import { buildProductSchema } from './ProductFormSchemas';
import { ProductTypeFields } from './ProductTypeFields';
import { productTypeConfig } from './productTypeConfig';

interface ProductFormProps {
  initialData?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const productToFormValues = (product: Product): any => {
  const base = {
    sku: product.sku,
    name: product.name,
    mainCategory: product.mainCategory,
    subCategory: product.subCategory,
    material: product.material,
    sellingUnit: product.sellingUnit,
    colors: (product.colors || []).join(', '),
    basePrice: product.basePrice,
    discount: product.discount,
    currentStock: product.currentStock,
    weightGrams: product.weightGrams,
    isFragile: product.isFragile,
    hsnCode: product.hsnCode,
    taxProfile: product.taxProfile,
    tags: (product.tags || []).join(', '),
    isActive: product.isActive,
    itemType: product.itemType,
  };

  switch (product.itemType) {
    case 'BANGLE':
      return { ...base, bangleSizes: product.bangleSizes, packSize: product.packSize };
    case 'APPAREL':
      return { ...base, sizes: product.sizes, customTailoring: product.customTailoring, careInstructions: product.careInstructions };
    case 'FABRIC':
      return { ...base, lengthMeters: product.lengthMeters, customTailoring: product.customTailoring };
    case 'INNERWEAR':
      return { ...base, cupSizes: product.cupSizes, isReturnable: product.isReturnable };
    case 'ACCESSORY':
      return { ...base, sizeDetails: product.sizeDetails };
    default:
      return base;
  }
};

const getDefaultValues = (itemType: string): any => {
  const base = {
    sku: '',
    name: '',
    mainCategory: 'Bangles',
    subCategory: '',
    material: '',
    sellingUnit: 'Single Piece',
    colors: '',
    basePrice: 0,
    discount: 0,
    currentStock: 0,
    weightGrams: 0,
    isFragile: false,
    hsnCode: '',
    taxProfile: TaxProfile.IMITATION_JEWELLERY,
    tags: '',
    isActive: true,
    itemType,
  };

  const fields = productTypeConfig[itemType] || [];
  fields.forEach((f) => {
    if (f.defaultValue !== undefined) {
      base[f.key] = f.defaultValue;
    } else if (f.type === 'multiCheckbox') {
      base[f.key] = [];
    } else if (f.type === 'checkbox') {
      base[f.key] = false;
    } else {
      base[f.key] = '';
    }
  });
  return base;
};

export const ProductForm = ({ initialData, onSuccess, onCancel }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [itemType, setItemType] = useState(initialData?.itemType || 'BANGLE');

  const schema = buildProductSchema(itemType);
  const defaultValues = initialData
    ? productToFormValues(initialData)
    : getDefaultValues(itemType);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const watchedType = watch('itemType');

  // Reset form when itemType changes
  useEffect(() => {
    if (watchedType && watchedType !== itemType) {
      setItemType(watchedType);
      const newDefaults = initialData
        ? productToFormValues(initialData)
        : getDefaultValues(watchedType);
      reset(newDefaults);
    }
  }, [watchedType, reset, initialData, itemType]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Convert comma‑separated strings to arrays
      const colorsArray = data.colors
        ? data.colors.split(',').map((c: string) => c.trim()).filter(Boolean)
        : [];
      const tagsArray = data.tags
        ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        ...data,
        colors: colorsArray,
        tags: tagsArray,
      };

      // Remove empty fields
      Object.keys(payload).forEach((key) => {
        if (payload[key] === '' || payload[key] === null || payload[key] === undefined) {
          delete payload[key];
        }
      });

      const formData = new FormData();

      // Append each field to FormData
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // Convert arrays to JSON string (backend expects JSON string)
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Append images
      images.forEach((file) => {
        formData.append('images', file);
      });

      if (initialData) {
        await productsApi.updateProduct(initialData.id, formData);
      } else {
        await productsApi.createProduct(formData);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card variant="glass" className="p-6">
          <h2 className="font-serif text-lg font-semibold text-primary dark:text-primary/90 mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Type"
                {...register('itemType')}
                as="select"
                errorMessage={errors.itemType?.message as string}
                variant="glass"
              >
                <option value="BANGLE">Bangle</option>
                <option value="APPAREL">Apparel</option>
                <option value="FABRIC">Fabric</option>
                <option value="INNERWEAR">Innerwear</option>
                <option value="ACCESSORY">Accessory</option>
              </Input>
              <Input
                label="SKU"
                {...register('sku')}
                errorMessage={errors.sku?.message as string}
                variant="glass"
              />
            </div>

            <Input
              label="Product Name"
              {...register('name')}
              errorMessage={errors.name?.message as string}
              variant="glass"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Main Category"
                {...register('mainCategory')}
                as="select"
                errorMessage={errors.mainCategory?.message as string}
                variant="glass"
              >
                <option value="Sarees">Sarees</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Innerwear">Innerwear</option>
                <option value="Bangles">Bangles</option>
              </Input>
              <Input
                label="Sub Category"
                {...register('subCategory')}
                errorMessage={errors.subCategory?.message as string}
                variant="glass"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Material"
                {...register('material')}
                errorMessage={errors.material?.message as string}
                variant="glass"
              />
              <Input
                label="Selling Unit"
                {...register('sellingUnit')}
                as="select"
                errorMessage={errors.sellingUnit?.message as string}
                variant="glass"
              >
                <option value="Single Piece">Single Piece</option>
                <option value="Meter">Meter</option>
                <option value="Set">Set</option>
                <option value="Pair">Pair</option>
                <option value="Dozen">Dozen</option>
                <option value="Pack">Pack</option>
              </Input>
            </div>

            <Input
              label="Colors (comma‑separated)"
              {...register('colors')}
              errorMessage={errors.colors?.message as string}
              variant="glass"
            />
          </div>
        </Card>

        {/* Pricing & Stock */}
        <Card variant="glass" className="p-6">
          <h2 className="font-serif text-lg font-semibold text-primary dark:text-primary/90 mb-4">
            Pricing &amp; Stock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Base Price"
              type="number"
              step="0.01"
              {...register('basePrice', { valueAsNumber: true })}
              errorMessage={errors.basePrice?.message as string}
              variant="glass"
            />
            <Input
              label="Discount (%)"
              type="number"
              step="1"
              {...register('discount', { valueAsNumber: true })}
              errorMessage={errors.discount?.message as string}
              variant="glass"
            />
            <Input
              label="Current Stock"
              type="number"
              {...register('currentStock', { valueAsNumber: true })}
              errorMessage={errors.currentStock?.message as string}
              variant="glass"
            />
            <Input
              label="Weight (grams)"
              type="number"
              step="0.1"
              {...register('weightGrams', { valueAsNumber: true })}
              errorMessage={errors.weightGrams?.message as string}
              variant="glass"
            />
            <div className="col-span-1 md:col-span-2">
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary/80 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isFragile')}
                  className="w-4 h-4 rounded border-glass-border bg-[rgba(246,246,246,0.3)] dark:bg-[rgba(30,30,30,0.2)] text-secondary focus:ring-secondary/30 focus:ring-2 transition-colors"
                />
                Is Fragile?
              </label>
            </div>
          </div>
        </Card>

        {/* Tax & Legal */}
        <Card variant="glass" className="p-6">
          <h2 className="font-serif text-lg font-semibold text-primary dark:text-primary/90 mb-4">
            Tax &amp; Legal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="HSN Code"
              {...register('hsnCode')}
              errorMessage={errors.hsnCode?.message as string}
              variant="glass"
            />
            <Input
              label="Tax Profile"
              {...register('taxProfile')}
              as="select"
              errorMessage={errors.taxProfile?.message as string}
              variant="glass"
            >
              <option value={TaxProfile.IMITATION_JEWELLERY}>Imitation Jewellery</option>
              <option value={TaxProfile.LAC_JEWELLERY}>Lac Jewellery</option>
              <option value={TaxProfile.UNSTITCHED_FABRIC}>Unstitched Fabric</option>
              <option value={TaxProfile.STITCHED_APPAREL}>Stitched Apparel</option>
              <option value={TaxProfile.GENERAL_ACCESSORY}>General Accessory</option>
              <option value={TaxProfile.FOOTWEAR}>Footwear</option>
            </Input>
          </div>
          <Input
            label="Tags (comma‑separated)"
            {...register('tags')}
            errorMessage={errors.tags?.message as string}
            variant="glass"
          />
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary/80 cursor-pointer">
              <input
                type="checkbox"
                {...register('isActive')}
                className="w-4 h-4 rounded border-glass-border bg-[rgba(246,246,246,0.3)] dark:bg-[rgba(30,30,30,0.2)] text-secondary focus:ring-secondary/30 focus:ring-2 transition-colors"
                defaultChecked
              />
              Product is Active
            </label>
          </div>
        </Card>

        {/* Type‑specific fields */}
        <ProductTypeFields itemType={itemType} />

        {/* File upload */}
        <Card variant="glass" className="p-6">
          <h2 className="font-serif text-lg font-semibold text-primary dark:text-primary/90 mb-4">
            Product Images
          </h2>
          <FileUpload
            onUpload={(files) => setImages(files)}
            multiple
            maxFiles={5}
            maxSizeMB={5}
          />
          {initialData?.images && (
            <div className="mt-4 flex flex-wrap gap-2">
              {initialData.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Product ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-btn border border-glass-border"
                />
              ))}
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner size="sm" className="mr-2" /> : null}
            {initialData ? 'Update Product' : 'Create Product'}
          </Button>
          <Button type="button" variant="grayGlass" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
