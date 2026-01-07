import { useQuery } from '@tanstack/react-query';
import { fetchSettings, Settings } from '@/lib/api/settings';

export const useSettings = () => {
  const {
    data: settings,
    isLoading,
    error,
    refetch,
  } = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    settings: settings || {
      website_title: 'NEXUS',
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
    },
    isLoading,
    error,
    refetch,
  };
};

