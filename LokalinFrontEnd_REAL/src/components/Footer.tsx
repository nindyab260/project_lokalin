import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-heading text-lg font-bold text-gradient-primary">Lokalin</h3>
            <p className="font-body text-sm text-muted-foreground">
              Platform promosi dan pencarian UMKM lokal. Membantu usaha kecil lebih mudah ditemukan masyarakat sekitar.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Fitur</h4>
            <ul className="space-y-2 font-body text-sm text-muted-foreground">
              <li>Pencarian UMKM Terdekat</li>
              <li>Multi-Dimensional Rating</li>
              <li>Chat Langsung</li>
              <li>QR Code Review</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Untuk UMKM</h4>
            <ul className="space-y-2 font-body text-sm text-muted-foreground">
              <li>Daftarkan Usahamu</li>
              <li>Kelola Profil</li>
              <li>Upload Produk</li>
              <li>Lihat Statistik</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-1 border-t border-border pt-6 font-body text-sm text-muted-foreground">
          Dibuat dengan <Heart className="h-3.5 w-3.5 fill-coral text-coral" /> untuk UMKM Indonesia
        </div>
      </div>
    </footer>
  );
};

export default Footer;
