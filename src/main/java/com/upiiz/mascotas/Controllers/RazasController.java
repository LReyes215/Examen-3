package com.upiiz.mascotas.Controllers;

import com.upiiz.mascotas.Services.RazasService;
import com.upiiz.mascotas.entities.RazasEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class RazasController {

    @Autowired
    private RazasService razasService;

    @GetMapping("/razas")
    public String razas() {
        return "razas";
    }

    @GetMapping("/razas/api/razas")
    @ResponseBody
    public ResponseEntity<List<RazasEntity>> listadoRazasAJAX() {
        return ResponseEntity.ok(razasService.listado());
    }

    @GetMapping("/razas/api/razas/{id}")
    @ResponseBody
    public ResponseEntity<Optional<RazasEntity>> razaPorIdAJAX(@PathVariable Long id) {
        return ResponseEntity.ok(razasService.razaPorId(id));
    }

    // C - Crear raza (AJAX)
    @PostMapping("/razas/api/razas")
    @ResponseBody
    public ResponseEntity<RazasEntity> crearRazaAJAX(@RequestBody RazasEntity raza) {
        return ResponseEntity.ok(razasService.agregarRaza(raza));
    }

    // U - Actualizar raza (AJAX)
    @PatchMapping("/razas/api/razas/{id}")
    @ResponseBody
    public ResponseEntity<RazasEntity> actualizarRazaAJAX(@PathVariable Long id,
                                                          @RequestBody RazasEntity raza) {
        return ResponseEntity.ok(razasService.actualizarRaza(id, raza));
    }

    // D - Eliminar raza (AJAX)
    @DeleteMapping("/razas/api/razas/{id}")
    @ResponseBody
    public void eliminarRazaAJAX(@PathVariable Long id) {
        razasService.eliminarRaza(id);
    }
}