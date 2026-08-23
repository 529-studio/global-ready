package com.globalready.shared.api;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class ApiDocumentationConfiguration {

    @Bean
    OpenAPI globalReadyOpenApi() {
        return new OpenAPI().info(new Info()
                .title("Global-Ready API")
                .version("v1")
                .description("Local-first English interview practice API."));
    }
}

