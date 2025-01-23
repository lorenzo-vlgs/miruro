package com.anime.miruro.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "anime_details")
@Getter
@Setter
public class AnimeDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int detail;
    
    private String description;

    private int episodes;

    private Date rilascio;

    @OneToOne
    @JoinColumn(name = "anime_id", nullable = false)
    private Anime anime;

    public AnimeDetail(String description, int episodes, Date rilascio) {
        this.description = description;
        this.episodes = episodes;
        this.rilascio = rilascio;
    }

    @Override
    public String toString() {
        return "AnimeDetail [detail=" + detail + ", description=" + description + ", episodes=" + episodes
                + ", rilascio=" + rilascio + "]";
    }
    
}
