package com.senai.atmosfera4.controller;

import com.senai.atmosfera4.domain.entity.Atuadores;
import com.senai.atmosfera4.service.AtuadoresService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/atuadores")
public class AtuadoresController {
    private final AtuadoresService atuadoresService;

    public AtuadoresController(AtuadoresService atuadoresService) {
        this.atuadoresService = atuadoresService;
    }

    @GetMapping
    public List<Atuadores> listarTodos(){
        return atuadoresService.listarTodos();
    }

    @GetMapping("/{id}")
    public Atuadores listarPorId(@PathVariable Integer id){
        return atuadoresService.listarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Atuadores> criar(@Valid @RequestBody Atuadores atuadores){
        return ResponseEntity.status(HttpStatus.CREATED).body(atuadoresService.criar(atuadores));
    }

    @PutMapping("/{id}")
    public Atuadores atualizar(@Valid @RequestBody Atuadores atuadores, @PathVariable Integer id){

        return atuadoresService.atualizar(id,atuadores);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Integer id){
       atuadoresService.excluir(id);
    }



}
