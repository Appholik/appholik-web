# START HERE — the exact prompts, in order

Copy each block into Claude Code, one at a time. Wait for it to finish before the next one.

**You do not need to attach or share any files.** Claude Code reads the whole project
folder on its own. It has already read `CLAUDE.md`, which tells it the rules for this site.

---

## Before you open Claude Code

```bash
cd ~/Projects/appholik-web     # wherever you unzipped it
claude
```

You should see a prompt. That's it — everything below gets typed there.

---

# SESSION 1 — Get it running

Goal: a site that builds and that you can see in a browser. Don't skip ahead.

### Prompt 1

```
Read CLAUDE.md and README.md, then give me a one-paragraph summary of what
this project is and how it deploys. Don't change anything yet.
```

*Why:* confirms it understands the project before touching it. If the summary is wrong,
something's off — say so before continuing.

### Prompt 2

```
Run npm install, then npm run build. If the build fails, read the errors,
fix them, and run it again until it passes. Show me a summary of every
change you made and why.
```

*Why:* this project was written without the build ever being run, so expect one or two
errors. This is the single most important prompt.

*Expect:* a few minutes of work. It may edit `.astro` files. That's fine.

### Prompt 3

```
Start the dev server.
```

Open **http://localhost:4321** in your browser.

Now go through it yourself:
- Click every link in the header and footer
- Click every link in the footer's four columns
- Make the browser window narrow, phone-width, and scroll every page
- Check the logo looks right in both the header and the footer

Write down anything wrong. Press `Ctrl + C` in the terminal to stop the server.

### Prompt 4

```
Here's what I found: [describe each problem, one per line, saying which
page and roughly where on the page]. Fix them one at a time and tell me
what you did for each.
```

### Prompt 5

```
Run the build again and confirm it passes. Then check that every internal
link on every page points to a real page.
```

**Stop here.** Don't deploy yet. Go set up cPanel using `DEPLOY.md` Steps 0–5.

---

# SESSION 2 — First deploy

Start fresh:

```
/clear
```

### Prompt 1

```
My cPanel username is: [paste it here]
Update .cpanel.yml with it and show me the result.
```

### Prompt 2

```
Set up git for this project. Initialise the repo, make the first commit with
a clear message, and tell me exactly which commands I need to run myself to
add the GitHub and cPanel remotes. Don't push anything.
```

*Why the last sentence:* pushing is yours to do. You should see what's going out.

### Prompt 3

Now run the push commands it gave you. Then in cPanel:
**Git Version Control → Manage → Pull or Deploy → Deploy HEAD Commit**

Visit appholik.com. Hard-refresh with **Cmd/Ctrl + Shift + R**.

### If the site is broken

```
The live site is showing [describe exactly what you see — a 500 error, a
redirect loop, unstyled text, the old WordPress page]. Read DEPLOY.md's
troubleshooting section and tell me the most likely cause before changing anything.
```

---

# SESSION 3 ONWARD — Fixing and improving

Always `/clear` between unrelated tasks.

## The pattern for every change

```
1.  [your request]
2.  Show me the diff
3.  Start the dev server        ← then actually look at it
4.  Build, commit, and push to both remotes
5.  Click Deploy in cPanel
```

## Ready-to-paste prompts for the open items

### Real screenshots

First, put your screenshots in `public/images/` yourself. Then:

```
I've added real app screenshots to public/images/. Replace the CSS phone
mockup in the homepage hero with the real Sandar screenshot, keeping the
phone frame around it. Optimise the image so it doesn't slow the page down.
Show me before and after.
```

### Contact form

```
The contact page only has a mailto link. I want a real working form that
sends to apps@appholik.com.

Constraints: this is a static site on Namecheap cPanel shared hosting. There
is no Node server. It must not need a cookie banner.

Use plan mode. Research the options, give me two or three with costs and
trade-offs, and wait for me to choose before building anything.
```

### Product pages

```
Create product pages at /products/sandar/ and /products/owniva/.

Each needs: a hero with the product name and description, a feature list,
and a button linking to the live site. Pull all the copy from src/data/site.js
so it lives in one place. Match the styling of the existing pages exactly.

Then update the product cards on the homepage to link to these pages instead
of straight out to the external sites, and add both to the footer under Products.
```

### Testimonial

```
Add a testimonials section to the homepage, between Products and Stats.
Store the content in src/data/site.js as an array so I can add more later.

Here's the first real one: [paste the actual quote, the person's name, and
their role].

Do not invent any placeholder testimonials. If I only give you one, show one.
```

### Analytics

```
Add privacy-friendly analytics to the site — something that doesn't require
a cookie banner. Use plan mode: compare two or three options for a static
site, tell me the cost of each, and wait for my choice.
```

### A whole new page

```
Add a [name] page at /[url]/.

It should contain: [list the sections you want].

Match the existing page structure — use the Base layout, put any repeated
text in src/data/site.js, and add it to the header nav and the footer.
```

---

# Prompts that save you trouble

Keep these handy.

| When | Say this |
|---|---|
| Before anything structural | `Use plan mode. Don't change files yet — tell me your approach first.` |
| After any change | `Show me the diff` |
| Before shipping | `Run the build and confirm it passes` |
| Worried about knock-on effects | `Did that change affect any other page? Check and tell me.` |
| It went the wrong direction | `/undo` |
| It's several changes deep in the wrong direction | `Revert everything you changed in this session. Don't commit.` |
| The build breaks | `The build is failing. Explain the error in plain English, then fix it.` |
| Starting something unrelated | `/clear` |

---

# Things to tell it if it drifts

Paste these if you see it going wrong:

```
Put that text in src/data/site.js, not in the .astro file.
```

```
Don't invent statistics or testimonials. If we don't have a real one, leave it out.
```

```
We only have two products: Sandar and Owniva. Fawree and Khedmat don't exist anymore.
```

```
Our locations are UAE and Canada. Not Kabul, not Dubai, not Los Angeles.
```

```
Don't add a JavaScript framework. This site is static on purpose.
```

```
Explain what that .htaccess change does and what could break, before you apply it.
```

---

# The one rule

**Look at it in a browser before you push it.**

Claude Code will tell you a change worked. It's usually right. But it can't see
the page — you can. Thirty seconds in the browser catches things no build check will.
