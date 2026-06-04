/** 10 categories × 5 frame types each = 50 products */

const CATEGORY_LIST = [
  { id: '1', slug: 'wedding', name: 'Wedding', emoji: '💒', description: 'Celebrate your special day', thumb: 265763, banner: 265763 },
  { id: '2', slug: 'anniversary', name: 'Anniversary', emoji: '💑', description: 'Mark every year together', thumb: 1444442, banner: 1444442 },
  { id: '3', slug: 'baby', name: 'Baby', emoji: '👶', description: 'Welcome the little one', thumb: 1648387, banner: 3556686 },
  { id: '4', slug: 'family', name: 'Family', emoji: '👨‍👩‍👧', description: 'Cherish family moments', thumb: 1024993, banner: 3778558 },
  { id: '5', slug: 'couple', name: 'Couple', emoji: '❤️', description: 'Romantic frames for two', thumb: 1451903, banner: 2253875 },
  { id: '6', slug: 'graduation', name: 'Graduation', emoji: '🎓', description: 'Proud achievements', thumb: 2673996, banner: 256490 },
  { id: '7', slug: 'birthday', name: 'Birthday', emoji: '🎂', description: 'Celebrate every year', thumb: 3181718, banner: 1128318 },
  { id: '8', slug: 'friendship', name: 'Friendship', emoji: '🤝', description: 'Friends forever', thumb: 17742, banner: 3992946 },
  { id: '9', slug: 'housewarming', name: 'Housewarming', emoji: '🏠', description: 'New home memories', thumb: 1571460, banner: 584399 },
  { id: '10', slug: 'festival', name: 'Festival', emoji: '🪔', description: 'Festive celebrations', thumb: 1080721, banner: 1571468 },
];

const CATALOG = [
  // Wedding (5)
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Love Story Frame', slug: 'love-story-frame', tagline: 'Your journey, beautifully framed', price: 899, is_featured: true },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Royal Wedding Collage', slug: 'royal-wedding-collage', tagline: 'Multiple moments in one frame', price: 999 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Wedding Date Keepsake', slug: 'wedding-date-keepsake', tagline: 'Remember your special date forever', price: 849 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Eternal Vows Frame', slug: 'eternal-vows-frame', tagline: 'Classic wedding portrait display', price: 929 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Bridal Portrait Frame', slug: 'bridal-portrait-frame', tagline: 'Elegant bride showcase', price: 949 },

  // Anniversary (5)
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Golden Anniversary Frame', slug: 'golden-anniversary-frame', tagline: 'Elegant gift for every year', price: 799 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Anniversary Memory Wall', slug: 'anniversary-memory-wall', tagline: 'Timeline of your journey', price: 1099 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Silver Years Frame', slug: 'silver-years-frame', tagline: 'Celebrate years of togetherness', price: 879 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'First Date Keepsake', slug: 'first-date-keepsake', tagline: 'Where it all began', price: 749 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Together Forever Collage', slug: 'together-forever-collage', tagline: 'Your story in one frame', price: 959 },

  // Baby (5)
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Baby First Year Frame', slug: 'baby-first-year-frame', tagline: 'From newborn to first birthday', price: 899 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Baby Name Frame', slug: 'baby-name-frame', tagline: 'Personalized with baby name', price: 759 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Little Star Frame', slug: 'little-star-frame', tagline: 'Sweet nursery wall art', price: 819 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Newborn Welcome Frame', slug: 'newborn-welcome-frame', tagline: 'Hello world announcement', price: 799 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Milestone Grid Frame', slug: 'milestone-grid-frame', tagline: 'Monthly growth photos', price: 929 },

  // Family (5)
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Family Portrait Frame', slug: 'family-portrait-frame', tagline: 'Together forever', price: 749 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Family Quote Frame', slug: 'family-quote-frame', tagline: 'Add your family quote', price: 699 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Generations Frame', slug: 'generations-frame', tagline: 'Multi-generation family collage', price: 949 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Family Reunion Frame', slug: 'family-reunion-frame', tagline: 'Everyone in one place', price: 999 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Vacation Memories Frame', slug: 'vacation-memories-frame', tagline: 'Trip highlights collage', price: 879 },

  // Couple (5)
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Couple Love Frame', slug: 'couple-love-frame', tagline: 'Romantic minimalist style', price: 799 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Couple Travel Memories', slug: 'couple-travel-memories', tagline: 'Best trip moments in frame', price: 899 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Date Night Frame', slug: 'date-night-frame', tagline: 'Romantic evening memories', price: 769 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Engagement Story Frame', slug: 'engagement-story-frame', tagline: 'She said yes', price: 919 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Honeymoon Collage Frame', slug: 'honeymoon-collage-frame', tagline: 'Paradise memories', price: 959 },

  // Graduation (5)
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Graduation Achievement Frame', slug: 'graduation-achievement-frame', tagline: 'Celebrate your milestone', price: 849 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Honor Roll Frame', slug: 'honor-roll-frame', tagline: 'Showcase academic pride', price: 829 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Cap and Gown Frame', slug: 'cap-and-gown-frame', tagline: 'Classic graduation portrait', price: 799 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Degree Day Frame', slug: 'degree-day-frame', tagline: 'Diploma display ready', price: 879 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Scholar Achievement Frame', slug: 'scholar-achievement-frame', tagline: 'Awards and accolades', price: 899 },

  // Birthday (5)
  { category_id: '7', categorySlug: 'birthday', categoryName: 'Birthday', name: 'Happy Birthday Frame', slug: 'happy-birthday-frame', tagline: 'Classic birthday celebration', price: 749 },
  { category_id: '7', categorySlug: 'birthday', categoryName: 'Birthday', name: 'Milestone Birthday Collage', slug: 'milestone-birthday-collage', tagline: 'Every year in one frame', price: 899 },
  { category_id: '7', categorySlug: 'birthday', categoryName: 'Birthday', name: 'Kids Party Frame', slug: 'kids-party-frame', tagline: 'Colorful fun for little ones', price: 699 },
  { category_id: '7', categorySlug: 'birthday', categoryName: 'Birthday', name: 'Sweet Sixteen Frame', slug: 'sweet-sixteen-frame', tagline: 'Teen milestone keepsake', price: 819 },
  { category_id: '7', categorySlug: 'birthday', categoryName: 'Birthday', name: 'Birthday Wishes Frame', slug: 'birthday-wishes-frame', tagline: 'Add name and age', price: 769 },

  // Friendship (5)
  { category_id: '8', categorySlug: 'friendship', categoryName: 'Friendship', name: 'Best Friends Forever Frame', slug: 'best-friends-forever-frame', tagline: 'Celebrate your bond', price: 729 },
  { category_id: '8', categorySlug: 'friendship', categoryName: 'Friendship', name: 'Squad Goals Collage', slug: 'squad-goals-collage', tagline: 'Group memories together', price: 899 },
  { category_id: '8', categorySlug: 'friendship', categoryName: 'Friendship', name: 'Friendship Day Frame', slug: 'friendship-day-frame', tagline: 'Perfect gift for your crew', price: 749 },
  { category_id: '8', categorySlug: 'friendship', categoryName: 'Friendship', name: 'College Buddies Frame', slug: 'college-buddies-frame', tagline: 'Campus days on your wall', price: 799 },
  { category_id: '8', categorySlug: 'friendship', categoryName: 'Friendship', name: 'Memories Together Frame', slug: 'memories-together-frame', tagline: 'Trips and laughs framed', price: 829 },

  // Housewarming (5)
  { category_id: '9', categorySlug: 'housewarming', categoryName: 'Housewarming', name: 'New Home Frame', slug: 'new-home-frame', tagline: 'Welcome to your space', price: 779 },
  { category_id: '9', categorySlug: 'housewarming', categoryName: 'Housewarming', name: 'Welcome Home Collage', slug: 'welcome-home-collage', tagline: 'First memories in the new house', price: 919 },
  { category_id: '9', categorySlug: 'housewarming', categoryName: 'Housewarming', name: 'House Keys Keepsake', slug: 'house-keys-keepsake', tagline: 'Keys and photo display', price: 849 },
  { category_id: '9', categorySlug: 'housewarming', categoryName: 'Housewarming', name: 'Family Nest Frame', slug: 'family-nest-frame', tagline: 'Warm tones for living room', price: 799 },
  { category_id: '9', categorySlug: 'housewarming', categoryName: 'Housewarming', name: 'Hearth & Home Frame', slug: 'hearth-and-home-frame', tagline: 'Cozy home aesthetic', price: 829 },

  // Festival (5)
  { category_id: '10', categorySlug: 'festival', categoryName: 'Festival', name: 'Diwali Celebration Frame', slug: 'diwali-celebration-frame', tagline: 'Lights and joy on display', price: 849 },
  { category_id: '10', categorySlug: 'festival', categoryName: 'Festival', name: 'Festival Lights Collage', slug: 'festival-lights-collage', tagline: 'Multi-photo festive layout', price: 949 },
  { category_id: '10', categorySlug: 'festival', categoryName: 'Festival', name: 'Holiday Season Frame', slug: 'holiday-season-frame', tagline: 'Seasonal family moments', price: 799 },
  { category_id: '10', categorySlug: 'festival', categoryName: 'Festival', name: 'Navratri Memories Frame', slug: 'navratri-memories-frame', tagline: 'Nine nights of celebration', price: 879 },
  { category_id: '10', categorySlug: 'festival', categoryName: 'Festival', name: 'Festive Family Frame', slug: 'festive-family-frame', tagline: 'Gatherings worth framing', price: 819 },
];

module.exports = { CATALOG, CATEGORY_LIST };
