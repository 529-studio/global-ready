package com.globalready.shared.health;

import org.junit.jupiter.api.Test;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.Status;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ApplicationHealthIndicatorTests {

	private final ApplicationHealthIndicator indicator = new ApplicationHealthIndicator();

	@Test
	void reportsTheApplicationAsUpInZeroCostLocalMode() {
		Health health = indicator.health();

		assertEquals(Status.UP, health.getStatus());
		assertEquals("zero-cost-local", health.getDetails().get("mode"));
	}

}
