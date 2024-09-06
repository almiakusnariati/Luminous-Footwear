package com.miaaa.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.miaaa.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
