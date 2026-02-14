'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';

const COLORS = ['#B8A088', '#7A9B6D', '#D4A373', '#8B7355', '#A0C4A0', '#C4A882', '#6B8E6B', '#D4B896', '#9E8B76', '#B5D4A0'];

const IDENTITY_LABELS: Record<string, string> = {
  ACHIEVER: 'Achiever',
  ANCHOR: 'Anchor',
  OPERATOR: 'Operator',
  STRATEGIST: 'Strategist',
  BURNER: 'Burner',
};

const NS_LABELS: Record<string, string> = {
  SYMP: 'Sympathetic',
  DORSAL: 'Dorsal',
  VENTRAL: 'Ventral',
};

interface StatsData {
  totalResults: number;
  identityDist: Record<string, number>;
  nsDist: Record<string, number>;
  comboDist: Record<string, number>;
  dailyCompletions: { date: string; count: number }[];
  deviceSplit: Record<string, number>;
  utmSources: Record<string, number>;
  funnel: {
    landingViews: number;
    quizStarts: number;
    quizCompletes: number;
    emailSubmits: number;
    resultsViews: number;
  };
  avgCompletionTime: number;
  avgVentralPct: number;
}

function MetricCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-5 border border-sage/10 dark:border-dark-border">
      <p className="font-body text-xs text-soft-brown dark:text-dark-muted uppercase tracking-wider mb-1">{label}</p>
      <p className="font-heading text-3xl text-deep-brown dark:text-dark-text">{value}</p>
      {sub && <p className="font-body text-xs text-soft-brown/60 dark:text-dark-muted/60 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<StatsData | null>(null);

  const fetchStats = useCallback(async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'x-admin-key': key },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setError('Invalid admin key');
          setAuthenticated(false);
          return;
        }
        throw new Error('Failed to fetch stats');
      }
      const data = await res.json();
      setStats(data);
      setAuthenticated(true);
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-key');
    if (stored) {
      setAdminKey(stored);
      fetchStats(stored);
    }
  }, [fetchStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('admin-key', adminKey);
    fetchStats(adminKey);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="font-heading text-2xl text-deep-brown dark:text-dark-text text-center mb-6">Admin Dashboard</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin secret key"
              className="w-full bg-white/60 dark:bg-dark-surface border border-sage/20 dark:border-dark-border rounded-lg px-4 py-3 font-body text-charcoal dark:text-dark-text placeholder:text-soft-brown/40 dark:placeholder:text-dark-muted/50 focus:outline-none focus:ring-2 focus:ring-muted-gold/50"
            />
            {error && <p className="text-red-600 dark:text-red-400 text-sm font-body">{error}</p>}
            <button
              type="submit"
              disabled={loading || !adminKey}
              className="w-full bg-muted-gold text-cream font-body py-3 rounded-lg hover:bg-muted-gold/90 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  // Prepare chart data
  const identityData = Object.entries(stats.identityDist).map(([key, value]) => ({
    name: IDENTITY_LABELS[key] || key,
    value,
  }));

  const nsData = Object.entries(stats.nsDist).map(([key, value]) => ({
    name: NS_LABELS[key] || key,
    value,
  }));

  const deviceData = Object.entries(stats.deviceSplit).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const utmData = Object.entries(stats.utmSources)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const funnelData = [
    { stage: 'Landing', count: stats.funnel.landingViews },
    { stage: 'Quiz Start', count: stats.funnel.quizStarts },
    { stage: 'Quiz Done', count: stats.funnel.quizCompletes },
    { stage: 'Email', count: stats.funnel.emailSubmits },
    { stage: 'Results', count: stats.funnel.resultsViews },
  ];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-deep-brown dark:text-dark-text">Analytics Dashboard</h1>
            <p className="font-body text-sm text-soft-brown dark:text-dark-muted mt-1">Heal The Cycle Assessment</p>
          </div>
          <div className="flex gap-3">
            <a href="/admin/test-results" className="font-body text-sm text-muted-gold hover:underline">
              Test Results
            </a>
            <button
              onClick={() => fetchStats(adminKey)}
              className="font-body text-sm text-muted-gold hover:underline"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Completions" value={stats.totalResults} />
          <MetricCard label="Avg Completion Time" value={formatTime(stats.avgCompletionTime)} />
          <MetricCard label="Avg Ventral %" value={`${stats.avgVentralPct}%`} sub="Higher = more regulated" />
          <MetricCard
            label="Conversion Rate"
            value={stats.funnel.landingViews > 0
              ? `${Math.round((stats.totalResults / stats.funnel.landingViews) * 100)}%`
              : 'N/A'}
            sub="Landing to completion"
          />
        </div>

        {/* Funnel */}
        <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-6 border border-sage/10 dark:border-dark-border mb-8">
          <h2 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-4">Conversion Funnel</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#B8A088" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Identity Distribution */}
          <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-6 border border-sage/10 dark:border-dark-border">
            <h2 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-4">Identity Distribution</h2>
            {identityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={identityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {identityData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="font-body text-sm text-soft-brown/60 dark:text-dark-muted text-center py-10">No data yet</p>
            )}
          </div>

          {/* NS Distribution */}
          <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-6 border border-sage/10 dark:border-dark-border">
            <h2 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-4">NS State Distribution</h2>
            {nsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={nsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {nsData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="font-body text-sm text-soft-brown/60 dark:text-dark-muted text-center py-10">No data yet</p>
            )}
          </div>
        </div>

        {/* Daily Completions */}
        <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-6 border border-sage/10 dark:border-dark-border mb-8">
          <h2 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-4">Daily Completions (Last 30 Days)</h2>
          {stats.dailyCompletions.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.dailyCompletions}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d) => d.slice(5)} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#7A9B6D" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="font-body text-sm text-soft-brown/60 dark:text-dark-muted text-center py-10">No data yet</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Device Split */}
          <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-6 border border-sage/10 dark:border-dark-border">
            <h2 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-4">Device Breakdown</h2>
            {deviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={deviceData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7A9B6D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="font-body text-sm text-soft-brown/60 dark:text-dark-muted text-center py-10">No data yet</p>
            )}
          </div>

          {/* UTM Sources */}
          <div className="bg-white/80 dark:bg-dark-card/80 rounded-xl p-6 border border-sage/10 dark:border-dark-border">
            <h2 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-4">Traffic Sources</h2>
            {utmData.length > 0 ? (
              <div className="space-y-3">
                {utmData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="font-body text-sm text-charcoal dark:text-dark-text">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 bg-muted-gold rounded-full"
                        style={{ width: `${Math.max(20, (item.count / Math.max(...utmData.map(u => u.count))) * 100)}px` }}
                      />
                      <span className="font-body text-sm text-soft-brown dark:text-dark-muted w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body text-sm text-soft-brown/60 dark:text-dark-muted text-center py-10">No data yet</p>
            )}
          </div>
        </div>

        <p className="text-center font-body text-xs text-soft-brown/40 dark:text-dark-muted/40 mt-8">
          Dashboard for internal use only
        </p>
      </div>
    </div>
  );
}
