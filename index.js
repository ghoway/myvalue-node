const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

async function getName(phone) {
    const url = 'http://wahidayatullah.my.id/fake/';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract firstname, lastname, and email
        const { firstname, lastname, email } = data;
        
        return { firstname, lastname, email, phone };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to register a user
async function register(userData) {
    if (!userData) {
        console.error('No user data provided for registration.');
        return;
    }

    const unixTime = Math.floor(Date.now() / 1000);
    const url = `https://auth.myvalue.id/v1/user/?timestamp=${unixTime}`;
    
    const body = {
        email: userData.email,
        password: "12345678",
        mobilePhonePrefix: "+62",
        mobilePhoneNumber: userData.phone,
        firstName: userData.firstname,
        clientID: "MyValueApps",
        clientSecret: "4431a5c5-cfea-4359-8ba1-2fe9e8199881",
        additional: {
            referral: "",
            email_only: "true"
        },
        outletID: "10428",
        lastName: userData.lastname,
    };

    const headers = {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'id',
        'Baggage': 'sentry-trace_id=27868fb8ee2f40299a6c1d868d8f7058,sentry-public_key=e2948e4b0bb4480193df2845aa2ff20e,sentry-release=com.kompasgramedia.myvalue%403.0.7%2B554,sentry-environment=production,sentry-transaction=POST%20https%3A%2F%2Fauth.myvalue.id%2Fv1%2Fuser%2F%3Ftimestamp%3D1729829901078,sentry-sample_rate=0.2',
        'Content-Length': Buffer.byteLength(JSON.stringify(body)), // Calculate content length from body
        'Content-Type': 'application/json; charset=utf-8',
        'Device-ID': '6c8d7b4be3bca3e9',
        'Host': 'auth.myvalue.id',
        'Sentry-Trace': '27868fb8ee2f40299a6c1d868d8f7058-a93cd1e4302f40e1-0',
        'User-Agent': 'Dart/2.18 (dart:io)',
        'X-App-Version': '3.0.7',
        'X-Device': 'samsung SM-G965N (star2lte)',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Custom response
        console.log(chalk.white('[') + chalk.green('!') + chalk.white(']'), `Successfully Register ${userData.phone}`);
        console.log(chalk.green(`[ ${result.kgValueID} ] -> ${result.firstName} ${result.lastName} ${result.email} ${userData.phone}`));
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

async function sendOtp(userData) {
    if (!userData) {
        console.error('No user data provided for registration.');
        return;
    }
    const unixTime = Math.floor(Date.now() / 1000);
    const url = `https://auth.myvalue.id/v1/verification/send?timestamp=${unixTime}`;
    const body = {
        client_id: "MyValueApps",
        client_secret: "4431a5c5-cfea-4359-8ba1-2fe9e8199881",
        username: userData.phone,
        template: "myvalue"
    };
    const headers = {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'id',
        'Baggage': 'sentry-trace_id=27868fb8ee2f40299a6c1d868d8f7058,sentry-public_key=e2948e4b0bb4480193df2845aa2ff20e,sentry-release=com.kompasgramedia.myvalue%403.0.7%2B554,sentry-environment=production,sentry-transaction=POST%20https%3A%2F%2Fauth.myvalue.id%2Fv1%2Fuser%2F%3Ftimestamp%3D1729829901078,sentry-sample_rate=0.2',
        'Content-Length': Buffer.byteLength(JSON.stringify(body)), // Calculate content length from body
        'Content-Type': 'application/json; charset=utf-8',
        'Device-ID': '6c8d7b4be3bca3e9',
        'Host': 'auth.myvalue.id',
        'Sentry-Trace': '27868fb8ee2f40299a6c1d868d8f7058-a93cd1e4302f40e1-0',
        'User-Agent': 'Dart/2.18 (dart:io)',
        'X-App-Version': '3.0.7',
        'X-Device': 'samsung SM-G965N (star2lte)',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Custom response
        console.log(chalk.white('[') + chalk.green('!') + chalk.white(']'), `Successfully Sending OTP ${userData.phone}`);
    } catch (error) {
        console.error('Error during Send OTP:', error);
    }
}

async function verify(userData, otp) {
    if (!userData) {
        console.error('No user data provided for registration.');
        return;
    }
    const unixTime = Math.floor(Date.now() / 1000);
    const url = `https://auth.myvalue.id/v1/verification/check?timestamp=${unixTime}`;

    const body = {
        "username ": userData.phone,
        "token": otp // menggunakan kode otp dari input pengguna
    };
    
    const headers = {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'id',
        'Baggage': 'sentry-trace_id=27868fb8ee2f40299a6c1d868d8f7058,sentry-public_key=e2948e4b0bb4480193df2845aa2ff20e,sentry-release=com.kompasgramedia.myvalue%403.0.7%2B554,sentry-environment=production,sentry-transaction=POST%20https%3A%2F%2Fauth.myvalue.id%2Fv1%2Fuser%2F%3Ftimestamp%3D1729829901078,sentry-sample_rate=0.2',
        'Content-Length': Buffer.byteLength(JSON.stringify(body)), // Calculate content length from body
        'Content-Type': 'application/json; charset=utf-8',
        'Device-ID': '6c8d7b4be3bca3e9',
        'Host': 'auth.myvalue.id',
        'Sentry-Trace': '27868fb8ee2f40299a6c1d868d8f7058-a93cd1e4302f40e1-0',
        'User-Agent': 'Dart/2.18 (dart:io)',
        'X-App-Version': '3.0.7',
        'X-Device': 'samsung SM-G965N (star2lte)',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Custom response
        if (result.valid) {
            console.log(chalk.white('[') + chalk.green('!') + chalk.white(']'), `Successfully creating MyValue Account`);
            console.log('Details under below this section');
            console.log(chalk.green(`[ ${userData.kgValueID} ] -> ${userData.firstname} ${userData.lastname} ${userData.email} ${userData.phone}`));
        }
    } catch (error) {
        console.error('Error during submit OTP:', error);
    }
}

// Main function to orchestrate the calls
async function main() {
    console.log(chalk.green('MyValue Account Creator'));
    console.log(chalk.green('Made with ❤️'));
    console.log();

    const phone = readlineSync.question('Enter your phone number: ');
    console.log(chalk.white('[') + chalk.green('!') + chalk.white(']'), `Waiting For Register ${phone}`);

    const userData = await getName(phone);
    await register(userData);
    await sendOtp(userData);
    const otp = readlineSync.question('Enter the OTP: ');
    await verify(userData, otp);
}

// Execute the main function
main();