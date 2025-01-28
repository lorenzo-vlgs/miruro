package com.anime.miruro.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.anime.miruro.entities.Anime;


public interface AnimeRepository extends JpaRepository<Anime,Integer>{

    @Query("SELECT COUNT(a) FROM Anime a")
    Long countAnimes();
}
