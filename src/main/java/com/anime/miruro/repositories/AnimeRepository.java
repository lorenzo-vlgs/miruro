package com.anime.miruro.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.entities.Anime;


public interface AnimeRepository extends JpaRepository<Anime,Integer>{
    

}
