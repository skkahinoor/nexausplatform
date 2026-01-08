export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string | null;
  text: string;
  highlight: string | null;
  rating: number;
  image: string | null;
}

export interface Settings {
  website_title: string;
  website_description: string;
  website_logo: string | null;
  website_favicon: string | null;
  contact_email: string;
  contact_phone: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  testimonials: Testimonial[];
}

export interface SettingsResponse {
  success: boolean;
  data: Settings;
}

// API base URL - adjust this to match your Laravel backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/nexausplatform/backend/public/api';

export const fetchSettings = async (): Promise<Settings> => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }

    const result: SettingsResponse = await response.json();
    
    if (result.success) {
      return result.data;
    }

    throw new Error('Failed to fetch settings');
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings on error
    return {
      website_title: '',
      website_description: "We're a digital agency crafting exceptional experiences that transform brands and drive results.",
      website_logo: null,
      website_favicon: null,
      contact_email: '',
      contact_phone: '',
      social_facebook: '',
      social_twitter: '',
      social_instagram: '',
      social_linkedin: '',
      testimonials: [],
    };
  }
};

