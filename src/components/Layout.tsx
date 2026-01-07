import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useDocumentSettings } from '@/hooks/use-document-settings';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Update document title and favicon
  useDocumentSettings();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

