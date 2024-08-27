package com.miaaa.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.miaaa.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long>  {  
    User findByEmail(String email);
}
