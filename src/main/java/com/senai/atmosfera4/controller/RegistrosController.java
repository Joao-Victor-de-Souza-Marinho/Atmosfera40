package com.senai.atmosfera4.controller;

import com.senai.atmosfera4.domain.entity.Registros;
import com.senai.atmosfera4.service.RegistrosService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registros")
public class RegistrosController {

    private final RegistrosService registrosService;

    public RegistrosController(RegistrosService registrosService) {
        this.registrosService = registrosService;
    }

    @GetMapping
    public List<Registros> listarTodos() {
        return registrosService.listarTodos();
    }

    @GetMapping("/{id}")
    public Registros listarPorId(@PathVariable Long id) {
        return registrosService.listarPorId(id);
    }

    @PostMapping
    public Registros criar(@RequestBody Registros registro) {
        return registrosService.criar(registro);
    }

    @PutMapping("/{id}")
    public Registros atualizar(
            @PathVariable Long id,
            @RequestBody Registros registro) {

        return registrosService.atualizar(id, registro);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        registrosService.excluir(id);
    }
}