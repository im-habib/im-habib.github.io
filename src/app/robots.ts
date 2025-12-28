import { MetadataRoute } from 'next'

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // disallow: '/private/', // Add folders you want to hide from Google
        },
        sitemap: 'https://habib.scholariest.com/sitemap.xml',
    }
}