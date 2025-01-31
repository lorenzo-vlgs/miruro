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
                    .requestMatchers("/css/**", "/js/user/**", "/html/navbar/**", "/html/user/**", "/img/**").permitAll()
                    .requestMatchers("/api/**", "/anime/**", "/trending/**").permitAll()
                    .requestMatchers("/home").permitAll() // Allow public access to these endpoints
                    .anyRequest().authenticated() // Require authentication for other endpoints
            )
            .formLogin(form -> 
                form
                    .permitAll() // Allow everyone to access the default login page
            )
            .logout(logout -> 
                logout
                    .permitAll() // Allow everyone to access the logout page
            )
            .csrf(csrf -> csrf.disable()); // Disable CSRF protection

        return http.build();
    }

}
