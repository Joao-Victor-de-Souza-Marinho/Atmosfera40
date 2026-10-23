package com.senai.atmosfera4.service;

import com.senai.atmosfera4.domain.entity.Atuadores;
import com.senai.atmosfera4.repository.AtuadoresRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtuadoresService {

    private final AtuadoresRepository atuadoresRepository;

    public AtuadoresService(AtuadoresRepository atuadoresRepository) {
        this.atuadoresRepository = atuadoresRepository;
    }

    public Atuadores criar(Atuadores atuadores) {
        return atuadoresRepository.save(atuadores);
    }

    public List<Atuadores> listarTodos() {
        return atuadoresRepository.findAll();
    }

    public Atuadores listarPorId(Integer id) {
        return atuadoresRepository.findById(id).orElseThrow();
    }

    public Atuadores atualizar(Integer id, Atuadores atuadores) {
        Atuadores atuadorSalvo = listarPorId(id);

        atuadorSalvo.setNomeAtuador(atuadorSalvo.getNomeAtuador());
        atuadorSalvo.setDispositivos(atuadores.getDispositivos());

        return criar(atuadorSalvo);
    }

    public void excluir(Integer id) {
        atuadoresRepository.deleteById(id);
    }


}
