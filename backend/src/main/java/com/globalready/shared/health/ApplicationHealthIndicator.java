package com.globalready.shared.health;

import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;

@Component("application")
public final class ApplicationHealthIndicator implements HealthIndicator {

	@Override
	public Health health() {
		return Health.up().withDetail("mode", "zero-cost-local").build();
	}

}
