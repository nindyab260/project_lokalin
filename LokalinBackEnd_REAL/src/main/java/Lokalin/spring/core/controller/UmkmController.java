package Lokalin.spring.core.controller;

import Lokalin.spring.core.model.Umkm;
import Lokalin.spring.core.service.PaymentSimulationService;
import Lokalin.spring.core.service.UmkmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/umkm")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UmkmController {

    private final UmkmService umkmService;
    private final PaymentSimulationService paymentSimulationService;

    @GetMapping
    public ResponseEntity<List<Umkm>> getAllUmkms() {
        return ResponseEntity.ok(umkmService.getAllUmkms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Umkm> getUmkmById(@PathVariable Long id) {
        return ResponseEntity.ok(umkmService.getUmkmById(id));
    }

    @PostMapping
    public ResponseEntity<Umkm> createUmkm(@RequestBody Umkm umkm) {
        return ResponseEntity.ok(umkmService.createUmkm(umkm));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Umkm> updateUmkm(@PathVariable Long id, @RequestBody Umkm umkm) {
        return ResponseEntity.ok(umkmService.updateUmkm(id, umkm));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUmkm(@PathVariable Long id) {
        umkmService.deleteUmkm(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<String> simulatePayment(@PathVariable Long id, @RequestParam Double amount) {
        String txId = paymentSimulationService.createTransaction(amount);
        return ResponseEntity.ok("Payment created. Transaction ID: " + txId);
    }
}
