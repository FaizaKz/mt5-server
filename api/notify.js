import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false, // we will manually read the raw body
  },
};

// list of emails to send to
const emails = [
  "faizakz1987@gmail.com",
  "shaikhshahbazkhan@gmail.com",
  "kamraniqbalahmed1808@gmail.com,
  "rehan_mughal@ymail.com"
];

// Gmail SMTP transporter (use Vercel environment variables)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

// function to send an email
async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: `"MT5 Signals" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST only" });
  }

  // collect raw data
  let data = "";
  for await (const chunk of req) {
    data += chunk;
  }

  // parse JSON message
  let message = "No message";
  try {
    const json = JSON.parse(data);
    if (json.message) message = json.message;
  } catch (e) {
    console.log("JSON parse error:", e);
  }

  console.log("MT5 Message:", message);

  // send to all emails
  for (const email of emails) {
    await sendEmail(email, "MT5 Signal", message);
  }

  return res.status(200).json({ status: "OK", received: message });
}


  console.log("MT5 Message:", message);

  return res.status(200).json({ status: "OK", received: message });
}


