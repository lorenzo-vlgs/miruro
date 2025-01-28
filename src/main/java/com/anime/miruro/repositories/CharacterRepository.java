package com.anime.miruro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.entities.Character;

public interface CharacterRepository extends JpaRepository<Character,Integer>{

}
