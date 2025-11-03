export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST only" });
  }

  const msg = req.body.message || "No message";
  console.log("MT5 Message:", msg);

  return res.status(200).json({ status: "OK", received: msg });
}
