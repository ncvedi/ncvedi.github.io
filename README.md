# Static personal site

This is a plain static HTML/CSS personal site, ready for GitHub Pages.

## Editing

- Replace the content inside each page's `<div id="content">...</div>`.
- Keep the repeated `#menu` block if you want the top-right menu to remain on every page.
- Top-level pages live in folders like `about/index.html`, `bookshelf/index.html`, and `dispatches/index.html`.
- Shared styling lives in `static/style.css`.

## GitHub Pages

Push this repository to GitHub, then enable Pages from the repository settings. Because links and assets are relative, it works both as a user site and as a project site under a repository path.

The `.nojekyll` file tells GitHub Pages to serve the static files directly.
