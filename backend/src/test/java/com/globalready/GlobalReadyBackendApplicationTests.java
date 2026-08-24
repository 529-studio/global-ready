package com.globalready;

import java.time.Clock;

import io.swagger.v3.oas.models.OpenAPI;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.health.actuate.endpoint.HealthEndpoint;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class GlobalReadyBackendApplicationTests {

	@Autowired
	private HealthEndpoint healthEndpoint;

	@Autowired
	private OpenAPI openAPI;

	@Autowired
	private Clock clock;

	@Test
	void contextLoads() {
		assertNotNull(healthEndpoint);
		assertNotNull(clock);
		assertEquals("Global-Ready API", openAPI.getInfo().getTitle());
	}

}
