package com.anime.miruro.config;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.entities.Character;
import com.anime.miruro.hibernate.entities.Genre;
import com.anime.miruro.hibernate.entities.Studio;
import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.services.AnimeService;
import com.anime.miruro.hibernate.services.GenreService;
import com.anime.miruro.hibernate.services.StudioService;

@Configuration
public class EntityFactory {
    

    private GenreService genreService;
    private StudioService studioService;
    private AnimeService animeService;
    

    public EntityFactory() {
    }

    @Autowired
    public EntityFactory(GenreService genreService, StudioService studioService, AnimeService animeService) {
        this.genreService = genreService;
        this.studioService = studioService;
        this.animeService = animeService;
    }



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
    @Scope("prototype")
    public User newUser(Map<String,String> params){
        User user = new User();

        user.setUsername(params.get("username"));
        user.setPassword(params.get("password"));
        user.setEnabled(Boolean.parseBoolean(params.get("enabled")));

        return user;
    }

    @Bean
    @Scope("prototype")
    public Anime newAnime(Map<String,Object> params){

        Anime anime = new Anime();

        // Correctly handle ID
        Object idObj = params.get("id");
        int id = (idObj instanceof Integer) ? (Integer) idObj : Integer.parseInt(idObj.toString());
        if (id > 1) {
            anime.setId(id);
        }

        anime.setName(params.get("name").toString());
        anime.setImage(params.get("image").toString());
        anime.setDescription(params.get("description").toString());

        // Properly handle date conversion
        anime.setRilascio(Date.valueOf(params.get("dob").toString()));

        // Correctly handle episodes
        Object episodesObj = params.get("episodes");
        int episodes = (episodesObj instanceof Integer) ? (Integer) episodesObj : Integer.parseInt(episodesObj.toString());
        anime.setEpisodes(episodes);

        // Handle genres list properly
        List<Integer> genreId;
        if (params.get("genres") instanceof List<?>) {
            genreId = ((List<?>) params.get("genres"))
                .stream()
                .map(g -> (g instanceof Integer) ? (Integer) g : Integer.parseInt(g.toString()))
                .toList();
        } else {
            genreId = new ArrayList<>();
        }

        // Convert genre IDs to Genre objects
        Set<Genre> genres = new HashSet<>();
        for (Integer gId : genreId) {
            Genre genre = genreService.findById(gId);
            genres.add(genre);
        }

        anime.setGenres(genres);


        // Handle studios list properly
        List<Integer> studioId;
        if (params.get("studios") instanceof List<?>) {
            studioId = ((List<?>) params.get("studios"))
                    .stream()
                    .map(s -> (s instanceof Integer) ? (Integer) s : Integer.parseInt(s.toString()))
                    .toList();
        } else {
            studioId = new ArrayList<>();
        }

        Set<Studio> studios = new  HashSet<>();
        for (Integer sId : studioId) {
            Studio studio = studioService.findById(sId);
            studios.add(studio);
        }

        anime.setStudios(studios);
        
        return anime;
    }

    @Bean
    @Scope("prototype")
    public Character newCharacter(Map<String,String> params){

        Character character = new Character();
        
        // Set all the parameters
        int id = Integer.parseInt(params.get("id"));
        if (id > 0) character.setId(id);

        character.setName(params.get("name"));
        character.setImage(params.get("image"));
        character.setDescription(params.get("description"));
        character.setRole(params.get("role"));

        // Search for the anime to set 
        int animeId = Integer.parseInt(params.get("animeId"));
        Anime anime = animeService.findById(animeId);
        character.setAnime(anime);

        return character;
    }

}
