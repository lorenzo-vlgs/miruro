package com.anime.miruro.config;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.anime.miruro.entities.Genre;
import com.anime.miruro.entities.Studio;
import com.anime.miruro.entities.User;

@Configuration
public class EntityFactory {
    

    @Bean
    @Scope("prototype")
    public Genre newGenre(Map<String,String> params){
        Genre g = new Genre();
        g.setGenreName(params.get("genreName"));

        return g;
    }

    @Bean
    @Scope("prototype")
    public Studio newStudio(Map<String,String> params){
        Studio studio = new Studio();

        
        studio.setName(params.get("name"));
        studio.setImage(params.get("image"));
        studio.setDescription(params.get("description"));
        studio.setDob(Integer.parseInt(params.get("dob")));

        return studio;
    }

    @Bean
    public User newUser(Map<String,String> params){
        User user = new User();

        user.setUsername(params.get("username"));
        user.setPassword(params.get("password"));
        user.setEnabled(Boolean.parseBoolean(params.get("enabled")));

        return user;
    }
}
