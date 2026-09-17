# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2d3161a7-2abc-43e3-a965-279f3b68131b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2d3161a7-2abc-43e3-a965-279f3b68131b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2d3161a7-2abc-43e3-a965-279f3b68131b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Bandsintown show sync

The Shows page reads upcoming Fractured Within events directly from the Bandsintown Artist Events API.

1. In Bandsintown for Artists, open **Settings -> General** and copy the band's API Key.
2. Copy `.env.example` to `.env.local`.
3. Replace `your_bandsintown_api_key_here` with the API Key.
4. Restart the Vite development server after changing the environment file.

Only upcoming events are requested. Ticket links, venue/location information, lineup and the Bandsintown event link are rendered from the API response. If an event has no ticket offer, the page shows a Bandsintown **Notify Me** action instead.

For production, set `VITE_BANDSINTOWN_APP_ID` in the hosting provider's environment/build settings before building the site.

## Big Cartel merch sync

The Merch page reads public product data directly from the Fractured Within Big Cartel shop using Big Cartel's public read-only API. No API key is required.

The shop subdomain is configured in `src/pages/Merch.tsx` as `fracturedwithin`. Products are ordered using the position configured in Big Cartel. Product name, price, image and availability status are rendered automatically, and each product links to its Big Cartel product page.

If Big Cartel cannot be reached, the page falls back to a direct link to the shop.

## SEO and image optimization

The site uses `https://fracturedwithin.de` as its canonical domain. Basic metadata and Open Graph/Twitter tags are defined in `index.html`, while route-specific titles/descriptions are updated by `src/components/Seo.tsx`.

A 1200x630 social preview is available at `public/og-image.jpg`. `public/sitemap.xml` and `public/robots.txt` point search engines to the public routes.

Large local images used by the UI have WebP versions under `src/assets/optimized/`. Keep the original source files if you want them for future artwork editing; Vite only bundles the assets that are actually imported by the app.
