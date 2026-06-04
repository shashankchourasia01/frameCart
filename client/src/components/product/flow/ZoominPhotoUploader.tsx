import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE_MB } from '../../../constants';

interface ZoominPhotoUploaderProps {
  maxPhotos: number;
  urls: string[];
  onChange: (urls: string[]) => void;
  productName?: string;
}

export function ZoominPhotoUploader({
  maxPhotos,
  urls,
  onChange,
  productName = 'your frame',
}: ZoominPhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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
    try {
      const base = import.meta.env.VITE_API_URL ?? '/api/v1';
      const res = await fetch(`${base}/upload`, { method: 'POST', body: form });
      if (!res.ok) throw new Error('Upload failed');
      const data = (await res.json()) as { url: string };
      onChange([...urls, data.url]);
    } catch {
      onChange([...urls, URL.createObjectURL(file)]);
    } finally {
      setUploading(false);
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

  const progress = maxPhotos > 0 ? Math.round((urls.length / maxPhotos) * 100) : 0;

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-xl bg-brand-ivory-dark/80 px-6 py-10 text-center">
        <h2 className="text-lg font-semibold text-brand-charcoal">Upload Your photos</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-charcoal-light">
          Please pick {maxPhotos} photo{maxPhotos > 1 ? 's' : ''} for {productName}. The first{' '}
          {maxPhotos} you select will be used. You can edit on the next screen.
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={urls.length >= maxPhotos || uploading}
          className="mx-auto mt-8 flex flex-col items-center disabled:opacity-50"
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-brand-maroon text-4xl font-light text-brand-maroon">
            +
          </span>
          <span className="mt-3 text-sm font-bold tracking-wide text-brand-charcoal">
            ADD PHOTOS
          </span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple={maxPhotos > 1}
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />

        {urls.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {urls.map((url, i) => (
              <div key={url} className="relative">
                <img src={url} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => onChange(urls.filter((_, j) => j !== i))}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-error text-[10px] text-white"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="h-1.5 overflow-hidden rounded-full bg-brand-ivory-dark">
          <div
            className="h-full rounded-full bg-brand-maroon transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-center text-xs text-brand-charcoal-light">
          {urls.length} of {maxPhotos} photos · {progress}%
        </p>
      </div>
    </div>
  );
}
