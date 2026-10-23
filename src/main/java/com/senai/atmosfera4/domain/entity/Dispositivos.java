package com.senai.atmosfera4.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dispositivos")
public class Dispositivos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dispositivos")
    private Integer id;
    @Column(name = "nome_dispositivo")
    private String nomeDispositivo;
    @Column(name = "tipo_dispositivo")
    private String tipoDispositivo;
    private String localizacao;
    @ManyToOne
    @JoinColumn(name = "gateway_pai_fk")
    private Dispositivos gatewayPai;

    public Dispositivos() {

    }

    public Dispositivos(String nomeDispositivo, String tipoDispositivo, String localizacao, Dispositivos gatewayPai) {
        this.nomeDispositivo = nomeDispositivo;
        this.tipoDispositivo = tipoDispositivo;
        this.localizacao = localizacao;
        this.gatewayPai = gatewayPai;
    }

    public Integer getId() {
        return id;
    }

    public String getNomeDispositivo() {
        return nomeDispositivo;
    }

    public String getTipoDispositivo() {
        return tipoDispositivo;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public Dispositivos getGatewayPai() {
        return gatewayPai;
    }

    public void setNomeDispositivo(String nomeDispositivo) {
        this.nomeDispositivo = nomeDispositivo;
    }

    public void setTipoDispositivo(String tipoDispositivo) {
        this.tipoDispositivo = tipoDispositivo;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public void setGatewayPai(Dispositivos gatewayPai) {
        this.gatewayPai = gatewayPai;
    }
}
