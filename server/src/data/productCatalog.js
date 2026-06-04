/** Product definitions — 7 frames per occasion category */

const CATALOG = [
  // Wedding
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Love Story Frame', slug: 'love-story-frame', tagline: 'Your journey, beautifully framed', price: 899, is_featured: true },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Royal Wedding Collage', slug: 'royal-wedding-collage', tagline: 'Multiple moments in one frame', price: 999 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Wedding Date Keepsake', slug: 'wedding-date-keepsake', tagline: 'Remember your special date forever', price: 849 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Eternal Vows Frame', slug: 'eternal-vows-frame', tagline: 'Classic wedding portrait display', price: 929 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Bridal Portrait Frame', slug: 'bridal-portrait-frame', tagline: 'Elegant bride showcase', price: 949 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Ring Ceremony Frame', slug: 'ring-ceremony-frame', tagline: 'Capture the perfect ring moment', price: 879 },
  { category_id: '1', categorySlug: 'wedding', categoryName: 'Wedding', name: 'Mehendi Memories Frame', slug: 'mehendi-memories-frame', tagline: 'Vibrant pre-wedding celebrations', price: 899 },

  // Anniversary
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Golden Anniversary Frame', slug: 'golden-anniversary-frame', tagline: 'Elegant gift for every year', price: 799 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Anniversary Memory Wall', slug: 'anniversary-memory-wall', tagline: 'Timeline of your journey', price: 1099 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Silver Years Frame', slug: 'silver-years-frame', tagline: 'Celebrate years of togetherness', price: 879 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'First Date Keepsake', slug: 'first-date-keepsake', tagline: 'Where it all began', price: 749 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Together Forever Collage', slug: 'together-forever-collage', tagline: 'Your story in one frame', price: 959 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Ruby Anniversary Frame', slug: 'ruby-anniversary-frame', tagline: 'Bold red accents for 40 years', price: 919 },
  { category_id: '2', categorySlug: 'anniversary', categoryName: 'Anniversary', name: 'Years of Love Frame', slug: 'years-of-love-frame', tagline: 'Mark every milestone together', price: 829 },

  // Baby
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Baby First Year Frame', slug: 'baby-first-year-frame', tagline: 'From newborn to first birthday', price: 899 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Baby Name Frame', slug: 'baby-name-frame', tagline: 'Personalized with baby name', price: 759 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Little Star Frame', slug: 'little-star-frame', tagline: 'Sweet nursery wall art', price: 819 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Newborn Welcome Frame', slug: 'newborn-welcome-frame', tagline: 'Hello world announcement', price: 799 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Milestone Grid Frame', slug: 'milestone-grid-frame', tagline: 'Monthly growth photos', price: 929 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Little Angel Frame', slug: 'little-angel-frame', tagline: 'Soft tones for nursery', price: 769 },
  { category_id: '3', categorySlug: 'baby', categoryName: 'Baby', name: 'Sibling Love Frame', slug: 'sibling-love-frame', tagline: 'Big brother & little sister', price: 849 },

  // Family
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Family Portrait Frame', slug: 'family-portrait-frame', tagline: 'Together forever', price: 749 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Family Quote Frame', slug: 'family-quote-frame', tagline: 'Add your family quote', price: 699 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Generations Frame', slug: 'generations-frame', tagline: 'Multi-generation family collage', price: 949 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Family Reunion Frame', slug: 'family-reunion-frame', tagline: 'Everyone in one place', price: 999 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Vacation Memories Frame', slug: 'vacation-memories-frame', tagline: 'Trip highlights collage', price: 879 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Grandparents Heritage Frame', slug: 'grandparents-heritage-frame', tagline: 'Honor your roots', price: 829 },
  { category_id: '4', categorySlug: 'family', categoryName: 'Family', name: 'Holiday Together Frame', slug: 'holiday-together-frame', tagline: 'Festive family moments', price: 789 },

  // Couple
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Couple Love Frame', slug: 'couple-love-frame', tagline: 'Romantic minimalist style', price: 799 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Couple Travel Memories', slug: 'couple-travel-memories', tagline: 'Best trip moments in frame', price: 899 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Date Night Frame', slug: 'date-night-frame', tagline: 'Romantic evening memories', price: 769 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Engagement Story Frame', slug: 'engagement-story-frame', tagline: 'She said yes', price: 919 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Honeymoon Collage Frame', slug: 'honeymoon-collage-frame', tagline: 'Paradise memories', price: 959 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Soulmates Frame', slug: 'soulmates-frame', tagline: 'Minimal duo portrait', price: 749 },
  { category_id: '5', categorySlug: 'couple', categoryName: 'Couple', name: 'Adventure Together Frame', slug: 'adventure-together-frame', tagline: 'Outdoor couple moments', price: 839 },

  // Graduation
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Graduation Achievement Frame', slug: 'graduation-achievement-frame', tagline: 'Celebrate your milestone', price: 849 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Honor Roll Frame', slug: 'honor-roll-frame', tagline: 'Showcase academic pride', price: 829 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Cap and Gown Frame', slug: 'cap-and-gown-frame', tagline: 'Classic graduation portrait', price: 799 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Degree Day Frame', slug: 'degree-day-frame', tagline: 'Diploma display ready', price: 879 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'School Memories Collage', slug: 'school-memories-collage', tagline: 'Years of friendships', price: 929 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Scholar Achievement Frame', slug: 'scholar-achievement-frame', tagline: 'Awards and accolades', price: 899 },
  { category_id: '6', categorySlug: 'graduation', categoryName: 'Graduation', name: 'Future Starts Here Frame', slug: 'future-starts-here-frame', tagline: 'Inspire the next chapter', price: 819 },
];

module.exports = { CATALOG };
