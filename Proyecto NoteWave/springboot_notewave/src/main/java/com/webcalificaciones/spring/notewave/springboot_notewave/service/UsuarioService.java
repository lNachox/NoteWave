package com.webcalificaciones.spring.notewave.springboot_notewave.service;

import com.webcalificaciones.spring.notewave.springboot_notewave.model.Usuario;
import com.webcalificaciones.spring.notewave.springboot_notewave.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorRut(String rut) {
        return usuarioRepository.findByRut(rut);
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
} 