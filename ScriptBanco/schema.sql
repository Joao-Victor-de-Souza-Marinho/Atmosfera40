CREATE DATABASE IF NOT EXISTS atmosfera_40;
USE atmosfera_40;

CREATE TABLE dispositivos (
id_dispositivo INT PRIMARY KEY AUTO_INCREMENT,
nome_dispositivo VARCHAR(30) NOT NULL,
localizacao VARCHAR(50),
tipo_dispositivo VARCHAR(30) NOT NULL,
gateway_pai_fk INT,
FOREIGN KEY(gateway_pai_fk) REFERENCES dispositivos(id_dispositivo) 
);

CREATE TABLE atuadores (
id_atuador INT PRIMARY KEY AUTO_INCREMENT,
id_dispositivo_fk INT NOT NULL,
nome_atuador VARCHAR(30) NOT NULL,
status_atual BOOL NOT NULL DEFAULT 0,
ultimo_comando DATETIME DEFAULT NOW(),
FOREIGN KEY(id_dispositivo_fk) REFERENCES dispositivos(id_dispositivo)
);

CREATE TABLE registros (
id_registro BIGINT PRIMARY KEY AUTO_INCREMENT,
id_dispositivo_fk INT NOT NULL,
time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
data_hora DATETIME NOT NULL DEFAULT NOW(),
temperatura FLOAT NOT NULL,
umidade FLOAT NOT NULL,
pressao FLOAT NOT NULL,
altitude FLOAT NOT NULL,
luminosidade FLOAT NOT NULL,
velocidade_vento FLOAT,
direcao_vento INT,
intensidade_wifi INT,
FOREIGN KEY(id_dispositivo_fk) REFERENCES dispositivos(id_dispositivo)
);

INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk) VALUES
('Gateway Central', 'Estufa 01', 'Gateway', 1),
('Estação Norte', 'Canteiro A', 'Estação Meteorológica', 1),
('Sensor Galpão', 'Galpão 02', 'Sensor Ambiental', 1);

INSERT INTO atuadores (id_dispositivo_fk, nome_atuador, status_atual) VALUES
(1, 'Relé de Irrigação', 1),
(2, 'Exaustor de Ar', 0),
(3, 'Lâmpada Aquecedora', 1);

INSERT INTO registros (id_dispositivo_fk, temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi) VALUES
(2, 24.5, 65.0, 1013.25, 750.0, 850.0, 12.5, 180, -65),
(2, 25.1, 63.2, 1013.10, 750.0, 910.0, 15.0, 190, -62),
(3, 21.0, 70.5, 1014.00, 750.0, 420.0, 17.4, 200, -70);