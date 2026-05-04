import { useState, useCallback, useEffect } from "react";

const API_KEY = "cac8352b67f24492ac18c7473161860b";

const COLORS = {
  navy: "#1B3A6B",
  white: "#FFFFFF",
  offWhite: "#F5F7FA",
  gray100: "#F0F2F5",
  gray200: "#E2E6EC",
  gray400: "#9AA3B0",
  gray600: "#5A6472",
  gray900: "#1A2330",
  success: "#1A7F4B",
  danger: "#C0392B",
  warning: "#92610A",
  warningBg: "#FEF3C7",
};

const CTA_LINES = {
  Red: { color: "#C8102E", textDark: false, directions: ["Howard", "95th/Dan Ryan"], stops: [
    { name: "Howard", id: "40900" }, { name: "Jarvis", id: "41190" }, { name: "Morse", id: "40100" },
    { name: "Loyola", id: "41300" }, { name: "Granville", id: "40760" }, { name: "Thorndale", id: "40880" },
    { name: "Bryn Mawr", id: "41380" }, { name: "Berwyn", id: "40340" }, { name: "Argyle", id: "41200" },
    { name: "Lawrence", id: "40770" }, { name: "Wilson", id: "40540" }, { name: "Sheridan", id: "40080" },
    { name: "Addison", id: "41420" }, { name: "Belmont", id: "41320" }, { name: "Fullerton", id: "41220" },
    { name: "North/Clybourn", id: "40650" }, { name: "Clark/Division", id: "40630" }, { name: "Chicago", id: "41450" },
    { name: "Grand", id: "40330" }, { name: "Lake", id: "41660" }, { name: "Monroe", id: "41090" },
    { name: "Jackson", id: "40560" }, { name: "Harrison", id: "41490" }, { name: "Cermak-Chinatown", id: "41000" },
    { name: "Sox-35th", id: "40190" }, { name: "47th", id: "41230" }, { name: "Garfield", id: "41170" },
    { name: "63rd", id: "40910" }, { name: "69th", id: "40990" }, { name: "79th", id: "40240" },
    { name: "87th", id: "41430" }, { name: "95th/Dan Ryan", id: "40450" },
  ]},
  Blue: { color: "#00A1DE", textDark: false, directions: ["O'Hare", "Forest Park"], stops: [
    { name: "O'Hare", id: "40890" }, { name: "Rosemont", id: "40820" }, { name: "Cumberland", id: "40230" },
    { name: "Harlem (O'Hare)", id: "40750" }, { name: "Jefferson Park", id: "41280" }, { name: "Montrose", id: "41330" },
    { name: "Irving Park", id: "40550" }, { name: "Addison", id: "41240" }, { name: "Belmont", id: "40060" },
    { name: "Logan Square", id: "41020" }, { name: "California", id: "40570" }, { name: "Western", id: "40670" },
    { name: "Damen", id: "40590" }, { name: "Division", id: "40320" }, { name: "Chicago", id: "41410" },
    { name: "Grand", id: "40490" }, { name: "Clark/Lake", id: "40380" }, { name: "Washington", id: "40370" },
    { name: "Monroe", id: "40790" }, { name: "Jackson", id: "40070" }, { name: "LaSalle", id: "41340" },
    { name: "Clinton", id: "40430" }, { name: "UIC-Halsted", id: "40350" }, { name: "Racine", id: "40470" },
    { name: "Illinois Medical District", id: "40810" }, { name: "Western (Forest Park)", id: "40220" },
    { name: "Kedzie-Homan", id: "40250" }, { name: "Pulaski", id: "40920" }, { name: "Cicero", id: "40970" },
    { name: "Austin", id: "40010" }, { name: "Oak Park", id: "40180" }, { name: "Harlem (Forest Park)", id: "40980" },
    { name: "Forest Park", id: "40390" },
  ]},
  Brown: { color: "#62361B", textDark: false, directions: ["Kimball", "Loop"], stops: [
    { name: "Kimball", id: "41290" }, { name: "Kedzie", id: "41180" }, { name: "Francisco", id: "40870" },
    { name: "Rockwell", id: "41010" }, { name: "Western", id: "41480" }, { name: "Damen", id: "40090" },
    { name: "Montrose", id: "41500" }, { name: "Irving Park", id: "41460" }, { name: "Addison", id: "41440" },
    { name: "Paulina", id: "41310" }, { name: "Southport", id: "40360" }, { name: "Belmont", id: "41320" },
    { name: "Fullerton", id: "41220" }, { name: "Diversey", id: "40530" }, { name: "Wellington", id: "41210" },
    { name: "Armitage", id: "40660" }, { name: "Sedgwick", id: "40800" }, { name: "Chicago", id: "40710" },
    { name: "Merchandise Mart", id: "40460" }, { name: "Clark/Lake", id: "40380" }, { name: "State/Lake", id: "40260" },
    { name: "Washington/Wabash", id: "41700" }, { name: "Adams/Wabash", id: "40680" },
    { name: "Harold Washington Library", id: "40850" }, { name: "LaSalle/Van Buren", id: "40160" },
    { name: "Washington/Wells", id: "40730" }, { name: "Quincy/Wells", id: "40040" },
  ]},
  Green: { color: "#009B3A", textDark: false, directions: ["Harlem/Lake", "Cottage Grove"], stops: [
    { name: "Harlem/Lake", id: "40020" }, { name: "Oak Park", id: "41350" }, { name: "Ridgeland", id: "40610" },
    { name: "Austin", id: "41260" }, { name: "Central", id: "40280" }, { name: "Laramie", id: "40700" },
    { name: "Cicero", id: "40480" }, { name: "Pulaski", id: "40030" }, { name: "Conservatory", id: "41670" },
    { name: "Kedzie", id: "41070" }, { name: "California", id: "41360" }, { name: "Damen", id: "41710" },
    { name: "Ashland", id: "40170" }, { name: "Morgan", id: "41510" }, { name: "Clinton", id: "41160" },
    { name: "Clark/Lake", id: "40380" }, { name: "State/Lake", id: "40260" }, { name: "Washington/Wabash", id: "41700" },
    { name: "Adams/Wabash", id: "40680" }, { name: "Roosevelt", id: "41400" },
    { name: "Cermak-McCormick Place", id: "41690" }, { name: "35th-Bronzeville-IIT", id: "41120" },
    { name: "Indiana", id: "40300" }, { name: "43rd", id: "41270" }, { name: "47th", id: "41080" },
    { name: "51st", id: "40130" }, { name: "Garfield", id: "40510" }, { name: "King Drive", id: "41140" },
    { name: "Halsted", id: "40940" }, { name: "Ashland/63rd", id: "40290" }, { name: "Cottage Grove", id: "40720" },
  ]},
  Orange: { color: "#F9461C", textDark: false, directions: ["Midway", "Loop"], stops: [
    { name: "Midway", id: "40930" }, { name: "Pulaski", id: "40960" }, { name: "Kedzie", id: "41150" },
    { name: "Western", id: "40310" }, { name: "35th/Archer", id: "40120" }, { name: "Ashland", id: "41060" },
    { name: "Halsted", id: "41130" }, { name: "Roosevelt", id: "41400" },
    { name: "Harold Washington Library", id: "40850" }, { name: "LaSalle/Van Buren", id: "40160" },
    { name: "Washington/Wells", id: "40730" }, { name: "Quincy/Wells", id: "40040" },
    { name: "Clark/Lake", id: "40380" }, { name: "State/Lake", id: "40260" },
    { name: "Washington/Wabash", id: "41700" }, { name: "Adams/Wabash", id: "40680" },
  ]},
  Pink: { color: "#E27EA6", textDark: false, directions: ["54th/Cermak", "Loop"], stops: [
    { name: "54th/Cermak", id: "40580" }, { name: "Cicero", id: "40420" }, { name: "Kostner", id: "40600" },
    { name: "Pulaski", id: "40150" }, { name: "Central Park", id: "40780" }, { name: "Kedzie", id: "41040" },
    { name: "California", id: "40440" }, { name: "Western", id: "40740" }, { name: "Damen", id: "40210" },
    { name: "18th", id: "40830" }, { name: "Polk", id: "41030" }, { name: "Ashland", id: "40170" },
    { name: "Morgan", id: "41510" }, { name: "Clinton", id: "41160" }, { name: "Clark/Lake", id: "40380" },
    { name: "State/Lake", id: "40260" }, { name: "Washington/Wabash", id: "41700" },
    { name: "Adams/Wabash", id: "40680" }, { name: "Harold Washington Library", id: "40850" },
    { name: "LaSalle/Van Buren", id: "40160" }, { name: "Washington/Wells", id: "40730" },
    { name: "Quincy/Wells", id: "40040" },
  ]},
  Purple: { color: "#522398", textDark: false, directions: ["Linden", "Loop"], stops: [
    { name: "Linden", id: "41050" }, { name: "Central", id: "41250" }, { name: "Noyes", id: "40400" },
    { name: "Foster", id: "40520" }, { name: "Davis", id: "40050" }, { name: "Dempster", id: "40690" },
    { name: "Main", id: "40270" }, { name: "South Boulevard", id: "40840" }, { name: "Howard", id: "40900" },
    { name: "Wilson", id: "40540" }, { name: "Belmont", id: "41320" }, { name: "Fullerton", id: "41220" },
    { name: "Armitage", id: "40660" }, { name: "Sedgwick", id: "40800" }, { name: "Chicago", id: "40710" },
    { name: "Merchandise Mart", id: "40460" }, { name: "Clark/Lake", id: "40380" },
    { name: "State/Lake", id: "40260" }, { name: "Washington/Wabash", id: "41700" },
    { name: "Adams/Wabash", id: "40680" }, { name: "Harold Washington Library", id: "40850" },
    { name: "LaSalle/Van Buren", id: "40160" }, { name: "Washington/Wells", id: "40730" },
    { name: "Quincy/Wells", id: "40040" },
  ]},
  Yellow: { color: "#F9E300", textDark: true, directions: ["Dempster-Skokie", "Howard"], stops: [
    { name: "Howard", id: "40900" }, { name: "Oakton-Skokie", id: "41680" }, { name: "Dempster-Skokie", id: "40140" },
  ]},
};

const RT_MAP = { Red: "Red", Blue: "Blue", Brown: "Brn", Green: "G", Orange: "Org", Pink: "Pink", Purple: "P", Yellow: "Y" };

async function fetchLiveArrivals(stopId, line) {
  try {
    const rt = RT_MAP[line];
    const url = `/api/cta/ttarrivals.aspx?key=${API_KEY}&mapid=${stopId}&rt=${rt}&outputType=JSON`;
    const res = await fetch(url);
    const data = await res.json();
    const etas = data?.ctatt?.eta;
    if (!etas || etas.length === 0) return { status: "no_service", arrivals: [] };
    const arrivals = etas.map(e => {
      const mins = Math.max(0, Math.round((new Date(e.arrT.replace("T", " ") + " GMT-0500") - new Date()) / 60000));
      return { destNm: e.destNm, _mins: mins, isDly: e.isDly === "1" };
    });
    return { status: "live", arrivals };
  } catch (err) {
    return { status: "error", arrivals: [] };
  }
}

function TopBar({ view, line, stop, onBack }) {
  const ld = CTA_LINES[line];
  const titles = { lines: "Transit Lines", stops: `${line} Line`, arrivals: stop || "", favorites: "Favorites" };
  return (
    <div style={{ background: COLORS.navy, paddingTop: "env(safe-area-inset-top, 16px)" }}>
      <div style={{ padding: "16px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        {view !== "lines" && view !== "favorites" ? (
          <button onClick={onBack} style={{ width:36,height:36,borderRadius:18,background:"rgba(255,255,255,0.15)",border:"none",cursor:"pointer",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>‹</button>
        ) : (
          <div style={{ width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="white"/></svg>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>
            {view === "arrivals" ? `${line} Line` : "CTA Tracker"}
          </div>
          <div style={{ fontSize:22,fontWeight:800,color:"#fff",fontFamily:"'DM Sans',sans-serif",letterSpacing:"-0.01em",lineHeight:1.1 }}>
            {titles[view]}
          </div>
        </div>
        {view === "arrivals" && ld && <div style={{ width:14,height:14,borderRadius:"50%",background:ld.color,border:"2px solid rgba(255,255,255,0.4)",flexShrink:0 }}/>}
      </div>
    </div>
  );
}

function LineCard({ name, data, onSelect }) {
  return (
    <button onClick={() => onSelect(name)} style={{ background:COLORS.white,border:`1.5px solid ${COLORS.gray200}`,borderRadius:16,padding:"16px 18px",cursor:"pointer",textAlign:"left",width:"100%",display:"flex",alignItems:"center",gap:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ width:46,height:46,borderRadius:13,background:data.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 3px 10px ${data.color}55` }}>
        <span style={{ fontSize:14,fontWeight:900,color:data.textDark?"#1A2330":"white",fontFamily:"'DM Sans',sans-serif" }}>{name[0]}</span>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:16,fontWeight:700,color:COLORS.gray900,fontFamily:"'DM Sans',sans-serif" }}>{name} Line</div>
        <div style={{ fontSize:12,color:COLORS.gray400,marginTop:2,fontFamily:"'DM Sans',sans-serif" }}>{data.stops.length} stations</div>
      </div>
      <div style={{ color:COLORS.gray400,fontSize:22,fontWeight:200 }}>›</div>
    </button>
  );
}

function StopRow({ name, lineColor, index, total, onSelect, isFav, onToggleFav }) {
  return (
    <div style={{ display:"flex",alignItems:"stretch",borderBottom:index<total-1?`1px solid ${COLORS.gray100}`:"none" }}>
      <button onClick={onSelect} style={{ flex:1,background:"transparent",border:"none",padding:"0 0 0 20px",cursor:"pointer",display:"flex",alignItems:"stretch",gap:14,textAlign:"left" }}>
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",width:16,flexShrink:0 }}>
          <div style={{ width:2,flex:1,background:lineColor,opacity:index===0?0:0.25,minHeight:12 }}/>
          <div style={{ width:10,height:10,borderRadius:"50%",border:`2.5px solid ${lineColor}`,background:COLORS.white,flexShrink:0,margin:"2px 0" }}/>
          <div style={{ width:2,flex:1,background:lineColor,opacity:index===total-1?0:0.25,minHeight:12 }}/>
        </div>
        <div style={{ flex:1,padding:"13px 0",display:"flex",alignItems:"center" }}>
          <span style={{ fontSize:15,fontWeight:500,color:COLORS.gray900,fontFamily:"'DM Sans',sans-serif" }}>{name}</span>
        </div>
      </button>
      <button onClick={onToggleFav} style={{ padding:"0 16px",background:"transparent",border:"none",cursor:"pointer",fontSize:20,color:"#F59E0B",display:"flex",alignItems:"center" }}>
        {isFav ? "⭐" : "☆"}
      </button>
    </div>
  );
}

function FavoriteCard({ fav, onSelect, onRemove }) {
  const ld = CTA_LINES[fav.line];
  return (
    <div style={{ background:COLORS.white,borderRadius:16,border:`1.5px solid ${COLORS.gray200}`,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ background:ld.color,padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:20,height:20,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontSize:10,fontWeight:900,color:ld.textDark?"#1A2330":"white",fontFamily:"'DM Sans',sans-serif" }}>{fav.line[0]}</span>
          </div>
          <span style={{ fontSize:11,fontWeight:700,color:ld.textDark?"rgba(0,0,0,0.6)":"rgba(255,255,255,0.85)",letterSpacing:"0.06em",fontFamily:"'DM Sans',sans-serif" }}>{fav.line.toUpperCase()} LINE</span>
        </div>
        <button onClick={onRemove} style={{ background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:ld.textDark?"#1A2330":"white",fontWeight:700 }}>✕</button>
      </div>
      <button onClick={onSelect} style={{ width:"100%",background:"transparent",border:"none",padding:"14px 16px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:17,fontWeight:700,color:COLORS.gray900,fontFamily:"'DM Sans',sans-serif" }}>{fav.stopName}</div>
          <div style={{ fontSize:12,color:COLORS.gray400,marginTop:2,fontFamily:"'DM Sans',sans-serif" }}>Tap to see arrivals</div>
        </div>
        <div style={{ fontSize:22,color:COLORS.gray400,fontWeight:200 }}>›</div>
      </button>
    </div>
  );
}

function DirectionColumn({ label, arrivals, lineColor }) {
  const urgent = arrivals[0]?._mins <= 2;
  return (
    <div style={{ flex:1,background:COLORS.white,borderRadius:16,overflow:"hidden",border:`1.5px solid ${urgent?lineColor+"66":COLORS.gray200}`,boxShadow:"0 1px 5px rgba(0,0,0,0.07)" }}>
      <div style={{ background:lineColor,padding:"10px 12px",display:"flex",alignItems:"center",gap:6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5"/>
          <path d="M8 12h8M14 8l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div style={{ fontSize:11,fontWeight:800,color:"white",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>
          To {label}
        </div>
      </div>
      {arrivals.length === 0 ? (
        <div style={{ padding:"16px 12px",textAlign:"center" }}>
          <div style={{ fontSize:18,marginBottom:4 }}>🌙</div>
          <div style={{ fontSize:11,fontWeight:600,color:COLORS.gray600,fontFamily:"'DM Sans',sans-serif" }}>No service</div>
          <div style={{ fontSize:10,color:COLORS.gray400,marginTop:2,fontFamily:"'DM Sans',sans-serif",lineHeight:1.4 }}>Check back during operating hours</div>
        </div>
      ) : (
        arrivals.slice(0,3).map((a,i) => {
          const isUrgent = a._mins <= 2;
          return (
            <div key={i} style={{ padding:"12px",borderBottom:i<Math.min(arrivals.length,3)-1?`1px solid ${COLORS.gray100}`:"none",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <div style={{ fontSize:11,color:a.isDly?COLORS.danger:isUrgent?lineColor:COLORS.gray600,fontWeight:600,fontFamily:"'DM Sans',sans-serif" }}>
                {a.isDly?"Delayed":isUrgent?"Now":"Scheduled"}
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:a._mins<=0?13:22,fontWeight:800,color:a.isDly?COLORS.danger:isUrgent?lineColor:COLORS.gray900,fontFamily:"'DM Sans',sans-serif",lineHeight:1,letterSpacing:"-0.02em" }}>
                  {a._mins<=0?"Due":a._mins}
                </div>
                {a._mins>0&&<div style={{ fontSize:9,color:COLORS.gray400,fontFamily:"'DM Sans',sans-serif" }}>min</div>}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default function CTATracker() {
  const [view, setView] = useState("lines");
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [serviceStatus, setServiceStatus] = useState("live");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cta-favorites") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cta-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const timeStr = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });

  const load = useCallback(async (stopObj, line) => {
    setLoading(true);
    const result = await fetchLiveArrivals(stopObj.id, line);
    setServiceStatus(result.status);
    setArrivals(result.arrivals);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  const selectLine = l => { setSelectedLine(l); setView("stops"); };
  const selectStop = (stopObj, line) => {
    const l = line || selectedLine;
    setSelectedLine(l);
    setSelectedStop(stopObj);
    setView("arrivals");
    load(stopObj, l);
  };
  const goBack = () => {
    if (view==="arrivals") { setView("stops"); setArrivals([]); }
    else if (view==="stops") { setView("lines"); setSelectedLine(null); }
  };

  const favKey = (line, stopId) => `${line}:${stopId}`;
  const isFav = (line, stopId) => favorites.some(f => f.key === favKey(line, stopId));
  const toggleFav = (line, stopObj) => {
    const key = favKey(line, stopObj.id);
    if (isFav(line, stopObj.id)) {
      setFavorites(prev => prev.filter(f => f.key !== key));
    } else {
      setFavorites(prev => [...prev, { key, line, stopId: stopObj.id, stopName: stopObj.name }]);
    }
  };
  const removeFav = key => setFavorites(prev => prev.filter(f => f.key !== key));

  const ld = selectedLine ? CTA_LINES[selectedLine] : null;
  const [dir1, dir2] = ld?.directions || ["",""];
  const col1 = arrivals.filter(a => a.destNm.toLowerCase().includes(dir1.split("/")[0].toLowerCase()) || a.destNm.toLowerCase().includes(dir1.split(" ")[0].toLowerCase()));
  const col2 = arrivals.filter(a => !col1.includes(a));
  const statusDisplay = { live:"🟢 Live", no_service:"🌙 No service", error:"⚠️ Error" }[serviceStatus] || "...";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
        html,body{background:${COLORS.offWhite};}
        ::-webkit-scrollbar{display:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.35}50%{opacity:0.75}}
        .enter{animation:fadeUp 0.22s ease forwards;}
      `}</style>
      <div style={{ minHeight:"100svh",background:COLORS.offWhite,maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif" }}>
        <TopBar view={view} line={selectedLine} stop={selectedStop?.name} onBack={goBack}/>
        <div style={{ background:COLORS.navy,height:22,borderRadius:"0 0 24px 24px",zIndex:1,position:"relative" }}/>

        <div style={{ flex:1,overflowY:"auto",padding:"14px 16px 40px",zIndex:2,position:"relative" }}>

          {/* LINES */}
          {view==="lines" && (
            <div>
              <div style={{ background:COLORS.white,borderRadius:14,padding:"11px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:8,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:`1px solid ${COLORS.gray200}` }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:COLORS.success }}/>
                <span style={{ fontSize:13,color:COLORS.gray600,fontWeight:500 }}>Live Data Ready · {timeStr}</span>
              </div>
              <div style={{ fontSize:11,fontWeight:700,color:COLORS.gray400,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:10,paddingLeft:2 }}>Select a line</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {Object.entries(CTA_LINES).map(([name,data],i)=>(
                  <div key={name} className="enter" style={{ animationDelay:`${i*35}ms`,animationFillMode:"both" }}>
                    <LineCard name={name} data={data} onSelect={selectLine}/>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAVORITES */}
          {view==="favorites" && (
            <div>
              {favorites.length === 0 ? (
                <div style={{ textAlign:"center",padding:"60px 20px" }}>
                  <div style={{ fontSize:48,marginBottom:16 }}>⭐</div>
                  <div style={{ fontSize:18,fontWeight:700,color:COLORS.gray900,marginBottom:8,fontFamily:"'DM Sans',sans-serif" }}>No favorites yet</div>
                  <div style={{ fontSize:14,color:COLORS.gray400,lineHeight:1.6,fontFamily:"'DM Sans',sans-serif" }}>
                    Go to any line, tap a station, and press the ☆ star to save it here for quick access.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:11,fontWeight:700,color:COLORS.gray400,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:10,paddingLeft:2 }}>Your saved stations</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    {favorites.map((fav,i) => (
                      <div key={fav.key} className="enter" style={{ animationDelay:`${i*40}ms`,animationFillMode:"both" }}>
                        <FavoriteCard
                          fav={fav}
                          onSelect={() => {
                            const stopObj = { id: fav.stopId, name: fav.stopName };
                            selectStop(stopObj, fav.line);
                          }}
                          onRemove={() => removeFav(fav.key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STOPS */}
          {view==="stops" && ld && (
            <div>
              <div style={{ background:ld.color,borderRadius:16,padding:"14px 18px",marginBottom:16,boxShadow:`0 4px 16px ${ld.color}50`,display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11,fontWeight:600,letterSpacing:"0.09em",textTransform:"uppercase",color:ld.textDark?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.6)" }}>Chicago Transit Authority</div>
                  <div style={{ fontSize:24,fontWeight:900,color:ld.textDark?"#1A2330":"white",letterSpacing:"-0.02em",lineHeight:1.1 }}>{selectedLine} Line</div>
                </div>
                <div style={{ fontSize:13,color:ld.textDark?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.6)",fontWeight:600 }}>{ld.stops.length} stations</div>
              </div>
              <div style={{ fontSize:11,fontWeight:700,color:COLORS.gray400,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:10,paddingLeft:2 }}>Select a station · ☆ to favorite</div>
              <div style={{ background:COLORS.white,borderRadius:16,overflow:"hidden",boxShadow:"0 1px 5px rgba(0,0,0,0.07)",border:`1px solid ${COLORS.gray200}` }}>
                {ld.stops.map((stop,i)=>(
                  <StopRow
                    key={stop.id}
                    name={stop.name}
                    lineColor={ld.color}
                    index={i}
                    total={ld.stops.length}
                    onSelect={()=>selectStop(stop)}
                    isFav={isFav(selectedLine, stop.id)}
                    onToggleFav={()=>toggleFav(selectedLine, stop)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ARRIVALS */}
          {view==="arrivals" && ld && (
            <div>
              <div style={{ background:COLORS.white,borderRadius:16,padding:"16px 18px",marginBottom:16,boxShadow:"0 1px 6px rgba(0,0,0,0.08)",border:`1px solid ${COLORS.gray200}`,display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:46,height:46,borderRadius:13,background:ld.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 3px 10px ${ld.color}44` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={ld.textDark?"#1A2330":"white"}/>
                    <circle cx="12" cy="9" r="2" fill={ld.color} stroke={ld.textDark?"#1A2330":"white"} strokeWidth="1.5"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:19,fontWeight:800,color:COLORS.gray900,letterSpacing:"-0.01em" }}>{selectedStop?.name}</div>
                  <div style={{ fontSize:12,color:COLORS.gray400,marginTop:2 }}>
                    {selectedLine} Line · {statusDisplay}{lastRefresh?` · ${lastRefresh.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}` : ""}
                  </div>
                </div>
                <button onClick={()=>toggleFav(selectedLine, selectedStop)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:24,padding:"0 4px" }}>
                  {isFav(selectedLine, selectedStop?.id) ? "⭐" : "☆"}
                </button>
              </div>

              {serviceStatus === "no_service" && (
                <div style={{ background:COLORS.warningBg,borderRadius:14,padding:"14px 16px",marginBottom:14,display:"flex",gap:12,alignItems:"flex-start",border:`1px solid #FCD34D` }}>
                  <span style={{ fontSize:20,flexShrink:0 }}>🌙</span>
                  <div>
                    <div style={{ fontSize:13,fontWeight:700,color:COLORS.warning,fontFamily:"'DM Sans',sans-serif" }}>No trains currently running</div>
                    <div style={{ fontSize:12,color:COLORS.warning,marginTop:3,lineHeight:1.5,fontFamily:"'DM Sans',sans-serif" }}>
                      The {selectedLine} Line is not in service at this time. Most CTA lines run daily from around 4 AM to 1 AM. The Red and Blue lines run 24 hours.
                    </div>
                  </div>
                </div>
              )}

              {serviceStatus !== "no_service" && (
                <>
                  <div style={{ fontSize:11,fontWeight:700,color:COLORS.gray400,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:10,paddingLeft:2 }}>Next arrivals</div>
                  {loading ? (
                    <div style={{ display:"flex",gap:10 }}>
                      {[0,1].map(i=><div key={i} style={{ flex:1,background:COLORS.white,borderRadius:16,height:180,border:`1px solid ${COLORS.gray200}`,animation:`pulse 1.3s ease infinite`,animationDelay:`${i*0.18}s` }}/>)}
                    </div>
                  ) : (
                    <div className="enter" style={{ display:"flex",gap:10 }}>
                      <DirectionColumn label={dir1} arrivals={col1} lineColor={ld.color}/>
                      <DirectionColumn label={dir2} arrivals={col2} lineColor={ld.color}/>
                    </div>
                  )}
                </>
              )}

              <button onClick={()=>load(selectedStop,selectedLine)} style={{ width:"100%",marginTop:14,padding:"15px",background:COLORS.navy,border:"none",borderRadius:14,color:"white",fontSize:15,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer" }}>
                Refresh Arrivals
              </button>
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <div style={{ background:COLORS.white,borderTop:`1px solid ${COLORS.gray200}`,display:"flex",paddingBottom:"env(safe-area-inset-bottom,8px)" }}>
          {[
            { icon:"🚇", label:"Lines", v:"lines" },
            { icon:"⭐", label:"Favorites", v:"favorites" },
            { icon:"⚙️", label:"Settings", v:"settings" },
          ].map(t=>(
            <button key={t.v} onClick={()=>{ if(t.v==="lines"||t.v==="favorites") { setView(t.v); if(t.v==="lines"){ setSelectedLine(null); setSelectedStop(null); } } }} style={{ flex:1,padding:"10px 0",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
              <span style={{ fontSize:22 }}>{t.icon}</span>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.03em",fontFamily:"'DM Sans',sans-serif",color:(view===t.v||(t.v==="lines"&&(view==="stops"||view==="arrivals")))?COLORS.navy:COLORS.gray400 }}>{t.label}</span>
              {(view===t.v||(t.v==="lines"&&(view==="stops"||view==="arrivals")))&&<div style={{ width:4,height:4,borderRadius:"50%",background:COLORS.navy }}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
