export const config = {
  api: {
    bodyParser: false, // we will manually read the raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST only" });
  }

  // collect raw data
  let data = "";
  for await (const chunk of req) {
    data += chunk;
  }

  let message = "No message";
  try {
    const json = JSON.parse(data);
    if (json.message) message = json.message;
  } catch (e) {
    console.log("JSON parse error:", e);
  }

  console.log("MT5 Message:", message);

  return res.status(200).json({ status: "OK", received: message });
}
