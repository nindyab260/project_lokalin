import { MessageSquare, Send, ArrowLeft } from "lucide-react";
import { type FormEvent, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const umkmId = searchParams.get("umkm");
  const [umkmName, setUmkmName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (umkmId) {
      fetch(`http://localhost:8080/api/umkm/${umkmId}`)
        .then(res => res.json())
        .then(data => {
          setUmkmName(data.name || "");
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching UMKM:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [umkmId]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "owner", text: "Halo! Ada yang bisa saya bantu?", time: "09:02" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "user", text: newMessage.trim(), time: "09:05" },
    ]);

    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "owner",
          text: "Terima kasih! Silakan sebutkan kebutuhan UMKM Anda.",
          time: "09:06",
        },
      ]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/95 p-6 shadow-xl shadow-black/5 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/explore" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground transition hover:bg-accent/60">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Chat Langsung</p>
                <h1 className="text-2xl font-bold text-foreground">
                  {loading ? "Memuat..." : umkmName ? `Chat dengan ${umkmName}` : "Chat dengan UMKM"}
                </h1>
                <p className="text-sm text-muted-foreground">Sampaikan pertanyaan Anda langsung ke pemilik usaha.</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground">
              <MessageSquare className="h-5 w-5 text-primary" /> Online
            </div>
          </div>

          <div className="mb-6 space-y-4 rounded-3xl border border-border bg-background p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
                  message.sender === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-card text-foreground"
                }`}>
                  <p>{message.text}</p>
                  <span className="mt-2 block text-xs text-muted-foreground">{message.time}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="grid gap-4 rounded-3xl border border-border bg-background/80 p-4 shadow-sm">
            <div className="grid gap-2">
              <label htmlFor="chat" className="text-sm font-medium text-foreground">Tulis pesanmu</label>
              <Textarea
                id="chat"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                placeholder="Ketik pesan untuk pemilik usaha..."
                className="min-h-[120px]"
              />
            </div>
            <Button type="submit" className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-95">
              Kirim <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
