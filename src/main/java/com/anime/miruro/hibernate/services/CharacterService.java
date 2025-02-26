package com.anime.miruro.hibernate.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.entities.Character;
import com.anime.miruro.hibernate.repositories.CharacterRepository;
import com.anime.miruro.services.GenericService;

@Service
public class CharacterService extends GenericService<Integer, Character, CharacterRepository>{


    public List<Character> findByAnime(Anime anime) {
        return getRepository().findByAnime(anime);
    }
}
