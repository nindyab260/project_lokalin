export interface UMKM {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  description: string;
  location: string;
  distance: string;
  image: string;
  rating: {
    overall: number;
    quality: number;
    service: number;
    price: number;
    localImpact: number;
  };
  reviewCount: number;
  products: string[];
  phone: string;
  isVerified: boolean;
}

export const categories = [
  { name: "Kuliner", icon: "🍜", count: 234 },
  { name: "Fashion", icon: "👗", count: 156 },
  { name: "Kerajinan", icon: "🎨", count: 89 },
  { name: "Pertanian", icon: "🌾", count: 67 },
  { name: "Jasa", icon: "🔧", count: 123 },
  { name: "Minuman", icon: "🧃", count: 98 },
  { name: "Kecantikan", icon: "💆", count: 76 },
  { name: "Elektronik", icon: "📱", count: 45 },
];

export const umkmList: UMKM[] = [
  {
    id: "1",
    name: "Warung Nasi Bakar Bu Siti",
    category: "Kuliner",
    categoryIcon: "🍜",
    description: "Nasi bakar khas Jawa dengan bumbu rempah tradisional yang sudah turun temurun. Tersedia berbagai lauk pilihan segar setiap hari.",
    location: "Jl. Malioboro No. 45, Yogyakarta",
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    rating: { overall: 4.7, quality: 4.8, service: 4.6, price: 4.9, localImpact: 4.5 },
    reviewCount: 128,
    products: ["Nasi Bakar Ayam", "Nasi Bakar Ikan", "Nasi Bakar Jamur"],
    phone: "+6281234567890",
    isVerified: true,
  },
  {
    id: "2",
    name: "Batik Sekar Arum",
    category: "Fashion",
    categoryIcon: "👗",
    description: "Batik tulis premium asli Solo dengan motif kontemporer. Setiap kain dibuat dengan tangan oleh pengrajin berpengalaman.",
    location: "Jl. Slamet Riyadi No. 12, Solo",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop",
    rating: { overall: 4.9, quality: 5.0, service: 4.8, price: 4.7, localImpact: 5.0 },
    reviewCount: 89,
    products: ["Batik Tulis", "Kemeja Batik", "Dress Batik"],
    phone: "+6281234567891",
    isVerified: true,
  },
  {
    id: "3",
    name: "Kopi Nusantara",
    category: "Minuman",
    categoryIcon: "🧃",
    description: "Kedai kopi lokal dengan biji kopi pilihan dari berbagai daerah di Indonesia. Suasana cozy dan nyaman.",
    location: "Jl. Braga No. 78, Bandung",
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    rating: { overall: 4.5, quality: 4.6, service: 4.4, price: 4.3, localImpact: 4.7 },
    reviewCount: 203,
    products: ["Kopi Toraja", "Kopi Gayo", "Kopi Kintamani"],
    phone: "+6281234567892",
    isVerified: false,
  },
  {
    id: "4",
    name: "Keramik Tangan Emas",
    category: "Kerajinan",
    categoryIcon: "🎨",
    description: "Keramik handmade berkualitas tinggi dengan desain unik khas Indonesia. Cocok untuk dekorasi rumah dan hadiah.",
    location: "Jl. Kasongan No. 5, Bantul",
    distance: "3.5 km",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
    rating: { overall: 4.6, quality: 4.9, service: 4.3, price: 4.4, localImpact: 4.8 },
    reviewCount: 56,
    products: ["Vas Bunga", "Piring Hias", "Mangkok Keramik"],
    phone: "+6281234567893",
    isVerified: true,
  },
  {
    id: "5",
    name: "Salon Cantik Alami",
    category: "Kecantikan",
    categoryIcon: "💆",
    description: "Salon kecantikan dengan perawatan alami menggunakan bahan-bahan tradisional Indonesia. Ramah dan profesional.",
    location: "Jl. Sudirman No. 33, Semarang",
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    rating: { overall: 4.4, quality: 4.5, service: 4.6, price: 4.2, localImpact: 4.3 },
    reviewCount: 167,
    products: ["Creambath Herbal", "Facial Alami", "Lulur Tradisional"],
    phone: "+6281234567894",
    isVerified: true,
  },
  {
    id: "6",
    name: "Toko Roti Makmur",
    category: "Kuliner",
    categoryIcon: "🍜",
    description: "Roti dan kue tradisional segar setiap hari. Resep warisan keluarga dengan cita rasa autentik yang tak berubah.",
    location: "Jl. Asia Afrika No. 22, Bandung",
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    rating: { overall: 4.8, quality: 4.9, service: 4.7, price: 4.8, localImpact: 4.6 },
    reviewCount: 312,
    products: ["Roti Unyil", "Bolen Pisang", "Kue Cubit"],
    phone: "+6281234567895",
    isVerified: true,
  },
];
