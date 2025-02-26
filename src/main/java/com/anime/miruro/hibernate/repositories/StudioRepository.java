package com.anime.miruro.hibernate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.Studio;

public interface StudioRepository extends JpaRepository<Studio,Integer>{
    
}
