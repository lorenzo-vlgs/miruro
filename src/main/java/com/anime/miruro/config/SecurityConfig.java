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
                    .requestMatchers("/css/**", "/img/**").permitAll()
                    .requestMatchers("/js/user/**", "/js/navbar/**", "/js/redirect/**", "/js/api/user/**").permitAll()
                    .requestMatchers("/html/navbar/**", "/html/user/**").permitAll()
                    .requestMatchers("/api/**", "/home/**", "/anime/**", "/trending/**").permitAll()
                    .anyRequest().authenticated() // Require authentication for other endpoints
            )
            .formLogin(form -> 
                form
                    .loginPage("/login")
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
