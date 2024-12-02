package com.code_compilers.CC_BANK.controller;

import com.code_compilers.CC_BANK.model.Account;
import com.code_compilers.CC_BANK.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("accounts", accountService.getAllAccounts());
        return "index";
    }
}