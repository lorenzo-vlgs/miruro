package com.anime.miruro.hibernate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.entities.Character;

import java.util.List;


public interface CharacterRepository extends JpaRepository<Character,Integer>{

    List<Character> findByAnime(Anime anime);
}
