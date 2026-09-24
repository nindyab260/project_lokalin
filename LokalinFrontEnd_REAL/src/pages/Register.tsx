import { Store, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface AuthResponse {
  token: string;
  message: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Isi nama, email, dan kata sandi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/95 p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
          <div className="mb-8 rounded-3xl bg-primary/5 p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Store className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Daftar Sekarang</p>
                <h1 className="mt-2 text-3xl font-bold text-foreground">Buat Akun Baru</h1>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Daftar untuk mendapatkan akses penuh ke fitur profil, menyimpan UMKM favorit, dan rekomendasi usaha lokal personal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-border bg-background/80 p-6 shadow-sm">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Nama Lengkap</label>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama lengkap"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="border-0 bg-transparent px-0 py-0 outline-none"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border-0 bg-transparent px-0 py-0 outline-none"
                />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">Kata Sandi</label>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="border-0 bg-transparent px-0 py-0 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Konfirmasi Sandi</label>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Ulangi kata sandi"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="border-0 bg-transparent px-0 py-0 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">Nomor Telepon</label>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0812xxxxxxx"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="border-0 bg-transparent px-0 py-0 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium text-foreground">Lokasi</label>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Kota atau kecamatan"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="border-0 bg-transparent px-0 py-0 outline-none"
                  />
                </div>
              </div>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-95">
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Sudah punya akun? <Link to="/login" className="text-primary hover:underline">Masuk di sini</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
