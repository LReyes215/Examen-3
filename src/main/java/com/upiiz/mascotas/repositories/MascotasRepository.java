package com.upiiz.mascotas.repositories;

import com.upiiz.mascotas.entities.MascotasEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotasRepository extends JpaRepository<MascotasEntity,  Long> {
}
