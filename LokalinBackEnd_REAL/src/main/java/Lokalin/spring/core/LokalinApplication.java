package Lokalin.spring.core;

import Lokalin.spring.core.model.Rating;
import Lokalin.spring.core.model.Umkm;
import Lokalin.spring.core.model.User;
import Lokalin.spring.core.repository.UmkmRepository;
import Lokalin.spring.core.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LokalinApplication {

	public static void main(String[] args) {
		SpringApplication.run(LokalinApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadData(UserRepository userRepository, UmkmRepository umkmRepository, Lokalin.spring.core.repository.ProductRepository productRepository) {
		return args -> {
			if (userRepository.count() == 0) {
				org.springframework.security.crypto.password.PasswordEncoder encoder = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
				
				// Helper untuk membuat user
				java.util.function.Function<Integer, User> createUser = (i) -> {
					User u = User.builder().username("user" + i).email("user" + i + "@test.com").password(encoder.encode("pass")).role("ROLE_USER").build();
					return userRepository.save(u);
				};

				// UMKM 1
				Umkm u1 = umkmRepository.save(Umkm.builder().name("Warung Nasi Bakar Bu Siti").category("Kuliner").categoryIcon("🍜")
						.description("Nasi bakar khas Jawa dengan bumbu rempah tradisional yang sudah turun temurun. Tersedia berbagai lauk pilihan segar setiap hari.")
						.location("Jl. Malioboro No. 45, Yogyakarta").distance("0.8 km").image("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop")
						.reviewCount(128).phone("+6281234567890").isVerified(true)
						.rating(Rating.builder().overall(4.7).quality(4.8).service(4.6).price(4.9).localImpact(4.5).build())
						.owner(createUser.apply(1)).build());
				saveProducts(productRepository, u1, "Nasi Bakar Ayam", "Nasi Bakar Ikan", "Nasi Bakar Jamur");

				// UMKM 2
				Umkm u2 = umkmRepository.save(Umkm.builder().name("Batik Sekar Arum").category("Fashion").categoryIcon("👗")
						.description("Batik tulis premium asli Solo dengan motif kontemporer. Setiap kain dibuat dengan tangan oleh pengrajin berpengalaman.")
						.location("Jl. Slamet Riyadi No. 12, Solo").distance("1.2 km").image("https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop")
						.reviewCount(89).phone("+6281234567891").isVerified(true)
						.rating(Rating.builder().overall(4.9).quality(5.0).service(4.8).price(4.7).localImpact(5.0).build())
						.owner(createUser.apply(2)).build());
				saveProducts(productRepository, u2, "Batik Tulis", "Kemeja Batik", "Dress Batik");

				// UMKM 3
				Umkm u3 = umkmRepository.save(Umkm.builder().name("Kopi Nusantara").category("Minuman").categoryIcon("🧃")
						.description("Kedai kopi lokal dengan biji kopi pilihan dari berbagai daerah di Indonesia. Suasana cozy dan nyaman.")
						.location("Jl. Braga No. 78, Bandung").distance("2.1 km").image("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop")
						.reviewCount(203).phone("+6281234567892").isVerified(false)
						.rating(Rating.builder().overall(4.5).quality(4.6).service(4.4).price(4.3).localImpact(4.7).build())
						.owner(createUser.apply(3)).build());
				saveProducts(productRepository, u3, "Kopi Toraja", "Kopi Gayo", "Kopi Kintamani");

				// UMKM 4
				Umkm u4 = umkmRepository.save(Umkm.builder().name("Keramik Tangan Emas").category("Kerajinan").categoryIcon("🎨")
						.description("Keramik handmade berkualitas tinggi dengan desain unik khas Indonesia. Cocok untuk dekorasi rumah dan hadiah.")
						.location("Jl. Kasongan No. 5, Bantul").distance("3.5 km").image("https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop")
						.reviewCount(56).phone("+6281234567893").isVerified(true)
						.rating(Rating.builder().overall(4.6).quality(4.9).service(4.3).price(4.4).localImpact(4.8).build())
						.owner(createUser.apply(4)).build());
				saveProducts(productRepository, u4, "Vas Bunga", "Piring Hias", "Mangkok Keramik");

				// UMKM 5
				Umkm u5 = umkmRepository.save(Umkm.builder().name("Salon Cantik Alami").category("Kecantikan").categoryIcon("💆")
						.description("Salon kecantikan dengan perawatan alami menggunakan bahan-bahan tradisional Indonesia. Ramah dan profesional.")
						.location("Jl. Sudirman No. 33, Semarang").distance("1.5 km").image("https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop")
						.reviewCount(167).phone("+6281234567894").isVerified(true)
						.rating(Rating.builder().overall(4.4).quality(4.5).service(4.6).price(4.2).localImpact(4.3).build())
						.owner(createUser.apply(5)).build());
				saveProducts(productRepository, u5, "Creambath Herbal", "Facial Alami", "Lulur Tradisional");

				// UMKM 6
				Umkm u6 = umkmRepository.save(Umkm.builder().name("Toko Roti Makmur").category("Kuliner").categoryIcon("🍜")
						.description("Roti dan kue tradisional segar setiap hari. Resep warisan keluarga dengan cita rasa autentik yang tak berubah.")
						.location("Jl. Asia Afrika No. 22, Bandung").distance("0.5 km").image("https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop")
						.reviewCount(312).phone("+6281234567895").isVerified(true)
						.rating(Rating.builder().overall(4.8).quality(4.9).service(4.7).price(4.8).localImpact(4.6).build())
						.owner(createUser.apply(6)).build());
				saveProducts(productRepository, u6, "Roti Unyil", "Bolen Pisang", "Kue Cubit");

				// UMKM 7
				Umkm u7 = umkmRepository.save(Umkm.builder().name("Kebun Hidroponik Segar").category("Pertanian").categoryIcon("🌾")
						.description("Sayuran hidroponik segar yang ditanam tanpa pestisida. Langsung dipanen saat Anda memesan untuk menjaga kesegaran.")
						.location("Jl. Kaliurang KM 10, Sleman").distance("4.2 km").image("https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop")
						.reviewCount(45).phone("+6281234567896").isVerified(true)
						.rating(Rating.builder().overall(4.7).quality(4.9).service(4.5).price(4.6).localImpact(4.8).build())
						.owner(createUser.apply(7)).build());
				saveProducts(productRepository, u7, "Selada Air", "Bayam Merah", "Kangkung Cabut");

				// UMKM 8
				Umkm u8 = umkmRepository.save(Umkm.builder().name("Servis Laptop Handal").category("Elektronik").categoryIcon("📱")
						.description("Jasa servis laptop dan komputer panggilan. Teknisi berpengalaman, harga transparan, dan bergaransi.")
						.location("Jl. Margonda Raya No. 100, Depok").distance("2.8 km").image("https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop")
						.reviewCount(112).phone("+6281234567897").isVerified(false)
						.rating(Rating.builder().overall(4.6).quality(4.8).service(4.9).price(4.5).localImpact(4.0).build())
						.owner(createUser.apply(8)).build());
				saveProducts(productRepository, u8, "Install Ulang Windows", "Pembersihan Debu", "Ganti Thermal Paste");

				// UMKM 9
				Umkm u9 = umkmRepository.save(Umkm.builder().name("Laundry Bersih Wangi").category("Jasa").categoryIcon("🔧")
						.description("Layanan cuci setrika kiloan dan satuan. Menggunakan deterjen ramah lingkungan dan parfum tahan lama.")
						.location("Jl. Fatmawati No. 15, Jakarta").distance("1.1 km").image("https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&h=300&fit=crop")
						.reviewCount(245).phone("+6281234567898").isVerified(true)
						.rating(Rating.builder().overall(4.8).quality(4.7).service(4.9).price(4.8).localImpact(4.5).build())
						.owner(createUser.apply(9)).build());
				saveProducts(productRepository, u9, "Cuci Komplit Kiloan", "Cuci Satuan Jaket", "Cuci Bedcover");

				System.out.println("=============================");
				System.out.println("DUMMY DATA LENGKAP BERHASIL DITAMBAHKAN!");
				System.out.println("=============================");
			}
		};
	}

	private void saveProducts(Lokalin.spring.core.repository.ProductRepository repo, Umkm umkm, String... productNames) {
		for (String name : productNames) {
			repo.save(Lokalin.spring.core.model.Product.builder()
					.name(name).price(15000.0).stock(50).umkm(umkm).build());
		}
	}
}
