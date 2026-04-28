const { createServer } = require("node:http");
const { createReadStream, existsSync, statSync } = require("node:fs");
const { extname, join, normalize } = require("node:path");

const port = Number(process.env.PORT || 5173);
const root = process.cwd();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  const requestedPath = normalize(join(root, urlPath === "/" ? "index.html" : urlPath));

  if (!requestedPath.startsWith(root) || !existsSync(requestedPath) || statSync(requestedPath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": mimeTypes[extname(requestedPath)] || "application/octet-stream" });
  createReadStream(requestedPath).pipe(res);
}).listen(port, () => {
  console.log(`Static Government Scheme Finder running at http://localhost:${port}`);
});
