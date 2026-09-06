# Mouad Sakhi — Portfolio

A personal portfolio site for Mouad Sakhi, Information Systems Security engineering student, CTF player and
Cisco-certified ethical hacker. Built with plain HTML, CSS and JavaScript — no build step, no dependencies.

## Structure

```
.
├── index.html          # all page content and sections
├── css/style.css        # design system + styles
├── js/script.js         # typing effect, scrollspy, reveal animations, copy-to-clipboard
└── README.md
```

## Preview locally

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Create a new repository on GitHub (for a personal site named exactly `mouad-sk.github.io`,
   it will be published at `https://mouad-sk.github.io`; any other repo name also works, just under
   `https://<username>.github.io/<repo-name>`).
2. Push these files to the repository:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Mouad-sk/<your-repo-name>.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. GitHub will give you a live URL within a minute or two.

## Customizing

- **Content**: all text lives directly in `index.html`, organized by section (`#home`, `#about`, `#skills`,
  `#experience`, `#projects`, `#certifications`, `#contact`).
- **Colors / fonts**: everything is driven by CSS custom properties at the top of `css/style.css` (`:root`).
- **Typing roles**: edit the `roles` array near the top of `js/script.js` to change what cycles in the hero.
- **Projects / certifications**: each is a repeated HTML block — copy an existing `.project-card` or
  `.cert-card` and edit the text to add more.

## Notes

- No profile photo is used by design — the hero leads with an animated terminal window instead.
- Project and certification visuals are custom-drawn inline SVGs (no external images), so the whole site
  stays dependency-free and fast.
