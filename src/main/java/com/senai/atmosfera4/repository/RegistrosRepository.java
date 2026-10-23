package com.senai.atmosfera4.repository;

import com.senai.atmosfera4.domain.entity.Registros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrosRepository extends JpaRepository<Registros, Long> {
}