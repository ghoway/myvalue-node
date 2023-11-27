const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/register" method="post">
      <label for="phoneNumber">Masukkan nomor hp:</label><br>
      <input type="text" id="phoneNumber" name="phoneNumber"><br><br>
      <label for="outletID">Masukkan Outlet ID:</label><br>
      <input type="text" id="outletID" name="outletID">
      <br><br>
      <input type="submit" value="Submit">
    </form>
  `);
});

async function fake() {
  try {
    const response = await axios.get('http://wahidayatullah.my.id/fake');
    return response.data;
  } catch (error) {
    console.error('Error in Fake:', error.message);
    throw error;
  }
}

async function registrasi(phone, outletID) {
  try {
    const fakeData = await fake();
    const { firstname, lastname, email } = fakeData;

    const requestBody1 = {
      email: email,
      password: "asujancok32",
      mobilePhoneNumber: phone,
      mobilePhonePrefix: "+62",
      firstName: firstname,
      lastName: lastname,
      clientID: "ValueID",
      outletID: outletID,
      redirect_uri: "https://auth.myvalue.id/authorize/account",
      additional: {
        email_only: "true"
        // referral: "199807"
      }
    };

    const headers = {
        "Host": "auth.myvalue.id",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "id-ID",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Content-Length": String(JSON.stringify(requestBody1).length),
        "Origin": "https://auth.myvalue.id",
        "DNT": "1",
        "Connection": "keep-alive",
        "Referer": "https://auth.myvalue.id/authorize/register?client_id=ValueID&redirect_uri=https%3A%2F%2Fauth.myvalue.id%2Fauthorize%2Faccount&back=&state=",
        "Cookie": "client=%7B%22client_id%22%3A%22ValueID%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fauth.myvalue.id%2Fauthorize%2Faccount%22%2C%22back%22%3A%22%22%2C%22state%22%3A%22%22%2C%22isThirdParty%22%3Afalse%7D",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
      };

    const response = await axios.post('https://auth.myvalue.id/v1/user/', requestBody1, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in Registration:', error.message);
    throw error;
  }
}

async function sendVerification(phone) {
  try {
    const requestBody2 = {
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
        "Content-Length": String(JSON.stringify(requestBody2).length),
        "Origin": "https://auth.myvalue.id",
        "DNT": "1",
        "Connection": "keep-alive",
        "Referer": "https://auth.myvalue.id/authorize/register?client_id=ValueID&redirect_uri=https%3A%2F%2Fauth.myvalue.id%2Fauthorize%2Faccount&back=&state=",
        "Cookie": "client=%7B%22client_id%22%3A%22ValueID%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fauth.myvalue.id%2Fauthorize%2Faccount%22%2C%22back%22%3A%22%22%2C%22state%22%3A%22%22%2C%22isThirdParty%22%3Afalse%7D",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
      };

    const response = await axios.post('https://auth.myvalue.id/v1/verification/send/', requestBody2, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in Sending Verification:', error.message);
    throw error;
  }
}

app.post('/register', async (req, res) => {
    const { phoneNumber } = req.body;
  
    try {
      const resultRegistrasi = await registrasi(phoneNumber);
      console.log('Registrasi berhasil:', resultRegistrasi);
  
      const resultVerifikasi = await sendVerification(phoneNumber);
  
      // Menyiapkan data untuk ditampilkan pada response
      const { kgValueID, firstName, lastName, email } = resultRegistrasi;
  
      // Menampilkan response yang diubah sesuai kebutuhan
      const registerResponse = `[SUCCESS REGISTER] => ${kgValueID} | ${firstName} | ${lastName} | ${phoneNumber} | ${email}`;
      const verificationResponse = `[SUCCESS SEND OTP] => Kode OTP telah dikirim ke ${phoneNumber}, silahkan verifikasi disini <a href="/verifikasi">Verifikasi DISINI</a>`;
  
      res.send(`${registerResponse}<br>${verificationResponse}`);
    } catch (error) {
      res.status(500).send(`Registrasi gagal: ${error.message}`);
    }
  });

 // ... (kode sebelumnya)

 async function submitOtpToAuthServer(phone, otp) {
    try {
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
        // Add your Cookie if necessary
        "Cookie": "client=%7B%22client_id%22%3A%22MyValueWeb%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fwww.myvalue.id%2Fredirect%22%2C%22state%22%3A%22eNjUv67yihvE0%22%2C%22isThirdParty%22%3Afalse%7D",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
      };
  
      const response = await axios.post('https://auth.myvalue.id/v1/verification/check/', requestBody, { headers });
  
      if (response.data.valid === true) {
        return response.data;
      } else {
        throw new Error('Kode OTP Salah');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.detail === "Token yang Anda masukkan salah") {
        throw new Error('Kode OTP Salah');
      } else {
        throw error;
      }
    }
  }
  
  // Menampilkan form untuk verifikasi OTP
  app.get('/verifikasi', (req, res) => {
    res.send(`
      <form action="/submitOtpToAuthServer" method="post">
        <label for="otpPhoneNumber">Masukkan nomor hp:</label><br>
        <input type="text" id="otpPhoneNumber" name="otpPhoneNumber"><br><br>
        <label for="otpCode">Masukkan kode OTP:</label><br>
        <input type="text" id="otpCode" name="otpCode"><br><br>
        <input type="submit" value="Submit">
      </form>
    `);
  });
  
  app.post('/submitOtpToAuthServer', async (req, res) => {
    const { otpPhoneNumber, otpCode } = req.body;
  
    try {
      const otpResult = await submitOtpToAuthServer(otpPhoneNumber, otpCode);
      res.send(`[SUCCESS] => ${JSON.stringify(otpResult)}`);
    } catch (error) {
      res.send('Kode OTP Salah. Silakan coba lagi.');
    }
  });
  
  // ... (kode lainnya)
  
  


app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
