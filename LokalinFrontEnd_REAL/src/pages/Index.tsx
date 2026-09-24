import { Search, MapPin, ArrowRight, Star, QrCode, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UMKMCard from "@/components/UMKMCard";
import { categories, umkmList } from "@/data/mockData";
import heroImg from "@/assets/hero-umkm.jpg";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Cari Berdasarkan Lokasi",
      desc: "Temukan UMKM terdekat dari posisimu saat ini",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Rating Multi-Dimensi",
      desc: "Penilaian dari kualitas, pelayanan, harga, dan dampak lokal",
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "QR Code Review",
      desc: "Scan di tempat untuk review yang terpercaya dan anti palsu",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Chat Langsung",
      desc: "Tanya harga, stok, atau pesan langsung ke pemilik usaha",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-body text-sm font-medium text-accent-foreground">
                  Platform UMKM Terpercaya
                </span>
              </div>
              <h1 className="mb-4 font-heading text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Temukan UMKM{" "}
                <span className="text-gradient-primary">Lokal Terbaik</span>{" "}
                di Sekitarmu
              </h1>
              <p className="mb-8 max-w-lg font-body text-lg text-muted-foreground">
                Dukung usaha lokal dengan menemukan, menilai, dan berinteraksi langsung dengan UMKM berkualitas di daerahmu.
              </p>

              {/* Search Bar */}
              <div className="flex max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-hero">
                <div className="flex flex-1 items-center gap-2 px-4">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari UMKM, produk, atau kategori..."
                    className="w-full bg-transparent py-3.5 font-body text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link to={`/explore${searchQuery ? `?q=${searchQuery}` : ""}`}>
                  <Button className="m-1.5 gap-2 rounded-lg bg-gradient-primary px-5 font-body text-primary-foreground hover:opacity-90">
                    Cari <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-4 font-body text-sm text-muted-foreground">
                <span>Populer:</span>
                {["Kuliner", "Batik", "Kopi"].map((tag) => (
                  <Link
                    key={tag}
                    to={`/explore?q=${tag}`}
                    className="rounded-full border border-border px-3 py-1 transition-colors hover:border-primary hover:text-primary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-hero">
                  <img
                    src={heroImg}
                    alt="UMKM lokal Indonesia"
                    className="h-[400px] w-full object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-card-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-xl">
                      🏪
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold text-foreground">2,400+</p>
                      <p className="font-body text-xs text-muted-foreground">UMKM Terdaftar</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-4 top-8 rounded-xl border border-border bg-card p-4 shadow-card-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm/10 text-xl">
                      ⭐
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold text-foreground">4.7</p>
                      <p className="font-body text-xs text-muted-foreground">Rata-rata Rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                Kategori UMKM
              </h2>
              <p className="mt-1 font-body text-muted-foreground">
                Jelajahi berbagai kategori usaha lokal
              </p>
            </div>
            <Link to="/explore" className="hidden items-center gap-1 font-body text-sm font-medium text-primary hover:underline md:flex">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/explore?category=${cat.name}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-card-hover"
                >
                  <span className="text-3xl transition-transform group-hover:scale-110">
                    {cat.icon}
                  </span>
                  <span className="font-heading text-sm font-semibold text-foreground">
                    {cat.name}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    {cat.count} usaha
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-warm/10 px-3 py-1 font-body text-xs font-medium text-secondary-foreground">
                🔥 Rekomendasi Untukmu
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                UMKM Populer di Sekitarmu
              </h2>
            </div>
            <Link to="/explore" className="hidden items-center gap-1 font-body text-sm font-medium text-primary hover:underline md:flex">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {umkmList.slice(0, 6).map((umkm, i) => (
              <UMKMCard key={umkm.id} umkm={umkm} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Mengapa <span className="text-gradient-primary">Lokalin</span>?
            </h2>
            <p className="mt-2 font-body text-muted-foreground">
              Bukan marketplace biasa — kami fokus pada kepercayaan dan visibilitas
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  {feat.icon}
                </div>
                <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                  {feat.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl bg-gradient-primary p-10 text-center md:p-16">
            <h2 className="mb-3 font-heading text-2xl font-bold text-primary-foreground md:text-4xl">
              Punya UMKM? Daftarkan Usahamu!
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-body text-primary-foreground/80">
              Tingkatkan visibilitas usahamu dan jangkau lebih banyak pelanggan di sekitarmu secara gratis.
            </p>
            <Link to="/register">
              <Button size="lg" className="gap-2 rounded-xl bg-card font-heading font-semibold text-primary hover:bg-card/90">
                Daftar Sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
