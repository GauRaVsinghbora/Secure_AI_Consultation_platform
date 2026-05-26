import { useEffect, useState, useRef } from "react";
import { getUserStats, searchChats } from "../api/chatApi";

function ProfilePopup({ open, onClose, user, email }) {
  const [stats, setStats] = useState({ totalChats: 0, totalMessages: 0 });
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const scrollTimer = useRef(null);

  useEffect(() => {
    if (!open) return;
    const fetchStats = async () => {
      try {
        const res = await getUserStats();
        setStats(res.data.data);
      } catch (err) {
        console.error("Stats error:", err);
      }
    };
    fetchStats();
  }, [open]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.classList.add("scroll-active");
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      el.classList.remove("scroll-active");
    }, 800);
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      setLoading(true);
      const res = await searchChats(search);
      setResults(res.data.data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const initials = user
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[10px] px-4">
      <div className="relative w-full max-w-[440px] rounded-[20px] border border-white/10 bg-black/80 backdrop-blur-[500px] shadow-2xl p-7 text-white">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-[18px] right-[18px] w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          ✕
        </button>

        {/* Label */}
        <p className="text-xs tracking-widest uppercase text-white/35 font-medium mb-5">
          Profile
        </p>

        {/* User info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-[52px] h-[52px] rounded-full border border-white/15 bg-white/10 flex items-center justify-center text-lg font-semibold text-white/90 shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[17px] font-medium text-white truncate">{user}</p>
            <p className="text-[14px] text-white/45 mt-1 truncate">{email}</p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] mb-5" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/5 border border-white/[0.09] rounded-[14px] px-4 py-4">
            <p className="text-[12px] uppercase tracking-widest text-white/35 mb-1.5">Sessions</p>
            <p className="text-[26px] font-medium">{stats.totalChats}</p>
          </div>
          <div className="bg-white/5 border border-white/[0.09] rounded-[14px] px-4 py-4">
            <p className="text-[12px] uppercase tracking-widest text-white/35 mb-1.5">Messages</p>
            <p className="text-[26px] font-medium">{stats.totalMessages}</p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] mb-5" />

        {/* Search */}
        <div className="flex gap-2.5 mb-3.5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search chat history..."
            className="flex-1 min-w-0 bg-white/[0.06] border border-white/10 focus:border-white/25 rounded-[11px] px-3.5 py-[11px] text-[15px] text-white placeholder-white/30 outline-none transition-colors"
          />
          <button
            onClick={handleSearch}
            className="px-[18px] py-[11px] bg-white/10 hover:bg-white/15 border border-white/15 rounded-[11px] text-[15px] text-white/85 transition-colors whitespace-nowrap shrink-0"
          >
            Search
          </button>
        </div>

        {/* Results */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-36 overflow-y-auto scrollbar-thin"
        >
          {loading && <p className="text-[14px] text-white/35 py-3">Searching…</p>}
          {!loading && results.length === 0 && search && (
            <p className="text-[14px] text-white/30 py-3">No results found</p>
          )}
          {results.map((msg, i) => (
            <div key={i} className="py-3 border-b border-white/[0.07] last:border-0">
              <p className="text-[14px] text-white/55 leading-relaxed">{msg.content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProfilePopup;