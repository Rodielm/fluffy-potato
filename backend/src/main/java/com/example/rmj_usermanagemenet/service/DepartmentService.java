package com.example.rmj_usermanagemenet.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rmj_usermanagemenet.dto.DepartmentDTO;
import com.example.rmj_usermanagemenet.entities.Department;
import com.example.rmj_usermanagemenet.repo.DepartmentRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepo departRepo;

    @Transactional
    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        Department department = new Department();
        department.setName(dto.getName());
        department = departRepo.save(department);

        dto.setId(department.getId());
        return dto;
    }
}
