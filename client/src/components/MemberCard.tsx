import { Member } from "@shared/schema";
import { motion } from "framer-motion";
import { Twitter, Code, Award } from "lucide-react";

interface MemberCardProps {
  member: Member;
  index?: number;
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl border border-white/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Core Member Badge */}
      {member.isCore && (
        <div className="absolute top-4 right-4 z-10 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
          <Award size={12} />
          CORE
        </div>
      )}

      <div className="p-6 relative z-10 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors">
            <img 
              src={member.avatarUrl} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          </div>
          {member.xHandle && (
            <a 
              href={`https://x.com/${member.xHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-0 right-0 bg-black border border-white/20 p-1.5 rounded-full text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-colors"
            >
              <Twitter size={14} className="fill-current" />
            </a>
          )}
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold font-display text-white mb-1 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-sm font-mono text-secondary mb-3">{member.role}</p>
        
        {member.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {member.bio}
          </p>
        )}

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          {member.skills?.slice(0, 3).map((skill, i) => (
            <span 
              key={i} 
              className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5"
            >
              {skill}
            </span>
          ))}
          {(member.skills?.length || 0) > 3 && (
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5">
              +{member.skills!.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
