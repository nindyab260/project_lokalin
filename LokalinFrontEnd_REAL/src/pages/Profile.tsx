import { UserCircle2, Heart, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface User {
  username: string;
  email: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil profil");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex justify-center py-20">
          <p className="text-muted-foreground">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/95 p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-4 rounded-3xl bg-primary/5 px-6 py-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <UserCircle2 className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Profil Pengguna</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">
                Halo, {user?.username || "Pengguna"}!
              </h1>
            </div>
          </div>

          <div className="grid gap-8 rounded-3xl border border-border bg-background/80 p-6 text-sm shadow-sm">
            <div className="grid gap-2">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Nama</p>
              <p className="text-base font-semibold text-foreground">{user?.username || "-"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Email</p>
              <p className="text-base font-semibold text-foreground">{user?.email || "-"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Status</p>
              <p className="text-base font-semibold text-foreground">
                {user?.role === "ROLE_ADMIN" ? "Akun Admin" : "Akun Biasa"}
              </p>
            </div>
            <div className="grid gap-2 rounded-3xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Favorit UMKM</p>
                  <p className="text-sm text-muted-foreground">Kopi Nusantara, Batik Bandung, Dapur Ikan</p>
                </div>
                <Heart className="h-6 w-6 text-coral" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/explore">
              <Button className="rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-95">
                Jelajahi UMKM
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-destructive hover:underline"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;