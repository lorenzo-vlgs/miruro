package com.anime.miruro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.entities.Anime;
import com.anime.miruro.entities.Character;
import java.util.List;


public interface CharacterRepository extends JpaRepository<Character,Integer>{

    List<Character> findByAnime(Anime anime);
}
