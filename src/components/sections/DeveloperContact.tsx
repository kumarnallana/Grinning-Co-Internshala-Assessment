import { DEVELOPER_PROFILE } from "@/data/profile";
import { FileText, Mail, ExternalLink } from "lucide-react";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export function DeveloperContact() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0F1219] border-t border-[#2A2E37]">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="rounded-3xl border border-[#2A2E37] bg-[#12151C]/80 p-8 sm:p-14 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-500 hover:border-[#D4A86A]/30 group">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D4A86A] mb-4 font-semibold">
            {DEVELOPER_PROFILE.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F2E7D5] mb-4 transition-colors duration-300">
            {DEVELOPER_PROFILE.name}
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F99] max-w-xl mx-auto mb-10 leading-relaxed font-light">
            {DEVELOPER_PROFILE.description}
          </p>
          
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
            <a 
              href={DEVELOPER_PROFILE.resume} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2A2E37]/50 border border-[#2A2E37] text-sm text-[#F2E7D5] hover:bg-[#D4A86A] hover:border-[#D4A86A] hover:text-[#12151C] transition-all duration-300 w-full lg:w-auto justify-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A86A]"
              aria-label="View Resume PDF"
            >
              <FileText size={16} />
              <span className="font-medium">Resume (PDF)</span>
              <ExternalLink size={14} className="opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </a>
            
            <a 
              href={`mailto:${DEVELOPER_PROFILE.email}`} 
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-transparent border border-[#2A2E37] text-sm text-[#B7BBC4] hover:bg-[#2A2E37] hover:border-[#4A4F5C] hover:text-[#F2E7D5] transition-all duration-300 w-full lg:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A86A]"
              aria-label="Send Email"
            >
              <Mail size={16} />
              <span className="font-medium">{DEVELOPER_PROFILE.email}</span>
            </a>
            
            <a 
              href={DEVELOPER_PROFILE.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-transparent border border-[#2A2E37] text-sm text-[#B7BBC4] hover:bg-[#2A2E37] hover:border-[#4A4F5C] hover:text-[#F2E7D5] transition-all duration-300 w-full lg:w-auto justify-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A86A]"
              aria-label="View LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span className="font-medium">LinkedIn Profile</span>
              <ExternalLink size={14} className="opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </a>
            
            <a 
              href={DEVELOPER_PROFILE.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-transparent border border-[#2A2E37] text-sm text-[#B7BBC4] hover:bg-[#2A2E37] hover:border-[#4A4F5C] hover:text-[#F2E7D5] transition-all duration-300 w-full lg:w-auto justify-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A86A]"
              aria-label="View GitHub Profile"
            >
              <GithubIcon size={16} />
              <span className="font-medium">GitHub Profile</span>
              <ExternalLink size={14} className="opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Background ambient lighting to connect with the footer natively */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#D4A86A]/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
    </section>
  );
}
