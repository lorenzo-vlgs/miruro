package com.anime.miruro.hibernate.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_anime")
@Getter
@Setter
public class UserAnime {
    
    @EmbeddedId
    private UserAnimeId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("animeId")
    @JoinColumn(name = "anime_id")
    private Anime anime;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
    
}
