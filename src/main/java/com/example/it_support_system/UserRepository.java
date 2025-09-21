package com.example.it_support_system;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // This is the important import

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    // This method is automatically provided by JpaRepository,
    // but a manual declaration can sometimes help
    Optional<User> findById(Integer id);
}