package com.senai.atmosfera4.service;

import com.senai.atmosfera4.domain.entity.Dispositivos;
import com.senai.atmosfera4.domain.entity.Registros;
import com.senai.atmosfera4.dto.RegistroRequestDTO;
import com.senai.atmosfera4.dto.RegistroResponseDTO;
import com.senai.atmosfera4.exception.RecursoNaoEncontradoException;
import com.senai.atmosfera4.repository.RegistrosRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegistrosService {

    private final RegistrosRepository registrosRepository;
    private final DispositivoService dispositivoService;

    public RegistrosService(RegistrosRepository registrosRepository, DispositivoService dispositivoService) {
        this.registrosRepository = registrosRepository;
        this.dispositivoService = dispositivoService;
    }

    public RegistroResponseDTO criar(RegistroRequestDTO request) {
        Dispositivos dispositivos = dispositivoService.listarPorId(request.getIdDispositivo());
        Registros registros = new Registros(dispositivos, request.getTemperatura(), request.getUmidade(), request.getPressao(), request.getAltitude(), request.getLuminosidade(), request.getVelocidadeVento(), request.getDirecaoVento(), request.getIntensidadeWifi());
        return new RegistroResponseDTO(registrosRepository.save(registros));
    }

    public List<Registros> listarTodos() {
        return registrosRepository.findAll();
    }

    public Registros listarPorId(@jakarta.validation.Valid Integer id) {
        return registrosRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Registro não encontrado"));
    }

    public void excluir(Integer id) {
        listarPorId(id);
        registrosRepository.deleteById(id);
    }

    public RegistroResponseDTO listarUltimoRegistro(){
        Registros registros = registrosRepository.findFirstByOrderByDataHoraDesc().orElseThrow(() -> new RecursoNaoEncontradoException("Nenhum registro encontrado"));
        return new RegistroResponseDTO(registros);
    }

    public RegistroResponseDTO listarUltimoRegistroPorDispositivo(Integer id) {

        Registros registros = registrosRepository.findFirstByDispositivoIdOrderByDataHoraDesc(id).orElseThrow(() -> new RecursoNaoEncontradoException("Nenhum registro encontrado no dispositivo com id " + id));
        return new RegistroResponseDTO(registros);
    }

    public List<RegistroResponseDTO> listarTodosOsRegistrosPorId(Integer id){
        List<Registros> registros = registrosRepository.findAllByDispositivoIdOrderByDataHoraDesc(id);
        List<RegistroResponseDTO> registrosDTO = new ArrayList<>();

        for (Registros registro:registros){
            registrosDTO.add(new RegistroResponseDTO(registro));
        }
        return registrosDTO;
    }
}