package com.webcalificaciones.spring.notewave.springboot_notewave.controllers;



import com.webcalificaciones.notewave.model.Usuario;
import com.webcalificaciones.spring.notewave.springboot_notewave.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    @GetMapping("/{rut}")
    public ResponseEntity<Usuario> obtenerPorRut(@PathVariable String rut) {
        return usuarioService.obtenerPorRut(rut)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }
}

