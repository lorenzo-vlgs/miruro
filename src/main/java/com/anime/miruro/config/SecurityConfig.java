package com.anime.miruro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(aut ->
                aut
                    .requestMatchers("/**").permitAll() // Allow public access to these endpoints
                    .anyRequest().authenticated() // Require authentication for other endpoints
            )
            .csrf(csrf -> csrf.disable()); // Disable CSRF protection for simplicity

        return http.build();
    }

}
