import { useState } from "react";
import { useMembers } from "@/hooks/use-members";
import { MemberCard } from "@/components/MemberCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Loader2, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Members() {
  const [search, setSearch] = useState("");
  const [activeSkill, setActiveSkill] = useState<string | undefined>(undefined);
  
  const { data: members, isLoading, error } = useMembers({ search, skill: activeSkill });

  const skills = ["Rust", "React", "Solidity", "Design", "Marketing", "Community", "Business"];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6 container mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Meet the <span className="text-gradient">Builders</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Connect with the brightest minds building on Solana in Brazil.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-white/5 py-4 mb-12 -mx-4 md:-mx-6 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search by name, role, or x handle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Skills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter size={16} className="text-muted-foreground shrink-0 mr-2" />
              <button
                onClick={() => setActiveSkill(undefined)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  !activeSkill 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                }`}
              >
                All
              </button>
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setActiveSkill(skill === activeSkill ? undefined : skill)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    skill === activeSkill 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary w-10 h-10" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            Failed to load members. Please try again later.
          </div>
        ) : members?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No members found matching your criteria.</p>
            <button 
              onClick={() => { setSearch(""); setActiveSkill(undefined); }}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Core Team Section */}
            {members?.some(m => m.isCore) && !search && !activeSkill && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-display font-bold text-white">Core Team</h2>
                  <div className="h-px bg-white/10 flex-grow" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {members.filter(m => m.isCore).map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* All Members Section */}
            <section>
              {(!search && !activeSkill) && (
                 <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-2xl font-display font-bold text-white">Community Members</h2>
                 <div className="h-px bg-white/10 flex-grow" />
               </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members?.filter(m => (!search && !activeSkill) ? !m.isCore : true).map((member, i) => (
                  <MemberCard key={member.id} member={member} index={i} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
