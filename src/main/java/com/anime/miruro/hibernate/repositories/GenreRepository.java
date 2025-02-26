package com.anime.miruro.hibernate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre,Integer>{

}