/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Github, 
  Disc as Discord, 
  Globe, 
  ArrowRight, 
  Vote, 
  Trophy, 
  TrendingUp, 
  Cpu, 
  Plus, 
  User, 
  Bell,
  Home as HomeIcon,
  ChevronRight,
  Layers,
  Zap,
  Eye,
  Share2,
  Heart,
  ArrowUp,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import Antigravity from './components/Antigravity';
import InfiniteMenu from './components/InfiniteMenu';
import Prism from './components/Prism';

// --- Types ---
interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  category: string;
  techStack: string[];
  votes: number;
  team: { name: string; avatar: string; bio?: string; role?: string }[];
  badges: string[];
  demoUrl: string;
  hackathonWon?: string;
  yearWon?: number;
}

// --- Mock Data ---
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AetherMind AI',
    tagline: 'Neural-linked cognitive assistant for 2026.',
    description: 'AetherMind uses advanced LLMs integrated with neural interfaces to provide real-time cognitive support and memory enhancement.',
    thumbnail: 'https://picsum.photos/seed/ai/800/450',
    category: 'Artificial Intelligence',
    techStack: ['PyTorch', 'React', 'Rust', 'WebGPU'],
    votes: 1240,
    team: [
      { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', bio: 'AI Researcher & Full-stack dev.', role: 'Lead Developer' },
      { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', bio: 'UX Designer with a passion for neural interfaces.', role: 'UX Designer' }
    ],
    badges: ['1st Place', 'AI-Powered'],
    demoUrl: '#',
    hackathonWon: 'Global AI Summit',
    yearWon: 2026
  },
  {
    id: '2',
    title: 'Solaris Grid',
    tagline: 'Decentralized energy sharing on the blockchain.',
    description: 'A peer-to-peer energy marketplace allowing homeowners with solar panels to sell excess energy to their neighbors using smart contracts.',
    thumbnail: 'https://picsum.photos/seed/energy/800/450',
    category: 'Web3 / Blockchain',
    techStack: ['Solidity', 'Next.js', 'Ethers.js', 'IPFS'],
    votes: 890,
    team: [
      { name: 'Marcus Vane', avatar: 'https://i.pravatar.cc/150?u=marcus', bio: 'Blockchain architect and sustainability advocate.', role: 'Founder' }
    ],
    badges: ['Trending'],
    demoUrl: '#',
    hackathonWon: 'Web3 Builders Hack',
    yearWon: 2025
  },
  {
    id: '3',
    title: 'VividVerse AR',
    tagline: 'The world is your canvas with spatial computing.',
    description: 'An AR platform that lets artists leave digital graffiti and installations in physical locations, viewable by anyone with the app.',
    thumbnail: 'https://picsum.photos/seed/ar/800/450',
    category: 'Spatial Computing',
    techStack: ['Unity', 'C#', 'ARCore', 'Swift'],
    votes: 2100,
    team: [
      { name: 'Elena Rossi', avatar: 'https://i.pravatar.cc/150?u=elena', bio: 'Digital artist and AR developer.', role: 'Creative Director' },
      { name: 'Tom Wu', avatar: 'https://i.pravatar.cc/150?u=tom', bio: 'Spatial computing expert.', role: 'Technical Lead' }
    ],
    badges: ['Best UX'],
    demoUrl: '#',
    hackathonWon: 'Reality Hack 2026',
    yearWon: 2026
  },
  {
    id: '4',
    title: 'BioSync Health',
    tagline: 'Real-time molecular health monitoring.',
    description: 'Wearable biosensors that track glucose, cortisol, and hydration levels, providing AI-driven lifestyle recommendations.',
    thumbnail: 'https://picsum.photos/seed/health/800/450',
    category: 'HealthTech',
    techStack: ['Python', 'TensorFlow', 'React Native', 'AWS'],
    votes: 560,
    team: [
      { name: 'Dr. James Lee', avatar: 'https://i.pravatar.cc/150?u=james', bio: 'Biomedical engineer and data scientist.', role: 'CTO' }
    ],
    badges: [],
    demoUrl: '#',
    hackathonWon: 'Health Innovators Expo',
    yearWon: 2025
  },
  {
    id: '5',
    title: 'EcoRoute AI',
    tagline: 'Carbon-negative logistics for a greener planet.',
    description: 'Optimizing delivery routes to minimize carbon footprint using quantum-inspired algorithms.',
    thumbnail: 'https://picsum.photos/seed/eco/800/450',
    category: 'Sustainability',
    techStack: ['Go', 'D3.js', 'PostgreSQL', 'Redis'],
    votes: 720,
    team: [
      { name: 'Maya Gupta', avatar: 'https://i.pravatar.cc/150?u=maya', bio: 'Logistics expert and environmentalist.', role: 'Operations' }
    ],
    badges: ['Impact Award'],
    demoUrl: '#',
    hackathonWon: 'Green Tech Challenge',
    yearWon: 2026
  },
  {
    id: '6',
    title: 'Nebula Stream',
    tagline: 'Ultra-low latency holographic streaming.',
    description: 'Streaming 3D volumetric video for immersive remote collaboration and entertainment.',
    thumbnail: 'https://picsum.photos/seed/space/800/450',
    category: 'Media / Entertainment',
    techStack: ['WebRTC', 'C++', 'Vulkan', 'Node.js'],
    votes: 1100,
    team: [
      { name: 'Leo Knight', avatar: 'https://i.pravatar.cc/150?u=leo', bio: 'Video streaming pioneer.', role: 'Founder' }
    ],
    badges: ['Tech Innovation'],
    demoUrl: '#',
    hackathonWon: 'Future Media Hack',
    yearWon: 2026
  },
  {
    id: '7',
    title: 'SecureChain',
    tagline: 'Quantum-resistant identity verification.',
    description: 'Protecting digital identities against future quantum computing threats using lattice-based cryptography.',
    thumbnail: 'https://picsum.photos/seed/security/800/450',
    category: 'Cybersecurity',
    techStack: ['Rust', 'Wasm', 'TypeScript', 'MongoDB'],
    votes: 430,
    team: [
      { name: 'Sam Rivera', avatar: 'https://i.pravatar.cc/150?u=sam', bio: 'Cryptography researcher.', role: 'Security Lead' }
    ],
    badges: [],
    demoUrl: '#',
    hackathonWon: 'Cyber Defense 2025',
    yearWon: 2025
  },
  {
    id: '8',
    title: 'EduLeap VR',
    tagline: 'Gamified learning in immersive virtual worlds.',
    description: 'A VR classroom where history and science come to life through interactive simulations.',
    thumbnail: 'https://picsum.photos/seed/edu/800/450',
    category: 'EdTech',
    techStack: ['Unreal Engine', 'C++', 'Firebase', 'React'],
    votes: 950,
    team: [
      { name: 'Chloe Park', avatar: 'https://i.pravatar.cc/150?u=chloe', bio: 'EdTech visionary and VR developer.', role: 'Product Manager' }
    ],
    badges: ['Community Choice'],
    demoUrl: '#',
    hackathonWon: 'EduHack Global',
    yearWon: 2026
  },
  {
    id: '9',
    title: 'SynthVoice',
    tagline: 'Perfectly natural AI voice cloning for everyone.',
    description: 'Creating high-fidelity voice clones for content creators with emotional depth and nuance.',
    thumbnail: 'https://picsum.photos/seed/voice/800/450',
    category: 'Creative Tools',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Svelte'],
    votes: 1540,
    team: [
      { name: 'David Smith', avatar: 'https://i.pravatar.cc/150?u=david', bio: 'Audio engineer and AI enthusiast.', role: 'Lead AI Engineer' }
    ],
    badges: ['Trending'],
    demoUrl: '#',
    hackathonWon: 'Creative AI Jam',
    yearWon: 2026
  },
  {
    id: '10',
    title: 'Orbit Finance',
    tagline: 'Interplanetary financial infrastructure.',
    description: 'Managing assets and transactions across different planetary colonies with time-dilation compensation.',
    thumbnail: 'https://picsum.photos/seed/finance/800/450',
    category: 'FinTech',
    techStack: ['Elixir', 'Phoenix', 'PostgreSQL', 'React'],
    votes: 320,
    team: [
      { name: 'Zoe Mars', avatar: 'https://i.pravatar.cc/150?u=zoe', bio: 'Space economy researcher.', role: 'Economist' }
    ],
    badges: ['Moonshot'],
    demoUrl: '#',
    hackathonWon: 'Space Apps Challenge',
    yearWon: 2025
  }
];

// --- Components ---

const RocketLogo = ({ className = "w-6 h-6", color = "text-brand-cyan" }: { className?: string, color?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 2L14.5 9H9.5L12 2Z" fill="#00F0FF" />
      <path d="M12 2C12 2 17 6 17 13C17 16 15 18 12 18C9 18 7 16 7 13C7 6 12 2 12 2Z" fill="#00F0FF" />
      <path d="M9 18L7 22L12 20L17 22L15 18H9Z" fill="#FF4D00" />
      <circle cx="12" cy="10" r="2" fill="white" fillOpacity="0.5" />
    </svg>
  </div>
);

const MarqueeLeaderboard = ({ isDark, onProjectClick }: { isDark: boolean, onProjectClick: (p: Project) => void }) => {
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = [...MOCK_PROJECTS, ...MOCK_PROJECTS, ...MOCK_PROJECTS]; // More for smoother manual scroll

  const scroll = (direction: 'left' | 'right') => {
    const amount = 300;
    setScrollX(prev => direction === 'left' ? prev + amount : prev - amount);
  };

  return (
    <div className={`py-10 overflow-hidden border-y relative group ${isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'}`}>
      <div className="flex items-center justify-between mb-6 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Trophy className="text-brand-cyan" size={20} />
          <h3 className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-black/60'}`}>Weekly Leaderboard</h3>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('left')}
            className={`p-2 rounded-full border ${isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-black/5 hover:bg-black/10'} transition-colors`}
          >
            <ArrowUp className="-rotate-90" size={16} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-2 rounded-full border ${isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-black/5 hover:bg-black/10'} transition-colors`}
          >
            <ArrowUp className="rotate-90" size={16} />
          </button>
        </div>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [scrollX, scrollX - 1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {projects.map((project, i) => (
            <div 
              key={`${project.id}-${i}`}
              onClick={() => onProjectClick(project)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl border cursor-pointer transition-transform hover:scale-105 ${isDark ? 'bg-zinc-900 border-white/10 hover:border-brand-cyan/50' : 'bg-white border-black/10 hover:border-brand-cyan/50'} min-w-[300px]`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</div>
                <div className="flex items-center gap-2">
                  <Vote size={12} className="text-brand-cyan" />
                  <span className="text-xs font-bold text-brand-cyan">{project.votes}</span>
                </div>
              </div>
              <div className="ml-auto text-2xl font-display font-black italic opacity-10">
                #{ (i % MOCK_PROJECTS.length) + 1 }
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-10 left-10 z-[200] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
        type === 'success' ? 'bg-brand-cyan text-black border-brand-cyan/20' : 'bg-brand-magenta text-white border-brand-magenta/20'
      }`}
    >
      {type === 'success' ? <Zap size={20} fill="currentColor" /> : <X size={20} />}
      <span className="font-bold text-sm tracking-tight">{message}</span>
    </motion.div>
  );
};

const Navbar = ({ isDark, setIsDark, setView, setLoginOpen, currentUser, onLogout }: { isDark: boolean, setIsDark: (v: boolean) => void, setView: (v: string) => void, setLoginOpen: (v: boolean) => void, currentUser: any, onLogout: () => void }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-brand-cyan rounded-lg flex items-center justify-center rotate-12 shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              <RocketLogo className="w-6 h-6" />
            </div>
            <span className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>Build Expo</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['Discover', 'Latest', 'Winners', 'Leaderboard'].map((item) => (
              <button 
                key={item} 
                onClick={() => setView(item.toLowerCase())}
                className={`text-sm font-medium transition-colors ${isDark ? 'text-white/60 hover:text-brand-cyan' : 'text-black/60 hover:text-brand-cyan'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-brand-cyan' : 'bg-black/5 text-brand-purple'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-black'}`}>{currentUser.name}</div>
                <button 
                  onClick={onLogout}
                  className="text-[10px] text-brand-magenta hover:underline uppercase tracking-widest font-bold"
                >
                  Logout
                </button>
              </div>
              <div 
                onClick={() => setView('profile')}
                className="w-10 h-10 rounded-full border-2 border-brand-cyan overflow-hidden cursor-pointer"
              >
                <img src={`https://i.pravatar.cc/150?u=${currentUser.email}`} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setLoginOpen(true)}
              className="hidden sm:block text-sm font-medium hover:text-brand-cyan transition-colors"
            >
              Login
            </button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('submit')}
            className="neo-button neo-button-primary text-sm"
          >
            Submit Project
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ isDark, onSearch }: { isDark: boolean, onSearch: (q: string) => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);
  const [query, setQuery] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/20 blur-[120px] rounded-full"
        />
        <motion.div 
          style={{ y: y2, rotate: -rotate }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/20 blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-widest mb-6 glass">
            Built for Hackers, by Hackers
          </span>
          <h1 className={`text-6xl md:text-8xl font-display font-bold leading-tight mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-magenta">Breakthroughs</span> Are Born
          </h1>
          
          {/* Glowing Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className={`relative flex items-center ${isDark ? 'bg-black' : 'bg-white'} rounded-2xl px-6 py-4 border ${isDark ? 'border-white/10' : 'border-black/5'}`}>
              <Search className="text-white/20 mr-4" size={24} />
              <input 
                type="text" 
                placeholder="Search AI, Web3, Sustainability..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
                className="w-full bg-transparent outline-none text-lg font-medium"
              />
              <button 
                onClick={() => onSearch(query)}
                className="bg-brand-cyan text-black px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform ml-4"
              >
                Explore
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['AI', 'Web3', 'Sustainability', 'AR/VR', 'Mobile', 'Open Source'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => { setQuery(tag); onSearch(tag); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${isDark ? 'border-white/10 hover:border-brand-cyan text-white/60 hover:text-white' : 'border-black/10 hover:border-brand-cyan text-black/60 hover:text-black'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            The ultimate 2026 showcase for futuristic hackathon projects. Discover, vote, and get inspired by the next generation of creative technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSearch('')}
              className="neo-button neo-button-primary px-10 py-4 text-lg flex items-center gap-2"
            >
              Explore Projects <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`neo-button neo-button-outline px-10 py-4 text-lg ${isDark ? 'text-white border-white/20 hover:bg-white/5' : 'text-black border-black/20 hover:bg-black/5'}`}
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>

        {/* Floating 3D-ish Elements */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-10 w-32 h-32 glass rounded-2xl flex items-center justify-center shadow-2xl"
          >
            <Cpu className="text-brand-cyan w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-10 right-10 w-40 h-40 glass rounded-full flex items-center justify-center shadow-2xl"
          >
            <Layers className="text-brand-purple w-16 h-16" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isDark, onClick }: { project: Project, isDark: boolean, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out'
      }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'} border h-full`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            className="flex items-center gap-2 text-brand-cyan font-bold"
          >
            <Eye size={18} /> Live Demo Peek
          </motion.div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {project.badges.map(badge => (
            <span key={badge} className="px-3 py-1 rounded-full bg-brand-cyan text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h3>
          <div className="flex items-center gap-1 text-brand-purple">
            <TrendingUp size={16} />
            <span className="text-xs font-bold">{project.votes}</span>
          </div>
        </div>
        <p className={`text-sm mb-6 line-clamp-2 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          {project.tagline}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <img 
                key={i} 
                src={member.avatar} 
                alt={member.name} 
                className="w-8 h-8 rounded-full border-2 border-black"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <div className="flex gap-2">
            {project.techStack.slice(0, 2).map(tech => (
              <span key={tech} className={`text-[10px] font-medium px-2 py-1 rounded-md ${isDark ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/80'}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-cyan/10 via-transparent to-brand-purple/10`} />
    </motion.div>
  );
};

const ProjectModal = ({ project, isOpen, onClose, isDark, onVote, showToast }: { project: Project | null, isOpen: boolean, onClose: () => void, isDark: boolean, onVote: () => void, showToast: (m: string, t?: 'success' | 'error') => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[40px] ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'} border shadow-2xl perspective-1000`}
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Visuals */}
              <div className="p-8 lg:p-12 bg-black/20">
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group relative">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-brand-cyan rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,240,255,0.6)]"
                    >
                      <Zap size={32} fill="currentColor" />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <img src={`https://picsum.photos/seed/${project.id}-${i}/400/225`} alt="Screenshot" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity cursor-pointer" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Info */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  {project.badges.map(badge => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-[10px] font-bold uppercase tracking-wider">
                      {badge}
                    </span>
                  ))}
                </div>

                <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h2>
                <p className={`text-xl font-medium mb-8 ${isDark ? 'text-brand-cyan' : 'text-brand-purple'}`}>{project.tagline}</p>
                
                <div className="flex items-center gap-8 mb-10 pb-10 border-b border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Votes</span>
                    <span className="text-2xl font-display font-bold text-white">{project.votes}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Category</span>
                    <span className="text-lg font-medium text-white/80">{project.category}</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">The Vision</h4>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                    {project.description}
                  </p>
                </div>

                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onVote}
                    className="flex-1 neo-button neo-button-primary py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <Vote size={20} /> Cast Your Vote
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast('Link copied to clipboard! Share the innovation. 🔗');
                    }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <Share2 size={24} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const LoginModal = ({ isOpen, onClose, isDark, onLogin }: { isOpen: boolean, onClose: () => void, isDark: boolean, onLogin: (user: any) => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('novaforge_users') || '[]');
    
    if (isSignUp) {
      if (users.find((u: any) => u.email === email)) {
        alert('User already exists');
        return;
      }
      const newUser = { email, password, name, id: Date.now().toString() };
      users.push(newUser);
      localStorage.setItem('novaforge_users', JSON.stringify(users));
      localStorage.setItem('novaforge_current_user', JSON.stringify(newUser));
      onLogin(newUser);
    } else {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('novaforge_current_user', JSON.stringify(user));
        onLogin(user);
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className={`relative w-full max-w-md p-10 rounded-[40px] ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/10'} border shadow-2xl overflow-hidden`}
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-cyan rounded-2xl flex items-center justify-center rotate-12 mb-8 shadow-2xl">
                <Zap className="text-black w-8 h-8" />
              </div>
              <h2 className={`text-4xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className={`text-sm mb-10 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                {isSignUp ? 'Join the future of hackathons.' : 'Ready to build something breakthrough?'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full py-4 px-6 rounded-2xl border outline-none transition-colors ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white focus:border-brand-cyan' 
                        : 'bg-black/5 border-black/10 text-black focus:border-brand-cyan'
                    }`}
                  />
                )}
                <input 
                  type="email" 
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-4 px-6 rounded-2xl border outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-white focus:border-brand-cyan' 
                      : 'bg-black/5 border-black/10 text-black focus:border-brand-cyan'
                  }`}
                />
                <input 
                  type="password" 
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full py-4 px-6 rounded-2xl border outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-white focus:border-brand-cyan' 
                      : 'bg-black/5 border-black/10 text-black focus:border-brand-cyan'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full neo-button neo-button-primary py-4 font-bold"
                >
                  {isSignUp ? 'Sign Up' : 'Login'}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className={`text-sm font-medium ${isDark ? 'text-brand-cyan' : 'text-brand-purple'} hover:underline`}
                >
                  {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ExplorePage = ({ isDark, onProjectClick, initialSearch = '' }: { isDark: boolean, onProjectClick: (p: Project) => void, initialSearch?: string }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const categories = ['All', 'Artificial Intelligence', 'Web3 / Blockchain', 'Spatial Computing', 'HealthTech', 'Sustainability', 'EdTech'];

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredProjects = useMemo(() => {
    let results = MOCK_PROJECTS;
    
    if (filter !== 'All') {
      results = results.filter(p => p.category === filter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.tagline.toLowerCase().includes(query) ||
        p.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    return results;
  }, [filter, searchQuery]);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Explore Innovation</h2>
          <p className={`${isDark ? 'text-white/40' : 'text-black/40'} max-w-xl`}>
            Discover the most ambitious projects from the global hackathon community. Filter by category or search for specific technologies.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ 
              width: isSearchFocused ? '100%' : 'auto',
              maxWidth: isSearchFocused ? '400px' : '320px'
            }}
            className={`relative group flex items-center ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            } rounded-full px-6 py-3 border transition-all duration-500 ${
              isSearchFocused 
                ? 'border-brand-cyan shadow-[0_0_30px_rgba(0,240,255,0.2)]' 
                : (isDark ? 'border-white/10' : 'border-black/5')
            }`}
          >
            <Search className={`transition-colors duration-300 ${isSearchFocused ? 'text-brand-cyan' : 'opacity-20'}`} size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-4 bg-transparent outline-none text-sm"
            />
          </motion.div>
        </div>
      </div>

      {/* Category Menu */}
      <div className="h-[500px] w-full mb-16 rounded-[40px] overflow-hidden border border-white/10 glass relative">
        <InfiniteMenu 
          items={categories.map(cat => ({
            image: `https://picsum.photos/seed/${cat}/900/900?grayscale`,
            link: cat,
            title: cat,
            description: `Explore all ${cat} breakthroughs`
          }))}
          onSelect={(cat: string) => setFilter(cat)}
        />
      </div>

      {/* Masonry-style Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard 
                project={project} 
                isDark={isDark} 
                onClick={() => onProjectClick(project)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const LeaderboardPage = ({ isDark, onUserClick }: { isDark: boolean, onUserClick: (user: Project['team'][0]) => void }) => {
  const sorted = [...MOCK_PROJECTS].sort((a, b) => b.votes - a.votes);

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`text-5xl md:text-7xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Winners Circle</h2>
        <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-lg`}>The top-voted breakthroughs leading the 2026 hackathon season.</p>
      </div>

      <div className="space-y-6">
        {sorted.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onUserClick(project.team[0])}
            className={`group relative flex items-center gap-8 p-6 rounded-[32px] ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} border ${isDark ? 'border-white/10' : 'border-black/5'} transition-all cursor-pointer`}
          >
            <div className={`text-4xl md:text-6xl font-display font-black italic opacity-20 group-hover:opacity-100 transition-opacity ${index === 0 ? 'text-brand-cyan' : index === 1 ? 'text-brand-purple' : index === 2 ? 'text-brand-magenta' : 'text-white'}`}>
              {String(index + 1).padStart(2, '0')}
            </div>
            
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="flex-1">
              <h3 className={`text-xl font-display font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h3>
              <div className="flex items-center gap-2">
                <p className={`text-sm ${isDark ? 'text-white/40' : 'text-black/40'}`}>{project.category}</p>
                <span className="text-white/10">•</span>
                <p className="text-xs font-bold text-brand-cyan uppercase tracking-widest">{project.hackathonWon} {project.yearWon}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-display font-bold text-brand-cyan">{project.votes}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/20">Votes</div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-brand-cyan/10 text-brand-cyan"
              >
                <Trophy size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SubmitPage = ({ isDark, onSubmit }: { isDark: boolean, onSubmit: () => void }) => {
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 flex flex-col gap-2">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-cyan' : (isDark ? 'bg-white/10' : 'bg-black/10')}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= i ? 'text-brand-cyan' : (isDark ? 'text-white/20' : 'text-black/20')}`}>Step {i}</span>
            </div>
          ))}
        </div>
        <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Submit Your Project</h2>
        <p className={`${isDark ? 'text-white/40' : 'text-black/40'}`}>Share your breakthrough with the world. Follow the steps below to showcase your innovation.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>Project Title</label>
                <input type="text" placeholder="e.g. AetherMind AI" className={`w-full p-6 rounded-2xl border outline-none focus:border-brand-cyan transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`} />
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>One-Line Tagline</label>
                <input type="text" placeholder="The ultimate cognitive assistant..." className={`w-full p-6 rounded-2xl border outline-none focus:border-brand-cyan transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`} />
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>Thumbnail Image</label>
                <label className={`aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer group relative overflow-hidden ${isDark ? 'border-white/10 hover:border-brand-cyan/50' : 'border-black/10 hover:border-brand-cyan/50'}`}>
                  {thumbnail ? (
                    <img src={thumbnail} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                        <Plus className={isDark ? 'text-white/40' : 'text-black/40'} />
                      </div>
                      <span className={`text-sm ${isDark ? 'text-white/40' : 'text-black/40'}`}>Drag and drop or click to upload (16:9 recommended)</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full neo-button neo-button-primary py-6 text-lg font-bold">Next: Project Details</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>Full Description</label>
              <textarea rows={6} placeholder="Tell us about the problem you solved, your process, and the impact..." className={`w-full p-6 rounded-2xl border outline-none focus:border-brand-cyan transition-colors resize-none ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`} />
            </div>
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>Tech Stack (comma separated)</label>
              <input type="text" placeholder="React, Rust, WebGPU..." className={`w-full p-6 rounded-2xl border outline-none focus:border-brand-cyan transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`} />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className={`flex-1 py-6 rounded-2xl border font-bold transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}>Back</button>
              <button onClick={() => setStep(3)} className="flex-[2] neo-button neo-button-primary py-6 font-bold">Next: Team & Links</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>Live Demo URL</label>
              <input type="url" placeholder="https://..." className={`w-full p-6 rounded-2xl border outline-none focus:border-brand-cyan transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`} />
            </div>
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>GitHub Repository</label>
              <input type="url" placeholder="https://github.com/..." className={`w-full p-6 rounded-2xl border outline-none focus:border-brand-cyan transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`} />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className={`flex-1 py-6 rounded-2xl border font-bold transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}>Back</button>
              <button onClick={onSubmit} className="flex-[2] neo-button neo-button-primary py-6 font-bold shadow-[0_0_30px_rgba(0,240,255,0.4)]">Launch Project</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProfileModal = ({ user, onClose, isDark }: { user: Project['team'][0], onClose: () => void, isDark: boolean }) => {
  const userProjects = MOCK_PROJECTS.filter(p => p.team.some(t => t.name === user.name));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[40px] border no-scrollbar ${
          isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/10'
        } shadow-2xl`}
      >
        <div className="p-8 md:p-12">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row gap-12 mb-16">
            <div className="flex-shrink-0">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-48 h-48 rounded-[40px] object-cover border-4 border-brand-cyan/20" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-cyan rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy size={24} className="text-black" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className={`text-5xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>{user.name}</h2>
                <span className="px-4 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-widest">Elite Creator</span>
              </div>
              <p className={`text-xl mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>{user.bio || 'Visionary developer and hackathon enthusiast.'}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className={`px-6 py-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <div className={`text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Wins</div>
                  <div className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>12</div>
                </div>
                <div className={`px-6 py-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <div className={`text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Votes</div>
                  <div className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>4.2k</div>
                </div>
                <div className={`px-6 py-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <div className={`text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Rank</div>
                  <div className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>Top 1%</div>
                </div>
              </div>
            </div>
          </div>

          <h3 className={`text-2xl font-display font-bold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Showcase Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProjects.map(project => (
              <div key={project.id} className={`p-6 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <img src={project.thumbnail} alt="" className="w-full h-40 object-cover rounded-2xl mb-4" />
                <h4 className={`text-xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h4>
                <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>{project.tagline}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-widest">
                    <Trophy size={14} /> {project.hackathonWon}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    <Vote size={14} /> {project.votes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfilePage = ({ isDark }: { isDark: boolean }) => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-[40px] overflow-hidden mb-16 h-80">
        <img src="https://picsum.photos/seed/profile-bg/1920/600" alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 flex items-end gap-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-32 h-32 rounded-[32px] border-4 border-brand-cyan overflow-hidden shadow-2xl"
          >
            <img src="https://i.pravatar.cc/150?u=me" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="mb-2">
            <h2 className="text-4xl font-display font-bold text-white mb-1">Alex Chen</h2>
            <p className="text-brand-cyan font-medium">Creative Technologist • 12 Projects</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className={`p-8 rounded-[32px] ${isDark ? 'bg-white/5' : 'bg-black/5'} border ${isDark ? 'border-white/10' : 'border-black/5'}`}>
            <h3 className={`text-xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>My Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 text-center">
                <div className="text-2xl font-display font-bold text-brand-cyan">4.2k</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Total Votes</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 text-center">
                <div className="text-2xl font-display font-bold text-brand-purple">12</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 text-center">
                <div className="text-2xl font-display font-bold text-brand-magenta">3</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Wins</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 text-center">
                <div className="text-2xl font-display font-bold text-brand-lime">85</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Followers</div>
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-[32px] ${isDark ? 'bg-white/5' : 'bg-black/5'} border ${isDark ? 'border-white/10' : 'border-black/5'}`}>
            <h3 className={`text-xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>About Me</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
              Passionate about the intersection of AI and human creativity. Building tools that empower the next generation of digital artists.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>My Projects</h3>
            <button className="text-sm font-bold text-brand-cyan hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_PROJECTS.slice(0, 4).map(p => (
              <div key={p.id}>
                <ProjectCard project={p} isDark={isDark} onClick={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedSection = ({ isDark, onProjectClick }: { isDark: boolean, onProjectClick: (p: Project) => void }) => {
  const featured = useMemo(() => MOCK_PROJECTS.slice(0, 3), []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className={`text-3xl md:text-4xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Featured Breakthroughs</h2>
          <p className={`${isDark ? 'text-white/40' : 'text-black/40'}`}>Hand-picked projects that are pushing the boundaries of 2026 tech.</p>
        </div>
        <div className="flex gap-2">
          <div className="w-12 h-1 bg-brand-cyan rounded-full" />
          <div className="w-4 h-1 bg-white/10 rounded-full" />
          <div className="w-4 h-1 bg-white/10 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div 
              onClick={() => onProjectClick(project)}
              className={`group relative aspect-[4/5] rounded-[40px] overflow-hidden cursor-pointer border ${isDark ? 'border-white/10' : 'border-black/5'}`}
            >
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 mb-3">
                  {project.badges.map(badge => (
                    <span key={badge} className="px-2 py-1 rounded-md bg-brand-cyan/20 text-brand-cyan text-[8px] font-bold uppercase tracking-widest backdrop-blur-md">
                      {badge}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/60 line-clamp-2 mb-4">{project.tagline}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={project.team[0].avatar} alt="" className="w-6 h-6 rounded-full border border-white/20" />
                    <span className="text-xs text-white/80">{project.team[0].name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-cyan">
                    <Vote size={14} />
                    <span className="text-xs font-bold">{project.votes}</span>
                  </div>
                </div>
              </div>

              {/* Decorative Overlay */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-white" size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const HackathonStats = ({ isDark }: { isDark: boolean }) => {
  const stats = [
    { label: 'Total Projects', value: '1,240+', icon: Layers, color: 'text-brand-cyan' },
    { label: 'Active Hackers', value: '8.5k', icon: User, color: 'text-brand-purple' },
    { label: 'Prizes Awarded', value: '$2.5M', icon: Trophy, color: 'text-brand-magenta' },
    { label: 'Global Reach', value: '142', icon: Globe, color: 'text-brand-lime' },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 p-12 rounded-[40px] border ${isDark ? 'bg-white/5 border-white/10 glass' : 'bg-black/5 border-black/10 shadow-sm'}`}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className={`text-3xl font-display font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{stat.value}</div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-white/40' : 'text-black/40'}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [view, setView] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedUser, setSelectedUser] = useState<Project['team'][0] | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showGoUp, setShowGoUp] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('novaforge_current_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    document.body.className = isDark ? 'bg-[#050505] text-white' : 'bg-[#F0F2F5] text-black';
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowGoUp(true);
      } else {
        setShowGoUp(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleUserClick = (user: Project['team'][0]) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setView('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark' : ''}`}
    >
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
        <Prism 
          animationType="rotate"
          timeScale={0.2}
          noise={0.3}
          glow={0.8}
          scale={4}
          transparent={true}
        />
      </div>
      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        setView={setView} 
        setLoginOpen={setIsLoginModalOpen} 
        currentUser={currentUser}
        onLogout={() => {
          localStorage.removeItem('novaforge_current_user');
          setCurrentUser(null);
          showToast('Logged out successfully. See you soon! 👋');
        }}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {view === 'home' && (
            <>
              <Hero isDark={isDark} onSearch={handleSearch} />
              <MarqueeLeaderboard isDark={isDark} onProjectClick={handleProjectClick} />
              <HackathonStats isDark={isDark} />
              <FeaturedSection isDark={isDark} onProjectClick={handleProjectClick} />
              <ExplorePage isDark={isDark} onProjectClick={handleProjectClick} initialSearch={searchQuery} />
              <LeaderboardPage isDark={isDark} onUserClick={handleUserClick} />
            </>
          )}
          {view === 'discover' && <ExplorePage isDark={isDark} onProjectClick={handleProjectClick} initialSearch={searchQuery} />}
          {view === 'latest' && <ExplorePage isDark={isDark} onProjectClick={handleProjectClick} initialSearch={searchQuery} />}
          {view === 'winners' && <LeaderboardPage isDark={isDark} onUserClick={handleUserClick} />}
          {view === 'leaderboard' && <LeaderboardPage isDark={isDark} onUserClick={handleUserClick} />}
          {view === 'submit' && <SubmitPage isDark={isDark} onSubmit={() => {
            showToast('Project submitted successfully! 🚀');
            setView('home');
          }} />}
          {view === 'profile' && <ProfilePage isDark={isDark} />}
        </motion.main>
      </AnimatePresence>

      {/* Floating Home Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setView('home')}
        className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-brand-cyan rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,240,255,0.5)] group"
      >
        <HomeIcon size={24} />
        <div className="absolute -top-12 right-0 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Back to Home
        </div>
      </motion.button>

      {/* Modals */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        isDark={isDark} 
        onVote={() => {
          showToast('Vote recorded! Thank you for supporting innovation. ✨');
          setIsProjectModalOpen(false);
        }}
        showToast={showToast}
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        isDark={isDark} 
        onLogin={(user) => {
          setCurrentUser(user);
          setIsLoginModalOpen(false);
          showToast(`Welcome back, ${user.name}! 👋`);
        }}
      />

      {/* Footer */}
      <footer className={`py-20 px-6 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center rotate-12">
              <RocketLogo className="w-5 h-5" />
            </div>
            <span className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-black'}`}>Build Expo</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-white/40 hover:text-brand-cyan transition-colors">Twitter</a>
            <a href="#" className="text-sm text-white/40 hover:text-brand-cyan transition-colors">Discord</a>
            <a href="#" className="text-sm text-white/40 hover:text-brand-cyan transition-colors">GitHub</a>
          </div>

          <p className="text-sm text-white/20">© 2026 Build Expo Platform. Built for the future.</p>
        </div>
      </footer>
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && selectedUser && (
          <ProfileModal 
            user={selectedUser} 
            onClose={() => setIsProfileModalOpen(false)} 
            isDark={isDark} 
          />
        )}
      </AnimatePresence>

      {/* Go Up Button */}
      <AnimatePresence>
        {showGoUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-2xl transition-all ${
              isDark 
                ? 'bg-brand-cyan text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]' 
                : 'bg-black text-white hover:bg-black/90'
            }`}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
