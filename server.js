const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const fs = require("fs");
const app = express();

// Configure Nunjucks
nunjucks.configure(["views", "components"], {
  autoescape: true,
  express: app,
});

// Read the manifest file
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "public/.vite/manifest.json"), "utf-8")
);

// Serve static files
app.use("/styles", express.static(path.join(__dirname, "public/")));
app.use("/scripts", express.static(path.join(__dirname, "public/")));

if (process.env.NODE_ENV === "production") {
  // Serve static files in production
  app.use("/scripts", express.static(path.join(__dirname, "public/scripts")));
} else {
  // Use Vite's development server
  const { createServer: createViteServer } = require("vite");
  createViteServer({
    server: { middlewareMode: "html" },
  }).then((vite) => {
    app.use(vite.middlewares);
  });
}

// Serve static files
app.use("/styles", express.static(path.join(__dirname, "public/styles")));

// Route
app.get("/", (req, res) => {
  res.render("index.njk", {
    title: "Hello, Nunjucks!",
    content: "This is a Nunjucks component.",
    manifest: manifest["src/index.js"],
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
