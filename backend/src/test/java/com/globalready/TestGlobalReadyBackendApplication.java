package com.globalready;

import org.springframework.boot.SpringApplication;

public class TestGlobalReadyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(GlobalReadyBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
