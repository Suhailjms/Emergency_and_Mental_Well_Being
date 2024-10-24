package com.infosys.Emergency_and_Mental_WellBeing.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;



@Data
public class RegisterDto {

    @NotEmpty
    private String firstname;

    @NotEmpty
    private String lastname;

    @NotEmpty
    private String username;

    @NotEmpty
    private String email;

    @NotEmpty
    @Size(min = 6, message = "Minimum Password length is 6 characters")
    private String password;

    private String phoneNumber;


}
