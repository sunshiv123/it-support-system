package com.example.it_support_system;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String description;
    private String status;
    private String priority;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

}