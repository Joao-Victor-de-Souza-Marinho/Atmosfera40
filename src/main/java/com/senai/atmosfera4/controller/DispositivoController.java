package com.senai.atmosfera4.controller;

import com.senai.atmosfera4.domain.entity.Dispositivos;
import com.senai.atmosfera4.service.DispositivoService;
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

    @PostMapping
    public Dispositivos criar(@RequestBody Dispositivos dispositivo){
       return dispositivoService.criar(dispositivo);

    }

    @PutMapping("/{id}")
    public Dispositivos atualizar(@RequestBody Dispositivos dispositivos, @PathVariable Integer id){
        Dispositivos dispositivoSalvo = dispositivoService.listarPorId(id);

        dispositivoSalvo.setNomeDispositivo(dispositivos.getNomeDispositivo());
        dispositivoSalvo.setTipoDispositivo(dispositivos.getTipoDispositivo());
        dispositivoSalvo.setLocalizacao(dispositivos.getLocalizacao());
        dispositivoSalvo.setGatewayPai(dispositivos.getGatewayPai());
        return dispositivoService.criar(dispositivoSalvo);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id){
        dispositivoService.excluir(id);
    }

}
