import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import * as path from 'path';

const error = "bleh";

class BankAccount {
    accountNumber: number;
    accountName: string;
    accountBalance: number;

    constructor(accountNumber: number, accountName: string, accountBalance: number) {
        this.accountNumber = accountNumber;
        this.accountName = accountName;
        this.accountBalance = accountBalance;
    }
}



const dataFilePath = path.join(__dirname, 'accounts.json');

function loadAccountsData(): BankAccount[] {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];

}

function saveAccountsData(accounts: BankAccount[]): void {
    const data = JSON.stringify(accounts, null, 2);
    fs.writeFileSync(dataFilePath, data);
}

let arr: BankAccount[] = loadAccountsData();

console.log("Welcome to the Bank of mine!");
console.log("We're glad you're here!");

function welcomeScreen(): void {    
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
                return welcomeScreen();
        }
        
    } catch (error) {
            console.log('Error: ' + error);
        }
}



welcomeScreen();

function createAccount(): void {
    const accountNumber = readlineSync.questionInt('Enter account number: ');
    const accountName: string = readlineSync.question('Enter account name: ');
    const accountBalance: number = 0;

    const accountExists = arr.some(account => account.accountNumber === accountNumber);

    if (accountExists) {
        console.log('Account already exists');
        return assistance();
    } else {
        const newAccount = new BankAccount(accountNumber, accountName, accountBalance);
        arr.push(newAccount);
        saveAccountsData(arr);
        console.log('Account created successfully!');
        return assistance();
    }
    
    
}

function checkBalance() {
    const accountNumber = readlineSync.questionInt('Enter account number: ');

    const accountExists = arr.find(account => account.accountNumber === accountNumber);

    if (accountExists) {
        console.log('You have $' + accountExists.accountBalance);
        return assistance();
    } else {
        console.log('Account does not exist');
        return assistance();
    }
}

function deposit(): void {
    const accountNumber = readlineSync.questionInt('Enter account number: ');
    const accountExists = arr.find(account => account.accountNumber === accountNumber);
    if (accountExists) {
        const depositNumber = readlineSync.questionInt('Enter amount to deposit: ');
        accountExists.accountBalance += depositNumber;
        saveAccountsData(arr);
        console.log('Deposit successful!, you have $' + accountExists.accountBalance);
        return assistance();
    } else {
        console.log('Account does not exist');
        return assistance();
    }
}

function withdraw(): void {
    const accountNumber = readlineSync.questionInt('Enter account number: ');
    const accountExists = arr.find(account => account.accountNumber === accountNumber);
    if (accountExists) {
        const withdrawalNumber = readlineSync.questionInt('Enter amount to deposit: ');
        accountExists.accountBalance -= withdrawalNumber;
        if (accountExists.accountBalance < 0) {
            console.log('Insufficient funds');
            return assistance();
        } else {

        
        saveAccountsData(arr);
        console.log('Withdrawal successful!, you have $' + accountExists.accountBalance);
        return assistance();
        }
    } else {
        console.log('Account does not exist');
        return assistance();
    }
}


function exit(): void {

}

function assistance() {
const assistance = readlineSync.question('Anymore assistance? [Y/N] ');
if (assistance  === 'Y' || assistance === 'y') {
    welcomeScreen();
} else if (assistance === 'N' || assistance === 'n') {
    exit();
} else {
    console.log('Invalid option');
}
}