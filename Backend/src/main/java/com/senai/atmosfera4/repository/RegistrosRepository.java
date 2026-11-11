package com.senai.atmosfera4.repository;

import com.senai.atmosfera4.domain.entity.Registros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrosRepository extends JpaRepository<Registros, Integer> {

    Optional<Registros> findFirstByOrderByDataHoraDesc();

    Optional<Registros> findFirstByDispositivoIdOrderByDataHoraDesc(Integer id);

    List<Registros> findAllByDispositivoIdOrderByDataHoraDesc(Integer id);

    List<Registros> findAllByOrderByDataHoraDesc();

    @Query("""
        SELECT r FROM Registros r
        WHERE r.dataHora >= :inicio
        AND (:idDispositivo IS NULL OR r.dispositivo.id = :idDispositivo)
        AND (:localizacao IS NULL OR LOWER(r.dispositivo.localizacao) = LOWER(:localizacao))
        ORDER BY r.dataHora DESC
    """)
    List<Registros> buscarHistoricoFiltrado(
            @Param("inicio") LocalDateTime inicio,
            @Param("idDispositivo") Integer idDispositivo,
            @Param("localizacao") String localizacao
    );
}