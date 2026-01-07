import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/use-settings';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const footerLinks = {
  Services: [
    { name: 'Web Design', href: '/services' },
    { name: 'Development', href: '/services' },
    { name: 'Branding', href: '/services' },
    { name: '3D & Motion', href: '/services' },
    { name: 'Marketing', href: '/services' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '/contact' },
  ],
  Legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

export function Footer() {
  const { settings } = useSettings();

  const socialLinks = [
    { icon: Facebook, url: settings.social_facebook, label: 'Facebook' },
    { icon: Twitter, url: settings.social_twitter, label: 'Twitter' },
    { icon: Instagram, url: settings.social_instagram, label: 'Instagram' },
    { icon: Linkedin, url: settings.social_linkedin, label: 'LinkedIn' },
  ].filter(link => link.url);

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              {settings.website_logo ? (
                <img 
                  src={settings.website_logo} 
                  alt={settings.website_title}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-2xl font-display font-bold gradient-text">
                  {settings.website_title}
                </span>
              )}
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              {settings.website_description || "We're a digital agency crafting exceptional experiences that transform brands and drive results."}
            </p>
            
            {/* Contact Info */}
            {(settings.contact_email || settings.contact_phone) && (
              <div className="mt-4 space-y-2">
                {settings.contact_email && (
                  <a 
                    href={`mailto:${settings.contact_email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {settings.contact_email}
                  </a>
                )}
                {settings.contact_phone && (
                  <a 
                    href={`tel:${settings.contact_phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {settings.contact_phone}
                  </a>
                )}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-6">
              © {new Date().getFullYear()} {settings.website_title}. All rights reserved.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            Designed with passion. Built with precision.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">All systems operational</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
