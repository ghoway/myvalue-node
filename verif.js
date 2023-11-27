const readline = require('readline');
const axios = require('axios');
const colors = require('colors');

async function sendVerification() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Masukkan nomor hp: ", async function (phone) {
    rl.close();

    const requestBody = {
      username: phone,
      template: ""
    };

    const headers = {
      "Host": "auth.myvalue.id",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "id-ID",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Content-Length": String(JSON.stringify(requestBody).length),
      "Origin": "https://auth.myvalue.id",
      "DNT": "1",
      "Connection": "keep-alive",
      "Referer": "https://auth.myvalue.id/authorize/register?client_id=ValueID&redirect_uri=https%3A%2F%2Fauth.myvalue.id%2Fauthorize%2Faccount&back=&state=",
      "Cookie": "client=%7B%22client_id%22%3A%22ValueID%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fauth.myvalue.id%2Fauthorize%2Faccount%22%2C%22back%22%3A%22%22%2C%22state%22%3A%22%22%2C%22isThirdParty%22%3Afalse%7D",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin"
    };

    try {
      const response = await axios.post('https://auth.myvalue.id/v1/verification/send/', requestBody, { headers });
      console.log(`[${colors.green('SUCCESS')}] => OTP Berhasil di kirim`);
      await submitOtp(phone);
    } catch (error) {
      console.error('Error in Verifikasi:', error);
      throw error;
    }
  });
}

async function submitOtp(phone) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Masukkan kode OTP: ", async function (otp) {
    rl.close();

    const requestBody = {
      username: phone,
      token: otp
    };

    const headers = {
      "Host": "auth.myvalue.id",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "id-ID",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Content-Length": String(JSON.stringify(requestBody).length),
      "Origin": "https://auth.myvalue.id",
      "DNT": "1",
      "Connection": "keep-alive",
      "Referer": "https://auth.myvalue.id/authorize/verify?client_id=MyValueWeb&redirect_uri=https%3A%2F%2Fwww.myvalue.id%2Fredirect&state=eNjUv67yihvE0",
      "Cookie": "client=%7B%22client_id%22%3A%22MyValueWeb%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fwww.myvalue.id%2Fredirect%22%2C%22state%22%3A%22eNjUv67yihvE0%22%2C%22isThirdParty%22%3Afalse%7D",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin"
    };

    try {
      const response = await axios.post('https://auth.myvalue.id/v1/verification/check/', requestBody, { headers });

      if (response.data.valid === true) {
        console.log('Verifikasi berhasil:', response.data);
      } else {
        console.log(colors.red("Kode OTP salah. Silakan coba lagi."));
        await submitOtp(phone);
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.detail === "Token yang Anda masukkan salah") {
        console.log(colors.red("Kode OTP salah. Silakan coba lagi."));
        await submitOtp(phone);
      } else {
        console.error('Error in submitOtp:', error.message);
        throw error;
      }
    }
  });
}

function getCurrentDateTime() {
  const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  return currentDateTime;
}

async function main() {
  await sendVerification();
}

main();
