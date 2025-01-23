package com.anime.miruro.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anime.miruro.entities.Anime;

@Repository
public interface AnimeRepository extends JpaRepository<Anime,Integer>{
    

}
