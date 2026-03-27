package com.api.gateway.ApiGateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Slf4j
@Configuration
public class GatewayConfig {

    @Bean
    public GlobalFilter loginFilter() {
        return (exchange, chain) -> {
            String traceId = UUID.randomUUID().toString().substring(0,8);
            String method = exchange.getRequest().getMethod().name();
            String path = exchange.getRequest().getURI().getPath();

            log.info("[{}] --> {} {}", traceId, method, path);
            exchange.getAttributes().put("traceId", traceId);
            long start = System.currentTimeMillis();

            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                long duration = System.currentTimeMillis() - start;
                int status  = exchange.getResponse().getStatusCode() != null ? exchange.getResponse().getStatusCode().value() : 0;
                log.info("[{}] <-- {} {} {}ms", traceId, status, path, duration);
            }));
        };
    }

}
