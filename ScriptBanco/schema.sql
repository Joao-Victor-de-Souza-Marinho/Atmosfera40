-- =========================================================
-- Atmosfera 4.0 - banco de dados para MySQL 8.x
-- Cria as tabelas e cadastra dados de exemplo.
-- Nao apaga tabelas nem registros existentes.
-- =========================================================

CREATE DATABASE IF NOT EXISTS atmosfera
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE atmosfera;

-- 1. Dispositivos
CREATE TABLE IF NOT EXISTS dispositivos (
    id_dispositivos INT PRIMARY KEY AUTO_INCREMENT,
    nome_dispositivo VARCHAR(30) NOT NULL,
    localizacao VARCHAR(50),
    tipo_dispositivo VARCHAR(30) NOT NULL,
    gateway_pai_fk INT NULL,
    CONSTRAINT fk_dispositivos_gateway
        FOREIGN KEY (gateway_pai_fk)
        REFERENCES dispositivos(id_dispositivos)
) ENGINE=InnoDB;

-- 2. Atuadores
CREATE TABLE IF NOT EXISTS atuadores (
    id_atuadores INT PRIMARY KEY AUTO_INCREMENT,
    nome_atuador VARCHAR(30) NOT NULL,
    status_atual BOOLEAN NOT NULL,
    ultimo_comando DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_dispositivo_fk INT NOT NULL,
    CONSTRAINT fk_atuadores_dispositivo
        FOREIGN KEY (id_dispositivo_fk)
        REFERENCES dispositivos(id_dispositivos)
) ENGINE=InnoDB;

-- 3. Medicoes (o back-end usa a tabela 'registros', no plural)
CREATE TABLE IF NOT EXISTS registros (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    temperatura FLOAT NOT NULL,
    umidade FLOAT NOT NULL,
    pressao FLOAT NOT NULL,
    altitude FLOAT NOT NULL,
    luminosidade FLOAT NOT NULL,
    velocidade_vento FLOAT NULL,
    direcao_vento INT NULL,
    intensidade_wifi INT NULL,
    id_dispositivo_fk INT NOT NULL,
    CONSTRAINT fk_registros_dispositivo
        FOREIGN KEY (id_dispositivo_fk)
        REFERENCES dispositivos(id_dispositivos)
) ENGINE=InnoDB;

-- 4. Cadastra os tres dispositivos, se ainda nao existirem
INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo)
SELECT 'Sensor Sala 1', 'Sala de aula', 'Sensor ambiental'
WHERE NOT EXISTS (
    SELECT 1 FROM dispositivos WHERE nome_dispositivo = 'Sensor Sala 1'
);

INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo)
SELECT 'Sensor Sala 2', 'Laboratório', 'Sensor ambiental'
WHERE NOT EXISTS (
    SELECT 1 FROM dispositivos WHERE nome_dispositivo = 'Sensor Sala 2'
);

INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo)
SELECT 'Sensor Externo', 'Área externa', 'Sensor ambiental'
WHERE NOT EXISTS (
    SELECT 1 FROM dispositivos WHERE nome_dispositivo = 'Sensor Externo'
);

-- 5. Busca o ID real de cada dispositivo pelo nome
SET @id_sala1 = (
    SELECT id_dispositivos FROM dispositivos
    WHERE nome_dispositivo = 'Sensor Sala 1'
    ORDER BY id_dispositivos LIMIT 1
);

SET @id_sala2 = (
    SELECT id_dispositivos FROM dispositivos
    WHERE nome_dispositivo = 'Sensor Sala 2'
    ORDER BY id_dispositivos LIMIT 1
);

SET @id_externo = (
    SELECT id_dispositivos FROM dispositivos
    WHERE nome_dispositivo = 'Sensor Externo'
    ORDER BY id_dispositivos LIMIT 1
);

-- 6. Cadastra os tres atuadores, se ainda nao existirem
INSERT INTO atuadores (nome_atuador, status_atual, id_dispositivo_fk)
SELECT 'Ventilador Sala 1', FALSE, @id_sala1
WHERE @id_sala1 IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM atuadores WHERE nome_atuador = 'Ventilador Sala 1'
  );

INSERT INTO atuadores (nome_atuador, status_atual, id_dispositivo_fk)
SELECT 'Luz Sala 2', FALSE, @id_sala2
WHERE @id_sala2 IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM atuadores WHERE nome_atuador = 'Luz Sala 2'
  );

INSERT INTO atuadores (nome_atuador, status_atual, id_dispositivo_fk)
SELECT 'Ventilador Externo', FALSE, @id_externo
WHERE @id_externo IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM atuadores WHERE nome_atuador = 'Ventilador Externo'
  );

-- 7. Cadastra tres medicoes de exemplo.
-- time_stamp e data_hora sao informados explicitamente para tambem
-- funcionar em tabelas antigas que nao tenham DEFAULT nesses campos.
INSERT INTO registros (
    time_stamp, data_hora, temperatura, umidade, pressao,
    altitude, luminosidade, velocidade_vento, direcao_vento,
    intensidade_wifi, id_dispositivo_fk
)
SELECT
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
    24.5, 58.0, 1013.2, 760.0, 320.0, 3.5, 180, 85, @id_sala1
WHERE @id_sala1 IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM registros
      WHERE id_dispositivo_fk = @id_sala1
        AND temperatura = 24.5 AND umidade = 58.0
  );

INSERT INTO registros (
    time_stamp, data_hora, temperatura, umidade, pressao,
    altitude, luminosidade, velocidade_vento, direcao_vento,
    intensidade_wifi, id_dispositivo_fk
)
SELECT
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
    23.8, 55.0, 1012.7, 762.0, 410.0, 2.1, 210, 72, @id_sala2
WHERE @id_sala2 IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM registros
      WHERE id_dispositivo_fk = @id_sala2
        AND temperatura = 23.8 AND umidade = 55.0
  );

INSERT INTO registros (
    time_stamp, data_hora, temperatura, umidade, pressao,
    altitude, luminosidade, velocidade_vento, direcao_vento,
    intensidade_wifi, id_dispositivo_fk
)
SELECT
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
    26.1, 61.0, 1011.9, 758.0, 520.0, 4.2, 120, 68, @id_externo
WHERE @id_externo IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM registros
      WHERE id_dispositivo_fk = @id_externo
        AND temperatura = 26.1 AND umidade = 61.0
  );

-- 8. Consultas para validar o banco
SELECT * FROM dispositivos;
SELECT * FROM atuadores;
SELECT * FROM registros;

SELECT
    (SELECT COUNT(*) FROM dispositivos) AS total_dispositivos,
    (SELECT COUNT(*) FROM atuadores) AS total_atuadores,
    (SELECT COUNT(*) FROM registros) AS total_registros;