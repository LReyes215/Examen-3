package com.upiiz.mascotas.Services;

import com.upiiz.mascotas.entities.MascotasEntity;

import java.util.List;
import java.util.Optional;

public interface MascotasService {
    List<MascotasEntity> listado();
    Optional<MascotasEntity> mascotaPorId(Long id);
    MascotasEntity agregarMascota(MascotasEntity mascotas);
    MascotasEntity actualizarMascota(Long id, MascotasEntity mascotas);
    void eliminarMascota(Long id);
}
