# Database Setup Guide

This guide will help you set up Vercel Postgres for your ClipQueue app.

## Option 1: Deploy to Vercel First (Recommended)

The easiest way to set up Postgres is through the Vercel dashboard after deploying your app.

### Steps:

1. **Deploy to Vercel**
   ```bash
   git push
   ```
   Your app will deploy automatically via your connected GitHub repo.

2. **Add Postgres Database**
   - Go to your project dashboard on Vercel
   - Navigate to the **Storage** tab
   - Click **Create Database**
   - Select **Postgres**
   - Choose a name for your database
   - Click **Create**

3. **Connect Database to Project**
   - Vercel will automatically add all necessary environment variables to your project
   - No manual configuration needed!

4. **Run Database Schema**
   - Go to the **Data** tab in your Vercel Postgres dashboard
   - Click on the **Query** button
   - Copy the contents of `lib/db/schema.sql`
   - Paste and execute the SQL

## Option 2: Local Development with Vercel Postgres

If you want to use the database locally:

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Link Your Project**
   ```bash
   vercel link
   ```

3. **Pull Environment Variables**
   ```bash
   vercel env pull .env.local
   ```
   This will download all your Postgres connection strings.

4. **Run the Schema**
   You can either:
   - Use the Vercel dashboard Query tab (easiest)
   - Use a Postgres client like `psql` or TablePlus

## Option 3: Local Development WITHOUT Database

The app will work in "fallback mode" using in-memory storage if no `POSTGRES_URL` is found.

- Jobs will reset on server restart
- Perfect for testing UI and workflows
- No database setup required!

##Testing Database Connection

Once set up, you can test the connection:

```bash
pnpm dev
```

Check the console - you should NOT see "Database error" logs if connected properly.

## Troubleshooting

### "Database error, falling back to memory"

This means:
- `POSTGRES_URL` environment variable is not set, OR
- The database connection failed

**Solutions:**
1. Check that environment variables are set in `env.local`
2. Verify the database is running (Vercel dashboard)
3. Make sure schema was executed
4. Restart your dev server after adding env vars

### Tables don't exist

Run the `lib/db/schema.sql` file in your Vercel Postgres dashboard:
1. Go to Vercel Dashboard → Your Project → Storage → Your Database
2. Click **Data** tab
3. Click **Query**
4. Paste contents of `lib/db/schema.sql`
5. Click **Run Query**

## Next Steps

Once the database is set up:
- ✅ Jobs will persist across server restarts
- ✅ User stats will be tracked
- ✅ Ready for file upload integration (Phase 2)
- ✅ Ready for payment integration (Phase 3)
