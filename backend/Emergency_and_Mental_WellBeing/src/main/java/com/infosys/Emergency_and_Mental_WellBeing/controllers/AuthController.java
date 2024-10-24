package com.infosys.Emergency_and_Mental_WellBeing.controllers;

import com.infosys.Emergency_and_Mental_WellBeing.dto.LoginDto;
import com.infosys.Emergency_and_Mental_WellBeing.dto.RegisterDto;
import com.infosys.Emergency_and_Mental_WellBeing.models.Person;
import com.infosys.Emergency_and_Mental_WellBeing.repositories.PersonRepository;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {



    @Value("${security.jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${security.jwt.issuer}")
    private String jwtIssuer;

    @Autowired
    private PersonRepository personRepository;  // Use this instance instead of static call

    @Autowired
    private AuthenticationManager authenticationManager;

    //    get person by id
    @GetMapping("/{id}")
    public ResponseEntity<Object> person(@PathVariable int id, Authentication auth) {
        var response = new HashMap<String, Object>();

        // Retrieve the person by ID
        Optional<Person> personOptional = personRepository.findById(id);
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            response.put("Id", person.getId());  // Assuming your Person has an getId() method
            response.put("Authorities", auth.getAuthorities());
            response.put("Person", person);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();  // If no person is found
        }
    }


    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @Valid @RequestBody RegisterDto registerDto,
            BindingResult result
    ) {
        // Check for validation errors
        if (result.hasErrors()) {
            var errorsList = result.getAllErrors();
            var errorMap = new HashMap<String, String>();

            for (int i = 0; i < errorsList.size(); i++) {
                var error = (FieldError) errorsList.get(i);
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errorMap);
        }

        // Encrypt password
        var bCryptEncoder = new BCryptPasswordEncoder();
        Person person = new Person();
        person.setFirstname(registerDto.getFirstname());
        person.setLastname(registerDto.getLastname());
        person.setUsername(registerDto.getUsername());
        person.setEmail(registerDto.getEmail());
        person.setCreatedAt(new Date());  // Set created date
        person.setPassword(bCryptEncoder.encode(registerDto.getPassword()));

        try {
            // Check if username or email already exists
            var otherPerson = personRepository.findByUsername(registerDto.getUsername());
            if (otherPerson.isPresent()) {
                return ResponseEntity.badRequest().body("Username already exists");
            }

            otherPerson = personRepository.findByEmail(registerDto.getEmail());  // Corrected instance usage
            if (otherPerson.isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            // Save the new person to the repository
            personRepository.save(person);

            String jwtToken = createJwtToken(person);

            var response = new HashMap<String, Object>();
            response.put("token",jwtToken);
            response.put("user",person);

            return ResponseEntity.ok(response);

        }
        catch (Exception e) {
            System.out.println("There is an Exception");
            e.printStackTrace();
//            throw new RuntimeException(e);
        }
        return ResponseEntity.badRequest().body("error");
        // You may want to return an appropriate success response instead
    }

    //    login
    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDto loginDto, BindingResult result) {
        if (result.hasErrors()) {
            var errorsList = result.getAllErrors();
            var errorMap = new HashMap<String, String>();
            for (int i = 0; i < errorsList.size(); i++) {
                var error = (FieldError) errorsList.get(i);
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errorMap);
        }

        try {
            // First, check if user exists
            Optional<Person> personOptional = personRepository.findByEmail(loginDto.getEmail());
            if (personOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Email or password is incorrect");
            }

            Person person = personOptional.get();

            // Validate the password
            BCryptPasswordEncoder bCryptEncoder = new BCryptPasswordEncoder();
            if (!bCryptEncoder.matches(loginDto.getPassword(), person.getPassword())) {
                return ResponseEntity.badRequest().body("Email or password is incorrect");
            }

            // Create JWT token if authentication is successful
            String jwtToken = createJwtToken(person);
            var response = new HashMap<String, Object>();
            response.put("token", jwtToken);
            response.put("user", person);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("There is an Exception");
            e.printStackTrace();
            return ResponseEntity.badRequest().body("An error occurred during login");
        }
    }







    private String createJwtToken(Person person) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(24 * 3600))  // 1 day expiration
                .subject(person.getUsername())
                // .claim("role", person.getRole()) // Add roles if necessary
                .build();

        var encoder = new NimbusJwtEncoder(new ImmutableSecret<>(jwtSecretKey.getBytes()));
        var params = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims);

        return encoder.encode(params).getTokenValue();
    }

}
