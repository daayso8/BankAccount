"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const error = "bleh";
class BankAccount {
    constructor(accountNumber, accountName, accountBalance) {
        this.accountNumber = accountNumber;
        this.accountName = accountName;
        this.accountBalance = accountBalance;
    }
}
const dataFilePath = path.join(__dirname, 'accounts.json');
function loadAccountsData() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}
function saveAccountsData(accounts) {
    const data = JSON.stringify(accounts, null, 2);
    fs.writeFileSync(dataFilePath, data);
}
let arr = loadAccountsData();
console.log("Welcome to the Bank of mine!");
console.log("We're glad you're here!");
function welcomeScreen() {
    console.log("What can we help you with today?  \n 1. Create an account \n 2. Check balance \n 3. Deposit \n 4. Withdraw \n 5. Exit");
    const option = readlineSync.question('Choose an option: ');
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
        }
    }
    catch (error) {
        console.log('Error: ' + error);
    }
}
welcomeScreen();
function createAccount() {
    const accountNumber = readlineSync.questionInt('Enter account number: ');
    const accountName = readlineSync.question('Enter account name: ');
    const accountBalance = 0;
    const accountExists = arr.some(account => account.accountNumber === accountNumber);
    if (accountExists) {
        console.log('Account already exists');
    }
    else {
        const newAccount = new BankAccount(accountNumber, accountName, accountBalance);
        arr.push(newAccount);
        console.log('Account created successfully!');
    }
}
function checkBalance() {
    const accountNumber = readlineSync.questionInt('Enter account number: ');
    const accountExists = arr.find(account => account.accountNumber === accountNumber);
    if (accountExists) {
        return accountExists.accountBalance;
    }
    else {
        console.log('Account does not exist');
    }
}
function deposit() {
    const depositNumber = readlineSync.questionInt('Enter amount to deposit: ');
}
function withdraw() {
}
function exit() {
}
const assistance = readlineSync.question('Anymore assistance? [Y/N] ');
if (assistance === 'Y' || assistance === 'y') {
    welcomeScreen();
}
else if (assistance === 'N' || assistance === 'n') {
    exit();
}
else {
    console.log('Invalid option');
}
