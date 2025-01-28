package com.anime.miruro.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.entities.Character;
import com.anime.miruro.repositories.CharacterRepository;

@Service
public class CharacterService extends GenericService<Integer, Character, CharacterRepository>{

}
