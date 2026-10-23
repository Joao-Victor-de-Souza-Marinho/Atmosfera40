package com.senai.atmosfera4.controller;

import com.senai.atmosfera4.domain.entity.Atuadores;
import com.senai.atmosfera4.service.AtuadoresService;
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
    public Atuadores criar(@RequestBody Atuadores atuadores){
        return atuadoresService.criar(atuadores);
    }

    @PutMapping("/{id}")
    public Atuadores atualizar(@RequestBody Atuadores atuadores, @PathVariable Integer id){
        Atuadores atuadorAtual = atuadoresService.listarPorId(id);

        atuadorAtual.setNomeAtuador(atuadores.getNomeAtuador());
        atuadorAtual.setDispositivos(atuadores.getDispositivos());

        return atuadoresService.criar(atuadorAtual);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id){
        atuadoresService.excluir(id);
    }



}
