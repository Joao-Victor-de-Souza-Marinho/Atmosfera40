package com.senai.atmosfera4.domain.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Table(name = "atuadores")
@Entity
public class Atuadores {

    public Atuadores() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_atuadores")
    private Integer id;
    @Column(name = "nome_atuador")
    private String nomeAtuador;
    @Column(name = "status_atual")
    private boolean statusAtual;
    @Column(name = "ultimo_comando")
    private LocalDateTime ultimoComando;

    @ManyToOne
    @JoinColumn(name = "id_dispositivo_fk")
    private Dispositivos dispositivo;

    public Atuadores(String nomeAtuador, Dispositivos dispositivos) {
        this.nomeAtuador = nomeAtuador;
        this.dispositivo = dispositivos;
        this.ultimoComando = LocalDateTime.now();
        this.statusAtual = true;
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

    public Dispositivos getDispositivos() {
        return dispositivo;
    }

    public void setNomeAtuador(String nomeAtuador) {
        this.nomeAtuador = nomeAtuador;
    }

    public void setStatusAtual(boolean statusAtual) {
        this.statusAtual = statusAtual;
    }

    public void setUltimoComando(LocalDateTime ultimoComando) {
        this.ultimoComando = ultimoComando;
    }

    public void setDispositivos(Dispositivos idDispositivos) {
        this.dispositivo = idDispositivos;
    }
}
