package com.infosys.Emergency_and_Mental_WellBeing.controllers;

import com.infosys.Emergency_and_Mental_WellBeing.dto.LoginDto;
import com.infosys.Emergency_and_Mental_WellBeing.dto.RegisterDto;
import com.infosys.Emergency_and_Mental_WellBeing.dto.UpdateDto;
import com.infosys.Emergency_and_Mental_WellBeing.models.Person;
import com.infosys.Emergency_and_Mental_WellBeing.repositories.PersonRepository;
import com.infosys.Emergency_and_Mental_WellBeing.services.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class AuthController {

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonRepository personRepository;

    // Get person by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> person(@PathVariable int id, Authentication auth) {
        var response = new HashMap<String, Object>();

        // Retrieve the person by ID
        Optional<Person> personOptional = personRepository.findById(id);
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            response.put("Id", person.getId());  // Assuming your Person has a getId() method
            response.put("Authorities", auth.getAuthorities());
            response.put("Person", person);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();  // If no person is found
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterDto registerDto, BindingResult result) {
        if (result.hasErrors()) {
            var errorMap = result.getAllErrors().stream()
                    .collect(Collectors.toMap(
                            error -> ((FieldError) error).getField(),
                            ObjectError::getDefaultMessage
                    ));
            return ResponseEntity.badRequest().body(errorMap);
        }

        Map<String, Object> response = personService.registerUser(registerDto);
        if (response.containsKey("error")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDto loginDto, BindingResult result) {
        if (result.hasErrors()) {
            var errorMap = result.getAllErrors().stream()
                    .collect(Collectors.toMap(
                            error -> ((FieldError) error).getField(),
                            ObjectError::getDefaultMessage
                    ));
            return ResponseEntity.badRequest().body(errorMap);
        }

        Map<String, Object> response = personService.authenticateUser(loginDto);
        if (response.containsKey("error")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }


    // Update User Endpoint
    @PutMapping("/update/{username}")
    public ResponseEntity<Map<String, Object>> updateUser(
            @PathVariable String username,
            @RequestBody UpdateDto updateDto) {

        Map<String, Object> response = personService.updateUser(username, updateDto);

        if (response.containsKey("error")) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

}
