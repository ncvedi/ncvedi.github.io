import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";

const root = process.cwd();
const origin = "https://patrickcollison.com";

const pages = [
  ["", "Home"],
  ["about", "Lantern"],
  ["advice", "Harbor"],
  ["bookshelf", "Marble"],
  ["culture", "Signal"],
  ["dispatches", "Atlas"],
  ["fast", "Copper"],
  ["growth", "Meadow"],
  ["labs", "Workshop"],
  ["links", "Cabinet"],
  ["pollution", "Weather"],
  ["progress", "Orbit"],
  ["questions", "Notebook"],
  ["solar", "Beacon"],
  ["svhistory", "Archive"],
  ["travel", "Compass"],
];

const initialPages = pages.map(([slug]) => slug);
const generatedPages = new Map();
const assetPaths = new Set();

function get(url, encoding = "utf8") {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(get(new URL(res.headers.location, url).href, encoding));
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`${url} returned ${res.statusCode}`));
          res.resume();
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          resolve({
            body: encoding ? buffer.toString(encoding) : buffer,
            headers: res.headers,
          });
        });
      })
      .on("error", reject);
  });
}

function pageDir(slug) {
  return slug ? path.join(root, slug) : root;
}

function prefixFor(slug) {
  if (!slug) return "";
  return "../".repeat(slug.split("/").length);
}

function menu(prefix) {
  return `<div id="menu">
<span class="title">Neil Chaturvedi</span>
<ul>
${pages
  .filter(([slug]) => slug)
  .map(([slug, label]) => `  <li><a href="${prefix}${slug}/">${label}</a></li>`)
  .join("\n")}
</ul>
</div>`;
}

function extractContent(html) {
  const start = html.indexOf('<div id="content">');
  const script = html.indexOf("<script", start);
  if (start === -1 || script === -1) return "";

  let content = html.slice(start + '<div id="content">'.length, script);
  content = content.replace(/<\/div>\s*$/s, "").trim();
  if (content.startsWith('<div id="content">')) {
    content = content.slice('<div id="content">'.length).trim();
    content = content.replace(/<\/div>\s*$/s, "").trim();
  }
  return content;
}

function isLocalUrl(value) {
  return (
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/cdn-cgi/")
  );
}

function stripPath(value) {
  return decodeURI(value.split("#")[0].split("?")[0].replace(/^\/+/, ""));
}

function hasExtension(slug) {
  return /\.[a-z0-9]{2,5}$/i.test(slug);
}

function discover(content) {
  for (const match of content.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!isLocalUrl(value)) continue;

    const localPath = stripPath(value);
    if (!localPath) continue;

    if (hasExtension(localPath) || localPath.startsWith("static/")) {
      assetPaths.add(localPath);
    } else if (!generatedPages.has(localPath)) {
      generatedPages.set(localPath, null);
    }
  }
}

function rewriteContent(content, prefix) {
  return content.replace(/\b(href|src)="(\/[^"]+)"/g, (all, attr, value) => {
    if (!isLocalUrl(value)) return all;

    const hash = value.includes("#") ? `#${value.split("#").slice(1).join("#")}` : "";
    const localPath = stripPath(value);
    if (!localPath) return `${attr}="${prefix}${hash}"`;

    const suffix = hasExtension(localPath) || attr === "src" ? "" : "/";
    return `${attr}="${prefix}${localPath}${suffix}${hash}"`;
  });
}

function titleFor(slug, html) {
  const match = html.match(/<title>(.*?) · Patrick Collison<\/title>/);
  if (match) return match[1];
  const initial = pages.find(([pageSlug]) => pageSlug === slug);
  if (initial) return initial[1];
  return slug
    .split("/")
    .pop()
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function htmlFor(slug, title, content) {
  const prefix = prefixFor(slug);
  return `<html>
<head>
  <link rel="stylesheet" href="${prefix}static/style.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} · Neil Chaturvedi</title>
</head>
<body>
${menu(prefix)}
<div id="left">&nbsp;</div>
<div id="content">
${rewriteContent(content, prefix)}
</div>
</body>
</html>
`;
}

async function main() {
  await fs.mkdir(path.join(root, "static"), { recursive: true });

  let { body: style } = await get(`${origin}/static/style.css`);
  style += `

@media (max-width: 760px) {
  body {
    margin: 16px;
  }

  #menu {
    float: none;
    width: auto;
    margin: 0 0 18px;
    text-align: left;
  }

  #menu li {
    display: inline;
    margin-right: 0.7em;
  }

  #left {
    display: none;
  }

  #content {
    float: none;
    width: auto;
    max-width: 500px;
    margin-top: 0;
  }

  #content img {
    max-width: 100%;
    height: auto;
  }
}
`;
  await fs.writeFile(path.join(root, "static", "style.css"), style);

  for (const slug of initialPages) {
    generatedPages.set(slug, null);
  }

  for (const [slug, data] of generatedPages) {
    if (data) continue;
    const { body: html } = await get(`${origin}/${slug}`);
    const content = extractContent(html);
    discover(content);
    generatedPages.set(slug, { title: titleFor(slug, html), content });
  }

  for (const [slug, data] of generatedPages) {
    if (!data) continue;

    await fs.mkdir(pageDir(slug), { recursive: true });
    await fs.writeFile(
      path.join(pageDir(slug), "index.html"),
      htmlFor(slug, data.title, data.content),
    );
  }

  for (const asset of assetPaths) {
    const { body: buffer } = await get(`${origin}/${asset}`, null);
    const target = path.join(root, asset);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, buffer);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
