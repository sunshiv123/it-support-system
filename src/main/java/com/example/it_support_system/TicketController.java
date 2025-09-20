package com.example.it_support_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    // Endpoint to get all tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // Endpoint to create a new ticket
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        // You would typically handle user authentication here to get the real user
        // For this basic example, we'll assign it to a default user (e.g., ID 1)
        User user = userRepository.findById(1L).orElseThrow(() -> new RuntimeException("User not found"));
        ticket.setUser(user);
        ticket.setStatus("Open"); // Default status for a new ticket
        ticket.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return ticketRepository.save(ticket);
    }
}