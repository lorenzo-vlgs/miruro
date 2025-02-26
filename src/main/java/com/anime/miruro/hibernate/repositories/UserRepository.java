package com.anime.miruro.hibernate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.User;


public interface UserRepository extends JpaRepository<User,Integer>{
    
    User findByUsername(String username);
}
