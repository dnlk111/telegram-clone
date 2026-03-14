const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  transports: ["websocket", "polling"],
});

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

// API (чтобы не перехватывал SPA)
app.get("/api", (req, res) => {
  res.json({ ok: true, service: "telegram-clone-server", timestamp: new Date().toISOString() });
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Статика веб-приложения (мессенджер), если есть сборка
const publicDir = path.join(__dirname, "public");
const indexHtml = path.join(publicDir, "index.html");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir, { index: false }));
  app.get("*", (req, res) => {
    if (fs.existsSync(indexHtml)) {
      res.sendFile(indexHtml);
    } else {
      res.json({ ok: true, service: "telegram-clone-server", timestamp: new Date().toISOString() });
    }
  });
} else {
  app.get("/", (req, res) => {
    res.json({ ok: true, service: "telegram-clone-server", timestamp: new Date().toISOString() });
  });
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
}).on("error", (err) => {
  console.error("Server listen error:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled rejection at:", p, "reason:", reason);
});
