import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Proxy route
app.get("/api/books", async (req, res) => {
  try {
    const query = new URLSearchParams(req.query).toString();
    const response = await fetch(`https://skunkworks.ignitesol.com:8000/books?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(8080, () => console.log("Proxy running on port 8080"));
