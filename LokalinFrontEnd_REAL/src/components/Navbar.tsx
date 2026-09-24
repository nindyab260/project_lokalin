import { Search, MessageCircle, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/lokalin-logo.png";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Lokalin" className="h-9 w-9" />
          <span className="font-heading text-xl font-bold text-gradient-primary">Lokalin</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link to="/explore">
            <Button variant="ghost" size="sm" className="gap-2 font-body">
              <Search className="h-4 w-4" /> Jelajahi
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="ghost" size="sm" className="gap-2 font-body">
              <MessageCircle className="h-4 w-4" /> Chat
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="gap-2 font-body">
              <User className="h-4 w-4" /> Profil
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="ghost" size="sm" className="gap-2 font-body">
              Daftar
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="ml-2 gap-2 bg-gradient-primary font-body text-primary-foreground hover:opacity-90">
              <User className="h-4 w-4" /> Masuk
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/explore" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 font-body">
                <Search className="h-4 w-4" /> Jelajahi
              </Button>
            </Link>
            <Link to="/chat" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 font-body">
                <MessageCircle className="h-4 w-4" /> Chat
              </Button>
            </Link>
            <Link to="/profile" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 font-body">
                <User className="h-4 w-4" /> Profil
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 font-body">
                Daftar
              </Button>
            </Link>
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full gap-2 bg-gradient-primary font-body text-primary-foreground">
                <User className="h-4 w-4" /> Masuk
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
