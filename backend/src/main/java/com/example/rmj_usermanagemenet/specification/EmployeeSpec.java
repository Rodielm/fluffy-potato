package com.example.rmj_usermanagemenet.specification;

import org.springframework.data.jpa.domain.Specification;

import com.example.rmj_usermanagemenet.entities.Employee;

public class EmployeeSpec {
    public static Specification<Employee> belongsToDepartment(Long departmentId) {
        return (root, query, cb) -> cb.equal(root.get("department").get("id"), departmentId);
    }

    public static Specification<Employee> hasId(Long employeeId) {
        return (root, query, cb) -> cb.equal(root.get("id"), employeeId);
    }
}
