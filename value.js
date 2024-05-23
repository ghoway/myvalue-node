require('dotenv').config();
var fetch = require("node-fetch");
var chalk = require("chalk");

const apikey = process.env.APIKEY;

async function getNumber(apikey) {
    try {
        const res = await fetch('https://turbootp.com/api/set-orders/' + apikey + '/117', {
            headers: {
                'Host': 'turbootp.com'
            }
        });
        const data = await res.json();
        return data.data.data.number;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function getName() {
    try {
        const res = await fetch('http://wahidayatullah.my.id/fake');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function register(firstname, lastname, email, nohp) {
    const body = JSON.stringify({
        "email": email,
        "password": process.env.PASSWORD, // diambil dari .env PASSWORD
        "mobilePhoneNumber": nohp,
        "mobilePhonePrefix": "+62",
        "firstName": firstname,
        "lastName": lastname,
        "clientID": "MyValueWeb",
        "redirect_uri": "https://www.myvalue.id/redirect",
        "outletID": process.env.OUTLETID, // diambil dari .env OUTLETID
        "additional": { "email_only": "true" }
    });

    try {
        const res = await fetch('https://auth.myvalue.id/v1/user/', {
            method: 'POST',
            body: body,
            headers: {
                'incognito': 'false',
                'thirdParty': 'false',
                'cookieStoreId': 'firefox-default',
                'urlClassification': 'firstParty: [], thirdParty: []',
                'requestSize': '0',
                'responseSize': '0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'id-ID',
                'Connection': 'keep-alive',
                'Content-Length': String(body.length),
                'Content-Type': 'application/json',
                'DNT': '1',
                'Host': 'auth.myvalue.id',
                'Origin': 'https://auth.myvalue.id',
                'Referer': 'https://auth.myvalue.id/authorize/register?client_id=MyValueWeb&redirect_uri=https%3A%2F%2Fwww.myvalue.id%2Fredirect&state=eNjUv67yihvE0',
                'sec-ch-ua': '"Opera";v="97", "Chromium";v="97", "Not=A?Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0'
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function sendOtp(nohp) {
    const body = JSON.stringify({
        "username": nohp,
        "template": ""
    });

    try {
        const res = await fetch('https://auth.myvalue.id/v1/verification/send/', {
            method: 'POST',
            body: body,
            headers: {
                'incognito': 'false',
                'thirdParty': 'false',
                'cookieStoreId': 'firefox-default',
                'urlClassification': 'firstParty: [], thirdParty: []',
                'requestSize': '0',
                'responseSize': '0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'id-ID',
                'Connection': 'keep-alive',
                'Content-Length': String(body.length),
                'Content-Type': 'application/json',
                'DNT': '1',
                'Host': 'auth.myvalue.id',
                'Origin': 'https://auth.myvalue.id',
                'Referer': 'https://auth.myvalue.id/authorize/register?client_id=MyValueWeb&redirect_uri=https%3A%2F%2Fwww.myvalue.id%2Fredirect&state=eNjUv67yihvE0',
                'sec-ch-ua': '"Opera";v="97", "Chromium";v="97", "Not=A?Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0'
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function getSms(apikey) {
    try {
        const res = await fetch('https://turbootp.com/api/get-orders/' + apikey + '/all');
        const data = await res.json();
        return data.data.data;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function submitOtp(nohp, otpku) {
    const body = JSON.stringify({
        "username": nohp,
        "token": otpku
    });

    try {
        const res = await fetch('https://auth.myvalue.id/v1/verification/check/', {
            method: 'POST',
            body: body,
            headers: {
                'incognito': 'false',
                'thirdParty': 'false',
                'cookieStoreId': 'firefox-default',
                'urlClassification': 'firstParty: [], thirdParty: []',
                'requestSize': '0',
                'responseSize': '0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'id-ID',
                'Connection': 'keep-alive',
                'Content-Length': String(body.length),
                'Content-Type': 'application/json',
                'DNT': '1',
                'Host': 'auth.myvalue.id',
                'Origin': 'https://auth.myvalue.id',
                'Referer': 'https://auth.myvalue.id/authorize/verify?client_id=MyValueWeb&redirect_uri=https%3A%2F%2Fwww.myvalue.id%2Fredirect&state=eNjUv67yihvE0',
                'sec-ch-ua': '"Opera";v="97", "Chromium";v="97", "Not=A?Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0'
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
    }
}

(async () => {
    const way = await getName();
    if (way) {
        const firstname = way.firstname;
        const lastname = way.lastname;
        const email = way.email;

        const nohp = await getNumber(apikey);
        console.log(`Phone number obtained: ${nohp}`);
        
        const registerResponse = await register(firstname, lastname, email, nohp);
        if (registerResponse && registerResponse.kgValueID) {
            const valueID = registerResponse.kgValueID;
            console.log(registerResponse);
            console.log(valueID);

            const otpResponse = await sendOtp(nohp);
            console.log(otpResponse);

            if (otpResponse) {
                console.log("Waiting for OTP...");

                // Delay 30 seconds
                await new Promise(resolve => setTimeout(resolve, 30000));

                const smsResponse = await getSms(apikey);
                if (smsResponse && smsResponse.length > 0) {
                    const otpku = JSON.parse(smsResponse[0].sms)[0].sms.match(/\d{6}/)[0];
                    console.log(`OTP obtained: ${otpku}`);
                    
                    const submitResponse = await submitOtp(nohp, otpku);
                    
                    console.log(submitResponse);
                    console.log(`[ ${chalk.green(valueID)} ] => ${firstname} ${lastname} ${nohp}`);
                } else {
                    console.error("Failed to get SMS.");
                }
            } else {
                console.error("Failed to send OTP.");
            }
        } else {
            console.error("Registration failed or kgValueID is missing.");
        }
    } else {
        console.error("Failed to get name.");
    }
})();
