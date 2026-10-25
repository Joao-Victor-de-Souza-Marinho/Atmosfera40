package com.senai.atmosfera4.controller;

import com.senai.atmosfera4.domain.entity.Dispositivos;
import com.senai.atmosfera4.service.DispositivoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dispositivos")
public class DispositivoController {

    private final DispositivoService dispositivoService;


    public DispositivoController(DispositivoService dispositivoService) {
        this.dispositivoService = dispositivoService;
    }
    @GetMapping
    public List<Dispositivos> listarTodos(){
       return dispositivoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Dispositivos listarTodos(Integer id){
        return dispositivoService.listarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Dispositivos> criar(@Valid @RequestBody Dispositivos dispositivo){
       return ResponseEntity.status(HttpStatus.CREATED).body(dispositivoService.criar(dispositivo));

    }

    @PutMapping("/{id}")
    public Dispositivos atualizar(@Valid @RequestBody Dispositivos dispositivos, @PathVariable Integer id){

        return dispositivoService.atualizar(id,dispositivos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Integer id){
        dispositivoService.excluir(id);
    }

}
