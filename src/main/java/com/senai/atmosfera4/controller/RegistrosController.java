package com.senai.atmosfera4.controller;

import com.senai.atmosfera4.domain.entity.Registros;
import com.senai.atmosfera4.dto.RegistroRequestDTO;
import com.senai.atmosfera4.dto.RegistroResponseDTO;
import com.senai.atmosfera4.service.RegistrosService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public Registros listarPorId(@PathVariable @Valid Integer id) {
        return registrosService.listarPorId(id);
    }

    @PostMapping
    public ResponseEntity<RegistroResponseDTO> criar(@Valid @RequestBody RegistroRequestDTO registro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(registrosService.criar(registro));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Integer id) {
        registrosService.excluir(id);
    }

    @GetMapping("/ultimo")
    public RegistroResponseDTO listarUltimo(){
        return registrosService.listarUltimoRegistro();
    }

    @GetMapping("/dispositivo/{id}/ultimo")
    public RegistroResponseDTO listarUltimoPorId(@PathVariable Integer id){
        return registrosService.listarUltimoRegistroPorDispositivo(id);
    }

    @GetMapping("/dispositivo/{id}/historico")
    public List<RegistroResponseDTO> listarRegistrosPorIdDispositivo(@PathVariable Integer id){
        return registrosService.listarTodosOsRegistrosPorId(id);
    }


}