package com.anime.miruro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anime.miruro.entities.AnimeDetail;

@Repository
public interface AnimeDetailRepository extends JpaRepository<AnimeDetail,Integer>{
    
}
