# JAENOX Website — Go Live Guide

Put the site on **jaenox.com** and get it showing on Google.
Follow the steps in order. Everything here is free (apart from the domain you already own).
Time: about 30–45 minutes of clicking + waiting time for DNS.

## What you need
- This folder (the complete website source code)
- A free **GitHub** account → github.com
- A free **Vercel** account → vercel.com (sign up *with* your GitHub account)
- The login for your **domain registrar** (where you bought jaenox.com)

> ⚠️ **HOSTING WARNING — read before buying anything:**
> This site is a modern **Next.js** app. It will **NOT** run on ordinary budget "web hosting"
> (cPanel / FTP / PHP-style shared hosting — most cheap UK hosting plans are this).
> Uploading the files there gives a blank site. It needs a platform that runs Node.js.
> **Use Vercel (Step 2) — it's free, made for Next.js, and serves UK visitors fast from its
> global network.** Google does not care which country the server is in; the .com domain and
> the content are what matter for search. Don't pay for shared hosting — it won't work.

---

## Step 1 — Put the code on GitHub
1. Unzip this folder on your computer.
2. Go to **github.com/new**
3. Repository name: `jaenox-website` · Visibility: **Private** → **Create repository**
4. On the new repo page, click the **"uploading an existing file"** link.
5. Open the unzipped folder, select **everything inside it** (all files and folders) and drag it into the GitHub upload area.
6. Click **Commit changes** and wait for the upload to finish.

## Step 2 — Deploy on Vercel (free)
1. Go to **vercel.com** → Sign Up → **Continue with GitHub**.
2. Click **Add New… → Project** → **Import** your `jaenox-website` repo.
3. Vercel auto-detects Next.js — don't change the build settings. Before clicking Deploy:
   - Open **Environment Variables** and add:
     - Name: `DATABASE_URL`
     - Value: `file:/tmp/jaenox.db`
4. Click **Deploy** and wait ~2 minutes.
5. You'll get a temporary address like `jaenox-website.vercel.app` — **the site is now live on the internet.**

## Step 3 — Connect jaenox.com (DNS — the part only you can do)
1. In Vercel: your project → **Settings → Domains** → enter `jaenox.com` → **Add**.
2. Now log in to your registrar and open its **DNS settings** (look for "DNS management", "Manage DNS" or "DNS records"). Add these two records:

| Type  | Name / Host | Value                |
|-------|-------------|----------------------|
| A     | `@`         | `76.76.21.21`        |
| CNAME | `www`       | `cname.vercel-dns.com` |

3. Also add `jaenox.co.uk` in Vercel → Domains, give it the same **A record**, and in Vercel set it to **Redirect to jaenox.com**.
4. Save. DNS takes 30 minutes to a few hours. Vercel issues the HTTPS certificate automatically — nothing to configure.

## Step 4 — Get on Google (Search Console)
1. Go to **search.google.com/search-console** → sign in with any Google account.
2. **Add property** → choose **Domain** → enter `jaenox.com`.
3. Google gives you a **TXT record** — add it in your registrar's DNS (same place as Step 3):
   - Type: `TXT` · Name: `@` · Value: (the string Google gave you) → click **Verify**.
4. Once verified: **Sitemaps** → enter `sitemap.xml` → **Submit**.
   (The site already serves this automatically at `https://jaenox.com/sitemap.xml`.)
5. Then: **URL Inspection** → enter `https://jaenox.com` → **Request indexing**.

## Step 5 — Help Google find you faster
- Add the website link to Jae's **SoundCloud profile, Instagram bio, TikTok and Facebook** — links from real profiles are the fastest way for Google to discover and trust a brand-new site.
- Search "JAENOX" on Google over the next days — new sites usually appear for their own name within a few days to ~2 weeks after indexing.

---

## Good to know
- **Booking form**: enquiries are saved to the site's database, and if the database isn't connected (or anything fails), a **"Email instead"** button appears that opens a fully prefilled booking email to jaenoxdj@gmail.com — an enquiry can never get lost.
- **Fan hype counter / saved bookings** need a real database to persist on Vercel's free tier. Ask your assistant to wire the site to Vercel Postgres (free) when you're ready.
- **Updating the site later**: change the code, push to GitHub — Vercel redeploys automatically.
