import { UserCircle2 } from "lucide-react";
import { type FormEvent, useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Silakan isi email dan kata sandi.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      localStorage.setItem("token", data.token);
      navigate("/explore");
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
        <section className="mx-auto max-w-2xl rounded-3xl border border-border bg-card/95 p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-4 rounded-3xl bg-primary/5 px-6 py-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <UserCircle2 className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Login</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">Masuk ke Akun Kamu</h1>
            </div>
          </div>

          <p className="mb-8 max-w-xl text-base leading-7 text-muted-foreground">
            Masuk agar kamu dapat mengelola profil, menyimpan favorit, dan melihat rekomendasi UMKM lokal.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-border bg-background/80 p-6 shadow-sm">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Kata Sandi
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-95">
              {loading ? "Memproses..." : "Masuk"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Belum punya akun? <Link to="/register" className="text-primary hover:underline">Daftar sekarang</Link>
            </p>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
