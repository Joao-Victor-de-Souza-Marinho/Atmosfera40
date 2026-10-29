# Atmosfera 4.0

O **Atmosfera 4.0** é um projeto desenvolvido na **Escola SENAI Anchieta** com o objetivo de simular e monitorar condições ambientais por meio de sensores e dispositivos IoT.

O sistema é dividido em **front-end**, **back-end** e **banco de dados**, permitindo visualizar informações ambientais, consultar dispositivos cadastrados e simular o envio de novas medições.

## Funcionalidades

- Monitoramento de dados ambientais;
- Visualização de temperatura, umidade, pressão e luminosidade;
- Consulta de dispositivos e atuadores;
- Registro e armazenamento de medições;
- Simulação de dados ambientais;
- Comunicação entre o front-end e uma API REST;
- Persistência dos dados em banco MySQL.

## Estrutura do projeto

- [FrontEnd](FrontEnd/)  
  Interface web responsável pela visualização das informações e pela simulação de medições.

- [ScriptBanco](ScriptBanco/)  
  Script para criação do banco de dados MySQL.

- [Backend](Backend/)  
  API REST desenvolvida em Java com Spring Boot, responsável pelas regras da aplicação e comunicação com o banco de dados.

## Tecnologias utilizadas

### Front-end
- HTML
- CSS
- JavaScript

### Back-end
- Java
- Spring Boot
- Spring Data JPA

### Banco de dados
- MySQL

## Arquitetura

O funcionamento básico da aplicação segue o fluxo:

**Front-end → API REST → Spring Boot → MySQL**

O front-end realiza requisições HTTP para a API. O back-end processa essas requisições, acessa o banco de dados e retorna as informações necessárias para a interface.

## Execução local

Para executar o projeto localmente:

1. Inicie o servidor MySQL.
2. Configure a conexão com o banco de dados no back-end.
3. Execute a aplicação Spring Boot.
4. Abra o front-end utilizando o **Live Server** do VS Code.
5. Utilize a página principal para visualizar os dados ou a página de simulação para gerar novas medições.

## Objetivo do projeto

Projeto desenvolvido com finalidade educacional para aplicar na prática conhecimentos adquiridos durante o curso Técnico em Desenvolvimento de Sistemas do SENAI, envolvendo desenvolvimento web, Java, Spring Boot, APIs REST e banco de dados MySQL.
