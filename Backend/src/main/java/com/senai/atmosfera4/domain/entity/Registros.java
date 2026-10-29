package com.senai.atmosfera4.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "registros")
public class Registros {

    public Registros() {
    }

    public Registros(Dispositivos dispositivo, Float temperatura, Float umidade, Float pressao, Float altitude, Float luminosidade, Float velocidadeVento, Integer direcaoVento, Integer intensidadeWifi) {
        this.dispositivo = dispositivo;
        this.timestamp = Timestamp.valueOf(LocalDateTime.now());
        this.dataHora = LocalDateTime.now();
        this.temperatura = temperatura;
        this.umidade = umidade;
        this.pressao = pressao;
        this.altitude = altitude;
        this.luminosidade = luminosidade;
        this.velocidadeVento = velocidadeVento;
        this.direcaoVento = direcaoVento;
        this.intensidadeWifi = intensidadeWifi;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_registro")
    private Integer id;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dispositivo_fk")
    private Dispositivos dispositivo;
    @NotNull
    @Column(name = "time_stamp")
    private Timestamp timestamp;
    @NotNull
    @Column(name = "data_hora")
    private LocalDateTime dataHora;

    @Column(name = "temperatura")
    private Float temperatura;

    @Column(name = "umidade")
    private Float umidade;

    @Column(name = "pressao")
    private Float pressao;

    @Column(name = "altitude")
    private Float altitude;

    @Column(name = "luminosidade")
    private Float luminosidade;

    @Column(name = "velocidade_vento")
    private Float velocidadeVento;

    @Column(name = "direcao_vento")
    private Integer direcaoVento;

    @Column(name = "intensidade_wifi")
    private Integer intensidadeWifi;


    public Integer getId() {
        return id;
    }

    public Dispositivos getDispositivo() {
        return dispositivo;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public Float getTemperatura() {
        return temperatura;
    }

    public Float getUmidade() {
        return umidade;
    }

    public Float getPressao() {
        return pressao;
    }

    public Float getAltitude() {
        return altitude;
    }

    public Float getLuminosidade() {
        return luminosidade;
    }

    public Float getVelocidadeVento() {
        return velocidadeVento;
    }

    public Integer getDirecaoVento() {
        return direcaoVento;
    }

    public Integer getIntensidadeWifi() {
        return intensidadeWifi;
    }


    public void setDispositivo(Dispositivos dispositivo) {
        this.dispositivo = dispositivo;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setTemperatura(Float temperatura) {
        this.temperatura = temperatura;
    }

    public void setUmidade(Float umidade) {
        this.umidade = umidade;
    }

    public void setPressao(Float pressao) {
        this.pressao = pressao;
    }

    public void setAltitude(Float altitude) {
        this.altitude = altitude;
    }

    public void setLuminosidade(Float luminosidade) {
        this.luminosidade = luminosidade;
    }

    public void setVelocidadeVento(Float velocidadeVento) {
        this.velocidadeVento = velocidadeVento;
    }

    public void setDirecaoVento(Integer direcaoVento) {
        this.direcaoVento = direcaoVento;
    }

    public void setIntensidadeWifi(Integer intensidadeWifi) {
        this.intensidadeWifi = intensidadeWifi;
    }
}