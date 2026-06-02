import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE_MB } from '../../constants';
interface PhotoUploaderProps {
  maxPhotos: number;
  urls: string[];
  onChange: (urls: string[]) => void;
}

export function PhotoUploader({ maxPhotos, urls, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validate = (file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
      toast.error('Only JPG, PNG, or HEIC allowed');
      return false;
    }
    if (file.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      toast.error(`Max ${MAX_UPLOAD_SIZE_MB}MB per file`);
      return false;
    }
    return true;
  };

  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    setUploading(true);
    setProgress(30);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1'}/upload`,
        { method: 'POST', body: form }
      );
      setProgress(80);
      if (!res.ok) throw new Error('Upload failed');
      const data = (await res.json()) as { url: string };
      onChange([...urls, data.url]);
      setProgress(100);
      toast.success('Photo uploaded');
    } catch {
      const localUrl = URL.createObjectURL(file);
      onChange([...urls, localUrl]);
      toast.success('Photo added (local preview)');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const remaining = maxPhotos - urls.length;
    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const file = files[i];
      if (validate(file)) await uploadFile(file);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Upload Your Photos</h3>
      <p className="text-sm text-brand-charcoal-light">
        Upload {urls.length} of {maxPhotos} photos
      </p>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: maxPhotos }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i < urls.length ? 'bg-brand-maroon' : 'bg-brand-ivory-dark'}`}
          />
        ))}
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => inputRef.current?.click()}
        disabled={urls.length >= maxPhotos || uploading}
        className="mt-3 flex w-full flex-col items-center justify-center rounded-card border-2 border-dashed border-brand-maroon bg-brand-maroon-light/30 px-6 py-10 transition hover:bg-brand-maroon-light/50 disabled:opacity-50"
      >
        <span className="text-3xl">📷</span>
        <span className="mt-2 font-medium text-brand-maroon">Tap to upload or drag photos</span>
        <span className="text-xs text-brand-charcoal-light">JPG, PNG, HEIC — max {MAX_UPLOAD_SIZE_MB}MB</span>
      </motion.button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple={maxPhotos > 1}
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />
      {uploading && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-brand-ivory-dark">
          <motion.div
            className="h-full bg-brand-maroon"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}
      {urls.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {urls.map((url, i) => (
            <div key={url} className="relative shrink-0">
              <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => onChange(urls.filter((_, j) => j !== i))}
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-error text-xs text-white"
                aria-label="Remove photo"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
