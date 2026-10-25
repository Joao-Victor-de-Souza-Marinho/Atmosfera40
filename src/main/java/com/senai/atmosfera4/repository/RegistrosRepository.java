package com.senai.atmosfera4.repository;

import com.senai.atmosfera4.domain.entity.Registros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrosRepository extends JpaRepository<Registros, Integer> {

    Optional<Registros> findFirstByOrderByDataHoraDesc();
    Optional<Registros> findFirstByDispositivoIdOrderByDataHoraDesc(Integer id);
    List<Registros> findAllByDispositivoIdOrderByDataHoraDesc(Integer id);


}