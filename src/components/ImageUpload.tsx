import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, currentImage, label }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('team-assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('team-assets')
        .getPublicUrl(filePath);

      onImageUploaded(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm text-white/60">{label}</label>
      <div className="relative group">
        {currentImage ? (
          <img 
            src={currentImage} 
            alt={label}
            className="w-12 h-12 rounded-lg object-cover group-hover:opacity-50 transition-opacity"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Upload className="w-6 h-6 text-white/60" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;