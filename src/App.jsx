import { useState, useEffect, useRef } from "react";

// ─── Animated Counter ───────────────────────────────────────────────────────
function Counter({ target, suffix = "", prefix = "", decimals = 0, duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(+(target * ease).toFixed(decimals));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration, decimals]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const links = ["Home","About","System","Models","Results","Team","Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:1000,
      background: scrolled ? "rgba(2,8,20,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,255,180,0.12)" : "none",
      transition:"all 0.4s ease",
      padding:"0 5vw",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      height:64,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,borderRadius:8,background:"linear-gradient(135deg,#00ffb4,#00b4ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>❄</div>
        <span style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:17,letterSpacing:0.5}}>FreshGuard <span style={{color:"#00ffb4"}}>AI</span></span>
      </div>
      <div style={{display:"flex",gap:4}}>
        {links.map(l => (
          <button key={l} onClick={() => { setActive(l); document.getElementById(l.toLowerCase())?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); }}
            style={{background:"none",border:"none",cursor:"pointer",color: active===l ? "#00ffb4" : "rgba(255,255,255,0.6)",fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:600,letterSpacing:0.8,padding:"6px 12px",borderRadius:6,transition:"color 0.2s",textTransform:"uppercase"}}>
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const particles = Array.from({length:30},(_,i)=>i);
  return (
    <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:"#020814",padding:"80px 5vw 60px"}}>
      {/* animated bg grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,255,180,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",animation:"gridScroll 20s linear infinite"}}/>
      {/* glow orbs */}
      <div style={{position:"absolute",top:"20%",left:"10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,180,255,0.12),transparent 70%)",filter:"blur(40px)"}}/>
      <div style={{position:"absolute",bottom:"20%",right:"5%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,180,0.1),transparent 70%)",filter:"blur(40px)"}}/>
      {/* floating particles */}
      {particles.map(i => (
        <div key={i} style={{position:"absolute",width:2,height:2,borderRadius:"50%",background:`rgba(0,255,${100+i*5},0.5)`,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animation:`float ${4+Math.random()*6}s ease-in-out infinite`,animationDelay:`${Math.random()*4}s`}}/>
      ))}
      <div style={{textAlign:"center",maxWidth:900,position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,255,180,0.08)",border:"1px solid rgba(0,255,180,0.2)",borderRadius:50,padding:"6px 18px",marginBottom:32,fontSize:13,color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontWeight:600,letterSpacing:1.5,textTransform:"uppercase"}}>
          ● Live Monitoring System
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(36px,6vw,72px)",lineHeight:1.1,margin:"0 0 24px",color:"#fff"}}>
          AI-Powered{" "}
          <span style={{background:"linear-gradient(90deg,#00ffb4,#00b4ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Food Wastage</span>
          <br/>Reduction in Cold Storage
        </h1>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(15px,2vw,19px)",lineHeight:1.8,maxWidth:680,margin:"0 auto 40px",fontFamily:"'DM Sans',sans-serif"}}>
          A multi-sensor IoT + deep learning ensemble that predicts spoilage, detects anomalies, and cuts food waste by <strong style={{color:"#00ffb4"}}>68%</strong> in real-time.
        </p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={() => document.getElementById("system")?.scrollIntoView({behavior:"smooth"})}
            style={{background:"linear-gradient(135deg,#00ffb4,#00b4ff)",color:"#020814",border:"none",borderRadius:10,padding:"14px 32px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,cursor:"pointer",letterSpacing:0.5,boxShadow:"0 0 30px rgba(0,255,180,0.3)"}}>
            Explore System →
          </button>
          <button onClick={() => document.getElementById("results")?.scrollIntoView({behavior:"smooth"})}
            style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"14px 32px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,cursor:"pointer",letterSpacing:0.5}}>
            View Results
          </button>
        </div>
        {/* live mini-stats bar */}
        <div style={{display:"flex",gap:0,justifyContent:"center",marginTop:60,flexWrap:"wrap"}}>
          {[["95.6%","Ensemble Accuracy"],["68%","Waste Reduction"],["<2 hrs","Detection Time"],["22%","Energy Saved"]].map(([v,l])=>(
            <div key={l} style={{padding:"18px 32px",borderRight:"1px solid rgba(255,255,255,0.08)",textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,fontFamily:"'Syne',sans-serif",color:"#00ffb4"}}>{v}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:0.8,textTransform:"uppercase",marginTop:4,fontFamily:"'DM Sans',sans-serif"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes gridScroll { 0%{background-position:0 0} 100%{background-position:0 60px} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes scanLine { 0%{top:0} 100%{top:100%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#020814; }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#020814} ::-webkit-scrollbar-thumb{background:#00ffb4;border-radius:3px}
      `}</style>
    </section>
  );
}

// ─── About / Problem ──────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{background:"#030c1a",padding:"100px 5vw"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:70}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>THE PROBLEM</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)"}}>Why Cold Storage Needs AI</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,marginBottom:60}}>
          {[
            {icon:"🌾",title:"30–40% of produce lost",desc:"India loses approximately ₹92,000 crore worth of food annually due to poor cold chain management — spoilage that begins before anyone notices."},
            {icon:"⏰",title:"18-hour detection lag",desc:"Manual inspection cycles mean spoilage is detected an average of 18 hours after it begins — far too late to save borderline produce."},
            {icon:"⚡",title:"Constant max cooling",desc:"Fixed cooling runs at 100% capacity regardless of load, wasting up to 22% more energy than necessary and raising operational costs."},
            {icon:"📊",title:"Reactive, not predictive",desc:"Threshold alarms fire after a breach has already occurred. There is no system to anticipate deterioration hours in advance."},
          ].map(c => (
            <div key={c.title} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 24px"}}>
              <div style={{fontSize:32,marginBottom:16}}>{c.icon}</div>
              <h3 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:18,marginBottom:10}}>{c.title}</h3>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.7,fontFamily:"'DM Sans',sans-serif"}}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(0,255,180,0.05),rgba(0,180,255,0.05))",border:"1px solid rgba(0,255,180,0.15)",borderRadius:20,padding:"40px",display:"flex",gap:40,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:"1",minWidth:260}}>
            <h3 style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:22,marginBottom:12}}>Our Solution</h3>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>
              FreshGuard AI integrates DHT22, MQ-3 ethylene sensors, and a camera module on Raspberry Pi 4, feeding data through MQTT to a cloud AI engine that runs 4 models in parallel — LSTM, Random Forest, Isolation Forest, and CNN — combined into a single ensemble risk score, all visualised on a live Grafana dashboard.
            </p>
          </div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            {[["Python 3.10","#3776ab"],["TensorFlow","#ff6f00"],["Scikit-learn","#f7931e"],["Raspberry Pi","#c51a4a"],["MQTT","#660066"],["Grafana","#f46800"]].map(([t,c])=>(
              <span key={t} style={{background:`${c}22`,border:`1px solid ${c}55`,color:"#fff",borderRadius:8,padding:"6px 14px",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── System Architecture ───────────────────────────────────────────────────────
function System() {
  const [active, setActive] = useState(0);
  const layers = [
    {id:0,name:"Sensing Layer",icon:"📡",color:"#00ffb4",desc:"DHT22 (±0.5°C, ±2% RH), MQ-3 ethylene gas sensor, 16MP camera module — all wired to Raspberry Pi 4 GPIO, sampling every 30 seconds.",items:["DHT22 Temp & Humidity","MQ-3 Ethylene Gas Sensor","16MP USB Camera Module","Ultrasonic Distance Sensor","Raspberry Pi 4 (4GB)"]},
    {id:1,name:"Communication Layer",icon:"🔗",color:"#00b4ff",desc:"Sensor readings packaged as JSON and transmitted via MQTT (Mosquitto broker) over TCP/IP to the central AI server with <100ms latency.",items:["MQTT Protocol","Mosquitto Broker","Node-RED Orchestration","Wi-Fi 802.11 b/g/n","REST API (Flask 2.3)"]},
    {id:2,name:"Intelligence Layer",icon:"🧠",color:"#a855f7",desc:"Four AI models run in parallel using asyncio — LSTM for shelf life, Random Forest for risk classification, Isolation Forest for anomalies, CNN for visual quality.",items:["LSTM (Shelf Life)","Random Forest (Spoilage Risk)","Isolation Forest (Anomaly)","CNN VGG16 (Visual)","Weighted Ensemble"]},
    {id:3,name:"Presentation Layer",icon:"📊",color:"#f97316",desc:"Live Grafana dashboard with time-series graphs, risk heatmaps, and shelf life predictions. Automated SMS/email alerts via Twilio API.",items:["Grafana Dashboard","InfluxDB Time-Series","MySQL 8.0 Records","Twilio SMS Alerts","SMTP Email Notifications"]},
  ];
  return (
    <section id="system" style={{background:"#020814",padding:"100px 5vw"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:70}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>ARCHITECTURE</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)"}}>4-Layer System Design</h2>
        </div>
        {/* layer tabs */}
        <div style={{display:"flex",gap:8,marginBottom:32,flexWrap:"wrap",justifyContent:"center"}}>
          {layers.map(l => (
            <button key={l.id} onClick={() => setActive(l.id)}
              style={{background: active===l.id ? l.color+"22" : "rgba(255,255,255,0.04)",border:`1px solid ${active===l.id ? l.color : "rgba(255,255,255,0.08)"}`,color: active===l.id ? l.color : "rgba(255,255,255,0.5)",borderRadius:10,padding:"10px 22px",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer",transition:"all 0.2s"}}>
              {l.icon} {l.name}
            </button>
          ))}
        </div>
        {/* active layer detail */}
        {layers.filter(l=>l.id===active).map(l=>(
          <div key={l.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            <div style={{background:`linear-gradient(135deg,${l.color}08,${l.color}04)`,border:`1px solid ${l.color}22`,borderRadius:20,padding:36}}>
              <div style={{fontSize:48,marginBottom:16}}>{l.icon}</div>
              <h3 style={{color:l.color,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:24,marginBottom:16}}>{l.name}</h3>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>{l.desc}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {l.items.map((item,i)=>(
                <div key={item} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"14px 20px",display:"flex",alignItems:"center",gap:14,animation:"fadeUp 0.3s ease both",animationDelay:`${i*0.05}s`}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:l.color,flexShrink:0}}/>
                  <span style={{color:"rgba(255,255,255,0.8)",fontFamily:"'DM Sans',sans-serif",fontSize:15}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* data flow visual */}
        <div style={{marginTop:60,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:32}}>
          <h3 style={{color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:16,marginBottom:24,textAlign:"center",textTransform:"uppercase",letterSpacing:1}}>End-to-End Data Flow</h3>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,flexWrap:"wrap"}}>
            {[["Sensors","📡","#00ffb4"],["MQTT Broker","🔗","#00b4ff"],["Pre-Processing","⚙️","#a855f7"],["AI Engine","🧠","#f97316"],["Dashboard","📊","#ec4899"],["Alerts","🔔","#22d3ee"]].map(([n,ic,c],i,arr)=>(
              <div key={n} style={{display:"flex",alignItems:"center"}}>
                <div style={{textAlign:"center",padding:"12px 16px"}}>
                  <div style={{width:52,height:52,borderRadius:12,background:`${c}18`,border:`1px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,margin:"0 auto 6px"}}>{ic}</div>
                  <div style={{color:"rgba(255,255,255,0.6)",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{n}</div>
                </div>
                {i<arr.length-1 && <div style={{color:"rgba(255,255,255,0.2)",fontSize:20,margin:"0 4px",marginBottom:12}}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI Models ─────────────────────────────────────────────────────────────────
function Models() {
  const models = [
    {name:"LSTM Network",subtitle:"Shelf Life Prediction",accuracy:"94.3%",metric:"MAE: 2.1 days",color:"#00ffb4",icon:"📈",desc:"Two stacked LSTM layers (128→64 units) with dropout 0.2 trained on 24-step time windows to predict remaining shelf life in days. Adam optimiser, learning rate 0.001.",details:["24-step sequence windows","MAE = 2.1 days on test set","Adam optimizer, lr=0.001","Dropout 0.2 (anti-overfit)","128→64 LSTM units"]},
    {name:"Random Forest",subtitle:"Spoilage Risk Classification",accuracy:"91.7%",metric:"F1: 0.915",color:"#00b4ff",icon:"🌲",desc:"Ensemble of 200 decision trees (max depth 15) classifying produce into Low / Moderate / High risk using temperature, humidity, ethylene, days stored, and product category.",details:["200 decision trees","Max depth: 15","Gini impurity criterion","Feature: temp, humidity, ethylene","3 classes: Low/Moderate/High"]},
    {name:"Isolation Forest",subtitle:"Anomaly Detection",accuracy:"88.5%",metric:"Contamination: 5%",color:"#a855f7",icon:"🔍",desc:"Unsupervised anomaly detection isolating temperature/humidity outliers that indicate equipment malfunction, door-seal failure, or thermal breach — no labelled anomaly data needed.",details:["Unsupervised method","Contamination param: 0.05","Detects rare anomalies","No labelled data required","Real-time inference"]},
    {name:"CNN (VGG16)",subtitle:"Visual Quality Inspection",accuracy:"92.1%",metric:"F1: 0.920",color:"#f97316",icon:"👁️",desc:"Transfer learning from VGG16 (ImageNet) with fine-tuned classification head. 3 convolutional blocks + softmax output (Fresh / Borderline / Spoiled) on 5,000 annotated images.",details:["VGG16 transfer learning","5,000 annotated images","PlantVillage + FIDS30 datasets","3×3 kernels, max-pooling","3 classes: Fresh/Borderline/Spoiled"]},
  ];
  return (
    <section id="models" style={{background:"#030c1a",padding:"100px 5vw"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:70}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>AI MODELS</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)"}}>Multi-Model Ensemble</h2>
          <p style={{color:"rgba(255,255,255,0.45)",fontFamily:"'DM Sans',sans-serif",fontSize:16,maxWidth:600,margin:"16px auto 0",lineHeight:1.7}}>Four complementary AI algorithms combined via weighted averaging into a single 95.6% accuracy ensemble.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,marginBottom:40}}>
          {models.map(m => (
            <div key={m.name} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${m.color}22`,borderRadius:20,padding:28,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},${m.color}44)`}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{fontSize:32}}>{m.icon}</div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:m.color,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22}}>{m.accuracy}</div>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{m.metric}</div>
                </div>
              </div>
              <h3 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:17,marginBottom:4}}>{m.name}</h3>
              <div style={{color:m.color,fontFamily:"'DM Sans',sans-serif",fontSize:12,marginBottom:14,fontWeight:500}}>{m.subtitle}</div>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>{m.desc}</p>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {m.details.map(d => (
                  <div key={d} style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:4,height:4,borderRadius:"50%",background:m.color,flexShrink:0}}/>
                    <span style={{color:"rgba(255,255,255,0.55)",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Ensemble weights */}
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:32}}>
          <h3 style={{color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:15,marginBottom:24,textTransform:"uppercase",letterSpacing:1}}>Ensemble Weight Distribution</h3>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {[["LSTM","0.25","#00ffb4"],["Random Forest","0.30","#00b4ff"],["Isolation Forest","0.20","#a855f7"],["CNN","0.25","#f97316"]].map(([name,w,c])=>(
              <div key={name} style={{flex:"1",minWidth:120}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{color:"rgba(255,255,255,0.6)",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{name}</span>
                  <span style={{color:c,fontSize:13,fontFamily:"'Syne',sans-serif",fontWeight:700}}>{w}</span>
                </div>
                <div style={{height:6,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${parseFloat(w)*100/0.3*100}%`,background:c,borderRadius:3,maxWidth:`${parseFloat(w)*333}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Live Dashboard Simulation ────────────────────────────────────────────────
function Dashboard() {
  const [data, setData] = useState(() => Array.from({length:20},(_,i)=>({
    t: i, temp: 3+Math.random()*2, hum: 86+Math.random()*8, eth: 0.8+Math.random()*1.2,
  })));
  const [alerts, setAlerts] = useState([
    {id:1,type:"warning",zone:"Zone B",msg:"Ethylene spike detected — strawberries borderline",time:"2 min ago"},
    {id:2,type:"info",zone:"Zone A",msg:"Temperature nominal — apples shelf life 14 days",time:"5 min ago"},
    {id:3,type:"ok",zone:"Zone C",msg:"All parameters within optimal range",time:"8 min ago"},
  ]);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length-1];
        const newPt = {t:last.t+1, temp: Math.max(0,Math.min(8,last.temp+(Math.random()-0.5)*0.4)), hum: Math.max(80,Math.min(98,last.hum+(Math.random()-0.5)*1.5)), eth: Math.max(0.2,Math.min(3.5,last.eth+(Math.random()-0.45)*0.2))};
        return [...prev.slice(-19), newPt];
      });
      setTick(t=>t+1);
    }, 1200);
    return () => clearInterval(id);
  }, []);
  const latest = data[data.length-1];
  const tempStatus = latest.temp > 6 ? "danger" : latest.temp > 5 ? "warning" : "ok";
  const ethStatus = latest.eth > 2.5 ? "danger" : latest.eth > 1.8 ? "warning" : "ok";
  const statusColor = {ok:"#00ffb4",warning:"#fbbf24",danger:"#ef4444"};
  const W = 400, H = 80;
  const maxT = 10, minT = 0;
  const pts = data.map((d,i) => `${(i/(data.length-1))*(W-20)+10},${H-10-((d.temp-minT)/(maxT-minT))*(H-20)}`).join(" ");
  return (
    <section id="dashboard" style={{background:"#020814",padding:"100px 5vw"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:50}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>LIVE DEMO</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)"}}>Real-Time Dashboard Simulation</h2>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:12,color:"#00ffb4",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#00ffb4",animation:"pulse 1.2s ease-in-out infinite"}}/>
            Live data updating every 1.2s
          </div>
        </div>
        {/* top metrics */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:16,marginBottom:24}}>
          {[
            {label:"Temperature",value:`${latest.temp.toFixed(1)}°C`,unit:"Zone A",status:tempStatus,icon:"🌡️"},
            {label:"Humidity",value:`${latest.hum.toFixed(1)}%`,unit:"Zone A",status:"ok",icon:"💧"},
            {label:"Ethylene",value:`${latest.eth.toFixed(2)} ppm`,unit:"Zone A",status:ethStatus,icon:"🔬"},
            {label:"Risk Score",value:`${Math.min(0.95,0.15+latest.eth/10+Math.max(0,latest.temp-5)/10).toFixed(2)}`,unit:"Ensemble",status: latest.eth>2?"warning":"ok",icon:"⚠️"},
            {label:"Shelf Life",value:`${Math.max(2,Math.round(14-(latest.temp-2)*1.5-(latest.eth-0.8)*2))} days`,unit:"Strawberries",status:"ok",icon:"📅"},
            {label:"System",value:"ONLINE",unit:`Update #${tick+1}`,status:"ok",icon:"✅"},
          ].map(m=>(
            <div key={m.label} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${statusColor[m.status]}22`,borderRadius:14,padding:"18px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:18}}>{m.icon}</span>
                <div style={{width:8,height:8,borderRadius:"50%",background:statusColor[m.status],animation: m.status!=="ok"?"pulse 1s infinite":"none",marginTop:4}}/>
              </div>
              <div style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:20,marginBottom:2}}>{m.value}</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{m.label}</div>
              <div style={{color:statusColor[m.status],fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{m.unit}</div>
            </div>
          ))}
        </div>
        {/* chart + alerts */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <span style={{color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14}}>Temperature Trend (°C)</span>
              <span style={{color:"#00ffb4",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Live</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:100}}>
              <defs>
                <linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ffb4" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#00ffb4" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[0,2,4,6,8].map(v=>(
                <line key={v} x1="10" y1={H-10-((v-minT)/(maxT-minT))*(H-20)} x2={W-10} y2={H-10-((v-minT)/(maxT-minT))*(H-20)} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              ))}
              <polyline points={pts} fill="none" stroke="#00ffb4" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
              {[0,5,10,15,20].map(i=>(
                <span key={i} style={{color:"rgba(255,255,255,0.2)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>-{20-i*5}s</span>
              ))}
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:24}}>
            <div style={{marginBottom:16,color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14}}>Recent Alerts</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {alerts.map(a=>(
                <div key={a.id} style={{display:"flex",gap:12,alignItems:"flex-start",background:`${a.type==="warning"?"rgba(251,191,36,0.06)":a.type==="danger"?"rgba(239,68,68,0.06)":"rgba(0,255,180,0.04)"}`,border:`1px solid ${a.type==="warning"?"rgba(251,191,36,0.2)":a.type==="danger"?"rgba(239,68,68,0.2)":"rgba(0,255,180,0.1)"}`,borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:16,marginTop:1}}>{a.type==="warning"?"⚠️":a.type==="danger"?"🚨":"✅"}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{color:a.type==="warning"?"#fbbf24":a.type==="danger"?"#ef4444":"#00ffb4",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:600}}>{a.zone}</span>
                      <span style={{color:"rgba(255,255,255,0.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>{a.time}</span>
                    </div>
                    <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{a.msg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Results ───────────────────────────────────────────────────────────────────
function Results() {
  const barData = [
    {label:"Food Wastage",before:31.5,after:10,unit:"%",color:"#00ffb4",lower:true},
    {label:"Detection Time",before:18,after:1.5,unit:"h",color:"#00b4ff",lower:true},
    {label:"Breach Response",before:45,after:4,unit:"min",color:"#a855f7",lower:true},
    {label:"Inventory Use",before:67,after:90,unit:"%",color:"#f97316",lower:false},
  ];
  return (
    <section id="results" style={{background:"#030c1a",padding:"100px 5vw"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:70}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>RESULTS</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)"}}>Measured Impact</h2>
        </div>
        {/* big stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,marginBottom:60}}>
          {[
            {val:95.6,suf:"%",label:"Ensemble Accuracy",sub:"Overall system"},
            {val:68,suf:"%",label:"Waste Reduction",sub:"31.5% → 10.0%"},
            {val:22,suf:"%",label:"Energy Saved",sub:"Adaptive cooling"},
            {val:2.1,suf:" days",label:"Shelf Life MAE",sub:"LSTM prediction"},
          ].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,255,180,0.1)",borderRadius:16,padding:"30px 24px",textAlign:"center"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:44,color:"#00ffb4"}}>
                <Counter target={s.val} suffix={s.suf} decimals={s.suf===" days"?1:s.val<10?1:0}/>
              </div>
              <div style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:15,margin:"8px 0 4px"}}>{s.label}</div>
              <div style={{color:"rgba(255,255,255,0.35)",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{s.sub}</div>
            </div>
          ))}
        </div>
        {/* before/after bars */}
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:36,marginBottom:24}}>
          <h3 style={{color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:15,marginBottom:28,textTransform:"uppercase",letterSpacing:1}}>Before vs. After AI Implementation</h3>
          <div style={{display:"flex",flexDirection:"column",gap:28}}>
            {barData.map(b=>{
              const maxV = Math.max(b.before,b.after)*1.1;
              return (
                <div key={b.label}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14}}>{b.label}</span>
                    <span style={{color:b.color,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13}}>
                      {b.lower ? `↓ ${Math.round((1-b.after/b.before)*100)}% improvement` : `↑ ${Math.round((b.after/b.before-1)*100)}% improvement`}
                    </span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontFamily:"'DM Sans',sans-serif",width:50,textAlign:"right"}}>Before</span>
                      <div style={{flex:1,height:10,background:"rgba(255,255,255,0.04)",borderRadius:5,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${(b.before/maxV)*100}%`,background:"rgba(239,68,68,0.6)",borderRadius:5,transition:"width 1s ease"}}/>
                      </div>
                      <span style={{color:"rgba(239,68,68,0.8)",fontSize:12,fontFamily:"'Syne',sans-serif",fontWeight:600,width:60}}>{b.before}{b.unit}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontFamily:"'DM Sans',sans-serif",width:50,textAlign:"right"}}>After</span>
                      <div style={{flex:1,height:10,background:"rgba(255,255,255,0.04)",borderRadius:5,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${(b.after/maxV)*100}%`,background:b.color,borderRadius:5,transition:"width 1s ease"}}/>
                      </div>
                      <span style={{color:b.color,fontSize:12,fontFamily:"'Syne',sans-serif",fontWeight:600,width:60}}>{b.after}{b.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* model accuracy table */}
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:32,overflowX:"auto"}}>
          <h3 style={{color:"rgba(255,255,255,0.7)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:15,marginBottom:20,textTransform:"uppercase",letterSpacing:1}}>Model Performance Summary</h3>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Model","Accuracy","Precision","Recall","F1/Other"].map(h=>(
                  <th key={h} style={{color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,textAlign:"left",padding:"8px 12px",borderBottom:"1px solid rgba(255,255,255,0.06)",textTransform:"uppercase",letterSpacing:0.8}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["LSTM (Shelf Life)","94.3%","—","—","MAE: 2.1d","#00ffb4"],
                ["Random Forest","91.7%","0.93","0.90","F1: 0.915","#00b4ff"],
                ["Isolation Forest","88.5%","0.87","0.89","—","#a855f7"],
                ["CNN (VGG16)","92.1%","0.91","0.93","F1: 0.920","#f97316"],
                ["Ensemble","95.6%","0.95","0.94","F1: 0.945","#00ffb4"],
              ].map(([name,acc,prec,rec,other,c])=>(
                <tr key={name} style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                  <td style={{padding:"12px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500}}>{name}</td>
                  <td style={{padding:"12px",color:c,fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>{acc}</td>
                  <td style={{padding:"12px",color:"rgba(255,255,255,0.6)",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>{prec}</td>
                  <td style={{padding:"12px",color:"rgba(255,255,255,0.6)",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>{rec}</td>
                  <td style={{padding:"12px",color:"rgba(255,255,255,0.5)",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>{other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Optimal Storage Table ─────────────────────────────────────────────────────
function StorageTable() {
  const rows = [
    ["Fruits (Apples, Oranges)","0°C – 4°C","85% – 95%","4 – 8 weeks","✅ Low"],
    ["Vegetables (Broccoli)","0°C – 2°C","90% – 98%","2 – 4 weeks","✅ Low"],
    ["Dairy Products","1°C – 5°C","70% – 80%","2 – 6 weeks","✅ Low"],
    ["Meat & Poultry","-1°C – 2°C","85% – 90%","1 – 4 weeks","⚠️ Med"],
    ["Fish & Seafood","-1°C – 0°C","90% – 95%","1 – 2 weeks","🔴 High"],
    ["Frozen Goods","-18°C – -15°C","90% – 95%","3 – 12 months","✅ Low"],
  ];
  return (
    <section style={{background:"#020814",padding:"80px 5vw"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:50}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>REFERENCE</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(22px,3vw,36px)"}}>Optimal Storage Conditions</h2>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:"rgba(0,255,180,0.05)"}}>
                {["Product Category","Temperature","Humidity","Duration","AI Risk Level"].map(h=>(
                  <th key={h} style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,textAlign:"left",padding:"14px 16px",borderBottom:"1px solid rgba(0,255,180,0.15)",letterSpacing:0.8}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={r[0]} style={{background:i%2===0?"transparent":"rgba(255,255,255,0.015)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                  {r.map((cell,j)=>(
                    <td key={j} style={{padding:"12px 16px",color: j===0?"rgba(255,255,255,0.85)": j===4?"inherit":"rgba(255,255,255,0.55)",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Team ──────────────────────────────────────────────────────────────────────
function Team() {
  return (
    <section id="team" style={{background:"#030c1a",padding:"100px 5vw"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>THE TEAM</div>
          <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)"}}>Project Members</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,marginBottom:40}}>
          {[
            {name:"Shreya Singh",roll:"1230432611",role:"AI & ML Development",icon:"👩‍💻",skills:["LSTM Model","CNN Training","Data Pipeline"]},
            {name:"Shreyansh Shekhar Singh",roll:"1230432615",role:"IoT & System Architecture",icon:"👨‍💻",skills:["Raspberry Pi","MQTT Setup","Dashboard"]},
          ].map(m=>(
            <div key={m.name} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,255,180,0.12)",borderRadius:20,padding:32,textAlign:"center"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#00ffb4,#00b4ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px"}}>{m.icon}</div>
              <h3 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:18,marginBottom:4}}>{m.name}</h3>
              <div style={{color:"rgba(255,255,255,0.35)",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>Roll No: {m.roll}</div>
              <div style={{color:"#00ffb4",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,marginBottom:16}}>{m.role}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
                {m.skills.map(s=>(
                  <span key={s} style={{background:"rgba(0,255,180,0.08)",border:"1px solid rgba(0,255,180,0.15)",color:"rgba(255,255,255,0.6)",borderRadius:6,padding:"4px 10px",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:28,textAlign:"center"}}>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.7}}>
            Under the supervision of <strong style={{color:"#fff"}}>Prof. Pooja Tiwari</strong> (Assistant Professor) | HOD: <strong style={{color:"#fff"}}>Prof. (Dr.) Harshdev</strong><br/>
            Department of Computer Science & Engineering, School of Engineering<br/>
            <strong style={{color:"#00ffb4"}}>Babu Banarasi Das University, Lucknow</strong> — Academic Session 2025–26
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact / Conclusion ──────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{background:"#020814",padding:"100px 5vw 60px"}}>
      <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div style={{color:"#00ffb4",fontFamily:"'Syne',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>CONCLUSION</div>
        <h2 style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)",marginBottom:24}}>Transforming Cold Storage with AI</h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontFamily:"'DM Sans',sans-serif",fontSize:16,lineHeight:1.8,maxWidth:700,margin:"0 auto 60px"}}>
          FreshGuard AI demonstrates that combining IoT sensing with a multi-model ensemble — LSTM, Random Forest, Isolation Forest, and CNN — achieves a 95.6% accuracy, 68% waste reduction, and 22% energy savings in cold storage facilities, providing a scalable, cost-effective solution for India's agricultural supply chain.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:60}}>
          {[
            {icon:"📚",title:"References",val:"12 published papers"},
            {icon:"🗄️",title:"Dataset",val:"20,000+ data points"},
            {icon:"🖥️",title:"Stack",val:"Python · TF · Flask · Grafana"},
            {icon:"🏆",title:"Outcome",val:"95.6% ensemble accuracy"},
          ].map(c=>(
            <div key={c.title} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"24px 16px"}}>
              <div style={{fontSize:28,marginBottom:10}}>{c.icon}</div>
              <div style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14,marginBottom:6}}>{c.title}</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>{c.val}</div>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:32,color:"rgba(255,255,255,0.25)",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>
          © 2025–26 FreshGuard AI · B.Tech Minor Project · BBDU Lucknow · Department of CSE
        </div>
      </div>
    </section>
  );
}

// ─── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          if (id) setActive(id.charAt(0).toUpperCase()+id.slice(1));
        }
      });
    }, { threshold: 0.3 });
    ["home","about","system","models","dashboard","results","team","contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <div style={{background:"#020814",minHeight:"100vh"}}>
      <Nav active={active} setActive={setActive}/>
      <Hero/>
      <About/>
      <System/>
      <Models/>
      <Dashboard/>
      <Results/>
      <StorageTable/>
      <Team/>
      <Contact/>
    </div>
  );
}