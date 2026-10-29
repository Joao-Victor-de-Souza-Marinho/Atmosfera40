package com.senai.atmosfera4.dto;

import com.senai.atmosfera4.domain.entity.Registros;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class RegistroResponseDTO {


    private Integer id;
    private Integer idDispositivo;

    private Timestamp timestamp;

    private LocalDateTime dataHora;


    private Float temperatura;


    private Float umidade;


    private Float pressao;


    private Float altitude;


    private Float luminosidade;


    private Float velocidadeVento;


    private Integer direcaoVento;


    private Integer intensidadeWifi;

    public RegistroResponseDTO(Registros registros){
        this.id = registros.getId();
        this.idDispositivo = registros.getDispositivo().getId();
        this.altitude = registros.getAltitude();
        this.luminosidade = registros.getLuminosidade();
        this.dataHora = registros.getDataHora();
        this.direcaoVento = registros.getDirecaoVento();
        this.intensidadeWifi = registros.getIntensidadeWifi();
        this.pressao = registros.getPressao();
        this.temperatura = registros.getTemperatura();
        this.timestamp = registros.getTimestamp();
        this.umidade = registros.getUmidade();
        this.velocidadeVento = registros.getVelocidadeVento();
    }

    public Integer getId() {
        return id;
    }

    public Integer getIdDispositivo() {
        return idDispositivo;
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
}
