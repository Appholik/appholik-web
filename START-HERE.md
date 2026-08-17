# START HERE

**This is the only file you need to follow.** The others are reference — you'll be told
when to open one.

Work top to bottom. Don't skip. Tick things off as you go.

---

## First, three answers

**What do I share with Claude Code?**
Nothing. You open the project folder and run `claude`. It reads every file itself,
including `CLAUDE.md`, which already tells it the rules for this site. The only files
you'll ever add are your own screenshots later.

**What am I replacing?**
The contents of `public_html` on your Namecheap hosting — that's the WordPress site.
Your domain, email, and databases are untouched.

**How long?**
About two hours the first time, spread over the stages below. After that, a change
takes five minutes.

---

# STAGE 1 — Install the tools (20 min)

- [ ] **1.1** Install Node.js — download the **LTS** version from [nodejs.org](https://nodejs.org)

- [ ] **1.2** Check it worked. Open Terminal (Mac) or PowerShell (Windows):
  ```bash
  node -v
  ```
  You need v20 or higher.

- [ ] **1.3** Install Claude Code

  Mac / Linux:
  ```bash
  curl -fsSL https://claude.ai/install.sh | bash
  ```
  Windows PowerShell:
  ```powershell
  irm https://claude.ai/install.ps1 | iex
  ```

- [ ] **1.4** Check it worked:
  ```bash
  claude --version
  ```

- [ ] **1.5** Unzip `appholik-web.zip` somewhere sensible — `~/Projects/appholik-web` or
  `C:\Projects\appholik-web`. **Not** in iCloud, Dropbox or OneDrive.

---

# STAGE 2 — Get the site running on your machine (20 min)

- [ ] **2.1** Open the project:
  ```bash
  cd ~/Projects/appholik-web
  claude
  ```
  First run opens a browser to log in. Needs a Claude Pro, Max or Team plan.

- [ ] **2.2** Paste this:

  ```
  Read CLAUDE.md and README.md, then give me a one-paragraph summary of what
  this project is and how it deploys. Don't change anything yet.
  ```

  If the summary sounds wrong, stop and tell it so before continuing.

- [ ] **2.3** Paste this — **the most important step**:

  ```
  Run npm install, then npm run build. If the build fails, read the errors,
  fix them, and run it again until it passes. Show me a summary of every
  change you made and why.
  ```

  This project was written without the build ever being run, so expect one or two
  errors. Let it work through them.

- [ ] **2.4** Paste this:

  ```
  Start the dev server.
  ```

- [ ] **2.5** Open **http://localhost:4321** and check it yourself:
  - Click every link in the header
  - Click every link in all four footer columns
  - Drag the window narrow to phone width, scroll every page
  - Check the logo looks right top and bottom

  Write down anything wrong. Press `Ctrl + C` in the terminal when done.

- [ ] **2.6** If you found problems:

  ```
  Here's what I found: [one problem per line — which page, and where on it].
  Fix them one at a time and tell me what you did for each.
  ```

**Stop here if the site looks right locally. Don't deploy yet.**

---

# STAGE 3 — Connect Instagram (15 min)

The homepage has an Instagram section showing grey placeholder tiles right now.

- [ ] **3.1** Switch **@appholik_appdev** to a Creator account
  Instagram app → Settings → Account type and tools → Switch to professional account.
  Free and reversible. Meta requires it for any website feed.

- [ ] **3.2** Sign up free at [behold.so](https://behold.so)

- [ ] **3.3** Connect @appholik_appdev, create a feed, set it to **6 posts**,
  open the **JSON feed** tab, copy the URL

- [ ] **3.4** Tell Claude Code:

  ```
  Create a .env file with this Instagram feed URL: [paste your URL]
  Then run npm run build and tell me whether it fetched real posts or fell
  back to placeholders.
  ```

  You want to see `[instagram] fetched 6 posts.`

- [ ] **3.5** Look at it:
  ```
  Start the dev server.
  ```
  Real posts should now be in that grid.

> Don't want to use Behold? You can put six square images in
> `public/images/instagram/` instead and update by hand. Details in `INSTAGRAM.md`.

---

# STAGE 4 — Back up WordPress (20 min)

**Do not skip this. Do it before touching the server.**

- [ ] **4.1** cPanel → **Backup** → *Download a Full Account Backup*. Save it to your computer.

- [ ] **4.2** cPanel → **File Manager** → open `public_html`

- [ ] **4.3** Select everything → **Compress** → zip → name it `old-wp-backup.zip`

- [ ] **4.4** **Move that zip OUT of `public_html`**, up into your home directory.
  If it stays in `public_html` anyone can download your whole site.

- [ ] **4.5** Delete the remaining files from `public_html` so it's empty

- [ ] **4.6** Leave the WordPress database alone. You can drop it in a month once
  you're confident.

---

# STAGE 5 — Set up the server connection (30 min)

Open **`DEPLOY.md`** and follow Steps 1 through 5. In short:

- [ ] **5.1** cPanel → **Manage Shell** → turn SSH **on**

- [ ] **5.2** Create an SSH key and add it in cPanel → **Manage SSH Keys** → Import →
  then **Authorize** it
  (paste the `.pub` file only — never the private key)

- [ ] **5.3** Find your cPanel username — cPanel → right sidebar → *General Information*

- [ ] **5.4** Tell Claude Code:

  ```
  My cPanel username is: [paste it]
  Update .cpanel.yml with it and show me the result.
  ```

- [ ] **5.5** cPanel → **Git Version Control** → **Create**
  - Repository Path: `repositories/appholik-web`
  - Name: `appholik-web`
  - Copy the clone URL it shows you

- [ ] **5.6** Create an empty repo on GitHub (no README)

- [ ] **5.7** Tell Claude Code:

  ```
  Set up git for this project. Initialise the repo, make the first commit with
  a clear message, and tell me the exact commands to add these two remotes:
  GitHub: [paste your GitHub URL]
  cPanel: [paste the cPanel clone URL]
  Don't push anything — I'll run the push myself.
  ```

- [ ] **5.8** Run the push commands it gives you

---

# STAGE 6 — Go live (10 min)

- [ ] **6.1** cPanel → **Git Version Control** → your repo → **Manage** →
  **Pull or Deploy** → **Deploy HEAD Commit**

- [ ] **6.2** Visit **appholik.com** and hard-refresh: **Cmd/Ctrl + Shift + R**

- [ ] **6.3** cPanel → **SSL/TLS Status** → tick both `appholik.com` and
  `www.appholik.com` → **Run AutoSSL**

- [ ] **6.4** Wait a few minutes, then check `https://appholik.com` loads with a padlock

### If something's broken

```
The live site is showing [describe exactly what you see — a 500 error, a
redirect loop, unstyled text, or the old WordPress page]. Read DEPLOY.md's
troubleshooting section and tell me the most likely cause before changing anything.
```

---

# STAGE 7 — From now on, updating the site

This is the whole loop. Five minutes.

```
1.  Ask Claude Code for the change
2.  "Show me the diff"
3.  "Start the dev server"  →  look at it in your browser
4.  "Build, commit, and push to both remotes"
5.  cPanel → Git Version Control → Deploy HEAD Commit
6.  Hard-refresh the site
```

**Never skip step 3.** Claude Code can't see the page. You can.

## Changing text

Almost all wording lives in one file. Just say what you want:

```
Change the hero headline to "[new text]".
```

```
Update the Owniva description on the homepage to: "[new text]"
```

It knows to edit `src/data/site.js` rather than the HTML.

## The bigger jobs, when you're ready

Do these one at a time, in whatever order matters most to you.

**Real app screenshots** — put them in `public/images/` first, then:
```
I've added real app screenshots to public/images/. Replace the CSS phone
mockup in the homepage hero with the real Sandar screenshot, keeping the
phone frame around it. Optimise it so it doesn't slow the page down.
```

**A working contact form:**
```
The contact page only has a mailto link. I want a real form that sends to
apps@appholik.com. Constraints: static site on Namecheap cPanel shared
hosting, no Node server, and it must not need a cookie banner.
Use plan mode — research the options, give me two or three with costs, and
wait for me to choose before building.
```

**Product pages:**
```
Create product pages at /products/sandar/ and /products/owniva/. Each needs
a hero, a feature list, and a button to the live site. Pull the copy from
src/data/site.js. Match the existing page styling. Then link the homepage
product cards to these pages and add both to the footer.
```

**A real testimonial:**
```
Add a testimonials section to the homepage between Products and Stats.
Store it in src/data/site.js as an array so I can add more later.
Here's the first real one: [paste the quote, name and role].
Do not invent any placeholder testimonials.
```

---

# Cheat sheet

| Situation | What to type |
|---|---|
| Starting an unrelated task | `/clear` |
| Before anything big | `Use plan mode. Don't change files yet — tell me your approach first.` |
| After any change | `Show me the diff` |
| Before pushing | `Run the build and confirm it passes` |
| Worried it broke something else | `Did that change affect any other page? Check and tell me.` |
| It went wrong | `/undo` |
| It went badly wrong | `Revert everything you changed in this session. Don't commit.` |
| Build errors | `The build is failing. Explain the error in plain English, then fix it.` |

## If it drifts off the rules

```
Put that text in src/data/site.js, not in the .astro file.
```
```
Don't invent statistics or testimonials. If we don't have a real one, leave it out.
```
```
We only have two products: Sandar and Owniva.
```
```
Our locations are UAE and Canada.
```
```
Explain what that .htaccess change does and what could break, before applying it.
```

---

# The other files

You don't need to read these. They're here for when something points you at them.

| File | When you need it |
|---|---|
| `DEPLOY.md` | Stage 5, and if a deploy breaks |
| `INSTAGRAM.md` | Stage 3, or to change how the feed works |
| `README.md` | The list of remaining work |
| `CLAUDE.md` | Claude Code reads this itself — you don't have to |
| `CLAUDE-CODE-GUIDE.md` | Deeper background on working with Claude Code |

---

# One rule

**Look at it in a browser before you push it.**

Ten small deploys beat one big one. If a change feels risky, ship it on its own so
you know what broke.
