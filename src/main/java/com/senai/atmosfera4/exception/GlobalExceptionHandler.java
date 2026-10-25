package com.senai.atmosfera4.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity tratarRecursoNaoEncontrado(RecursoNaoEncontradoException recursoNaoEncontradoException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(recursoNaoEncontradoException.getMessage());
    }



}
