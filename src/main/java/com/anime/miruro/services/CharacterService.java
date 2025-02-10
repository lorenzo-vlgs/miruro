package com.anime.miruro.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anime.miruro.entities.Anime;
import com.anime.miruro.entities.Character;
import com.anime.miruro.repositories.CharacterRepository;

@Service
public class CharacterService extends GenericService<Integer, Character, CharacterRepository>{


    public List<Character> findByAnime(Anime anime) {
        return getRepository().findByAnime(anime);
    }
}
