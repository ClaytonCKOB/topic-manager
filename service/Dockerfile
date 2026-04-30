FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY target/topicmanager-0.0.1-SNAPSHOT.jar app.jar

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]