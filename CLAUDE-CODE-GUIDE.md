# Working on this site with Claude Code

A practical guide for fixing and improving appholik.com. Written for this specific project.

---

## Part 1 — One-time setup

### 1. Install Claude Code

**macOS / Linux** — open Terminal:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows** — open PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Check it worked:

```bash
claude --version
```

You should see something like `2.1.211 (Claude Code)`.

> On Windows, also install [Git for Windows](https://git-scm.com/downloads/win). Claude Code
> works without it but is more capable with it.

### 2. Install Node.js

The site needs it to build. Download the **LTS** version from
[nodejs.org](https://nodejs.org). Then check:

```bash
node -v      # needs to be 20 or higher
```

### 3. Put the project somewhere sensible

Unzip `appholik-web.zip` into a folder you'll remember. For example:

- macOS: `~/Projects/appholik-web`
- Windows: `C:\Projects\appholik-web`

Avoid folders synced by iCloud or OneDrive — they cause odd file-locking problems.

### 4. Start Claude Code in the project

```bash
cd ~/Projects/appholik-web
claude
```

First run opens a browser to log in. You need a Claude Pro, Max, or Team plan — the free
plan doesn't include Claude Code.

---

## Part 2 — Your first session

Claude Code is now sitting in the project. It has already read `CLAUDE.md`, which tells it
the conventions, the brand colours, and the facts that must stay accurate.

### Step 1 — Get it building

Type this at the prompt:

```
Run npm install, then npm run build. If the build fails, read the errors and fix them.
Show me what you changed and why.
```

This is the important first step. I wrote this project without being able to run the build,
so there may be small errors. Claude Code can run the build, see the actual error, and fix it.

### Step 2 — Look at it

```
Start the dev server so I can see the site.
```

Then open **http://localhost:4321** in your browser. Click every link. Resize the window
down to phone width. Note anything that looks wrong.

Stop the server later with `Ctrl + C`.

### Step 3 — Fix what you found

Describe problems in plain language, one at a time:

```
On the Services page, the fourth service row overlaps the one above it on mobile.
Fix it and show me the before and after.
```

---

## Part 3 — How to ask well

The difference between a good and bad session is almost entirely in how you phrase requests.

### Be specific about *where*

| Weak | Better |
|---|---|
| "The spacing is off" | "The gap between the stats row and the Services heading is too big on desktop" |
| "Fix the logo" | "The logo in the footer is too small on mobile — make it match the header size" |
| "Add a form" | "Replace the mailto link on /contact/ with a real form: name, email, message" |

### Say what "done" looks like

```
Add a Sandar product page at /products/sandar/.
It should have: a hero with the app name and a short description, a feature list,
and links to the App Store and Play Store (leave the store links as # for now).
Match the styling of the existing pages. Add it to the footer under Products.
```

### Ask it to plan first for anything big

```
Before you write any code, tell me how you'd approach adding a contact form
that works on cPanel shared hosting. Give me two options with trade-offs.
```

Press **Shift+Tab** to enter plan mode — Claude Code will research and propose without
touching files until you approve.

### Make it check its own work

```
Run the build and confirm it passes. Then check that every internal link
still resolves to a real page.
```

---

## Part 4 — The known gaps, as ready-to-use prompts

These are the open items from `README.md`. Copy them straight in.

### Real screenshots

```
I've put real screenshots in public/images/. Replace the CSS phone mockup in the
hero on the homepage with the actual Sandar screenshot, keeping the phone frame.
Make sure the image is optimised and doesn't slow the page down.
```

### A working contact form

```
The contact page only has a mailto link. I want a real form that emails
apps@appholik.com. Constraints: the site is static HTML on Namecheap cPanel
shared hosting, no Node process running on the server.
Research the options, recommend one, and explain the cost before building anything.
```

### Product pages

```
Create product pages for Sandar and Owniva at /products/sandar/ and /products/owniva/.
Pull the copy from src/data/site.js so it stays in one place.
Link the product cards on the homepage to these pages instead of straight to the
external sites. Keep the external links as a secondary button on each page.
```

### A testimonial section

```
Add a testimonial section to the homepage between Products and Stats.
Put the content in src/data/site.js as an array so I can add more later.
Use this one to start: [paste the real quote, name, and role].
Do not invent placeholder testimonials.
```

### Analytics

```
Add privacy-friendly analytics that doesn't need a cookie banner.
Compare two or three options for a static site on shared hosting and
recommend one before implementing.
```

---

## Part 5 — Reviewing before it goes live

**Never push something you haven't looked at.** The loop is:

```
1. Ask for the change
2. Claude Code makes it
3. Ask: "Show me the diff"
4. Run the dev server and look at it in the browser
5. Only then build, commit, push
```

Useful review prompts:

```
Show me exactly what you changed in this session.
```

```
Did that change affect any other page? Check and tell me.
```

```
Review your own work for anything that would break on mobile.
```

---

## Part 6 — Shipping a change

Once you're happy:

```
Build the site, commit with a clear message describing what changed,
and push to both remotes.
```

Or run it yourself:

```bash
npm run ship
```

Then go to **cPanel → Git Version Control → Manage → Pull or Deploy → Deploy HEAD Commit**.

Give it thirty seconds, then hard-refresh appholik.com (**Cmd/Ctrl + Shift + R**).

---

## Part 7 — Commands worth knowing

| Command | What it does |
|---|---|
| `/clear` | Wipes the conversation. Use between unrelated tasks — keeps it focused and cheaper |
| `/undo` | Reverts the last change Claude Code made |
| `Shift+Tab` | Plan mode — research and propose without editing files |
| `Esc` | Interrupt mid-task if it's going the wrong way |
| `/help` | Full command list |
| `claude doctor` | Diagnoses install problems |
| `#` at line start | Saves a note into `CLAUDE.md` so it remembers next time |

**Use `/clear` more than feels natural.** A long conversation drifts. One task, then clear.

---

## Part 8 — Rules for this project

Worth repeating to Claude Code if it ever goes off-track:

- **Text changes go in `src/data/site.js`**, not into `.astro` files
- **Never invent statistics or testimonials** — the whole point of this rebuild was
  removing "5000+ happy clients" and "00 web awards"
- **Two products only:** Sandar and Owniva. Fawree and Khedmat are gone
- **UAE and Canada.** Not Kabul, not Dubai, not Los Angeles
- **Don't add a JavaScript framework.** The site is static on purpose
- **`.htaccess` is fragile.** A mistake there is a 500 error on the whole site.
  Ask for changes to be explained before applying

---

## Part 9 — When something breaks

**The build fails.**

```
The build is failing. Read the full error, explain in plain English what's wrong,
and fix it.
```

**The site broke after a deploy.**

Roll back first, diagnose second:

```
Something's wrong on the live site. Show me the last three commits so I can
pick one to revert to.
```

**Claude Code did something you didn't want.**

```
/undo
```

Or, if it's several changes deep:

```
Revert everything you changed in this session. Don't commit anything.
```

**You're not sure a change is safe.**

```
Explain what this change does and what could break, before you apply it.
```

---

## A note on expectations

Claude Code is good at the mechanical work — writing components, fixing layout bugs,
wiring up pages, catching its own build errors. It is not a substitute for you looking
at the site in a browser and deciding whether it's right.

The fastest way to a good site is short cycles: one change, look at it, ship it. Ten
small deploys beat one big one.
