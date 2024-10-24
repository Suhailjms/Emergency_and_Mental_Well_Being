package com.infosys.Emergency_and_Mental_WellBeing.repositories;

import com.infosys.Emergency_and_Mental_WellBeing.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Integer> {

    Optional<Person> findById(int id);

    Optional<Person> findByUsername(String username);

    Optional<Person> findByEmail(String email);

}

