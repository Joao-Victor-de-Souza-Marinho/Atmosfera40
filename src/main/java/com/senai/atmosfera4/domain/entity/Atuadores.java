package com.senai.atmosfera4.entity;

import java.time.LocalDateTime;

public class Atuadores {

    private Integer id;
    private String nomeAtuador;
    private boolean statusAtual;
    private LocalDateTime ultimoComando;
    private Integer idDispositivos;

    public Atuadores(String nomeAtuador, Integer idDispositivos) {
        this.nomeAtuador = nomeAtuador;
        this.idDispositivos = idDispositivos;
        this.statusAtual = true;
        this.ultimoComando = LocalDateTime.now();
    }

    public Atuadores(Integer id, String nomeAtuador, boolean statusAtual, LocalDateTime ultimoComando, Integer idDispositivos) {
        this.id = id;
        this.nomeAtuador = nomeAtuador;
        this.statusAtual = statusAtual;
        this.ultimoComando = ultimoComando;
        this.idDispositivos = idDispositivos;
    }


    public Integer getIdDispositivos() {
        return idDispositivos;
    }

    public Integer getId() {
        return id;
    }

    public String getNomeAtuador() {
        return nomeAtuador;
    }

    public boolean getStatusAtual() {
        return statusAtual;
    }

    public LocalDateTime getUltimoComando() {
        return ultimoComando;
    }



}
