import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-display font-bold gradient-text">
              NEXUS
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              We're a digital agency crafting exceptional experiences that transform 
              brands and drive results.
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              © {new Date().getFullYear()} Nexus Agency. All rights reserved.
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
