package com.globalready;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.simple.JdbcClient;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class DatabaseConnectivityIntegrationTests {

    @Autowired
    private JdbcClient jdbcClient;

    @Autowired
    private Flyway flyway;

    @Test
    void connectsToPinnedPostgresAndInitialisesFlyway() {
        var serverVersion = jdbcClient.sql("show server_version")
                .query(String.class)
                .single();

        assertTrue(serverVersion.startsWith("18.6"));
        assertNotNull(flyway.info());
    }
}

