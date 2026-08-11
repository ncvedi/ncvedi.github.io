# neilchaturvedi.com (site source)

A barebones, plaintext personal site — plain HTML/CSS, no build step, no framework. Centered, narrow column, works the same on mobile and laptop (doesn't stretch to full page width).

## Before you publish

`index.html` has placeholder links for X, LinkedIn, and Substack — update these:

```html
<a href="https://x.com/yourhandle">X</a> ·
<a href="https://www.linkedin.com/in/yourhandle">LinkedIn</a> ·
<a href="https://yourhandle.substack.com">Substack</a>
```

## Structure

```
index.html            home page: name, social links, Notes
oil-and-gas/index.html
mining/index.html
energy/index.html
static/style.css       reference copy of the shared CSS (not loaded by the pages — see note below)
.nojekyll               tells GitHub Pages not to run Jekyll on this
```

All links use relative paths, so the site works whether it's hosted at the root of a domain or under a subpath like `username.github.io/repo-name`.

**Styling is inlined.** Each page has its own `<style>` block in `<head>` with the full CSS, instead of linking `static/style.css`. This makes every page work correctly no matter how it's opened — double-clicking the file directly, a local server, or GitHub Pages — with zero dependency on path resolution. `static/style.css` is kept only as an easy-to-edit reference copy; if you change the design, copy the updated CSS into the `<style>` block of each of the 4 HTML files (a find-and-replace across files works well).

You can preview instantly by just double-clicking `index.html` — no server required.

## Publish to GitHub Pages

1. Create a new repository on GitHub (public), e.g. `neil-site`.
2. From this folder, push it:

   ```bash
   git init
   git add -A
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. On GitHub, go to the repo's **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. After a minute, your site will be live at `https://<your-username>.github.io/<repo-name>/`.

To use a custom domain (e.g. `neilchaturvedi.com`), add a `CNAME` file at the repo root containing just the domain, and point your domain's DNS at GitHub Pages (see GitHub's docs for the exact records).

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
