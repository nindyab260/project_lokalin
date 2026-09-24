package Lokalin.spring.core.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentSimulationService {

    /**
     * Simulates creating a payment transaction via a third-party service like Midtrans.
     */
    public String createTransaction(Double amount) {
        // In a real app, this would call an external API.
        System.out.println("Calling 3rd party Payment Gateway to process amount: " + amount);
        return "TX-" + UUID.randomUUID().toString();
    }
}
