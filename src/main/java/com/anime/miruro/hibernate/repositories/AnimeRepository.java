package com.anime.miruro.hibernate.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.Anime;


public interface AnimeRepository extends JpaRepository<Anime,Integer>{

}
