# Stage 1: Build the front-end
FROM node:12.13.1-alpine AS frontend

WORKDIR /app
RUN npm install -g @angular/cli@8.2.14
COPY . .
RUN npm install
RUN ls -la
WORKDIR /app/src/main/webapp
RUN ng build --prod --aot

# Stage 2: Build the back-end and package the application
FROM openjdk:8-alpine AS backend

WORKDIR /app
COPY --from=frontend /app/dist/tusker ./static
COPY pom.xml ./
RUN mvn clean install -DskipTests

# Final stage: Copy the JAR and static files
FROM amazoncorretto:8u402-alpine3.18-jre AS final

WORKDIR /app
COPY --from=backend /app/target/*.jar ./
COPY --from=backend /app/resources/static ./static

EXPOSE 8080

CMD ["java", "-jar", "*.jar"]
