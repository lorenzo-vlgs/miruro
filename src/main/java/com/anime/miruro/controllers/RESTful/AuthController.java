package com.anime.miruro.controllers.RESTful;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/status")
    public Map<String, Object> isAuthenticated() {

        // Controlla se c'è un utente autenticato 
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String);

        // Aggiunge il risultato nella mappa di risposta
        Map<String, Object> response = new HashMap<>();
        response.put("isAuthenticated", isAuthenticated);

        // Se è stata trovata una persona, controlla se è anche ADMIN
        if (isAuthenticated) {
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            boolean isAdmin = authorities.stream().anyMatch(authority -> authority.getAuthority().equals("ADMIN"));
            response.put("isAdmin", isAdmin);
        } else {
            response.put("isAdmin", false);
        }

        return response;
    }
    
}
