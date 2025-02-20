package com.example.rmj_usermanagemenet.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rmj_usermanagemenet.entities.Department;

public interface DepartmentRepo extends JpaRepository<Department, Long> {
}
