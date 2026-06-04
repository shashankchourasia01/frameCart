/** Pexels IDs — picture frames, gallery walls, and frame mockups only (no people/lifestyle) */

export const FRAME_ONLY_PEXELS = [
  1571468, // gallery wall frames
  1128318, // black frames row
  1579715, // wooden frame shelf
  271624, // minimal white frame
  1571463, // classic frame close-up
  584399, // living room with frames
  1571465, // ornate gold frame
  1913472, // desk photo frame
  1080721, // multi frame wall
  1571460, // home interior frames
  3181718, // grid wall frames
  3992946, // modern frame set
  769775, // frames on white wall
  1090638, // picture frames collection
  1830976, // empty wood frame
  2824194, // wall art frames
  2955955, // frame mockup
  406014, // vintage frames
  1579219, // single standing frame
  1128316, // frames display
  276724, // frame on table
  1570119, // minimalist frame
  1571459, // frame decor
  1648120, // black minimal frame
  1571462, // white frame wall
] as const;

export function framePexelsUrl(id: number, width = 500) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&fit=crop`;
}

/** Stable index from product slug */
export function frameIndexForSlug(slug: string, offset = 0) {
  let hash = offset;
  for (let i = 0; i < slug.length; i += 1) hash += slug.charCodeAt(i);
  return hash % FRAME_ONLY_PEXELS.length;
}

export function getFrameImageUrls(slug: string, count = 3) {
  const start = frameIndexForSlug(slug);
  return Array.from({ length: count }, (_, i) =>
    framePexelsUrl(FRAME_ONLY_PEXELS[(start + i) % FRAME_ONLY_PEXELS.length], 900)
  );
}

/** Card / grid — frame-only, unique design per product */
export function getFrameCardImage(slug: string, width = 600) {
  return framePexelsUrl(FRAME_ONLY_PEXELS[frameIndexForSlug(slug)], width);
}
