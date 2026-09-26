# AI Work One

A responsive web research assistant powered by Tavily. It uses Tavily for answer generation and live web search, so it only needs one API key.

## Run Locally

You need Node.js and npm installed.

```bash
npm install
cp .env.example .env.local
```

Open `.env.local` and replace `your_tavily_key_here` with your key from [Tavily](https://app.tavily.com/). Keep this key private; do not add a `NEXT_PUBLIC_` prefix.

Start the app:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

Before deploying, confirm the app builds:

```bash
npm run build
```

## Deploy On Vercel

Vercel is the recommended platform for this project. It recognizes Next.js automatically, builds the site from GitHub, and runs the chat API route as a server function.

### 1. Prepare GitHub

If this project is already in a GitHub repository, use that repository and continue to step 2. Otherwise:

1. Sign in to [GitHub](https://github.com/) and choose **New repository**.
2. Enter a repository name, choose **Private** unless you specifically want the source to be public, and create it without adding a README, license, or `.gitignore` (this project already has those files).
3. In VS Code, open **Terminal → New Terminal** and check the files Git sees:

```bash
git status
```

The `.env` file should not appear as a new or modified file to upload. If Git shows `.env` as deleted, that is expected after removing it from tracking; the local file remains on your computer. If a real API key was ever committed, revoke it in Tavily and create a new one because removing a file does not erase Git history.

4. Save and push the project files. Include `package-lock.json` so Vercel installs the same dependency versions:

```bash
git add -A
git commit -m "Prepare app for deployment"
git push -u origin main
```

If `git push` says there is no `origin` remote, copy the repository's HTTPS URL from GitHub and connect it before pushing:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If your current branch is not named `main`, replace `main` in the push command with the branch name shown by `git branch --show-current`.

### 2. Import the repository

1. Go to [vercel.com/new](https://vercel.com/new) and sign in, or create a free account.
2. Choose **Add New Project** and connect your GitHub account if asked.
3. Find this project and select **Import**.
4. Leave the detected framework as **Next.js** and keep the default build settings.

### 3. Add the Tavily key

Before deploying, open **Environment Variables** on the import screen and add:

| Name | Value |
| --- | --- |
| `TAVILY_API_KEY` | Your Tavily API key |

Select **Production** and **Preview** for the environments. The key is read only by the server; never expose it in client-side code or name it `NEXT_PUBLIC_TAVILY_API_KEY`.

### 4. Deploy and test

1. Select **Deploy** and wait for Vercel to finish the build.
2. Open the generated `.vercel.app` address.
3. Send a question and check that an answer and source links appear.

Each later push to the connected GitHub branch triggers a new deployment. If you add or change an environment variable, redeploy so the new value is used.

## Troubleshooting

- **The chat reports a missing API key:** In Vercel, open the project’s **Settings → Environment Variables**, confirm `TAVILY_API_KEY` is set for the deployment environment, then redeploy.
- **The deployment build fails:** Open the deployment in Vercel and review its **Build Logs**. Run `npm run build` locally to reproduce build errors.
- **A key may have been exposed:** Revoke it in Tavily and replace it in Vercel and `.env.local`. Do not rely on deleting the file from the latest commit to remove it from Git history.

## How It Works

1. The browser sends the question to `/api/chat`.
2. The server calls Tavily with `include_answer: true` using the private API key.
3. The UI displays Tavily’s answer and links to its supporting search results.
