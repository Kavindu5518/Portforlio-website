import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const DATA = {
  name: "Kavindu Sachintha Karunagoda",
  title: "Intern Software Engineer",
  location: "Negombo, Sri Lanka",
  phone: "(+94) 764 610 634",
  email: "kavindusachintha2001n@gmail.com",
  summary: "Enthusiastic Software Engineering student with hands-on experience in full-stack web development, mobile application development, and software testing. Currently exploring Machine Learning to build AI-driven solutions.",
  skills: [
    { cat: "Languages",     items: ["Java", "C++", "Python"] },
    { cat: "Web Dev",       items: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "Node.js", "Next.js", "React"] },
    { cat: "Mobile",        items: ["Flutter", "Dart", "Android / Java"] },
    { cat: "Databases",     items: ["MySQL", "Firebase", "MongoDB"] },
    { cat: "Testing & QA",  items: ["Selenium WebDriver", "Apache JMeter", "Manual Testing", "Automation Testing", "Jira", "Postman"] },
    { cat: "UI/UX & Tools", items: ["Figma", "Canva", "Git", "GitHub", "VS Code", "Android Studio", "Draw.io"] },
  ],
  education: [
    { date: "2022 – Present", degree: "BSc (Hons) Information Systems",       org: "Eastern University Sri Lanka",       desc: "Data Structures, OOP, Mobile Computing, Web Dev, Networking, OS" },
    { date: "2025 – Present", degree: "Web & Mobile Development Course",       org: "MIHA Institute",                     desc: "" },
    { date: "2023 – 2024",    degree: "Advanced Diploma in Financial Markets", org: "CSE Academy",                        desc: "" },
    { date: "2018 – 2020",    degree: "Advanced Level – ART Stream",           org: "Bandaranayake College, Gampaha",     desc: "" },
    { date: "2020",           degree: "Visharad Exam – First Division",        org: "Bhatkhande Sangit Vidyapith Lucknow",desc: "" },
  ],
  projects: [
    { title: "Canteen Management System",  status: "Ongoing",   desc: "Automated canteen system with stock level prediction, online payments, and real-time operations management.", stack: ["React","Next.js","Firebase","JavaScript"], github: "https://github.com/Kavindu5518/Canteen-Management-System", live: null,                       accent: "#f59e0b" },
    { title: "Ridex — Motorcycle Tracker", status: "Ongoing",   desc: "Motorcycle tracking web application to help riders log day-to-day activities including service records, trips, and more.", stack: ["React","Next.js","Firebase"],            github: "https://github.com/Kavindu5518/Motorbike-Tracker",                        live: null,                       accent: "#f97316" },
    { title: "Online Lawyer Connect",      status: "Completed", desc: "Feature-rich platform for online lawyer booking, ratings, and real-time live-chat between users and lawyers.", stack: ["Flutter","Dart","Firebase","Firestore"],  github: null,                                                    live: null,                       accent: "#10b981" },
    { title: "Ashasha Villa Website",      status: "Completed", desc: "Group project — full responsive official website for a villa property with modern UI and booking integration.",  stack: ["HTML","CSS","JavaScript"],              github: null,                                                    live: "https://ashashavilla.com", accent: "#38bdf8" },
    { title: "Hotel AYOWA Website",        status: "Completed", desc: "Professional hotel website with clean layout, responsive design, and engaging visual presentation.",             stack: ["HTML","CSS","JavaScript"],              github: "https://github.com/Kaveesha-Devs/Hotel-Ayowa",          live: null,                       accent: "#a78bfa" },
  ],
  certs: [
    { title: "Database Management System",           org: "Suhurusara · Nov 2025" },
    { title: "AI/ML Engineer Certification",         org: "SLITT · In Progress" },
    { title: "Python for Beginners",                 org: "University of Moratuwa" },
    { title: "Web Design for Beginners",             org: "University of Moratuwa" },
    { title: "Mobile App & Web Dev — IDEALIZE 2024", org: "AIESEC @ Uni of Moratuwa" },
    { title: "Professional Video Color Grading",     org: "Artistify Academy · 2025" },
  ],
  extras: [
    "Member of Student Union — Trincomalee Campus",
    "Active Organizer — Skill Expo Exhibition",
    "Active Member — Innovative Project Team",
    "Former Member — Art Society, Bandaranayake College",
    "All Island Music Instrumental Championship 2019",
  ],
  softSkills: ["Problem-solving","Analytical thinking","Creativity","Collaboration","Leadership","Adaptability","Communication","Time management"],
};

const QUALITY_CARDS = [
  { icon:"⚡", title:"Problem Solver",  desc:"Breaking complex challenges into elegant, scalable solutions.", color:"#38bdf8" },
  { icon:"🎨", title:"UI/UX Thinker",   desc:"Crafting interfaces that are as beautiful as functional.", color:"#a78bfa" },
  { icon:"🤝", title:"Team Leader",     desc:"Student Union member who organizes, collaborates and drives results.", color:"#10b981" },
  { icon:"🔬", title:"QA Engineer",     desc:"Quality through Selenium, JMeter and meticulous testing.", color:"#f59e0b" },
  { icon:"📱", title:"Mobile Dev",      desc:"Cross-platform apps with Flutter and Android (Java/Dart).", color:"#fb7185" },
  { icon:"🧠", title:"ML Explorer",     desc:"Studying AI/ML to build intelligent, data-driven solutions.", color:"#34d399" },
  { icon:"🎵", title:"Creative Soul",   desc:"All Island Music Instrumental Champion — art fuels engineering.", color:"#fbbf24" },
  { icon:"🚀", title:"Fast Learner",    desc:"Adapting quickly to new frameworks, tools and tech stacks.", color:"#60a5fa" },
];

/* ═══════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════ */
const T = {
  bg:       "#090e1a",
  bgAlt:    "#0d1424",
  surface:  "#111827",
  border:   "rgba(56,189,248,0.1)",
  borderDk: "rgba(56,189,248,0.25)",
  ink:      "#f0f6ff",
  inkMid:   "#94a3b8",
  inkMuted: "#475569",
  gold:     "#38bdf8",
  dark:     "#060a12",
};

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false, isDesktop: true, w: 1200 });
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w });
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);
  return bp;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useTypewriter(words, speed = 78) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const word  = words[wIdx];
    const delay = del ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(word.slice(0, cIdx + 1));
        if (cIdx + 1 === word.length) setTimeout(() => setDel(true), 2000);
        else setCIdx(c => c + 1);
      } else {
        setDisplay(word.slice(0, cIdx - 1));
        if (cIdx - 1 === 0) { setDel(false); setWIdx(i => (i+1)%words.length); setCIdx(0); }
        else setCIdx(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed]);
  return display;
}

function useMousePos() {
  const [p, setP] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const h = e => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return p;
}

/* ═══════════════════════════════════════════════════════
   CURSOR  (desktop only)
═══════════════════════════════════════════════════════ */
function Cursor() {
  const { isDesktop } = useBreakpoint();
  const pos = useMousePos();
  const lag = useRef({ x: -200, y: -200 });
  const [lagPos, setLagPos] = useState({ x: -200, y: -200 });
  const [hov, setHov] = useState(false);
  const [clk, setClk] = useState(false);

  useEffect(() => {
    let raf;
    const loop = () => {
      lag.current.x += (pos.x - lag.current.x) * 0.1;
      lag.current.y += (pos.y - lag.current.y) * 0.1;
      setLagPos({ x: lag.current.x, y: lag.current.y });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  useEffect(() => {
    const ov = e => setHov(!!e.target.closest("a,button,[data-hover]"));
    const dn = () => setClk(true);
    const up = () => setClk(false);
    window.addEventListener("mouseover", ov);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mouseover", ov); window.removeEventListener("mousedown", dn); window.removeEventListener("mouseup", up); };
  }, []);

  if (!isDesktop) return null;
  return (
    <>
      <div style={{ position:"fixed", left:lagPos.x, top:lagPos.y, pointerEvents:"none", zIndex:99999, width:hov?46:30, height:hov?46:30, borderRadius:"50%", border:`1.5px solid ${hov?T.gold:"rgba(56,189,248,0.3)"}`, transform:"translate(-50%,-50%)", transition:"width .22s,height .22s,border-color .18s", mixBlendMode:"screen" }}/>
      <div style={{ position:"fixed", left:pos.x, top:pos.y, pointerEvents:"none", zIndex:99999, width:clk?3:5, height:clk?3:5, background:T.gold, borderRadius:"50%", transform:"translate(-50%,-50%)", transition:"width .1s,height .1s" }}/>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   REVEAL
═══════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, y = 24 }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":`translateY(${y}px)`, transition:`opacity .7s ease ${delay}s,transform .7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TILT CARD  (desktop only)
═══════════════════════════════════════════════════════ */
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const { isDesktop } = useBreakpoint();
  const mv = e => {
    if (!isDesktop) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateZ(6px)`;
    ref.current.style.boxShadow = `${-x*14}px ${-y*14}px 44px rgba(0,0,0,0.3)`;
  };
  const lv = () => { ref.current.style.transform = ""; ref.current.style.boxShadow = ""; };
  return (
    <div ref={ref} onMouseMove={mv} onMouseLeave={lv} style={{ transition:"transform .12s ease,box-shadow .3s ease", ...style }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════ */
const NAV_ITEMS = ["home","about","skills","education","projects","certifications","contact"];

function Nav({ active }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        height: isMobile ? 56 : 62,
        padding: isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled || menuOpen ? "rgba(9,14,26,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition:"all .4s ease",
      }}>
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
          data-hover
          style={{ background:"none", border:"none", cursor:"none", padding:0, display:"flex", alignItems:"center" }}
        >
          <img src="/logo.png" alt="Logo" style={{ height:"36px", width:"auto", objectFit:"contain" }}/>
        </button>

        {/* Desktop nav */}
        {!isMobile && !isTablet && (
          <div style={{ display:"flex", gap:28 }}>
            {NAV_ITEMS.map(s => (
              <button key={s} onClick={() => go(s)} data-hover style={{ background:"none", border:"none", cursor:"none", fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:active===s?T.gold:T.inkMuted, borderBottom:`1.5px solid ${active===s?T.gold:"transparent"}`, paddingBottom:2, transition:"color .2s,border-color .2s" }}>{s}</button>
            ))}
          </div>
        )}

        {/* Tablet nav */}
        {isTablet && (
          <div style={{ display:"flex", gap:18 }}>
            {["home","about","skills","projects","contact"].map(s => (
              <button key={s} onClick={() => go(s)} data-hover style={{ background:"none", border:"none", cursor:"none", fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:active===s?T.gold:T.inkMuted, borderBottom:`1.5px solid ${active===s?T.gold:"transparent"}`, paddingBottom:2, transition:"color .2s" }}>{s}</button>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", flexDirection:"column", gap:5 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:"block", width:22, height:1.5, background:T.gold, borderRadius:2,
                transform: menuOpen ? (i===0?"rotate(45deg) translate(4.5px,4.5px)": i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"scaleX(0)") : "none",
                transition:"transform .3s ease",
              }}/>
            ))}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div style={{
          position:"fixed", top:56, left:0, right:0, zIndex:999,
          background:"rgba(9,14,26,0.98)", backdropFilter:"blur(20px)",
          borderBottom:`1px solid ${T.border}`,
          maxHeight: menuOpen ? 400 : 0, overflow:"hidden",
          transition:"max-height .4s ease",
        }}>
          {NAV_ITEMS.map(s => (
            <button key={s} onClick={() => go(s)} style={{
              display:"block", width:"100%", background:"none", border:"none", cursor:"pointer",
              padding:"16px 24px", textAlign:"left",
              fontFamily:"'DM Mono',monospace", fontSize:".8rem", letterSpacing:".15em", textTransform:"uppercase",
              color: active===s ? T.gold : T.inkMid,
              borderBottom:`1px solid ${T.border}`,
            }}>{s}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════ */
function SectionHeader({ sub, title }) {
  return (
    <Reveal>
      <div style={{ marginBottom:48 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", letterSpacing:".2em", textTransform:"uppercase", color:T.gold, marginBottom:10, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ display:"inline-block", width:24, height:1, background:T.gold }}/>
          {sub}
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:700, color:T.ink, letterSpacing:"-.02em", lineHeight:1.1 }}>{title}</h2>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function HeroBtn({ children, primary, onClick }) {
  const [hov, setHov] = useState(false);
  const { isMobile } = useBreakpoint();
  return (
    <button onClick={onClick} data-hover
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:"'DM Mono',monospace", fontSize: isMobile?".7rem":".72rem",
        letterSpacing:".1em", textTransform:"uppercase",
        padding: isMobile?"11px 24px":"13px 32px", borderRadius:2, cursor:"pointer",
        background: primary ? (hov?"linear-gradient(135deg,#7dd3fc,#38bdf8)":"linear-gradient(135deg,#38bdf8,#0ea5e9)") : "transparent",
        color:  primary ? "#060a12" : (hov?"#38bdf8":T.inkMid),
        border: primary ? "none" : `1.5px solid ${hov?"#38bdf8":T.borderDk}`,
        boxShadow: primary&&hov ? "0 0 28px rgba(56,189,248,0.35)" : "none",
        fontWeight: primary ? 600 : 400,
        transition:"all .22s ease",
        flex: isMobile ? "1 1 auto" : "none",
      }}>{children}</button>
  );
}

function Hero() {
  const typed = useTypewriter(["Full-Stack Developer","Mobile App Engineer","QA Automation Tester","UI/UX Enthusiast","ML Explorer"]);
  const [on, setOn] = useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  const anim = (d) => ({
    opacity: on?1:0,
    transform: on?"translateY(0)":"translateY(20px)",
    transition: `opacity .8s ease ${d}s,transform .8s ease ${d}s`,
  });

  const showPhoto = isDesktop;
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";

  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:`80px ${px} ${isMobile?"60px":"0"}`, position:"relative", overflow:"hidden", background:T.bg }}>
      {/* Background layers */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(56,189,248,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.03) 1px,transparent 1px)`, backgroundSize:"60px 60px" }}/>
      <div style={{ position:"absolute", right:"-10%", top:"20%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(56,189,248,0.06) 0%,transparent 65%)", pointerEvents:"none" }}/>
      {!isMobile && <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1, background:`linear-gradient(to right,transparent,rgba(56,189,248,0.08) 30%,rgba(56,189,248,0.08) 70%,transparent)`, opacity:.5 }}/>}

      {/* Photo — desktop only, right side */}
      {showPhoto && (
        <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", zIndex:2, pointerEvents:"none" }}>
          <div style={{ position:"absolute", inset:-3, borderRadius:"50% 42% 56% 44%/48% 50% 50% 52%", background:"linear-gradient(135deg,rgba(56,189,248,0.5),rgba(14,165,233,0.2),transparent 60%)", animation:"morphRing 8s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", inset:-16, borderRadius:"50% 42% 56% 44%/48% 50% 50% 52%", border:"1px solid rgba(56,189,248,0.15)", animation:"morphRing 10s ease-in-out infinite reverse" }}/>
          <div style={{ position:"relative", zIndex:1, width:"clamp(260px,26vw,400px)", height:"clamp(300px,30vw,460px)", borderRadius:"50% 42% 56% 44%/48% 50% 50% 52%", overflow:"hidden", border:"2px solid rgba(56,189,248,0.2)", boxShadow:"0 0 60px rgba(56,189,248,0.12),0 32px 80px rgba(0,0,0,0.5)", animation:"morphPhoto 8s ease-in-out infinite" }}>
            <img src="/kavindu.png" alt="Kavindu Sachintha Karunagoda" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"brightness(0.95) contrast(1.05)" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 60%,rgba(9,14,26,0.4))" }}/>
          </div>
          <div style={{ position:"absolute", bottom:24, left:-36, background:"rgba(17,24,39,0.95)", backdropFilter:"blur(12px)", border:"1px solid rgba(56,189,248,0.2)", borderRadius:10, padding:"10px 18px", zIndex:2, boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", color:"#38bdf8", letterSpacing:".12em", marginBottom:3 }}>STATUS</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".76rem", color:"#f0f6ff", fontWeight:500, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 6px #10b981", animation:"blink 2s step-end infinite" }}/>
              Open to Internship
            </div>
          </div>
        </div>
      )}

      {/* Text content */}
      <div style={{ position:"relative", zIndex:2, maxWidth: isDesktop?"580px": isTablet?"600px":"100%" }}>

        {/* Tablet/Mobile: small photo above name */}
        {!isDesktop && (
          <div style={{ ...anim(0.05), marginBottom:28, display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(56,189,248,0.3)", boxShadow:"0 0 20px rgba(56,189,248,0.15)", flexShrink:0 }}>
              <img src="/kavindu.png" alt="Kavindu" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}/>
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", letterSpacing:".15em", textTransform:"uppercase", color:T.gold }}>
              Software Engineer · Intern
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:5 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 6px #10b981", animation:"blink 2s step-end infinite" }}/>
                <span style={{ color:T.inkMid, fontSize:".62rem" }}>Open to Internship</span>
              </div>
            </div>
          </div>
        )}

        {/* Desktop eyebrow */}
        {isDesktop && (
          <div style={{ ...anim(.1), fontFamily:"'DM Mono',monospace", fontSize:".72rem", letterSpacing:".18em", textTransform:"uppercase", color:T.gold, marginBottom:22, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ width:22, height:1, background:T.gold, display:"inline-block" }}/>
            Software Engineer · Intern
          </div>
        )}

        {/* Name */}
        <h1 style={{ ...anim(.2), fontFamily:"'Playfair Display',serif", fontSize:`clamp(${isMobile?"2rem":"2.4rem"},${isMobile?"9vw":"7vw"},5.5rem)`, fontWeight:700, color:T.ink, lineHeight:.94, letterSpacing:"-.03em", marginBottom:18 }}>
          Kavindu<br/>
          Sachintha<br/>
          <span style={{ fontStyle:"italic", color:"#38bdf8" }}>Karunagoda</span>
        </h1>

        {/* Typewriter */}
        <div style={{ ...anim(.35), fontFamily:"'DM Mono',monospace", fontSize:`clamp(.82rem,${isMobile?"3.5vw":"1.8vw"},1.15rem)`, color:T.inkMid, marginBottom:24, minHeight:30 }}>
          — {typed}<span style={{ animation:"blink 1s step-end infinite", color:T.gold }}>|</span>
        </div>

        {/* Summary */}
        <p style={{ ...anim(.45), fontFamily:"'DM Sans',sans-serif", maxWidth:510, lineHeight:1.85, color:T.inkMuted, marginBottom:36, fontSize:`clamp(.85rem,${isMobile?"3.5vw":"1.4vw"},.94rem)` }}>
          {DATA.summary}
        </p>

        {/* CTAs */}
        <div style={{ ...anim(.55), display:"flex", gap:12, flexWrap:"wrap", width: isMobile?"100%":"auto" }}>
          <HeroBtn primary onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}>View Projects</HeroBtn>
          <HeroBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>Get In Touch</HeroBtn>
        </div>

        {/* Stats */}
        <div style={{ ...anim(.7), display:"flex", gap: isMobile?24:44, marginTop: isMobile?36:60, paddingTop: isMobile?24:32, borderTop:`1px solid ${T.border}`, flexWrap:"wrap" }}>
          {[["4+","Projects"],["5+","Certificates"],["3+","Years"],["10+","Technologies"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile?"1.6rem":"2.1rem", fontWeight:700, color:T.ink, lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:T.inkMuted, textTransform:"uppercase", letterSpacing:".1em", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:2 }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".55rem", color:T.inkMuted, letterSpacing:".15em" }}>SCROLL</span>
        <div style={{ width:1, height:30, background:`linear-gradient(to bottom,${T.gold},transparent)`, animation:"scrollPulse 2s ease-in-out infinite" }}/>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════ */
function QualityCard({ card, index }) {
  const [ref, vis] = useInView(0.08);
  const [hov, setHov] = useState(false);
  const { isMobile } = useBreakpoint();
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`opacity .6s ease ${index*.07}s,transform .6s ease ${index*.07}s,background .25s,border-color .25s`, background:hov?`${card.color}0f`:T.surface, border:`1px solid ${hov?card.color+"50":T.border}`, borderRadius:12, padding: isMobile?"18px 16px":"22px 20px", position:"relative", overflow:"hidden", cursor:"default" }}>
      <div style={{ position:"absolute", top:-28, left:-28, width:72, height:72, borderRadius:"50%", background:`radial-gradient(circle,${card.color}20,transparent 70%)`, pointerEvents:"none", opacity:hov?1:0, transition:"opacity .3s" }}/>
      <div style={{ width:40, height:40, borderRadius:9, background:`${card.color}15`, border:`1px solid ${card.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", marginBottom:12, transform:hov?"scale(1.08) rotate(-4deg)":"scale(1)", transition:"transform .25s" }}>{card.icon}</div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", fontWeight:500, color:hov?card.color:T.ink, letterSpacing:".06em", textTransform:"uppercase", marginBottom:7, transition:"color .2s" }}>{card.title}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".8rem", color:T.inkMuted, lineHeight:1.65 }}>{card.desc}</div>
      <div style={{ position:"absolute", bottom:0, left:0, height:2, width:hov?"100%":"0%", background:`linear-gradient(90deg,${card.color},transparent)`, transition:"width .35s ease", borderRadius:"0 0 12px 12px" }}/>
    </div>
  );
}

function About() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";
  const cols = isMobile ? 2 : isTablet ? 3 : 4;
  return (
    <section id="about" style={{ padding:`${isMobile?"80px":"120px"} ${px}`, maxWidth:1200, margin:"0 auto" }}>
      <SectionHeader sub="About Me" title="Who I Am"/>
      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr": isTablet?"1fr":"1fr 1fr", gap: isMobile?36:72, alignItems:"start", marginBottom: isMobile?56:80 }}>
        <Reveal delay={.1}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", lineHeight:1.9, color:T.inkMid, fontSize:".94rem" }}>
            <p style={{ marginBottom:18 }}>I'm a <strong style={{ color:T.ink }}>BSc Information Systems student</strong> at Trincomalee Campus, Eastern University Sri Lanka — exploring the full spectrum of modern software engineering.</p>
            <p style={{ marginBottom:18 }}>My toolkit spans <strong style={{ color:T.gold }}>React, Next.js, Flutter, PHP, Java, Python</strong> and more. Currently expanding into Machine Learning for AI-driven solutions.</p>
            <p>Beyond code — I competed in <strong style={{ color:T.gold }}>All Island Music Instrumental Championships</strong>, organized tech exhibitions, and serve as a Student Union member.</p>
          </div>
        </Reveal>
        <Reveal delay={.2}>
          <TiltCard style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding: isMobile?24:36, boxShadow:"0 4px 32px rgba(0,0,0,0.3)" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", color:T.gold, marginBottom:20, letterSpacing:".12em" }}>CONTACT_INFO</div>
            {[["Email",DATA.email,T.ink],["Phone",DATA.phone,T.inkMid],["Location",DATA.location,T.inkMid],["University","Eastern Uni SL",T.inkMid],["Status","Open to Internship",T.gold]].map(([k,v,c]) => (
              <div key={k} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:`1px solid ${T.bgAlt}`, alignItems:"flex-start" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:T.inkMuted, textTransform:"uppercase", letterSpacing:".1em", minWidth: isMobile?64:80, flexShrink:0 }}>{k}</span>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".85rem", color:c, lineHeight:1.5, wordBreak:"break-word" }}>{v}</span>
              </div>
            ))}
          </TiltCard>
        </Reveal>
      </div>
      {/* Quality cards */}
      <Reveal delay={.05}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", color:T.gold, letterSpacing:".2em", textTransform:"uppercase", marginBottom:24, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ display:"inline-block", width:24, height:1, background:T.gold }}/>
          What Defines Me
        </div>
      </Reveal>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap: isMobile?12:16 }}>
        {QUALITY_CARDS.map((card,i) => <QualityCard key={card.title} card={card} index={i}/>)}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════ */
function Skills() {
  const { isMobile, isTablet } = useBreakpoint();
  const [activeIdx, setActiveIdx] = useState(null);
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";
  return (
    <section id="skills" style={{ padding:`${isMobile?"80px":"120px"} ${px}`, background:T.bgAlt, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <SectionHeader sub="Technical Skills" title="My Toolkit"/>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isMobile?"140px":"260px"},1fr))`, gap: isMobile?12:18 }}>
          {DATA.skills.map((cat,i) => (
            <Reveal key={cat.cat} delay={i*.07}>
              <TiltCard style={{ background:activeIdx===i?T.surface:T.surface, border:`1px solid ${activeIdx===i?T.borderDk:T.border}`, borderRadius:10, padding: isMobile?"18px 16px":28, boxShadow:activeIdx===i?"0 6px 32px rgba(0,0,0,0.3)":"0 2px 12px rgba(0,0,0,0.15)", transition:"border-color .25s,box-shadow .25s", cursor:"default" }} onMouseEnter={() => setActiveIdx(i)} onMouseLeave={() => setActiveIdx(null)}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, paddingBottom:11, borderBottom:`1px solid ${T.bgAlt}` }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:T.gold }}/>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", fontWeight:500, color:T.gold, textTransform:"uppercase", letterSpacing:".12em" }}>{cat.cat}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {cat.items.map(item => (
                    <span key={item} style={{ fontFamily:"'DM Mono',monospace", fontSize: isMobile?".62rem":".7rem", padding:"3px 9px", borderRadius:2, background:T.bgAlt, border:`1px solid ${T.border}`, color:T.inkMid }}>{item}</span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   EDUCATION
═══════════════════════════════════════════════════════ */
function Education() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";
  return (
    <section id="education" style={{ padding:`${isMobile?"80px":"120px"} ${px}`, maxWidth:1200, margin:"0 auto" }}>
      <SectionHeader sub="Education" title="Academic Journey"/>
      <div style={{ position:"relative", paddingLeft: isMobile?24:36 }}>
        <div style={{ position:"absolute", left:0, top:10, bottom:0, width:1, background:`linear-gradient(to bottom,${T.gold},${T.border} 80%,transparent)` }}/>
        {DATA.education.map((e,i) => (
          <Reveal key={i} delay={i*.1}>
            <div style={{ position:"relative", marginBottom: isMobile?32:46 }}>
              <div style={{ position:"absolute", left: isMobile?-28:-40, top:8, width:9, height:9, borderRadius:"50%", background:T.bg, border:`2px solid ${T.gold}`, boxShadow:`0 0 0 3px ${T.bgAlt}` }}/>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:T.gold, letterSpacing:".1em", marginBottom:5 }}>{e.date}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile?".95rem":"1.05rem", fontWeight:700, color:T.ink, marginBottom:3 }}>{e.degree}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".82rem", color:T.inkMid, marginBottom:4 }}>{e.org}</div>
              {e.desc && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".78rem", color:T.inkMuted, lineHeight:1.7 }}>{e.desc}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
const GhIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const ExtIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

function LinkBtn({ href, icon, label, accent }) {
  const [hov, setHov] = useState(false);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-hover onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".06em", textTransform:"uppercase", textDecoration:"none", padding:"6px 12px", borderRadius:2, border:`1px solid ${hov?accent:T.border}`, color:hov?accent:T.inkMuted, background:hov?`${accent}10`:"transparent", transition:"all .2s", cursor:"pointer" }}>
      {icon} {label}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════ */
function Projects() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";
  return (
    <section id="projects" style={{ padding:`${isMobile?"80px":"120px"} ${px}`, background:T.bgAlt, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <SectionHeader sub="Projects" title="What I've Built"/>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isMobile?"280px":"300px"},1fr))`, gap: isMobile?16:24 }}>
          {DATA.projects.map((p,i) => (
            <Reveal key={p.title} delay={i*.08}>
              <TiltCard style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding: isMobile?22:32, position:"relative", overflow:"hidden", boxShadow:"0 2px 20px rgba(0,0,0,0.2)", display:"flex", flexDirection:"column" }}>
                <div style={{ position:"absolute", top:0, left:0, bottom:0, width:3, background:p.accent }}/>
                <div style={{ position:"absolute", bottom:-14, right:12, fontFamily:"'Playfair Display',serif", fontSize:"5rem", fontWeight:700, fontStyle:"italic", color:`${p.accent}08`, lineHeight:1, userSelect:"none", pointerEvents:"none" }}>0{i+1}</div>
                <div style={{ paddingLeft:10, marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", padding:"3px 8px", borderRadius:2, textTransform:"uppercase", letterSpacing:".1em", background:p.status==="Ongoing"?"rgba(245,158,11,0.12)":"rgba(16,185,129,0.12)", color:p.status==="Ongoing"?"#f59e0b":"#10b981", border:`1px solid ${p.status==="Ongoing"?"rgba(245,158,11,0.3)":"rgba(16,185,129,0.3)"}` }}>{p.status}</span>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile?"1rem":"1.1rem", fontWeight:700, color:T.ink, marginBottom:9, paddingLeft:10, lineHeight:1.35 }}>{p.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".83rem", color:T.inkMuted, lineHeight:1.75, marginBottom:18, paddingLeft:10, flexGrow:1 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16, paddingLeft:10 }}>
                  {p.stack.map(t => <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", padding:"3px 8px", borderRadius:2, background:`${p.accent}0d`, border:`1px solid ${p.accent}28`, color:p.accent }}>{t}</span>)}
                </div>
                <div style={{ display:"flex", gap:7, paddingLeft:10 }}>
                  <LinkBtn href={p.github} icon={<GhIcon/>}  label="GitHub"    accent={p.accent}/>
                  <LinkBtn href={p.live}   icon={<ExtIcon/>} label="Live Demo"  accent={p.accent}/>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATIONS
═══════════════════════════════════════════════════════ */
function Certifications() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";
  return (
    <section id="certifications" style={{ padding:`${isMobile?"80px":"120px"} ${px}`, maxWidth:1200, margin:"0 auto" }}>
      <SectionHeader sub="Certifications" title="Credentials"/>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isMobile?"260px":"260px"},1fr))`, gap: isMobile?12:16 }}>
        {DATA.certs.map((c,i) => (
          <Reveal key={c.title} delay={i*.07}>
            <TiltCard style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding: isMobile?"16px 18px":"20px 24px", display:"flex", gap:16, alignItems:"flex-start", boxShadow:"0 1px 10px rgba(0,0,0,0.2)" }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"1.5rem", fontWeight:700, color:`${T.gold}28`, lineHeight:1, flexShrink:0 }}>0{i+1}</span>
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".85rem", fontWeight:600, color:T.ink, lineHeight:1.5, marginBottom:3 }}>{c.title}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", color:T.gold }}>{c.org}</div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      {/* Extra-Curricular */}
      <div style={{ marginTop: isMobile?56:80 }}>
        <Reveal>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", color:T.gold, letterSpacing:".2em", textTransform:"uppercase", marginBottom:24, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ display:"inline-block", width:24, height:1, background:T.gold }}/>
            Extra-Curricular
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isMobile?"240px":"220px"},1fr))`, gap:10 }}>
          {DATA.extras.map((ex,i) => (
            <Reveal key={ex} delay={i*.06}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".85rem", color:T.inkMid, padding:"14px 18px", borderLeft:`2.5px solid ${T.gold}`, background:T.surface, borderRadius:"0 8px 8px 0", boxShadow:"0 1px 8px rgba(0,0,0,0.2)" }}>{ex}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════ */
function DarkBtn({ children, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-hover onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"inline-flex", alignItems:"center", background:hov?T.gold:"rgba(248,245,240,0.05)", border:`1px solid ${hov?T.gold:"rgba(248,245,240,0.1)"}`, borderRadius:2, padding:"11px 20px", fontFamily:"'DM Mono',monospace", fontSize:".7rem", letterSpacing:".1em", color:hov?"#060a12":"rgba(248,245,240,0.6)", textDecoration:"none", textTransform:"uppercase", cursor:"pointer", transition:"all .22s" }}>{children}</a>
  );
}

function Contact() {
  const { isMobile, isTablet } = useBreakpoint();
  const [copied, setCopied] = useState(false);
  const [hovEmail, setHovEmail] = useState(false);
  const px = isMobile ? "20px" : isTablet ? "32px" : "56px";
  const copy = () => { navigator.clipboard.writeText(DATA.email); setCopied(true); setTimeout(() => setCopied(false), 2200); };
  return (
    <section id="contact" style={{ padding:`${isMobile?"80px":"120px"} ${px}`, background:T.dark }}>
      <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center" }}>
        <Reveal>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", color:T.gold, letterSpacing:".22em", textTransform:"uppercase", marginBottom:12 }}>Let's Connect</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:`clamp(${isMobile?"1.8rem":"2rem"},5vw,3.5rem)`, fontWeight:700, color:"#fff", letterSpacing:"-.02em", marginBottom:14, lineHeight:1.1 }}>
            Get In <em style={{ fontStyle:"italic", color:T.gold }}>Touch</em>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(248,245,240,0.45)", lineHeight:1.85, maxWidth:440, margin:"0 auto 44px", fontSize:".92rem" }}>
            Actively seeking internship opportunities. Have a project or just want to connect? My inbox is always open.
          </p>
        </Reveal>
        <Reveal delay={.15}>
          <div onClick={copy} data-hover onMouseEnter={() => setHovEmail(true)} onMouseLeave={() => setHovEmail(false)}
            style={{ display:"inline-flex", alignItems:"center", gap:10, cursor:"pointer", fontFamily:"'Playfair Display',serif", fontSize:`clamp(.82rem,${isMobile?"3.5vw":"2.2vw"},1.3rem)`, fontWeight:600, color:copied?"#4ade80":(hovEmail?T.gold:"#fff"), marginBottom:44, letterSpacing:"-.01em", transition:"color .3s", flexWrap:"wrap", justifyContent:"center" }}>
            {copied?"✓ Copied!":DATA.email}
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".54rem", padding:"3px 7px", border:"1px solid currentColor", borderRadius:2, opacity:.55, letterSpacing:".1em" }}>{copied?"DONE":"COPY"}</span>
          </div>
        </Reveal>
        <Reveal delay={.25}>
          <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
            {[{label:"GitHub",href:"https://github.com/Kavindu5518"},{label:"LinkedIn",href:"https://linkedin.com/in/kavindu-karunagoda"},{label:isMobile?"Call Me":DATA.phone,href:`tel:${DATA.phone}`}].map(s => <DarkBtn key={s.label} href={s.href}>{s.label}</DarkBtn>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <footer style={{ padding: isMobile?"16px 20px":"20px 56px", textAlign:"center", background:T.dark, borderTop:"1px solid rgba(255,255,255,0.05)", fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:"rgba(248,245,240,0.18)", letterSpacing:".1em" }}>
      KAVINDU SACHINTHA KARUNAGODA · DESIGNED & BUILT · 2025
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("home");
  const { isMobile, isDesktop } = useBreakpoint();

  useEffect(() => {
    document.title = "Portfolio | Kavindu Sachintha Karunagoda";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = "/logo.png";
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold:.25 }
    );
    NAV_ITEMS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.ink, cursor: isDesktop?"none":"auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { background:${T.bg}; overflow-x:hidden; }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:.85;transform:scaleY(1.1)} }
        @keyframes morphRing   { 0%,100%{border-radius:50% 42% 56% 44%/48% 50% 50% 52%} 33%{border-radius:44% 56% 44% 56%/56% 44% 56% 44%} 66%{border-radius:56% 44% 50% 50%/44% 56% 44% 56%} }
        @keyframes morphPhoto  { 0%,100%{border-radius:50% 42% 56% 44%/48% 50% 50% 52%} 33%{border-radius:44% 56% 44% 56%/56% 44% 56% 44%} 66%{border-radius:56% 44% 50% 50%/44% 56% 44% 56%} }
        ::-webkit-scrollbar       { width:3px; }
        ::-webkit-scrollbar-track { background:${T.dark}; }
        ::-webkit-scrollbar-thumb { background:${T.gold}; border-radius:2px; }
        section { position:relative; z-index:1; }
        img { max-width:100%; }
      `}</style>
      <Cursor/>
      <Nav active={active}/>
      <Hero/>
      <About/>
      <Skills/>
      <Education/>
      <Projects/>
      <Certifications/>
      <Contact/>
      <Footer/>
    </div>
  );
}