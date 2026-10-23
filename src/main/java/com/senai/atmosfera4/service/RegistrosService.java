package com.senai.atmosfera4.service;

import com.senai.atmosfera4.domain.entity.Registros;
import com.senai.atmosfera4.repository.RegistrosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrosService {

    private final RegistrosRepository registrosRepository;

    public RegistrosService(RegistrosRepository registrosRepository) {
        this.registrosRepository = registrosRepository;
    }

    public Registros criar(Registros registro) {
        return registrosRepository.save(registro);
    }

    public List<Registros> listarTodos() {
        return registrosRepository.findAll();
    }

    public Registros listarPorId(Long id) {
        return registrosRepository.findById(id).orElseThrow();
    }

    public Registros atualizar(Long id, Registros registro) {

        Registros registroSalvo = listarPorId(id);

        registroSalvo.setDispositivo(registro.getDispositivo());
        registroSalvo.setTimestamp(registro.getTimestamp());
        registroSalvo.setDataHora(registro.getDataHora());
        registroSalvo.setTemperatura(registro.getTemperatura());
        registroSalvo.setUmidade(registro.getUmidade());
        registroSalvo.setPressao(registro.getPressao());
        registroSalvo.setAltitude(registro.getAltitude());
        registroSalvo.setLuminosidade(registro.getLuminosidade());
        registroSalvo.setVelocidadeVento(registro.getVelocidadeVento());
        registroSalvo.setDirecaoVento(registro.getDirecaoVento());
        registroSalvo.setIntensidadeWifi(registro.getIntensidadeWifi());

        return registrosRepository.save(registroSalvo);
    }

    public void excluir(Long id) {
        registrosRepository.deleteById(id);
    }
}