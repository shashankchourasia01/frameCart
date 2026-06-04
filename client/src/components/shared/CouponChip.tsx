import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckIcon, HiClipboardDocument } from '../icons';

interface CouponChipProps {
  code: string;
}

export function CouponChip({ code }: CouponChipProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Coupon copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      type="button"
      onClick={() => void copy()}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-brand-maroon bg-white px-4 py-2 font-semibold tracking-wider text-brand-maroon"
    >
      {code}
      <span className="text-brand-maroon">
        {copied ? <CheckIcon size="sm" /> : <HiClipboardDocument className="h-4 w-4" />}
      </span>
    </motion.button>
  );
}
