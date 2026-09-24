package Lokalin.spring.core.service;

import Lokalin.spring.core.model.Umkm;
import Lokalin.spring.core.repository.UmkmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UmkmService {

    private final UmkmRepository umkmRepository;

    public List<Umkm> getAllUmkms() {
        return umkmRepository.findAll();
    }

    public Umkm getUmkmById(Long id) {
        return umkmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UMKM not found"));
    }
}
