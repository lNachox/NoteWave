package com.webcalificaciones.spring.notewave.springboot_notewave.repository;

import com.webcalificaciones.spring.notewave.springboot_notewave.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByRut(String rut);
}
