package com.example.rmj_usermanagemenet.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rmj_usermanagemenet.dto.EmployeeDTO;
import com.example.rmj_usermanagemenet.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/departments/{departmentId}/employees")
@RequiredArgsConstructor
public class EmployeeCtrl {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(
            @PathVariable Long departmentId,
            @RequestBody EmployeeDTO employee) {
        employee.setDepartmentId(departmentId);
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByDepartment(
            @PathVariable Long departmentId) {
        return ResponseEntity.ok(employeeService.getEmployeesByDepartment(departmentId));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeDTO> getEmployee(
            @PathVariable Long departmentId,
            @PathVariable Long employeeId) {
        return ResponseEntity.ok(employeeService.getEmployeeByIdAndDepartment(employeeId, departmentId));
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long departmentId,
            @PathVariable Long employeeId) {
        employeeService.deleteEmployee(employeeId, departmentId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable Long departmentId,
            @PathVariable Long employeeId,
            @RequestBody EmployeeDTO employee) {
        employee.setDepartmentId(departmentId);
        return ResponseEntity.ok(employeeService.updateEmployee(employeeId, employee));
    }
}
