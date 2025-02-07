package com.anime.miruro.controllers.RESTful;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    // CREATE
    //
    @PostMapping("/save")
    public void save(@RequestBody Character character){
        characterService.save(character);
    }

    // READ 
    //
    @GetMapping("/all")
    public List<Character> getAll(){
        return characterService.findAll();    
    }

    @GetMapping("/{id}")
    public Character getById(@PathVariable int id){
        return characterService.findById(id);
    }

    // UPDATE
    //
    @PostMapping("/update")
    public void update(@RequestBody Character character) {
        characterService.update(character);
    }
    
    // DELETE
    //
    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        characterService.delete(id);
    }
    
    @GetMapping("/count")
    public Long getCharactersCount(){
        return characterService.getCount();
    }
    
}
