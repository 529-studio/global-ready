package com.globalready.shared.observability;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class CorrelationIdFilterTests {

    private final CorrelationIdFilter filter = new CorrelationIdFilter();

    @Test
    void preservesSafeClientCorrelationId() {
        var request = new MockHttpServletRequest();
        request.addHeader(CorrelationIdFilter.HEADER_NAME, "client-request_123");
        var response = new MockHttpServletResponse();

        assertDoesNotThrow(() -> filter.doFilter(request, response, new MockFilterChain()));

        assertEquals(
                "client-request_123",
                response.getHeader(CorrelationIdFilter.HEADER_NAME));
    }

    @Test
    void replacesUnsafeClientCorrelationId() {
        var request = new MockHttpServletRequest();
        request.addHeader(CorrelationIdFilter.HEADER_NAME, "unsafe value with spaces");
        var response = new MockHttpServletResponse();

        assertDoesNotThrow(() -> filter.doFilter(request, response, new MockFilterChain()));

        assertNotNull(response.getHeader(CorrelationIdFilter.HEADER_NAME));
    }
}

