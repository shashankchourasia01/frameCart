import { useRef, useState } from 'react';
import { cn } from '../../../lib/utils';

type FilterMode = 'none' | 'warm' | 'mono';

interface PhotoEditModalProps {
  photoUrl: string;
  onClose: () => void;
  onUpdate: (url: string) => void;
}

export function PhotoEditModal({ photoUrl, onClose, onUpdate }: PhotoEditModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rotation, setRotation] = useState(0);
  const [filter, setFilter] = useState<FilterMode>('none');
  const [currentUrl, setCurrentUrl] = useState(photoUrl);

  const filterClass =
    filter === 'warm' ? 'sepia-[0.25] saturate-110' : filter === 'mono' ? 'grayscale' : '';

  const handleReplace = (file: File) => {
    setCurrentUrl(URL.createObjectURL(file));
    setRotation(0);
    setFilter('none');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-center text-sm font-bold tracking-wide text-brand-charcoal">
          ALERT — IMPORTANT
        </h3>

        <div className="relative mx-auto mt-4 max-h-[50vh] w-full overflow-hidden rounded-lg bg-brand-ivory-dark">
          <img
            src={currentUrl}
            alt="Preview"
            className={cn('mx-auto max-h-[50vh] w-full object-contain transition', filterClass)}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>

        <div className="mt-4 flex justify-around border-t border-brand-ivory-dark pt-4 text-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wide text-brand-charcoal-light"
          >
            <span className="text-xl">🖼️</span>
            REPLACE PHOTO
          </button>
          <button
            type="button"
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wide text-brand-charcoal-light"
          >
            <span className="text-xl">↻</span>
            ROTATE RIGHT
          </button>
          <button
            type="button"
            onClick={() =>
              setFilter((f) => (f === 'none' ? 'warm' : f === 'warm' ? 'mono' : 'none'))
            }
            className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wide text-brand-charcoal-light"
          >
            <span className="text-xl">◎</span>
            FILTER
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleReplace(file);
          }}
        />

        <button
          type="button"
          onClick={() => {
            onUpdate(currentUrl);
            onClose();
          }}
          className="mt-5 w-full rounded-lg bg-brand-maroon py-3.5 text-sm font-bold text-white"
        >
          UPDATE
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-brand-charcoal-light">
          Your photo will be printed as shown. Tap tools above to adjust, then UPDATE to save.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-brand-maroon"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
