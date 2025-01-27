package com.anime.miruro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MiruroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiruroApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(String[] args){
		
		return runner -> {
			System.out.println("==> DONE RUNNING");
		};
	}
}