export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST only" });
  }

  console.log("Received body:", req.body);

  const msg = req.body.message || "No message";

  return res.status(200).json({ status: "OK", received: msg });
}

