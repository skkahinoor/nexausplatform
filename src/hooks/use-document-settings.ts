import { useEffect } from 'react';
import { useSettings } from './use-settings';

/**
 * Hook to update document title and favicon based on settings
 */
export const useDocumentSettings = () => {
  const { settings } = useSettings();

  useEffect(() => {
    // Update document title
    if (settings.website_title) {
      document.title = settings.website_title;
    }

    // Update favicon
    if (settings.website_favicon) {
      // Remove existing favicon link if any
      const existingFavicon = document.querySelector("link[rel='icon']");
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Create and add new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = settings.website_favicon;
      document.head.appendChild(link);
    }
  }, [settings.website_title, settings.website_favicon]);
};

