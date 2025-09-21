package com.example.it_support_system;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    // JpaRepository already provides:
    // - findById(ID id)
    // - findAll()
    // - save(entity)
    // - deleteById(ID id)
    // No extra code needed unless you want custom queries
}
