import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, MessageCircle, BadgeCheck, Star, QrCode, Clock, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatingBar from "@/components/RatingBar";
import UMKMCard from "@/components/UMKMCard";
import { useState, useEffect } from "react";
import type { UMKM } from "@/data/mockData";

const UMKMDetail = () => {
  const { id } = useParams();
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedUmkm, setRelatedUmkm] = useState<UMKM[]>([]);

  useEffect(() => {
    // Fetch UMKM by ID from backend
    fetch(`http://localhost:8080/api/umkm/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil data UMKM");
        return res.json();
      })
      .then(data => {
        // Format data to match UMKM interface
        const formatted: UMKM = {
          id: String(data.id),
          name: data.name || "",
          category: data.category || "Lainnya",
          categoryIcon: data.categoryIcon || "🏢",
          description: data.description || "",
          location: data.location || "Lokasi tidak tersedia",
          distance: data.distance || "-",
          image: data.image || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
          rating: data.rating || { overall: 0, quality: 0, service: 0, price: 0, localImpact: 0 },
          reviewCount: data.reviewCount || 0,
          products: Array.isArray(data.products) ? data.products.map((p: any) => p.name || p) : [],
          phone: data.phone || "-",
          isVerified: data.isVerified || false,
        };
        setUmkm(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching UMKM:", err);
        setLoading(false);
      });

    // Fetch all UMKMs for related section
    fetch('http://localhost:8080/api/umkm')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          ...item,
          id: String(item.id),
          rating: item.rating || { overall: 0, quality: 0, service: 0, price: 0, localImpact: 0 },
          category: item.category || "Lainnya",
          categoryIcon: item.categoryIcon || "🏢",
          products: Array.isArray(item.products) ? item.products.map((p: any) => p.name || p) : [],
          image: item.image || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        }));
        setRelatedUmkm(formattedData.filter((u: UMKM) => u.id !== id).slice(0, 3));
      })
      .catch(err => console.error("Error fetching related UMKM:", err));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-body text-muted-foreground">Memuat data UMKM...</p>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">UMKM Tidak Ditemukan</h1>
          <Link to="/" className="mt-4 inline-block font-body text-primary hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const reviews = [
    { name: "Andi S.", date: "2 hari lalu", text: "Produknya berkualitas, pelayanan ramah banget! Pasti balik lagi.", rating: 4.8, verified: true },
    { name: "Dewi R.", date: "1 minggu lalu", text: "Harga sesuai kualitas. Senang bisa mendukung UMKM lokal.", rating: 4.5, verified: true },
    { name: "Budi P.", date: "2 minggu lalu", text: "Tempatnya bersih dan nyaman. Rekomendasi untuk semua.", rating: 4.7, verified: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <Link to="/explore" className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Jelajahi
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Hero Image */}
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img src={umkm.image} alt={umkm.name} className="h-[300px] w-full object-cover md:h-[400px]" />
              </div>

              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-body text-xs font-medium text-accent-foreground">
                    {umkm.categoryIcon} {umkm.category}
                  </span>
                  {umkm.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-medium text-primary">
                      <BadgeCheck className="h-3 w-3" /> Terverifikasi
                    </span>
                  )}
                </div>
                <h1 className="mb-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
                  {umkm.name}
                </h1>
                <p className="font-body text-muted-foreground">{umkm.description}</p>
              </div>

              {/* Products */}
              <div className="mb-8">
                <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">Produk & Layanan</h2>
                <div className="flex flex-wrap gap-2">
                  {umkm.products.map((product) => (
                    <span key={product} className="rounded-lg border border-border bg-card px-4 py-2 font-body text-sm text-foreground shadow-card">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Multi-dimensional Rating */}
              <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-heading text-lg font-semibold text-foreground">Penilaian Multi-Dimensi</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-lg bg-warm/10 px-3 py-1.5">
                      <Star className="h-5 w-5 fill-warm text-warm" />
                      <span className="font-heading text-xl font-bold text-foreground">{umkm.rating.overall}</span>
                    </div>
                    <span className="font-body text-sm text-muted-foreground">/ 5.0</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <RatingBar label="Kualitas Produk" value={umkm.rating.quality} />
                  <RatingBar label="Pelayanan" value={umkm.rating.service} />
                  <RatingBar label="Kesesuaian Harga" value={umkm.rating.price} />
                  <RatingBar label="Dampak Lokal" value={umkm.rating.localImpact} />
                </div>
                <p className="mt-4 font-body text-xs text-muted-foreground">
                  Berdasarkan {umkm.reviewCount} ulasan terverifikasi
                </p>
              </div>

              {/* Reviews */}
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-heading text-lg font-semibold text-foreground">Ulasan Terbaru</h2>
                  <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-body text-xs text-accent-foreground">
                    <QrCode className="h-3 w-3" /> Scan QR untuk Review
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((review, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="rounded-xl border border-border bg-card p-4 shadow-card"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-accent-foreground">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-heading text-sm font-semibold text-foreground">{review.name}</span>
                              {review.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                            </div>
                            <span className="font-body text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 rounded-md bg-warm/10 px-2 py-0.5">
                          <Star className="h-3 w-3 fill-warm text-warm" />
                          <span className="font-heading text-xs font-bold text-foreground">{review.rating}</span>
                        </div>
                      </div>
                      <p className="font-body text-sm text-muted-foreground">{review.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <h3 className="mb-4 font-heading text-base font-semibold text-foreground">Informasi Kontak</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="font-body text-sm text-muted-foreground">{umkm.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-body text-sm text-muted-foreground">{umkm.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-body text-sm text-muted-foreground">08:00 - 21:00 WIB</span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Link to={`/chat?umkm=${umkm.id}`}>
                    <Button className="w-full gap-2 bg-gradient-primary font-body text-primary-foreground hover:opacity-90">
                      <MessageCircle className="h-4 w-4" /> Chat Sekarang
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full gap-2 font-body">
                    <Share2 className="h-4 w-4" /> Bagikan
                  </Button>
                </div>
              </motion.div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <div className="flex h-48 items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="font-body text-sm text-muted-foreground">Peta Lokasi</p>
                    <p className="font-body text-xs text-muted-foreground">{umkm.distance} dari lokasi Anda</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="rounded-xl border border-border bg-card p-5 text-center shadow-card">
                <QrCode className="mx-auto mb-2 h-12 w-12 text-primary" />
                <h4 className="font-heading text-sm font-semibold text-foreground">QR Code Review</h4>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  Scan QR di tempat UMKM untuk memberikan review terverifikasi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="mb-6 font-heading text-xl font-bold text-foreground">UMKM Serupa</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedUmkm.map((u, i) => (
              <UMKMCard key={u.id} umkm={u} index={i} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UMKMDetail;