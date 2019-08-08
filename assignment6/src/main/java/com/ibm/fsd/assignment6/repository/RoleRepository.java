package com.ibm.fsd.assignment6.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ibm.fsd.assignment6.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    public Role findByRole(String role);
}
