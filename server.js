process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // allow unverified SSL

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/books", async (req, res) => {
  try {
    const query = new URLSearchParams(req.query).toString();
    const targetUrl = `http://skunkworks.ignitesol.com:8000/books?${query}`;
    console.log("🔗 Fetching from:", targetUrl);

    const response = await fetch(targetUrl);
    console.log("📦 Response status:", response.status);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching from external API:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => console.log("✅ Proxy running on port 8080"));
