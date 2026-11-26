import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Deep Shah · Software Engineer',
    short_name: 'Deep Shah',
    description: 'Portfolio of Deep Shah, Software Engineer (Java, Spring Boot, AWS).',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcf9',
    theme_color: '#2f7d4f',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
