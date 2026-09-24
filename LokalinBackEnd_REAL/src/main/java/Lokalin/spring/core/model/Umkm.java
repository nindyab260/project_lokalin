package Lokalin.spring.core.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "umkms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Umkm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;
    private String categoryIcon;
    private String location;
    private String distance;
    private String image;
    private Integer reviewCount;
    private String phone;
    private Boolean isVerified;

    @Embedded
    private Rating rating;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @OneToMany(mappedBy = "umkm", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

}
