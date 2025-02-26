package com.anime.miruro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.anime.miruro.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre,Integer>{

}