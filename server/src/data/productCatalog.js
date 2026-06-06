/** Client catalog — 9 categories, 50 frame types */

const CATEGORY_LIST = [
  {
    id: '1',
    slug: 'family-relationship',
    name: 'Family & Relationship Frames',
    emoji: '👨‍👩‍👧',
    description: 'Celebrate love, family and togetherness',
    thumb: 1024993,
    banner: 3778558,
  },
  {
    id: '2',
    slug: 'baby-kids',
    name: 'Baby & Kids Frames',
    emoji: '👶',
    description: 'Precious moments from newborn to school days',
    thumb: 1648387,
    banner: 3556686,
  },
  {
    id: '3',
    slug: 'birthday-celebration',
    name: 'Birthday & Celebration Frames',
    emoji: '🎂',
    description: 'Mark every birthday and milestone celebration',
    thumb: 3181718,
    banner: 1128318,
  },
  {
    id: '4',
    slug: 'wedding-collection',
    name: 'Wedding Collection',
    emoji: '💒',
    description: 'Every ceremony from haldi to reception',
    thumb: 265763,
    banner: 265763,
  },
  {
    id: '5',
    slug: 'festival',
    name: 'Festival Frames',
    emoji: '🪔',
    description: 'Festive memories for every occasion',
    thumb: 1080721,
    banner: 1571468,
  },
  {
    id: '6',
    slug: 'memorial',
    name: 'Memorial Frames',
    emoji: '🕯️',
    description: 'Honour and remember loved ones',
    thumb: 1571463,
    banner: 271624,
  },
  {
    id: '7',
    slug: 'travel-lifestyle',
    name: 'Travel & Lifestyle Frames',
    emoji: '✈️',
    description: 'Adventures, vacations and nature moments',
    thumb: 1571460,
    banner: 584399,
  },
  {
    id: '8',
    slug: 'personalized',
    name: 'Personalized Frames',
    emoji: '✨',
    description: 'Custom collages, names and creative styles',
    thumb: 3992946,
    banner: 2824194,
  },
  {
    id: '9',
    slug: 'trending',
    name: 'Trending Categories',
    emoji: '🔥',
    description: 'Popular acrylic and LED frame styles',
    thumb: 1128318,
    banner: 1579715,
  },
];

function cat(id, slug, name) {
  const c = CATEGORY_LIST.find((x) => x.id === id);
  return {
    category_id: id,
    categorySlug: slug,
    categoryName: c?.name ?? name,
  };
}

const CATALOG = [
  // Family & Relationship Frames (11)
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Anniversary Photo Frame', slug: 'anniversary-photo-frame', tagline: 'Celebrate every year together', price: 849 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Wedding Photo Frame', slug: 'wedding-photo-frame', tagline: 'Classic wedding portrait display', price: 899 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Pre-Wedding Photo Frame', slug: 'pre-wedding-photo-frame', tagline: 'Before the big day memories', price: 879 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Engagement Photo Frame', slug: 'engagement-photo-frame', tagline: 'She said yes — frame the moment', price: 919 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Love Story Photo Frame', slug: 'love-story-photo-frame', tagline: 'Your journey, beautifully framed', price: 899, is_featured: true },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Couple Photo Frame', slug: 'couple-photo-frame', tagline: 'Romantic frames for two', price: 799 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Family Photo Frame', slug: 'family-photo-frame', tagline: 'Together forever on your wall', price: 749 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Parents Photo Frame', slug: 'parents-photo-frame', tagline: 'A tribute to mom and dad', price: 769 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Grandparents Photo Frame', slug: 'grandparents-photo-frame', tagline: 'Generations of love', price: 779 },
  { ...cat('1', 'family-relationship', 'Family & Relationship Frames'), name: 'Siblings Photo Frame', slug: 'siblings-photo-frame', tagline: 'Brother and sister memories', price: 759 },

  // Baby & Kids Frames (7)
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'Newborn Baby Photo Frame', slug: 'newborn-baby-photo-frame', tagline: 'Welcome to the world', price: 799 },
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'Baby Monthly Milestone Frame', slug: 'baby-monthly-milestone-frame', tagline: 'Track every month of growth', price: 929 },
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'Baby First Year Frame', slug: 'baby-first-year-frame', tagline: 'From newborn to first birthday', price: 899 },
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'Birthday Photo Frame', slug: 'kids-birthday-photo-frame', tagline: 'Colourful kids birthday keepsake', price: 729 },
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'Kids Photo Frame', slug: 'kids-photo-frame', tagline: 'Playful designs for little ones', price: 699 },
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'School Memory Frame', slug: 'school-memory-frame', tagline: 'First day and school milestones', price: 749 },
  { ...cat('2', 'baby-kids', 'Baby & Kids Frames'), name: 'Baby Naming Ceremony Frame', slug: 'baby-naming-ceremony-frame', tagline: 'Naamkaran celebration frame', price: 819 },

  // Birthday & Celebration Frames (6)
  { ...cat('3', 'birthday-celebration', 'Birthday & Celebration Frames'), name: 'Birthday Photo Frame', slug: 'birthday-photo-frame', tagline: 'Classic birthday celebration', price: 749 },
  { ...cat('3', 'birthday-celebration', 'Birthday & Celebration Frames'), name: 'First Birthday Frame', slug: 'first-birthday-frame', tagline: 'Turning one — a big milestone', price: 799 },
  { ...cat('3', 'birthday-celebration', 'Birthday & Celebration Frames'), name: 'Sweet 16 Birthday Frame', slug: 'sweet-16-birthday-frame', tagline: 'Teen milestone keepsake', price: 819 },
  { ...cat('3', 'birthday-celebration', 'Birthday & Celebration Frames'), name: 'Golden Jubilee Frame', slug: 'golden-jubilee-frame', tagline: '50 years of celebration', price: 949 },
  { ...cat('3', 'birthday-celebration', 'Birthday & Celebration Frames'), name: 'Silver Jubilee Frame', slug: 'silver-jubilee-frame', tagline: '25 years of memories', price: 899 },
  { ...cat('3', 'birthday-celebration', 'Birthday & Celebration Frames'), name: 'Celebration Photo Frame', slug: 'celebration-photo-frame', tagline: 'Any special occasion worth framing', price: 769 },

  // Wedding Collection (7)
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Bride & Groom Frame', slug: 'bride-and-groom-frame', tagline: 'The perfect pair on display', price: 949 },
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Wedding Highlights Frame', slug: 'wedding-highlights-frame', tagline: 'Best moments from your day', price: 999 },
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Wedding Album Frame', slug: 'wedding-album-frame', tagline: 'Album-style multi-photo layout', price: 1099 },
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Reception Photo Frame', slug: 'reception-photo-frame', tagline: 'Celebrate the reception night', price: 929 },
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Haldi Ceremony Frame', slug: 'haldi-ceremony-frame', tagline: 'Golden haldi moments framed', price: 879 },
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Mehndi Ceremony Frame', slug: 'mehndi-ceremony-frame', tagline: 'Intricate mehndi memories', price: 879 },
  { ...cat('4', 'wedding-collection', 'Wedding Collection'), name: 'Sangeet Ceremony Frame', slug: 'sangeet-ceremony-frame', tagline: 'Music, dance and joy', price: 899 },

  // Festival Frames (6)
  { ...cat('5', 'festival', 'Festival Frames'), name: 'Diwali Photo Frame', slug: 'diwali-photo-frame', tagline: 'Festival of lights on your wall', price: 849 },
  { ...cat('5', 'festival', 'Festival Frames'), name: 'Holi Photo Frame', slug: 'holi-photo-frame', tagline: 'Colours of Holi preserved forever', price: 829 },
  { ...cat('5', 'festival', 'Festival Frames'), name: 'Raksha Bandhan Frame', slug: 'raksha-bandhan-frame', tagline: 'Brother-sister bond celebration', price: 799 },
  { ...cat('5', 'festival', 'Festival Frames'), name: 'Eid Celebration Frame', slug: 'eid-celebration-frame', tagline: 'Eid mubarak memories', price: 819 },
  { ...cat('5', 'festival', 'Festival Frames'), name: 'Christmas Photo Frame', slug: 'christmas-photo-frame', tagline: 'Holiday season family moments', price: 799 },
  { ...cat('5', 'festival', 'Festival Frames'), name: 'New Year Photo Frame', slug: 'new-year-photo-frame', tagline: 'Welcome the new year in style', price: 769 },

  // Memorial Frames (3)
  { ...cat('6', 'memorial', 'Memorial Frames'), name: 'Tribute Photo Frame', slug: 'tribute-photo-frame', tagline: 'A respectful tribute display', price: 799 },
  { ...cat('6', 'memorial', 'Memorial Frames'), name: 'Memory Photo Frame', slug: 'memory-photo-frame', tagline: 'Cherish their memory always', price: 779 },
  { ...cat('6', 'memorial', 'Memorial Frames'), name: 'Remembrance Frame', slug: 'remembrance-frame', tagline: 'Forever in our hearts', price: 769 },

  // Travel & Lifestyle Frames (4)
  { ...cat('7', 'travel-lifestyle', 'Travel & Lifestyle Frames'), name: 'Travel Memories Frame', slug: 'travel-memories-frame', tagline: 'Your best trips on display', price: 879 },
  { ...cat('7', 'travel-lifestyle', 'Travel & Lifestyle Frames'), name: 'Vacation Photo Frame', slug: 'vacation-photo-frame', tagline: 'Holiday highlights collage', price: 849 },
  { ...cat('7', 'travel-lifestyle', 'Travel & Lifestyle Frames'), name: 'Adventure Photo Frame', slug: 'adventure-photo-frame', tagline: 'Bold adventures worth framing', price: 859 },
  { ...cat('7', 'travel-lifestyle', 'Travel & Lifestyle Frames'), name: 'Nature Photo Frame', slug: 'nature-photo-frame', tagline: 'Landscapes and outdoor beauty', price: 829 },

  // Personalized Frames (5)
  { ...cat('8', 'personalized', 'Personalized Frames'), name: 'Collage Photo Frame', slug: 'collage-photo-frame', tagline: 'Multiple photos in one frame', price: 949 },
  { ...cat('8', 'personalized', 'Personalized Frames'), name: 'Multi Photo Frame', slug: 'multi-photo-frame', tagline: 'Grid layout for many memories', price: 999 },
  { ...cat('8', 'personalized', 'Personalized Frames'), name: 'Custom Name Photo Frame', slug: 'custom-name-photo-frame', tagline: 'Add a personal name touch', price: 819 },
  { ...cat('8', 'personalized', 'Personalized Frames'), name: 'Spotify Song Photo Frame', slug: 'spotify-song-photo-frame', tagline: 'Your song as wall art', price: 899 },
  { ...cat('8', 'personalized', 'Personalized Frames'), name: 'Instagram Style Photo Frame', slug: 'instagram-style-photo-frame', tagline: 'Social-style photo display', price: 879 },

  // Trending Categories (2)
  { ...cat('9', 'trending', 'Trending Categories'), name: 'Acrylic Photo Frame', slug: 'acrylic-photo-frame', tagline: 'Modern crystal-clear acrylic look', price: 1199, is_featured: true },
  { ...cat('9', 'trending', 'Trending Categories'), name: 'LED Photo Frame', slug: 'led-photo-frame', tagline: 'Illuminated frame with warm glow', price: 1299 },
];

module.exports = { CATALOG, CATEGORY_LIST };
