"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var fs = require("fs");
var path = require("path");
var error = "bleh";
var BankAccount = /** @class */ (function () {
    function BankAccount(accountNumber, accountName, accountBalance) {
        this.accountNumber = accountNumber;
        this.accountName = accountName;
        this.accountBalance = accountBalance;
    }
    return BankAccount;
}());
var dataFilePath = path.join(__dirname, 'accounts.json');
function loadAccountsData() {
    if (fs.existsSync(dataFilePath)) {
        var data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}
function saveAccountsData(accounts) {
    var data = JSON.stringify(accounts, null, 2);
    fs.writeFileSync(dataFilePath, data);
}
var arr = loadAccountsData();
console.log("Welcome to the Bank of mine!");
console.log("We're glad you're here!");
function welcomeScreen() {
    console.log("What can we help you with today?  \n 1. Create an account \n 2. Check balance \n 3. Deposit \n 4. Withdraw \n 5. Exit");
    var option = readlineSync.question('Choose an option: ');
    try {
        switch (option) {
            case '1':
                createAccount();
                break;
            case '2':
                checkBalance();
                break;
            case '3':
                deposit();
                break;
            case '4':
                withdraw();
                break;
            case '5':
                exit();
                break;
            default:
                console.log('Invalid option');
                return welcomeScreen();
        }
    }
    catch (error) {
        console.log('Error: ' + error);
    }
}
welcomeScreen();
function createAccount() {
    var accountNumber = readlineSync.questionInt('Enter account number: ');
    var accountName = readlineSync.question('Enter account name: ');
    var accountBalance = 0;
    var accountExists = arr.some(function (account) { return account.accountNumber === accountNumber; });
    if (accountExists) {
        console.log('Account already exists');
        return assistance();
    }
    else {
        var newAccount = new BankAccount(accountNumber, accountName, accountBalance);
        arr.push(newAccount);
        saveAccountsData(arr);
        console.log('Account created successfully!');
        return assistance();
    }
}
function checkBalance() {
    var accountNumber = readlineSync.questionInt('Enter account number: ');
    var accountExists = arr.find(function (account) { return account.accountNumber === accountNumber; });
    if (accountExists) {
        console.log('You have $' + accountExists.accountBalance);
        return assistance();
    }
    else {
        console.log('Account does not exist');
        return assistance();
    }
}
function deposit() {
    var accountNumber = readlineSync.questionInt('Enter account number: ');
    var accountExists = arr.find(function (account) { return account.accountNumber === accountNumber; });
    if (accountExists) {
        var depositNumber = readlineSync.questionInt('Enter amount to deposit: ');
        accountExists.accountBalance += depositNumber;
        saveAccountsData(arr);
        console.log('Deposit successful!, you have $' + accountExists.accountBalance);
        return assistance();
    }
    else {
        console.log('Account does not exist');
        return assistance();
    }
}
function withdraw() {
    var accountNumber = readlineSync.questionInt('Enter account number: ');
    var accountExists = arr.find(function (account) { return account.accountNumber === accountNumber; });
    if (accountExists) {
        var withdrawalNumber = readlineSync.questionInt('Enter amount to deposit: ');
        accountExists.accountBalance -= withdrawalNumber;
        if (accountExists.accountBalance < 0) {
            console.log('Insufficient funds');
            return assistance();
        }
        else {
            saveAccountsData(arr);
            console.log('Withdrawal successful!, you have $' + accountExists.accountBalance);
            return assistance();
        }
    }
    else {
        console.log('Account does not exist');
        return assistance();
    }
}
function exit() {
}
function assistance() {
    var assistance = readlineSync.question('Anymore assistance? [Y/N] ');
    if (assistance === 'Y' || assistance === 'y') {
        welcomeScreen();
    }
    else if (assistance === 'N' || assistance === 'n') {
        exit();
    }
    else {
        console.log('Invalid option');
    }
}
