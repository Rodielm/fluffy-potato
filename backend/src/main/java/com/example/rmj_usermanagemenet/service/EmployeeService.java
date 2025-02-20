package com.example.rmj_usermanagemenet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rmj_usermanagemenet.dto.EmployeeDTO;
import com.example.rmj_usermanagemenet.entities.Department;
import com.example.rmj_usermanagemenet.entities.Employee;
import com.example.rmj_usermanagemenet.repo.DepartmentRepo;
import com.example.rmj_usermanagemenet.repo.EmployeeRepo;
import com.example.rmj_usermanagemenet.specification.EmployeeSpec;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    private final DepartmentRepo departmentRepo;

    @Transactional
    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        Department department = departmentRepo.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setLastName(dto.getLastName());
        employee.setDepartment(department);

        employee = employeeRepo.save(employee);
        dto.setId(employee.getId());
        return dto;
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> getEmployeesByDepartment(Long departmentId) {
        List<Employee> employees = employeeRepo.findAll(
                EmployeeSpec.belongsToDepartment(departmentId));

        return employees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeByIdAndDepartment(Long employeeId, Long departmentId) {
        Employee employee = employeeRepo.findOne(
                Specification.where(EmployeeSpec.belongsToDepartment(departmentId))
                        .and(EmployeeSpec.hasId(employeeId)))
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return convertToDTO(employee);
    }

    @Transactional
    public void deleteEmployee(Long employeeId, Long departmentId) {
        Employee employee = employeeRepo.findOne(
                Specification.where(EmployeeSpec.belongsToDepartment(departmentId))
                        .and(EmployeeSpec.hasId(employeeId)))
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employeeRepo.delete(employee);
    }

    @Transactional
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO dto) {
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (dto.getName() != null) {
            employee.setName(dto.getName());
        }

        if (dto.getLastName() != null) {
            employee.setLastName(dto.getLastName());
        }

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepo.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            employee.setDepartment(department);
        }

        employee = employeeRepo.save(employee);
        return convertToDTO(employee);
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setLastName(employee.getLastName());
        dto.setDepartmentId(employee.getDepartment().getId());
        return dto;
    }
}
