package com.anime.miruro.hibernate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.Status;

public interface StatusRepository extends JpaRepository<Status, Integer>{
    
}
