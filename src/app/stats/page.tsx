"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, Users, Music, Activity, 
  TrendingUp, Zap, Clock, Globe,
  ArrowUpRight, BarChart3, PieChart
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Helper to format numbers
const formatNum = (n: number) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
};

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null);
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
    const interval = setInterval(fetchStats, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-[var(--color-brand-black)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[var(--color-brand-blue)]/20 border-t-[var(--color-brand-blue)] rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium animate-pulse tracking-widest uppercase text-xs">Initializing Neural Link...</p>
        </div>
      </div>
    );
  }

  const chartData = stats?.historicalData?.map((d: any) => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    servers: d.totalServers,
    users: d.activeUsers,
    songs: d.songsPlayed,
    latency: d.avgLatency
  })) || [];

  return (
    <div className="min-h-screen bg-[var(--color-brand-black)] text-white selection:bg-[var(--color-brand-blue)]/30">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Real-Time <span className="neon-text-blue text-[var(--color-brand-blue)]">Performance</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Live insights into the Nitrozen network. Tracking growth, playback density, and system health across thousands of communities.
          </p>
        </motion.div>

        {/* Global Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Total Servers", value: stats?.totalServers, icon: Server, color: "blue" },
            { label: "Active Users", value: stats?.activeUsers, icon: Users, color: "purple" },
            { label: "Songs Played", value: stats?.songsPlayed, icon: Music, color: "pink" },
            { label: "Live Players", value: stats?.voiceConnections, icon: Activity, color: "green" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-[var(--color-brand-blue)]/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-400 opacity-50" />
              </div>
              <h3 className="text-3xl font-black mb-1">{formatNum(stat.value || 0)}</h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              
              {/* Sparkline decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-brand-blue)]/20 to-transparent"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Growth Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-card p-8 rounded-[2rem] border-white/5 relative"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--color-brand-blue)]" />
                  Network Density
                </h3>
                <p className="text-gray-500 text-sm">24-hour traffic analysis</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)]"></div>
                  <span className="text-xs text-gray-400 font-bold uppercase">Servers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand-purple)]"></div>
                  <span className="text-xs text-gray-400 font-bold uppercase">Users</span>
                </div>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorServers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-blue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-brand-blue)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-purple)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-brand-purple)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#ffffff30" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff30" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => formatNum(val)}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1322', borderColor: '#ffffff10', borderRadius: '16px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="servers" 
                    stroke="var(--color-brand-blue)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorServers)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--color-brand-purple)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right Sidebar: Live Feed & Health */}
          <div className="space-y-8">
            {/* System Health */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 rounded-[2rem] border-white/5"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Core Health
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Bot Latency", value: `${stats?.latencies?.bot || 0}ms`, icon: Activity },
                  { label: "API Response", value: `${stats?.latencies?.api || 0}ms`, icon: Globe },
                  { label: "Uptime Status", value: `${stats?.uptime || "99.9"}%`, icon: Clock },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 rounded-[2rem] border-white/5 flex-1 min-h-[300px]"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[var(--color-brand-pink)]" />
                Live Feed
              </h3>
              <div className="space-y-4">
                {stats?.recentCommands?.slice(0, 5).map((cmd: any, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start group">
                    <img src={cmd.avatar} className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[var(--color-brand-blue)]/50 transition-colors" alt="" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs text-gray-300 font-medium truncate">
                        <span className="text-white font-bold">{cmd.user}</span> executed <code className="text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5 px-1 rounded">{cmd.command}</code>
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{new Date(cmd.time).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                {!stats?.recentCommands?.length && (
                  <p className="text-center text-gray-500 text-sm py-10">Monitoring activity...</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Global Distribution Visualization (Placeholder for Map) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-[2rem] border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-blue)]/5 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Global Presence</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Nitrozen is currently active in <strong className="text-white">{formatNum(stats?.totalServers || 0)}</strong> servers worldwide across multiple clusters and voice nodes.
            </p>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <p className="text-4xl font-black text-[var(--color-brand-blue)]">{stats?.nodesOnline || 2}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Voice Nodes</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-[var(--color-brand-purple)]">{stats?.voiceConnections || 0}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Voice Streams</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-[var(--color-brand-pink)]">99.9%</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Global SLI</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
