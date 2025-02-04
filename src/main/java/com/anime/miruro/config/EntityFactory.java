package com.anime.miruro.config;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.anime.miruro.entities.Genre;

@Configuration
public class EntityFactory {
    

    @Bean
    @Scope("prototype")
    public Genre newGenre(Map<String,String> params){
        Genre g = new Genre();
        g.setGenreName(params.get("genreName"));

        return g;
    }
}
