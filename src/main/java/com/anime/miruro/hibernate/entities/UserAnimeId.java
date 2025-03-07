package com.anime.miruro.hibernate.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class UserAnimeId implements Serializable{
    
    private int userId;
    private int animeId;

    public UserAnimeId() {}

    public UserAnimeId(int userId, int animeId) {
        this.userId = userId;
        this.animeId = animeId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + userId;
        result = prime * result + animeId;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserAnimeId other = (UserAnimeId) obj;
        if (userId != other.userId)
            return false;
        if (animeId != other.animeId)
            return false;
        return true;
    }

    
    

}
