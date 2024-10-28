package com.infosys.Emergency_and_Mental_WellBeing.dto;

import lombok.Data;


@Data
public class UpdateDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phoneNumber;

}
