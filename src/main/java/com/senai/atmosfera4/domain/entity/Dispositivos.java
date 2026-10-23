package com.senai.atmosfera4.entity;

public class Dispositivos {
    private Integer id;
    private String nomeDispositivo;
    private String tipoDispositivo;
    private String localizacao;
    private Integer gatewayPai;

    public Dispositivos(String nomeDispositivo, String tipoDispositivo, String localizacao) {
        this.nomeDispositivo = nomeDispositivo;
        this.tipoDispositivo = tipoDispositivo;
        this.localizacao = localizacao;
    }

    public Dispositivos(Integer id, String nomeDispositivo, String tipoDispositivo, String localizacao, Integer gatewayPai) {
        this.id = id;
        this.nomeDispositivo = nomeDispositivo;
        this.tipoDispositivo = tipoDispositivo;
        this.localizacao = localizacao;
        this.gatewayPai = gatewayPai;
    }

    public Dispositivos(String nomeDispositivo, String tipoDispositivo, String localizacao, Integer gatewayPai) {
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

    public Integer getGatewayPai() {
        return gatewayPai;
    }
}
