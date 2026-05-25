"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Users, Music, Activity, 
  TrendingUp, Zap, Clock, Globe,
  ArrowUpRight, BarChart3, PieChart,
  Shield, Cpu, Network, LayoutDashboard,
  ArrowRight, Radio, PlayCircle,
  HardDrive, Database, Info,
  ExternalLink
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, BarChart, Bar,
  Cell
} from "recharts";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// --- Types ---
interface Latencies {
  bot: number;
  db: number;
  api: number;
}

interface Command {
  user: string;
  avatar: string;
  command: string;
  time: string;
}

interface HistoricalData {
  timestamp: string;
  totalServers: number;
  activeUsers: number;
  songsPlayed: number;
  avgLatency: number;
}

interface StatsData {
  totalServers: number;
  activeUsers: number;
  songsPlayed: number;
  voiceConnections: number;
  nodesOnline: number;
  uptime: string;
  latencies: Latencies;
  recentCommands: Command[];
  historicalData: HistoricalData[];
  topPlaying?: {
    title: string;
    author: string;
    thumbnail: string;
    guildName: string;
    position: number;
    length: number;
  }[];
  activeNode?: string;
}

// --- Components ---

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1500;
    const increment = end / (totalDuration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const format = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toLocaleString();
  };

  return <span>{prefix}{format(count)}{suffix}</span>;
};

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-[2rem] relative overflow-hidden group transition-all duration-500 hover:border-white/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className={`absolute -right-8 -top-8 w-24 h-24 bg-${color}-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3.5 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className={`w-5 h-5 text-${color}-400`} />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-[10px] font-bold text-green-400">+{trend}%</span>
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-2 tabular-nums font-mono tracking-tight">
          <AnimatedCounter value={value} />
        </h3>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.2em]">{label}</p>
      </div>

      <div className="mt-5 h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${color}-500/50 to-${color}-400`}
        />
      </div>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-2xl">
        <p className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-[0.2em]">{label}</p>
        <div className="space-y-3">
          {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-slate-300">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-white tabular-nums font-mono">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Page ---

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    if (!stats?.historicalData) return [];
    return stats.historicalData.map((d: HistoricalData) => ({
      time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      Servers: d.totalServers,
      Users: d.activeUsers,
      Playback: d.songsPlayed,
      Latency: d.avgLatency
    }));
  }, [stats]);

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-[#08080f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-20 h-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-blue-500 rounded-full" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-b-2 border-purple-500 rounded-full" 
            />
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold tracking-[0.4em] uppercase text-[10px] mb-3">Neural Synchronization</h2>
            <div className="flex gap-1.5 justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 bg-blue-500 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080f] text-slate-300 selection:bg-blue-500/30">
      <Navbar />
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[1000px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              <span className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">Live Intelligence Engine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight-premium mb-6">
              Global <span className="text-gradient-blue neon-text-blue">Analytics</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed tracking-premium text-pretty">
              High-fidelity visualization of Nitrozen's neural infrastructure, processing real-time telemetry from across the Discord ecosystem.
            </p>
          </motion.div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard label="Total Servers" value={stats?.totalServers || 0} icon={Server} color="blue" trend="12.4" />
          <StatCard label="Active Users" value={stats?.activeUsers || 0} icon={Users} color="purple" trend="8.2" />
          <StatCard label="Live Streams" value={stats?.voiceConnections || 0} icon={Radio} color="emerald" trend="15.1" />
          <StatCard label="Total Playback" value={stats?.songsPlayed || 0} icon={Music} color="pink" trend="24.8" />
        </div>

        {/* Analytics Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Growth Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/[0.02] to-transparent pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Network className="w-6 h-6 text-blue-400" />
                  Network Trajectory
                </h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">24-Hour Scaling Matrix</p>
              </div>
              <div className="flex items-center gap-8 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Servers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Users</span>
                </div>
              </div>
            </div>

            <div className="h-[450px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="glowServers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="glowUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#ffffff03" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#ffffff15" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={15}
                    tick={{ fill: '#64748b', fontWeight: '600' }}
                  />
                  <YAxis 
                    stroke="#ffffff15" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                    tick={{ fill: '#64748b', fontWeight: '600' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff10', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey="Servers" 
                    stroke="#3B82F6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#glowServers)" 
                    animationDuration={2000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Users" 
                    stroke="#A855F7" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#glowUsers)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Real-Time Live Music Section */}
            <div className="mt-12 relative z-10 border-t border-white/5 pt-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Music className="w-5 h-5 text-pink-500" />
                    Live Playback Matrix
                  </h3>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">Real-time Top 3 Active Streams</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">Live Now</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats?.topPlaying && stats.topPlaying.length > 0 ? (
                  stats.topPlaying.map((song, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group/song relative p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-pink-500/30 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.03] to-transparent opacity-0 group-hover/song:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="relative mb-4 aspect-video rounded-2xl overflow-hidden border border-white/10">
                          <img src={song.thumbnail} alt="" className="w-full h-full object-cover group-hover/song:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/song:opacity-100 transition-opacity">
                            <PlayCircle className="w-10 h-10 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                            <span className="text-[9px] font-bold text-white font-mono uppercase">#{i + 1}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white truncate group-hover/song:text-pink-400 transition-colors">
                            {song.title}
                          </h4>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Users className="w-3 h-3" />
                            <span className="text-[10px] font-semibold truncate uppercase tracking-wider">{song.guildName}</span>
                          </div>
                          
                          {/* Mini Progress Bar */}
                          <div className="pt-2">
                            <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(song.position / song.length) * 100}%` }}
                                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // Placeholder if no songs are playing
                  [1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 rounded-3xl bg-white/[0.02] border border-white/5 opacity-40 animate-pulse">
                      <div className="aspect-video rounded-2xl bg-white/5 mb-4" />
                      <div className="h-3 w-3/4 bg-white/5 rounded mb-2" />
                      <div className="h-2 w-1/2 bg-white/5 rounded" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Infrastructure Health Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 group"
            >
              <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                <Shield className="w-5 h-5 text-yellow-500" />
                Infrastructure
              </h3>
              <div className="space-y-8">
                {[
                  { label: "Core Latency", value: stats?.latencies?.bot || 0, unit: "ms", icon: Cpu, color: "blue" },
                  { label: "API Response", value: stats?.latencies?.api || 0, unit: "ms", icon: Globe, color: "purple" },
                  { label: "Nodes Online", value: stats?.nodesOnline || 0, unit: " Active", icon: HardDrive, color: "emerald" },
                ].map((item, idx) => (
                  <div key={idx} className="group/item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${item.color}-500/5 border border-${item.color}-500/10`}>
                          <item.icon className={`w-3.5 h-3.5 text-${item.color}-400`} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold text-white tabular-nums font-mono">
                        {item.value}{item.unit}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        className={`h-full bg-${item.color}-500/20`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Live Feed Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 flex-1 min-h-[400px] flex flex-col group"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <Activity className="w-5 h-5 text-pink-500" />
                  Live Feed
                </h3>
                <div className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </div>
              </div>
              
              <div className="space-y-5 flex-1 overflow-y-auto custom-scrollbar pr-2">
                <AnimatePresence mode="popLayout">
                  {stats?.recentCommands?.slice(0, 6).map((cmd, idx) => (
                    <motion.div 
                      key={`${cmd.user}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 items-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group/cmd"
                    >
                      <div className="relative">
                        <img src={cmd.avatar} className="w-10 h-10 rounded-xl border border-white/10 group-hover/cmd:border-blue-500/50 transition-colors" alt="" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#08080f] rounded-lg flex items-center justify-center border border-white/10">
                          <Zap className="w-2 h-2 text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-slate-300 font-bold truncate mb-1">
                          {cmd.user}
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="text-[10px] text-blue-400 font-mono bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                            /{cmd.command}
                          </code>
                          <span className="text-[9px] text-slate-600 font-bold uppercase tabular-nums">
                            {new Date(cmd.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!stats?.recentCommands?.length && (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center opacity-50">
                    <Database className="w-8 h-8 mb-4 text-slate-700" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Awaiting Data...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Global Distribution Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 md:p-16 rounded-[3rem] border-white/5 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10">
            <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 mb-8">
              <Globe className="w-8 h-8 text-blue-400 animate-pulse-glow" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight-premium">Global Network Presence</h3>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed tracking-premium">
              Nitrozen's core is distributed across <strong className="text-white tabular-nums">{stats?.nodesOnline || 2} high-performance nodes</strong>, delivering ultra-low latency playback to thousands of servers globally.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors">
                <p className="text-4xl font-bold text-blue-400 mb-2 tabular-nums font-mono">{stats?.nodesOnline || 2}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Voice Nodes</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-colors">
                <p className="text-4xl font-bold text-purple-400 mb-2 tabular-nums font-mono">{stats?.voiceConnections || 0}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Active Streams</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-pink-500/20 transition-colors">
                <p className="text-4xl font-bold text-pink-400 mb-2 tabular-nums font-mono">99.9%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Global Stability</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Global Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
