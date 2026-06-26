package com.upiiz.mascotas.Services;

import com.upiiz.mascotas.entities.RazasEntity;
import com.upiiz.mascotas.repositories.RazasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RazasServiceImpl implements RazasService {

    @Autowired
    private RazasRepository razasRepository;

    @Override
    public List<RazasEntity> listado() {
        return razasRepository.findAll();
    }

    @Override
    public Optional<RazasEntity> razaPorId(Long id) {
        return razasRepository.findById(id);
    }

    @Override
    public RazasEntity agregarRaza(RazasEntity raza) {
        return razasRepository.save(raza);
    }

    @Override
    public RazasEntity actualizarRaza(Long id, RazasEntity raza) {
        raza.setId(id);
        return razasRepository.save(raza);
    }

    @Override
    public void eliminarRaza(Long id) {
        razasRepository.deleteById(id);
    }
}