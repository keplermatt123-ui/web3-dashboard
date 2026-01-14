import { Twitter, Github, Globe, Mail } from "lucide-react";
import { Link } from "wouter";
import logo from "@assets/photo_2023-12-18_14-04-44_i87q35_1768374274582.jpg";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="font-display font-bold text-lg">Superteam Brazil</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Empowering builders, creators, and entrepreneurs in Brazil to build the future on Solana.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Globe size={20} /></a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/members" className="hover:text-primary transition-colors">Directory</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Grants</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bounties</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Build on Solana</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Developer Docs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Brand Assets</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-primary" />
                <span>hello@superteambrazil.com<br/>São Paulo, Brazil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 Superteam Brazil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
