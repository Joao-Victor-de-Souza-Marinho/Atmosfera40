package com.senai.atmosfera4.repository;

import com.senai.atmosfera4.domain.entity.Atuadores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtuadoresRepository extends JpaRepository<Atuadores,Integer> {
}
