import { Star, MapPin, BadgeCheck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { UMKM } from "@/data/mockData";

interface UMKMCardProps {
  umkm: UMKM;
  index?: number;
}

const UMKMCard = ({ umkm, index = 0 }: UMKMCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/umkm/${umkm.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={umkm.image}
              alt={umkm.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <span>{umkm.categoryIcon}</span>
              <span className="font-body text-foreground">{umkm.category}</span>
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs backdrop-blur-sm">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="font-body font-medium text-foreground">{umkm.distance}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-1 flex items-center gap-1.5">
              <h3 className="font-heading text-base font-semibold text-foreground line-clamp-1">
                {umkm.name}
              </h3>
              {umkm.isVerified && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
              )}
            </div>

            <p className="mb-3 line-clamp-2 font-body text-sm text-muted-foreground">
              {umkm.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 rounded-md bg-warm/10 px-2 py-0.5">
                  <Star className="h-3.5 w-3.5 fill-warm text-warm" />
                  <span className="font-heading text-sm font-bold text-foreground">
                    {umkm.rating.overall}
                  </span>
                </div>
                <span className="font-body text-xs text-muted-foreground">
                  ({umkm.reviewCount} ulasan)
                </span>
              </div>
              <div className="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="font-body text-xs font-medium">Chat</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default UMKMCard;
