# Build Spring Boot API (Java 21)
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /workspace
COPY apps/api /workspace
RUN chmod +x gradlew \
    && ./gradlew bootJar --no-daemon -x test

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
RUN useradd --no-create-home --shell /usr/sbin/nologin appuser
COPY --from=build /workspace/build/libs/sell-online-api.jar /app/app.jar
USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
