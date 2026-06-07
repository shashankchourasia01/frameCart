import type { ComponentProps } from 'react';
import type { IconType } from 'react-icons';
import {
  HiArchiveBox,
  HiArrowRight,
  HiArrowUpTray,
  HiBars3,
  HiBolt,
  HiCalendarDays,
  HiChartBarSquare,
  HiCheck,
  HiChevronDown,
  HiChevronRight,
  HiChevronUp,
  HiClipboardDocument,
  HiClock,
  HiCube,
  HiCurrencyRupee,
  HiGift,
  HiHeart,
  HiInformationCircle,
  HiMinus,
  HiMoon,
  HiPhoto,
  HiPlus,
  HiPrinter,
  HiSparkles,
  HiStar,
  HiSun,
  HiTag,
  HiTruck,
  HiUserGroup,
  HiXMark,
  HiCamera,
  HiShoppingBag,
  HiPaintBrush,
  HiRectangleStack,
  HiArrowsRightLeft,
  HiHashtag,
  HiDocumentText,
  HiLink,
  HiFolder,
  HiFaceSmile,
  HiGlobeAlt,
  HiFire,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '../../lib/utils';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<IconSize, string> = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

export interface AppIconProps extends Omit<ComponentProps<'svg'>, 'size'> {
  icon: IconType;
  size?: IconSize;
  className?: string;
}

export function AppIcon({ icon: Icon, size = 'md', className, ...props }: AppIconProps) {
  return <Icon className={cn(sizeMap[size], 'shrink-0', className)} aria-hidden {...props} />;
}

export function CloseIcon(props: Omit<AppIconProps, 'icon'>) {
  return <AppIcon icon={HiXMark} {...props} />;
}

export function MenuIcon(props: Omit<AppIconProps, 'icon'>) {
  return <AppIcon icon={HiBars3} {...props} />;
}

export function CheckIcon(props: Omit<AppIconProps, 'icon'>) {
  return <AppIcon icon={HiCheck} {...props} />;
}

export function StarIcon({ filled, ...props }: Omit<AppIconProps, 'icon'> & { filled?: boolean }) {
  return (
    <AppIcon
      icon={HiStar}
      className={cn(filled ? 'text-brand-gold' : 'text-brand-ivory-dark', props.className)}
      {...props}
    />
  );
}

export function WhatsAppIcon(props: Omit<AppIconProps, 'icon'>) {
  return <AppIcon icon={FaWhatsapp} {...props} />;
}

/** One distinct icon per category — shop grid, admin, category pages */
const CATEGORY_ICON_MAP: Record<string, IconType> = {
  'family-relationship': HiUserGroup,
  'baby-kids': HiFaceSmile,
  'birthday-celebration': HiGift,
  'wedding-collection': HiHeart,
  festival: HiSparkles,
  memorial: HiMoon,
  'travel-lifestyle': HiGlobeAlt,
  personalized: HiPaintBrush,
  trending: HiFire,
};

export { CATEGORY_ICON_MAP };

export function CategoryIcon({
  slug,
  size = 'lg',
  className,
  variant = 'overlay',
}: {
  slug: string;
  size?: IconSize;
  className?: string;
  variant?: 'overlay' | 'solid';
}) {
  const Icon = CATEGORY_ICON_MAP[slug] ?? HiPhoto;
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        variant === 'overlay'
          ? 'rounded-full bg-white/20 p-2 text-white backdrop-blur-sm'
          : 'rounded-lg bg-brand-maroon/10 p-2 text-brand-maroon',
        className
      )}
    >
      <AppIcon icon={Icon} size={size} />
    </span>
  );
}

export type TrustIconKey = 'frames' | 'rating' | 'delivery' | 'support';

const TRUST_ICON_MAP: Record<TrustIconKey, IconType> = {
  frames: HiRectangleStack,
  rating: HiStar,
  delivery: HiTruck,
  support: FaWhatsapp,
};

export function TrustIcon({ name, size = 'md', className }: { name: TrustIconKey; size?: IconSize; className?: string }) {
  return <AppIcon icon={TRUST_ICON_MAP[name]} size={size} className={cn('text-brand-maroon', className)} />;
}

export type AdminNavIconKey = 'dashboard' | 'orders' | 'products' | 'categories' | 'offers';

export const ADMIN_NAV_ICONS: Record<AdminNavIconKey, IconType> = {
  dashboard: HiChartBarSquare,
  orders: HiArchiveBox,
  products: HiPhoto,
  categories: HiFolder,
  offers: HiGift,
};

export type StatIconKey = 'orders' | 'revenue' | 'pending' | 'products';

export const STAT_ICONS: Record<StatIconKey, IconType> = {
  orders: HiShoppingBag,
  revenue: HiCurrencyRupee,
  pending: HiClock,
  products: HiRectangleStack,
};

const FINISH_ICON_MAP: Record<string, IconType> = {
  Matte: HiMoon,
  Glossy: HiSun,
};

export function FinishIcon({ finish, size = 'lg', className }: { finish: string; size?: IconSize; className?: string }) {
  return <AppIcon icon={FINISH_ICON_MAP[finish] ?? HiPhoto} size={size} className={className} />;
}

export type FeatureIconKey = 'material' | 'print' | 'packaging';

export const FEATURE_ICONS: Record<FeatureIconKey, IconType> = {
  material: HiCube,
  print: HiPrinter,
  packaging: HiArchiveBox,
};

export {
  HiArrowRight,
  HiArrowUpTray,
  HiChevronRight,
  HiChevronDown,
  HiChevronUp,
  HiPlus,
  HiMinus,
  HiInformationCircle,
  HiCamera,
  HiPhoto,
  HiTag,
  HiCalendarDays,
  HiClipboardDocument,
  HiBolt,
  HiTruck,
  HiPaintBrush,
  HiArrowsRightLeft,
  HiHashtag,
  HiDocumentText,
  HiLink,
  HiStar,
};
