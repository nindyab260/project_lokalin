package Lokalin.spring.core.repository;

import Lokalin.spring.core.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUmkmId(Long umkmId);
}
