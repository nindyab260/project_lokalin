package Lokalin.spring.core.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {
    
    private Double overall;
    private Double quality;
    private Double service;
    private Double price;
    private Double localImpact;

}
