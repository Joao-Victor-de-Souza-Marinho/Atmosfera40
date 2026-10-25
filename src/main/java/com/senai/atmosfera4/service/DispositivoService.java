package com.senai.atmosfera4.service;

import com.senai.atmosfera4.domain.entity.Dispositivos;
import com.senai.atmosfera4.exception.RecursoNaoEncontradoException;
import com.senai.atmosfera4.repository.DispositivosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DispositivoService {

    private final DispositivosRepository dispositivosRepository;


    public DispositivoService(DispositivosRepository dispositivosRepository) {
        this.dispositivosRepository = dispositivosRepository;
    }

    public Dispositivos criar(Dispositivos dispositivos){
        return dispositivosRepository.save(dispositivos);
    }

    public List<Dispositivos> listarTodos(){
        return dispositivosRepository.findAll();
    }

    public Dispositivos listarPorId(Integer id){
        return dispositivosRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Dispositivo com id " + id + " não foi encontrado"));
    }

    public void excluir(Integer id){
        listarPorId(id);
        dispositivosRepository.deleteById(id);
    }

    public Dispositivos atualizar(Integer id,Dispositivos dispositivos){
        Dispositivos dispositivoSalvo = listarPorId(id);

        dispositivoSalvo.setNomeDispositivo(dispositivos.getNomeDispositivo());
        dispositivoSalvo.setTipoDispositivo(dispositivos.getTipoDispositivo());
        dispositivoSalvo.setLocalizacao(dispositivos.getLocalizacao());
        dispositivoSalvo.setGatewayPai(dispositivos.getGatewayPai());
        return dispositivosRepository.save(dispositivoSalvo);
    }



}
