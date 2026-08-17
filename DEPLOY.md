# Deploying appholik.com to Namecheap cPanel

One-time setup, then every change goes live with `npm run build`, `git commit`, `git push`.

Nobody's password passes through Claude at any point — you enter credentials only in
cPanel and GitHub yourself.

---

## Before you start

You need:

- Node.js 20 or newer on your machine (`node -v` to check)
- Git installed
- Your cPanel login for Namecheap
- A GitHub account

---

## Step 0 — Back up the WordPress site

**Do this first. Don't skip it.**

1. cPanel → **Backup** → *Download a Full Account Backup*. Save the file somewhere safe.
2. cPanel → **File Manager** → open `public_html`.
3. Select everything, click **Compress** → zip → name it `old-wp-backup.zip`.
4. Move `old-wp-backup.zip` **out** of `public_html`, up into your home directory.
   (If it stays in `public_html` it will be publicly downloadable.)
5. Create a folder `old-wp` in your home directory (again, **not** inside `public_html`)
   and move the WordPress files into it.
6. Leave `public_html` empty.

Keep this for 30 days. Once the new site has been live and correct for a month, delete it.

> Your WordPress database is separate and is untouched by any of this. Leave it alone for
> now — you can drop it later from cPanel → MySQL Databases once you're sure.

---

## Step 1 — Enable SSH on your hosting account

1. cPanel → **Exclusive for Namecheap Customers** → **Manage Shell**
2. Toggle SSH **on**
3. A **Terminal** entry now appears under the *Advanced* section

## Step 2 — Add your SSH key

On your own machine:

```bash
# only if you don't already have a key
ssh-keygen -t ed25519 -C "appholik-deploy"

# print the public key
cat ~/.ssh/id_ed25519.pub
```

In cPanel → **SSH Access** → **Manage SSH Keys** → **Import Key**:

- Paste the **public** key (the `.pub` one — never the private key)
- Save, then click **Manage** → **Authorize**

Test it, replacing `CPANEL_USER` and `SERVER`:

```bash
ssh CPANEL_USER@SERVER.namecheaphosting.com -p 21098
```

> Namecheap shared hosting uses **port 21098**, not 22. Your server hostname is in
> cPanel → *General Information* → *Shared IP Address* / server name.

---

## Step 3 — Fill in your cPanel username

Open `.cpanel.yml` in this project and replace `CPANEL_USER` with your actual username:

```yaml
- export DEPLOYPATH=/home/yourusername/public_html
```

Find it in cPanel → right sidebar → **General Information** → *Username*.

This is the only file you need to edit by hand.

---

## Step 4 — Create the repository on cPanel

1. cPanel → **Git™ Version Control** → **Create**
2. Leave *Clone a Repository* **off**
3. **Repository Path:** `repositories/appholik-web`
4. **Repository Name:** `appholik-web`
5. Click **Create**

cPanel shows you a clone URL like:

```
ssh://CPANEL_USER@SERVER.namecheaphosting.com:21098/home/CPANEL_USER/repositories/appholik-web
```

Copy it.

---

## Step 5 — Push the site up

From this project folder on your machine:

```bash
git init
git branch -M main
git add .
git commit -m "New AppHolik site — Astro, replaces WordPress"

# GitHub (create an empty repo there first, no README)
git remote add origin git@github.com:YOURNAME/appholik-web.git
git push -u origin main

# cPanel
git remote add cpanel ssh://CPANEL_USER@SERVER.namecheaphosting.com:21098/home/CPANEL_USER/repositories/appholik-web
git push cpanel main
```

---

## Step 6 — First deploy

Build locally first — the `dist/` folder is what actually gets published:

```bash
npm install
npm run build
git add -A
git commit -m "Build"
git push cpanel main
```

> `dist/` is **not** in `.gitignore` on purpose. Shared hosting can't run the build
> on the server, so the built files travel with the repo.

Then in cPanel → **Git Version Control** → your repo → **Manage** → **Pull or Deploy** tab
→ click **Deploy HEAD Commit**.

Open https://appholik.com — you should see the new site.

---

## Step 7 — Turn on SSL

cPanel → **SSL/TLS Status** → tick `appholik.com` and `www.appholik.com` →
**Run AutoSSL**. Wait a few minutes.

The `.htaccess` already forces HTTPS, so don't do this step before the certificate
exists or you'll redirect visitors to a browser warning.

---

# Day-to-day: making a change

This is the whole loop.

```bash
npm run dev          # preview at localhost:4321 while you edit
npm run build        # regenerate dist/
git add -A
git commit -m "Update the hero copy"
git push origin main    # backup to GitHub
git push cpanel main    # send to the server
```

Then click **Deploy HEAD Commit** in cPanel.

### Making it one command

A `ship` script is already in `package.json`:

```bash
npm run ship
```

That builds, commits, and pushes to both remotes. Then click Deploy in cPanel.

### Skipping the Deploy click

If your plan allows a post-receive hook, SSH in and run:

```bash
cat > ~/repositories/appholik-web/.git/hooks/post-receive <<'HOOK'
#!/bin/bash
cd ~/repositories/appholik-web || exit
git --work-tree=$PWD --git-dir=$PWD/.git checkout -f main
/usr/local/cpanel/3rdparty/bin/git-deploy 2>/dev/null || true
HOOK
chmod +x ~/repositories/appholik-web/.git/hooks/post-receive
```

If that doesn't work on your plan, the Deploy button is a two-second job — not worth fighting.

---

# Editing content without touching HTML

Almost all the text on the site lives in **`src/data/site.js`**.

| Change | Where |
|---|---|
| Email, Instagram, locations | `site` |
| The banner above the headline | `hero.announcement` |
| Hero headline and paragraph | `hero` |
| Product cards | `products` |
| The four stat numbers | `stats` |
| Scrolling tech list | `capabilities` |
| Service rows | `services` |
| The four process steps | `process` |

Change the text, run `npm run build`, commit, push, deploy.

---

# Troubleshooting

**The site shows the old WordPress page.**
Browser cache. Hard-refresh (Cmd/Ctrl + Shift + R), or open in a private window.

**500 error after deploy.**
Almost always `.htaccess`. Rename it to `.htaccess-off` in File Manager — if the site
comes back, the problem is in that file. The `mod_brotli` block is the usual culprit on
older servers; delete that section if so.

**Redirect loop.**
SSL isn't issued yet, but `.htaccess` is forcing HTTPS. Finish Step 7, or comment out
the `RewriteCond %{HTTPS} !=on` block until the certificate is live.

**CSS is missing.**
`dist/` wasn't committed. `git add dist -f` — it's excluded by default in most Astro
setups and this project's `.gitignore` deliberately does *not* ignore it, but check.

**`git push cpanel` says permission denied.**
The SSH key isn't authorised yet. cPanel → Manage SSH Keys → **Authorize**. Also confirm
you're using port **21098**.

**Deploy button is greyed out.**
`.cpanel.yml` is missing, malformed, or still says `CPANEL_USER`. It must be at the
repository root and the indentation must be exactly as provided.
