package com.anime.miruro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.entities.User;


public interface UserRepository extends JpaRepository<User,Integer>{
    
    User findByUsername(String username);
}
