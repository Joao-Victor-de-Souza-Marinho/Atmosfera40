package com.senai.atmosfera4.dto;

import jakarta.validation.constraints.NotNull;

public class RegistroRequestDTO {

    @NotNull
    private Integer idDispositivo;

    private Float temperatura;


    private Float umidade;


    private Float pressao;


    private Float altitude;


    private Float luminosidade;


    private Float velocidadeVento;


    private Integer direcaoVento;


    private Integer intensidadeWifi;

    public RegistroRequestDTO() {
    }

    public Integer getIdDispositivo() {
        return idDispositivo;
    }

    public void setIdDispositivo(Integer idDispositivo) {
        this.idDispositivo = idDispositivo;
    }

    public Float getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(Float temperatura) {
        this.temperatura = temperatura;
    }

    public Float getUmidade() {
        return umidade;
    }

    public void setUmidade(Float umidade) {
        this.umidade = umidade;
    }

    public Float getPressao() {
        return pressao;
    }

    public void setPressao(Float pressao) {
        this.pressao = pressao;
    }

    public Float getAltitude() {
        return altitude;
    }

    public void setAltitude(Float altitude) {
        this.altitude = altitude;
    }

    public Float getLuminosidade() {
        return luminosidade;
    }

    public void setLuminosidade(Float luminosidade) {
        this.luminosidade = luminosidade;
    }

    public Float getVelocidadeVento() {
        return velocidadeVento;
    }

    public void setVelocidadeVento(Float velocidadeVento) {
        this.velocidadeVento = velocidadeVento;
    }

    public Integer getDirecaoVento() {
        return direcaoVento;
    }

    public void setDirecaoVento(Integer direcaoVento) {
        this.direcaoVento = direcaoVento;
    }

    public Integer getIntensidadeWifi() {
        return intensidadeWifi;
    }

    public void setIntensidadeWifi(Integer intensidadeWifi) {
        this.intensidadeWifi = intensidadeWifi;
    }
}
