package com.infosys.Emergency_and_Mental_WellBeing.services;


import com.infosys.Emergency_and_Mental_WellBeing.models.Person;
import com.infosys.Emergency_and_Mental_WellBeing.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    //loadUserByUsername
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Person> person1 = personRepository.findByUsername(username);

//        Person person = person1.get();
        if (person1.isPresent()){
            var springPerson = User.withUsername(person1.get().getUsername())
                    .password(person1.get().getPassword())
//                   .roles(person.getRole())
                    .build();

            return springPerson;
        }
        return null;
    }



//    load


}
