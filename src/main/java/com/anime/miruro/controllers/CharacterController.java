package com.anime.miruro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.entities.Character;
import com.anime.miruro.services.CharacterService;

@RestController
@RequestMapping("api/characters")
public class CharacterController {
    
    private CharacterService characterService;

    public CharacterController() {
    }

    @Autowired
    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping("/all")
    public List<Character> findAll(){
        return characterService.findAll();
    }
    
}
