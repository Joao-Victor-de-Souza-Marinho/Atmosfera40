# Atmosfera 4.0

O **Atmosfera 4.0** é um projeto desenvolvido na **Escola SENAI Anchieta** com o objetivo de simular e monitorar condições ambientais por meio de sensores e dispositivos IoT.

O sistema utiliza uma aplicação Java com Spring Boot responsável pela API REST, acesso ao banco de dados e também pelo fornecimento das páginas HTML, CSS e JavaScript da aplicação.

## Funcionalidades

- Monitoramento de dados ambientais;
- Visualização de temperatura, umidade, pressão e luminosidade;
- Consulta de dispositivos e atuadores;
- Registro e armazenamento de medições;
- Simulação de dados ambientais;
- Comunicação do front-end com a API REST;
- Persistência dos dados em banco MySQL.

## Estrutura do projeto

O projeto possui o back-end e o front-end integrados na aplicação Spring Boot.

```text
Backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── ...
│       └── resources/
│           ├── static/
│           │   ├── index.html
│           │   ├── simulador.html
│           │   └── ...
│           └── application.properties
├── pom.xml
├── mvnw
└── mvnw.cmd
```

Os arquivos do front-end ficam em `src/main/resources/static` e são servidos diretamente pelo Spring Boot.

## Tecnologias utilizadas

### Front-end

- HTML
- CSS
- JavaScript

### Back-end

- Java
- Spring Boot
- Spring Data JPA
- API REST

### Banco de dados

- MySQL

## Arquitetura

O Spring Boot centraliza o funcionamento da aplicação, fornecendo tanto as páginas web quanto os endpoints da API.

```text
Navegador
    ↓
Spring Boot
    ├── HTML / CSS / JavaScript
    ├── API REST
    └── Spring Data JPA
            ↓
          MySQL
```

Dessa forma, não é necessário utilizar um servidor separado, como o Live Server, para executar o front-end.

## Execução local

1. Inicie o servidor MySQL.
2. Configure a conexão com o banco no `application.properties`.
3. Execute a aplicação Spring Boot.
4. Acesse a aplicação pelo navegador em `http://localhost:8080`.

## Objetivo do projeto

Projeto desenvolvido com finalidade educacional para aplicar na prática os conhecimentos adquiridos durante o curso Técnico em Desenvolvimento de Sistemas do SENAI, incluindo desenvolvimento web, Java, Spring Boot, APIs REST, JPA e banco de dados MySQL.
