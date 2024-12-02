package com.code_compilers.CC_BANK.repository;



import com.code_compilers.CC_BANK.model.Account;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;



public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmail(String email);

}