# Getting Started

## Development Enviroment setup

Make sure following are met

- JDK 1.8
- Docker compose
- VS Code or Spring tool suite 4.0
- Node: 12.13.1
- Angular CLI: 8.3.xxx

## Build developmet

In the project root directory

```bash
./mvnw clean install
```

## Keycloak Export

```bash
docker run --rm \
 --net=docker_tusker-network \
 --name keycloak_exporter \
 -v /tmp:/tmp/keycloak-export \
 -e DB_PASSWORD="password" \
 -e DB_DATABASE="keycloak" \
 -e DB_ADDR="mysql" \
 -e DB_USER="keycloak" \
 -e DB_VENDOR="MYSQL" \
 -e JDBC_PARAMS="characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true" \
 jboss/keycloak:7.0.0 \
 -Dkeycloak.migration.action=export \
 -Dkeycloak.migration.provider=singleFile \ -Dkeycloak.migration.file=/tmp/keycloak-export/tusker.json
```

## Keycloak Import

copy the tusker.json file to /tmp then run the following to import

```bash
docker run --rm \
    --net=docker_tusker-network \
    --name keycloak_exporter \
    -v /tmp:/tmp/keycloak-export \
    -e DB_PASSWORD="password" \
    -e DB_DATABASE="keycloak" \
    -e DB_ADDR="mysql" \
    -e DB_USER="keycloak" \
    -e DB_VENDOR="MYSQL" \
    -e JDBC_PARAMS="characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true" \
    jboss/keycloak:7.0.0 \
      -Dkeycloak.migration.action=import \
      -Dkeycloak.migration.file=/tmp/keycloak-export/tusker.json \
      -Dkeycloak.migration.provider=singleFile \
      -Dkeycloak.migration.strategy=OVERWRITE_EXISTING
```

## create mysql user
```bash
CREATE USER 'tusker'@'localhost' IDENTIFIED BY 'tusker31234';
GRANT ALL PRIVILEGES ON * . * TO 'tusker'@'localhost';
FLUSH PRIVILEGES;
```