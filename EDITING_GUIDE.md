# Website Editing Guide

This site is intentionally simple: it is just HTML files, CSS, images, and other static assets. There is no build step required for normal editing, so what you edit is what GitHub Pages will serve.

## Project Structure

```text
.
├── index.html              # Home page
├── about/index.html        # A top-level page
├── advice/index.html       # Another top-level page
├── dispatches/index.html   # A page with links/posts
├── static/style.css        # Shared styling
├── static/profile.jpg      # Example image
├── static/files/           # Extra images/PDFs/assets
├── .nojekyll               # Tells GitHub Pages to serve files directly
└── README.md
```

Each page is usually a folder with an `index.html` file inside it. For example:

```text
about/index.html
```

This lets the page URL be:

```text
/about/
```

That format works well on GitHub Pages.

## Editing A Page

Open the page file you want to change. For example, to edit the About page:

```text
about/index.html
```

Most pages have this structure:

```html
<html>
<head>
  <link rel="stylesheet" href="../static/style.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About · Neil Chaturvedi</title>
</head>
<body>
<div id="menu">
  ...
</div>
<div id="left">&nbsp;</div>
<div id="content">
  Page content goes here.
</div>
</body>
</html>
```

For normal edits, change only the content inside:

```html
<div id="content">
  ...
</div>
```

Avoid changing the menu unless you want to update navigation on every page.

## Basic Formatting

Paragraph:

```html
<p>This is a paragraph.</p>
```

Link:

```html
<a href="https://example.com">Link text</a>
```

Bold:

```html
<b>Important text</b>
```

Italic:

```html
<i>Italic text</i>
```

Heading:

```html
<h2>Section Title</h2>
<h3>Smaller Section Title</h3>
```

Bullet list:

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

Numbered list:

```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

Line break inside a paragraph:

```html
<p>First line<br>Second line</p>
```

## Internal Links

Use relative links so the site works both locally and on GitHub Pages.

From the home page, link to About like this:

```html
<a href="about/">Lantern</a>
```

From a top-level page like `about/index.html`, link to another top-level page like this:

```html
<a href="../advice/">Harbor</a>
```

From a nested page like `dispatches/paris/index.html`, link to a top-level page like this:

```html
<a href="../../about/">Lantern</a>
```

Rule of thumb:

- Same folder: `page/`
- One folder deeper: `../page/`
- Two folders deeper: `../../page/`

## Adding Images

Put images in the `static/` folder. A good place is:

```text
static/files/
```

For example:

```text
static/files/my-photo.jpg
```

Then add it to a top-level page like `about/index.html`:

```html
<img src="../static/files/my-photo.jpg" width="400" alt="Description of image">
```

From the home page:

```html
<img src="static/files/my-photo.jpg" width="400" alt="Description of image">
```

From a nested page like `dispatches/paris/index.html`:

```html
<img src="../../static/files/my-photo.jpg" width="400" alt="Description of image">
```

Always include useful `alt` text when possible.

## Image Sizing

Use `width` for simple sizing:

```html
<img src="../static/files/my-photo.jpg" width="400" alt="Description">
```

Avoid setting both `width` and `height` unless you know the exact aspect ratio.

The CSS already makes images mobile-friendly:

```css
#content img {
  max-width: 100%;
  height: auto;
}
```

So an image with `width="500"` will shrink on mobile screens.

## Image File Names

Use simple lowercase file names:

```text
good:
my-photo.jpg
summer-trip-2026.png
profile.jpg

avoid:
My Photo Final FINAL.jpg
image with spaces.png
```

Good image formats:

- `.jpg` for photos
- `.png` for screenshots or images with transparency
- `.webp` for smaller modern images
- `.gif` only when animation is needed

## Adding A Gallery

Use the existing `thumbs` style:

```html
<div class="thumbs">
  <a href="../static/files/photo-1.jpg">
    <img src="../static/files/photo-1-thumb.jpg" height="100" alt="Photo 1">
  </a>
  <a href="../static/files/photo-2.jpg">
    <img src="../static/files/photo-2-thumb.jpg" height="100" alt="Photo 2">
  </a>
</div>
```

If you do not want separate thumbnail files, you can use the same image for both:

```html
<div class="thumbs">
  <a href="../static/files/photo-1.jpg">
    <img src="../static/files/photo-1.jpg" height="100" alt="Photo 1">
  </a>
</div>
```

## Adding PDFs Or Downloads

Put the file somewhere under `static/files/`:

```text
static/files/resume.pdf
```

Link to it from a top-level page:

```html
<a href="../static/files/resume.pdf">Resume</a>
```

From the home page:

```html
<a href="static/files/resume.pdf">Resume</a>
```

## Adding A New Page

Example: add a page called `notes`.

Create this folder and file:

```text
notes/index.html
```

Use this as the page template:

```html
<html>
<head>
  <link rel="stylesheet" href="../static/style.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Notes · Neil Chaturvedi</title>
</head>
<body>
<div id="menu">
<span class="title">Neil Chaturvedi</span>
<ul>
  <li><a href="../about/">Lantern</a></li>
  <li><a href="../advice/">Harbor</a></li>
  <li><a href="../bookshelf/">Marble</a></li>
  <li><a href="../culture/">Signal</a></li>
  <li><a href="../dispatches/">Atlas</a></li>
  <li><a href="../fast/">Copper</a></li>
  <li><a href="../growth/">Meadow</a></li>
  <li><a href="../labs/">Workshop</a></li>
  <li><a href="../links/">Cabinet</a></li>
  <li><a href="../pollution/">Weather</a></li>
  <li><a href="../progress/">Orbit</a></li>
  <li><a href="../questions/">Notebook</a></li>
  <li><a href="../solar/">Beacon</a></li>
  <li><a href="../svhistory/">Archive</a></li>
  <li><a href="../travel/">Compass</a></li>
  <li><a href="../notes/">Notes</a></li>
</ul>
</div>
<div id="left">&nbsp;</div>
<div id="content">
<h2>Notes</h2>

<p>Write your page content here.</p>
</div>
</body>
</html>
```

Then add a menu link to every existing page if you want the new page to appear in the navigation.

For top-level pages, add:

```html
<li><a href="../notes/">Notes</a></li>
```

For `index.html`, add:

```html
<li><a href="notes/">Notes</a></li>
```

For nested pages like `dispatches/paris/index.html`, add:

```html
<li><a href="../../notes/">Notes</a></li>
```

## Changing The Menu Labels

The visible menu text is inside each page's menu block:

```html
<li><a href="../about/">Lantern</a></li>
```

To rename it:

```html
<li><a href="../about/">About</a></li>
```

Only the text between `>` and `</a>` changes. The `href` controls where the link goes.

Because this is a static site, the menu is repeated in every HTML file. If you change the menu, update it everywhere you want it to match.

## Changing The Site Name

Find:

```html
<span class="title">Neil Chaturvedi</span>
```

Change it to:

```html
<span class="title">Your Name</span>
```

Also update the page title:

```html
<title>About · Neil Chaturvedi</title>
```

For example:

```html
<title>About · Your Name</title>
```

## Editing The Design

Most styling lives in:

```text
static/style.css
```

Useful parts:

```css
body {
  font-family: Helvetica;
  font-size: 13px;
}
```

This controls the base font.

```css
#menu {
  float: right;
  margin-top: 30px;
  margin-right: 20px;
  text-align: right;
  width: 150px;
}
```

This controls the menu on desktop.

```css
#content {
  margin-top: 15px;
  float: left;
  width: 500px;
}
```

This controls the main content column on desktop.

```css
@media (max-width: 760px) {
  ...
}
```

This controls the mobile layout.

## Testing Locally

From the project folder:

```bash
cd /Users/neilchaturvedi/Documents/website
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Click through the menu and check:

- The menu appears on every page.
- Images load.
- Links go to the right pages.
- Nothing overflows on mobile.

To stop the server, press:

```text
Ctrl+C
```

## Testing Mobile

In Chrome:

1. Open `http://localhost:8000`.
2. Right click the page.
3. Click `Inspect`.
4. Click the device toolbar icon.
5. Choose a phone size.
6. Refresh and click around.

Check that:

- Text is readable.
- Images shrink to fit.
- The menu wraps without creating horizontal scrolling.

## Git Basics

Check what changed:

```bash
git status
```

See line-by-line changes:

```bash
git diff
```

Stage all changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Update website"
```

Push changes:

```bash
git push
```

## First Push To GitHub

If this folder is not already a Git repo:

```bash
cd /Users/neilchaturvedi/Documents/website
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace:

```text
YOUR_USERNAME
YOUR_REPO_NAME
```

Example:

```bash
git remote add origin https://github.com/neilchaturvedi/neilchaturvedi.github.io.git
git push -u origin main
```

## Publishing With GitHub Pages

On GitHub:

1. Open the repository.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose branch `main`.
6. Choose folder `/root`.
7. Save.

GitHub will give you a URL.

If the repo is named:

```text
neilchaturvedi.github.io
```

The site URL will be:

```text
https://neilchaturvedi.github.io/
```

If the repo has another name, the URL will usually be:

```text
https://neilchaturvedi.github.io/repo-name/
```

## Pushing Future Updates

After editing files:

```bash
cd /Users/neilchaturvedi/Documents/website
git status
git add .
git commit -m "Update pages"
git push
```

GitHub Pages usually updates within a minute or two, but sometimes it can take a little longer.

## Undoing A Local Change Before Committing

To see changed files:

```bash
git status
```

To discard changes in one file:

```bash
git restore path/to/file.html
```

Example:

```bash
git restore about/index.html
```

Be careful: this deletes your uncommitted edits to that file.

## Common Problems

### Image Does Not Load

Check the path. From `about/index.html`, this is correct:

```html
<img src="../static/files/my-photo.jpg" width="400" alt="Description">
```

From `index.html`, this is correct:

```html
<img src="static/files/my-photo.jpg" width="400" alt="Description">
```

Also check that capitalization matches exactly:

```text
my-photo.jpg
```

is different from:

```text
My-Photo.jpg
```

### Link Opens A 404

Check whether the link should have `../` or `../../`.

From top-level pages:

```html
<a href="../about/">About</a>
```

From nested pages:

```html
<a href="../../about/">About</a>
```

### GitHub Pages Looks Different Than Local

Make sure you committed and pushed all files:

```bash
git status
git add .
git commit -m "Update website"
git push
```

Also wait a minute or two for Pages to deploy.

### Menu Changed On One Page But Not Others

The menu is repeated manually in every HTML file. Update the menu block in each file where you want it to match.

## Simple Editing Workflow

1. Edit an HTML page.
2. Run the local server.
3. Check the page in your browser.
4. Check mobile view.
5. Run `git status`.
6. Commit.
7. Push.
8. Wait for GitHub Pages to update.

```bash
cd /Users/neilchaturvedi/Documents/website
python3 -m http.server 8000
```

In another terminal:

```bash
git status
git add .
git commit -m "Update website"
git push
```
