package com.example.rmj_usermanagemenet.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private Long id;
    private String name;
    private String lastName;
    private Long departmentId;
}
