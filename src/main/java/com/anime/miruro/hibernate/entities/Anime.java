package com.anime.miruro.hibernate.entities;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "animes")
@Getter
@Setter
public class Anime {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String image;

    private String name;

    private String description;

    private int episodes;

    private Date rilascio;
    
    public Anime() {}

    public Anime(String image, String name, String description, int episodes, Date rilascio) {
        this.image = image;
        this.name = name;
        this.description = description;
        this.episodes = episodes;
        this.rilascio = rilascio;
    }



    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "anime_genre",
        joinColumns = @JoinColumn(name = "anime_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    @JsonManagedReference
    private Set<Genre> genres;
        
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "anime_studio",
        joinColumns = @JoinColumn(name = "anime_id"),
        inverseJoinColumns = @JoinColumn(name = "studio_id")
    )
    @JsonManagedReference
    private Set<Studio> studios;
    
    @OneToMany(mappedBy = "anime", cascade = {CascadeType.ALL})
    @JsonManagedReference
    private Set<Character> characters;

    @OneToMany(mappedBy = "anime", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserAnime> userAnimeList;
    
    // Aggiungi un genere nella lista
    //
    public void add(Genre genre){
        if (this.genres == null) {
            this.genres = new HashSet<>();
        }
        
        this.genres.add(genre);
    }
    
    // Aggiungi uno studio nella lista
    //
    public void add(Studio studio){
        if (this.studios == null) {
            this.studios = new HashSet<>();
        }

        this.studios.add(studio);
    }

    // Aggiungi un personaggio alla lista
    //
    public void add(Character character){
        if (this.characters == null) {
            this.characters = new HashSet<>();
        }

        this.characters.add(character);
    }

    // Aggiungi uno user associato a quest'anime
    //
    public void add(UserAnime userAnime){
        if (this.userAnimeList == null) {
            this.userAnimeList = new HashSet<>();
        }

        this.userAnimeList.add(userAnime);
    }

    // ToString
    @Override
    public String toString() {
        return "Anime [id=" + id + ", image=" + image + ", name=" + name + ", description=" + description
                + ", episodes=" + episodes + ", rilascio=" + rilascio + "]";
    }

    
    
    
}
