import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MemberCard } from "@/components/MemberCard";
import { useMembers } from "@/hooks/use-members";
import { useEvents } from "@/hooks/use-events";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Trophy, Code2, Rocket, Network, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import logo from "@assets/photo_2023-12-18_14-04-44_i87q35_1768374274582.jpg";

// --- Sub-components for Home Page ---

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="text-sm font-medium text-white">The Solana Hub in Brazil</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
        >
          Building the Future of <br/>
          <span className="text-gradient">Solana in Brazil</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We are a collective of developers, designers, and creatives accelerating the adoption of Solana in Latin America through grants, education, and community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://x.com/SuperteamBR"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
          >
            Join the Community
          </a>
          <Link href="/members" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all w-full sm:w-auto">
            Explore Directory
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Builders", value: "500+", icon: Users, color: "text-blue-400" },
    { label: "Projects Shipped", value: "40+", icon: Rocket, color: "text-primary" },
    { label: "Hackathons Won", value: "12", icon: Trophy, color: "text-accent" },
  ];

  return (
    <div className="border-y border-white/5 bg-black/20 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
              <div className="text-4xl font-bold font-mono text-white mb-1">{stat.value}</div>
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Mission() {
  const cards = [
    { title: "Education", desc: "Workshops, guides, and bootcamps to level up your Solana skills.", icon: GraduationCap, color: "from-blue-500/20 to-blue-600/5" },
    { title: "Build", desc: "Resources and support to help you ship your first dApp or product.", icon: Code2, color: "from-purple-500/20 to-purple-600/5" },
    { title: "Network", desc: "Connect with founders, VCs, and engineers in the ecosystem.", icon: Network, color: "from-green-500/20 to-green-600/5" },
    { title: "Grants", desc: "Access funding opportunities to turn your ideas into reality.", icon: Rocket, color: "from-yellow-500/20 to-yellow-600/5" },
  ];

  return (
    <section className="py-32 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Mission</h2>
        <p className="text-muted-foreground text-lg">
          We exist to empower the next generation of Brazilian web3 talent through four key pillars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${card.color} hover:border-white/20 transition-all group`}
          >
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <card.icon className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Events() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) return null;

  return (
    <section className="py-24 bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Upcoming Events</h2>
          <Link href="/events" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events?.slice(0, 3).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card hover:border-primary/50 transition-all"
            >
              {/* Event Image Placeholder */}
              <div className="h-48 bg-muted relative overflow-hidden">
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                        <Calendar size={48} className="text-white/20" />
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-center">
                  <div className="text-xs text-muted-foreground uppercase font-bold">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                  <div className="text-lg font-bold text-white">{new Date(event.date).getDate()}</div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between mt-auto">
                   <div className="text-xs font-mono text-secondary px-2 py-1 bg-secondary/10 rounded border border-secondary/20">
                     {event.location}
                   </div>
                   {event.registrationUrl && (
                       <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-primary transition-colors">
                           Register →
                       </a>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <Link href="/events" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MembersPreview() {
  const { data: members } = useMembers();

  return (
    <section className="py-32 container mx-auto px-4 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Community Spotlight</h2>
        <p className="text-muted-foreground text-lg">Get to know the faces behind the code.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members?.slice(0, 4).map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link 
          href="/members" 
          className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium text-white"
        >
          See Directory
        </Link>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                    Ready to start building?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                    Join our community on X to stay updated, find a team, and start shipping. We can't wait to see what you build.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://x.com/SuperteamBR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all shadow-xl"
                    >
                        Join Community
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Stats />
      <Mission />
      <Events />
      <MembersPreview />
      <CTA />
      <Footer />
    </div>
  );
}
