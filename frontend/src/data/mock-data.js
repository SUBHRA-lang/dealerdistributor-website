// Mock data for DealerDistributors clone

export const categories = [
  { id: 1, name: 'Food & Beverage', icon: 'UtensilsCrossed', slug: 'food-beverage' },
  { id: 2, name: 'Health & Beauty', icon: 'Heart', slug: 'health-beauty' },
  { id: 3, name: 'Pharmaceuticals', icon: 'Pill', slug: 'pharmaceuticals' },
  { id: 4, name: 'Apparel & Fashion', icon: 'Shirt', slug: 'apparel-fashion' },
  { id: 5, name: 'Chemicals', icon: 'Beaker', slug: 'chemicals' },
  { id: 6, name: 'Home Supplies', icon: 'Home', slug: 'home-supplies' },
  { id: 7, name: 'Construction & Real Estate', icon: 'Building2', slug: 'construction-real-estate' },
  { id: 8, name: 'Electronics & Electrical Supplies', icon: 'Zap', slug: 'electronics-electrical' },
  { id: 9, name: 'Agriculture', icon: 'Wheat', slug: 'agriculture' },
  { id: 10, name: 'Automobile', icon: 'Car', slug: 'automobile' },
  { id: 11, name: 'Packaging & Paper', icon: 'Package', slug: 'packaging-paper' },
  { id: 12, name: 'Hospital & Medical Supplies', icon: 'Hospital', slug: 'hospital-medical' },
  { id: 13, name: 'Gifts & Crafts', icon: 'Gift', slug: 'gifts-crafts' },
  { id: 14, name: 'Consumer Electronics', icon: 'Laptop', slug: 'consumer-electronics' },
  { id: 15, name: 'Pipes, Tubes & Fittings', icon: 'Pipette', slug: 'pipes-tubes' },
  { id: 16, name: 'Industrial Supplies', icon: 'Factory', slug: 'industrial-supplies' }
];

export const distributors = [
  {
    id: 1,
    type: 'distributor',
    name: 'Epsilon Petrochem',
    category: 'Automobile',
    categoryId: 10,
    logo: 'https://placehold.co/200x200/4F46E5/ffffff?text=EP',
    investmentRange: '₹ 5Lac - ₹10Lac',
    established: 1993,
    products: ['BIKE ENGINE OIL - KEMRON FLY 4T 20W40 SN', 'KEMRON MOTOBIKE 4T 20W50 SL', 'KEMRON AEROFLY 4T 10W30 SL', 'KEMRON HYDROTECH AW 68 BERAL'],
    phone: '08071793082',
    description: 'Leading manufacturer and distributor of premium automotive lubricants and engine oils.',
    location: 'Mumbai, Maharashtra',
    experience: '30+ years',
    territories: ['Maharashtra', 'Gujarat', 'Karnataka']
  },
  {
    id: 2,
    type: 'distributor',
    name: 'Jayant Agro-Organics Limited',
    category: 'Health & Beauty',
    categoryId: 2,
    logo: 'https://placehold.co/200x200/10B981/ffffff?text=JAO',
    investmentRange: '₹ 1Lac - ₹2Lac',
    established: 2020,
    products: ['EriCare Organic Castor Oil 200ML', 'EriCare Organic Castor Oil 50ML', '200ML EriCare Cold-Pressed Castor Oil', '500ML EriCare Cold-Pressed Castor Oil'],
    phone: '08758655303',
    description: 'Organic beauty and personal care products manufacturer specializing in natural oils.',
    location: 'New Delhi, Delhi',
    experience: '5+ years',
    territories: ['All India']
  },
  {
    id: 3,
    type: 'distributor',
    name: 'Eagle Plant Protect Pvt. Ltd.',
    category: 'Chemicals',
    categoryId: 5,
    logo: 'https://placehold.co/200x200/F59E0B/ffffff?text=EPP',
    investmentRange: '₹ 1Lac - ₹2Lac',
    established: 2009,
    products: ['Disaster Bio Plant Protector', 'Paragle Paraquat Dichloride Herbicide', 'Boforce Gold Insecticide', 'Bhukamp For all types of Crops'],
    phone: '07971459539',
    description: 'Agricultural chemicals and plant protection products for modern farming.',
    location: 'Pune, Maharashtra',
    experience: '16+ years',
    territories: ['Maharashtra', 'Madhya Pradesh', 'Rajasthan']
  },
  {
    id: 4,
    type: 'distributor',
    name: 'Konya Biotech Private Limited',
    category: 'Health & Beauty',
    categoryId: 2,
    logo: 'https://placehold.co/200x200/EC4899/ffffff?text=KBL',
    investmentRange: '₹ 1Lac - ₹5Lac',
    established: 2025,
    products: ['Tylvalo-WSP TYLVALOSIN 62.5%', 'Gentacin-WSP Gentamicin 10%', 'Lasalocid-WSP LASALOCID SODIUM 20%', 'LincoSpect-WSP LINCOMYCIN 22.2% +SPECTINOMYCIN 44.4%'],
    phone: '07971459829',
    description: 'Biotechnology products for health and wellness applications.',
    location: 'Bangalore, Karnataka',
    experience: 'New Entry',
    territories: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh']
  },
  {
    id: 5,
    type: 'distributor',
    name: 'Toreto Retail Private Limited',
    category: 'Consumer Electronics',
    categoryId: 14,
    logo: 'https://placehold.co/200x200/8B5CF6/ffffff?text=TR',
    investmentRange: '₹ 2Lac - ₹5Lac',
    established: 2014,
    products: ['Fidget Pop Portable Bluetooth speaker', 'Party Rockz Bluetooth speaker', 'Twin Magno Magnetic wireless Bluetooth speaker', 'Wave Mini Portable Bluetooth speaker'],
    phone: '07971191167',
    description: 'Consumer electronics brand specializing in audio devices and accessories.',
    location: 'Delhi, Delhi',
    experience: '11+ years',
    territories: ['North India', 'East India']
  },
  {
    id: 6,
    type: 'distributor',
    name: 'Nutrinest Foods',
    category: 'Food & Beverage',
    categoryId: 1,
    logo: 'https://placehold.co/200x200/14B8A6/ffffff?text=NF',
    investmentRange: '₹ 2Lac - ₹3Lac',
    established: 2025,
    products: ['Peanut Butter Chocolate Flavour 500g [Crunchy]', 'Hazelnut Peanut Butter', 'Peanut Butter Strawberry 1kg [Crunchy]', 'Cookies and Cream'],
    phone: '07971191219',
    description: 'Premium health food products focusing on natural nut butters and spreads.',
    location: 'Mumbai, Maharashtra',
    experience: 'New Entry',
    territories: ['Maharashtra', 'Gujarat']
  },
  {
    id: 7,
    type: 'franchise',
    name: 'Kunafa Hub',
    category: 'Food & Beverage',
    categoryId: 1,
    logo: 'https://placehold.co/200x200/FF6B2C/ffffff?text=KH',
    investmentRange: '₹ 50,000',
    established: 2021,
    products: ['Authentic Kunafa', 'Arabic Desserts', 'Beverages'],
    phone: '08071793082',
    description: 'Popular dessert franchise specializing in authentic Arabic Kunafa and sweets.',
    location: 'Kozhikode, Kerala',
    experience: '3 years',
    territories: ['Kerala', 'Tamil Nadu']
  },
  {
    id: 8,
    type: 'franchise',
    name: 'HFC Food Private Limited',
    category: 'Food & Beverage',
    categoryId: 1,
    logo: 'https://placehold.co/200x200/2C3E95/ffffff?text=HFC',
    investmentRange: '₹ 5Lac - ₹10Lac',
    established: 2018,
    products: ['Fried Chicken', 'Burgers', 'Sides'],
    phone: '08758655303',
    description: 'Fast food franchise offering high-quality fried chicken and continental quick bites.',
    location: 'Kolkata, West Bengal',
    experience: '6 years',
    territories: ['West Bengal', 'Bihar', 'Odisha']
  },
  {
    id: 9,
    type: 'franchise',
    name: 'Style Saga',
    category: 'Apparel & Fashion',
    categoryId: 4,
    logo: 'https://placehold.co/200x200/EC4899/ffffff?text=SS',
    investmentRange: '₹ 30Lac - ₹50Lac',
    established: 2015,
    products: ['Ethnic Wear', 'Designer Sarees', 'Lehengas'],
    phone: '07971459539',
    description: 'Premium ethnic wear franchise for women, showcasing Kasturi Creations designer labels.',
    location: 'Faridabad, Haryana',
    experience: '9 years',
    territories: ['North India', 'West India']
  },
  {
    id: 10,
    type: 'franchise',
    name: 'Aidley Formulations',
    category: 'Health & Beauty',
    categoryId: 2,
    logo: 'https://placehold.co/200x200/10B981/ffffff?text=AF',
    investmentRange: '₹ 50,000 - ₹2Lac',
    established: 2022,
    products: ['Skincare Products', 'Haircare Solutions', 'Wellness Formulations'],
    phone: '07971459829',
    description: 'Pharmaceutical and cosmetics franchise focusing on effective health and beauty formulations.',
    location: 'Mohali, Punjab',
    experience: '2 years',
    territories: ['Punjab', 'Haryana', 'Himachal Pradesh']
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Mr Vyankatesh (BDO)',
    designation: 'Business Development Officer',
    company: 'Sarvika Enterprises, Taloja, Maharashtra',
    image: 'https://placehold.co/100x100/4F46E5/ffffff?text=VE',
    testimonial: 'I highly recommend DealerDistributors.com to anyone looking to expand their distribution network. Their platform has played a key role in connecting us with highly reliable distributors and partners.'
  },
  {
    id: 2,
    name: 'Mr. Sarbjit Singh',
    designation: 'Proprietor',
    company: 'Cosmba Machinery Co., Moradabad, Uttar Pradesh',
    image: 'https://placehold.co/100x100/10B981/ffffff?text=SS',
    testimonial: 'DealerDistributors.com has been a game-changer for our company. Their user-friendly interface made it easy to connect with verified distributors.'
  },
  {
    id: 3,
    name: 'Mr Sanmesh Naik',
    designation: 'MD',
    company: 'Kakushin Enterprise, Vasai, Maharashtra',
    image: 'https://placehold.co/100x100/F59E0B/ffffff?text=SN',
    testimonial: 'Within a few days of joining we started getting genuine leads from all across India. Within 4 weeks we successfully appointed 4 potential distributors.'
  },
  {
    id: 4,
    name: 'Mr Bharat Boda',
    designation: 'Partner',
    company: 'Safe Power Products, Morbi, Gujarat',
    image: 'https://placehold.co/100x100/EC4899/ffffff?text=BB',
    testimonial: 'DealerDistributors.com has completely revamped our business! It connected me with the ideal distributors that not only matched my interests but also aligned perfectly with my goals.'
  },
  {
    id: 5,
    name: 'Mr Vipin Jindal',
    designation: 'Director',
    company: 'Prizma Safetech Private Limited, Delhi',
    image: 'https://placehold.co/100x100/8B5CF6/ffffff?text=VJ',
    testimonial: 'Their platform is a treasure trove. Working with the committed account manager was a delight because she offered great direction and assistance.'
  },
  {
    id: 6,
    name: 'Mr Mohd Arif',
    designation: 'Director',
    company: 'Anjoqueen Magic Delight Private Limited, Faridabad, Haryana',
    image: 'https://placehold.co/100x100/14B8A6/ffffff?text=MA',
    testimonial: 'Excellent platform if you want to connect with credible distributors, expand your company\'s growth, and enhance your brand value.'
  },
  {
    id: 7,
    name: 'Mr. Rajesh Kumar',
    designation: 'Managing Director',
    company: 'Rajesh Trading Co., Indore, MP',
    image: 'https://placehold.co/100x100/F43F5E/ffffff?text=RK',
    testimonial: 'We found very professional distributors within 2 weeks of our requirement post. The support team is very helpful.'
  },
  {
    id: 8,
    name: 'Ms. Deepika Sharma',
    designation: 'Owner',
    company: 'Organic Life, Jaipur, Rajasthan',
    image: 'https://placehold.co/100x100/10B981/ffffff?text=DS',
    testimonial: 'A must-have platform for any manufacturer looking to go national. Their verification process is top-notch.'
  },
  {
    id: 9,
    name: 'Mr. Amit Patel',
    designation: 'Sales Head',
    company: 'Patel Electronics, Surat, Gujarat',
    image: 'https://placehold.co/100x100/3B82F6/ffffff?text=AP',
    testimonial: 'Our business expanded to 3 new states in just 3 months. Highly efficient service!'
  },
  {
    id: 10,
    name: 'Mr. Vikram Singh',
    designation: 'Founder',
    company: 'Singh Spices, Amritsar, Punjab',
    image: 'https://placehold.co/100x100/8B5CF6/ffffff?text=VS',
    testimonial: 'Excellent ROI. We used to struggle to find distributors in the South, but now we have a strong presence there.'
  },
  {
    id: 11,
    name: 'Ms. Neha Gupta',
    designation: 'CEO',
    company: 'Neha Cosmetics, Kolkata, WB',
    image: 'https://placehold.co/100x100/EC4899/ffffff?text=NG',
    testimonial: 'The dashboard is very intuitive and the lead quality is consistently high.'
  },
  {
    id: 12,
    name: 'Mr. Suresh Menon',
    designation: 'Partner',
    company: 'Suresh & Co, Kochi, Kerala',
    image: 'https://placehold.co/100x100/14B8A6/ffffff?text=SM',
    testimonial: 'DealerDistributors has helped us build a reliable network of supply chain partners across South India.'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: 'How to Become a Distributor of Raj Hing & Peda: A Profitable Business Opportunity',
    excerpt: 'According to the current and fast growing Indian FMCG market, the aspect of authentic taste, traditional ingredients as well as reliable quality in the market is defining consumer buying behavior...',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    date: '2025-03-15',
    author: 'DealerDistributors Team',
    category: 'Business Opportunities'
  },
  {
    id: 2,
    title: 'Start Your Journey as a Peanut Butter Distributor',
    excerpt: 'The growth of the Health Food Industry around the World is increasing rapidly. Peanut butter has become a dominant product in the Plant Protein category...',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=250&fit=crop',
    date: '2025-02-20',
    author: 'DealerDistributors Team',
    category: 'Food & Beverage'
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Product Distributorships and How They Work',
    excerpt: 'Understanding the distributorship model and how it can help you expand your business reach across multiple territories and markets...',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
    date: '2025-02-10',
    author: 'GetDistributors Team',
    category: 'Guide'
  },
  {
    id: 4,
    title: '5 Tips to Choose the Right Distributor for Your Business',
    excerpt: 'Selecting the right partner is crucial for long-term success. Learn how to evaluate potential distributors...',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    date: '2025-01-25',
    author: 'Marketing Team',
    category: 'Guide'
  },
  {
    id: 5,
    title: 'Trends in the Indian Pharmaceutical Distribution Market',
    excerpt: 'The pharma sector is undergoing a digital transformation. Discover the latest trends in drug distribution...',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400&h=250&fit=crop',
    date: '2025-01-15',
    author: 'Pharma Expert',
    category: 'Insights'
  },
  {
    id: 6,
    title: 'Future of E-commerce Logistics in Rural India',
    excerpt: 'Reaching the last mile in rural India is the next big challenge for e-commerce companies...',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=400&h=250&fit=crop',
    date: '2025-01-05',
    author: 'Tech Team',
    category: 'Insights'
  },
  {
    id: 7,
    title: 'Sustainable Packaging: A New Standard for Distribution',
    excerpt: 'Eco-friendly packaging is no longer optional. Learn how to implement green practices in your supply chain...',
    image: 'https://images.unsplash.com/photo-1591336445984-750d4eb8ba0b?w=400&h=250&fit=crop',
    date: '2024-12-20',
    author: 'Sustainability Team',
    category: 'Insights'
  },
  {
    id: 8,
    title: 'The Role of AI in Inventory Management',
    excerpt: 'Artificial Intelligence is revolutionizing how businesses manage their stock and predict demand...',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    date: '2024-12-10',
    author: 'Data Team',
    category: 'Insights'
  },
  {
    id: 9,
    title: 'Expanding Your Franchise: When is the Right Time?',
    excerpt: 'Scaling a franchise requires careful timing and market analysis. Here is how to know if you are ready...',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    date: '2024-12-01',
    author: 'Franchise Team',
    category: 'Insights'
  }
];

export const videoTestimonials = [
  { id: 1, youtubeId: 'kveOfJWz5Qw', thumbnail: 'https://img.youtube.com/vi/kveOfJWz5Qw/maxresdefault.jpg', title: 'Service Review Compilation' },
  { id: 2, youtubeId: 'I6hENYZiRoY', thumbnail: 'https://img.youtube.com/vi/I6hENYZiRoY/maxresdefault.jpg', title: 'Abhinav Pandey (Owner)' },
  { id: 3, youtubeId: 'vLV9-RqOjUE', thumbnail: 'https://img.youtube.com/vi/vLV9-RqOjUE/maxresdefault.jpg', title: 'Ms. Urmila Meghnani (Owner)' }
];
