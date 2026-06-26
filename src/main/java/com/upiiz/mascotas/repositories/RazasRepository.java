package com.upiiz.mascotas.repositories;

import com.upiiz.mascotas.entities.RazasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RazasRepository extends JpaRepository<RazasEntity, Long> {

}