import { useState } from "react";

const VOLTAGE_OPTIONS = [12, 24, 230];
const LOGO = "https://duurzaamopwielen.nl/cdn/shop/files/Logo_Duurzaamopwielen_PNG.png?v=1681938634";

// ═════════════════════════════════════════════════════════════════════════════
// 👇 HIER VINK JE DE LINKS AAN — ALLEEN DIT HOEF JE LATER AAN TE PASSEN
//
// Zodra een product live staat in jouw webshop:
// 1. Ga naar het product op duurzaamopwielen.nl
// 2. Kopieer de URL uit de adresbalk
// 3. Plak hem hieronder op de juiste regel
// 4. Sla op → git push → binnen 1 minuut live
//
// Zolang een URL "VERVANG-DIT" bevat verschijnt er GEEN knop
// — de klant ziet dan "komt binnenkort beschikbaar"
// ═════════════════════════════════════════════════════════════════════════════
const SHOP_URLS = {

  // ── MultiPlus (tot en met 2000VA) — verkrijgbaar in 12V, 24V en 48V ──────
  "MultiPlus 500VA": {
    "12V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },
  "MultiPlus 800VA": {
    "12V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },
  "MultiPlus 1200VA": {
    "12V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },
  "MultiPlus 1600VA": {
    "12V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },
  "MultiPlus 2000VA": {
    "12V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── MultiPlus-II 3000VA — verkrijgbaar in 24V en 48V ────────────────────
  "MultiPlus-II 3000VA": {
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── Quattro 3000VA — verkrijgbaar in 24V en 48V ──────────────────────────
  "Quattro 3000VA": {
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── MultiPlus-II 5000VA — alleen 48V ─────────────────────────────────────
  "MultiPlus-II 5000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── Quattro 5000VA — alleen 48V ──────────────────────────────────────────
  "Quattro 5000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── MultiPlus-II 8000VA — alleen 48V ─────────────────────────────────────
  "MultiPlus-II 8000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── Quattro 8000VA — verkrijgbaar in 24V en 48V ──────────────────────────
  "Quattro 8000VA": {
    "24V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── MultiPlus-II 10000VA — alleen 48V ────────────────────────────────────
  "MultiPlus-II 10000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── Quattro 10000VA — alleen 48V ─────────────────────────────────────────
  "Quattro 10000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── MultiPlus-II 15000VA — alleen 48V ────────────────────────────────────
  "MultiPlus-II 15000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },

  // ── Quattro 15000VA — alleen 48V ─────────────────────────────────────────
  "Quattro 15000VA": {
    "48V": "https://duurzaamopwielen.nl/products/VERVANG-DIT",
  },
};

// Spanningen per model — hoef je NIET aan te passen, dit zijn de Victron specs
const MODEL_VOLTAGES = {
  "MultiPlus 500VA":      ["12V", "24V", "48V"],
  "MultiPlus 800VA":      ["12V", "24V", "48V"],
  "MultiPlus 1200VA":     ["12V", "24V", "48V"],
  "MultiPlus 1600VA":     ["12V", "24V", "48V"],
  "MultiPlus 2000VA":     ["12V", "24V", "48V"],
  "MultiPlus-II 3000VA":  ["24V", "48V"],
  "Quattro 3000VA":       ["24V", "48V"],
  "MultiPlus-II 5000VA":  ["48V"],
  "Quattro 5000VA":       ["48V"],
  "MultiPlus-II 8000VA":  ["48V"],
  "Quattro 8000VA":       ["24V", "48V"],
  "MultiPlus-II 10000VA": ["48V"],
  "Quattro 10000VA":      ["48V"],
  "MultiPlus-II 15000VA": ["48V"],
  "Quattro 15000VA":      ["48V"],
};

const SYSTEM_LABELS = [
  { max: 500,  label: "Micro systeem",  icon: "🔋", desc: "Ideaal voor kamperen of kleine installaties" },
  { max: 1500, label: "Klein systeem",  icon: "⚡", desc: "Geschikt voor een tiny house of caravan" },
  { max: 4000, label: "Medium systeem", icon: "🏕️", desc: "Goed voor een volledig off-grid weekendverblijf" },
  { max: 9999, label: "Groot systeem",  icon: "🏡", desc: "Volledig off-grid woning of professioneel gebruik" },
];

const VICTRON_MODELS = [
  { va: 500,   continuW: 400,   multiplus: "MultiPlus 500VA",      quattro: null,              desc: "Starlink, verlichting, kleine elektronica",                              tip: "Beschikbaar in 12V / 24V / 48V" },
  { va: 800,   continuW: 650,   multiplus: "MultiPlus 800VA",      quattro: null,              desc: "Kleine camper of boot, laptop, laders, led-verlichting",                 tip: "Beschikbaar in 12V / 24V / 48V" },
  { va: 1200,  continuW: 1000,  multiplus: "MultiPlus 1200VA",     quattro: null,              desc: "Compacte off-grid setup, kleine koelkast of TV",                         tip: "Beschikbaar in 12V / 24V / 48V" },
  { va: 1600,  continuW: 1300,  multiplus: "MultiPlus 1600VA",     quattro: null,              desc: "Tiny house basis: koelkast, verlichting en elektronica tegelijk",         tip: "Beschikbaar in 12V / 24V / 48V" },
  { va: 2000,  continuW: 1600,  multiplus: "MultiPlus 2000VA",     quattro: null,              desc: "Comfortabele kleine off-grid installatie, meerdere apparaten",            tip: "Beschikbaar in 12V / 24V / 48V" },
  { va: 3000,  continuW: 2400,  multiplus: "MultiPlus-II 3000VA",  quattro: "Quattro 3000VA",  desc: "Populair voor campers, tiny houses en kleine off-grid woningen",           tip: "Beschikbaar in 24V / 48V" },
  { va: 5000,  continuW: 4000,  multiplus: "MultiPlus-II 5000VA",  quattro: "Quattro 5000VA",  desc: "Meest gekozen voor volledige off-grid woningen en uitgebreide systemen",   tip: "Alleen beschikbaar in 48V" },
  { va: 8000,  continuW: 6500,  multiplus: "MultiPlus-II 8000VA",  quattro: "Quattro 8000VA",  desc: "Zwaar gebruik: meerdere grote apparaten langdurig gelijktijdig",           tip: "MultiPlus-II alleen 48V — Quattro ook in 24V" },
  { va: 10000, continuW: 8000,  multiplus: "MultiPlus-II 10000VA", quattro: "Quattro 10000VA", desc: "Grote off-grid installaties en kleine bedrijven",                          tip: "Parallel schakelen mogelijk tot 6 units" },
  { va: 15000, continuW: 12000, multiplus: "MultiPlus-II 15000VA", quattro: "Quattro 15000VA", desc: "Professioneel en industrieel gebruik",                                     tip: "Neem contact op voor advies bij dit vermogen" },
];

const getVictronModel = (w) => VICTRON_MODELS.find((m) => m.continuW > w) || VICTRON_MODELS[VICTRON_MODELS.length - 1];
const getSystem  = (wh) => SYSTEM_LABELS.find((s) => wh <= s.max) || SYSTEM_LABELS[3];
const calcWh     = (d)  => { const h = parseFloat(d.hours) || 0, v = parseFloat(d.value) || 0, volt = parseFloat(d.voltage) || 230; return d.unit === "W" ? v * h : v * volt * h; };
const calcW      = (d)  => { const v = parseFloat(d.value) || 0, volt = parseFloat(d.voltage) || 230; return d.unit === "W" ? v : v * volt; };
const calcWp     = (wh) => wh / (4 * 0.7);
const panelCount = (wp) => Math.ceil(wp / 400);
const newDevice  = ()   => ({ id: Date.now() + Math.random(), name: "", value: "", unit: "W", voltage: 230, hours: "" });

// ── Spanningskeuze + webshop knop ────────────────────────────────────────────
const VoltageSelector = ({ modelName }) => {
  const [selected, setSelected] = useState(null);
  const voltages = MODEL_VOLTAGES[modelName] || [];
  const urls     = SHOP_URLS[modelName] || {};
  const url      = selected ? urls[selected] : null;
  const hasUrl   = url && !url.includes("VERVANG-DIT");

  return (
    <div style={{ marginTop: 14 }}>
      <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 8px" }}>
        Kies jouw spanning:
      </p>

      {/* Spanningsknoppen */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {voltages.map((v) => (
          <button key={v} onClick={() => setSelected(v)} style={{
            padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: "pointer", border: "2px solid",
            borderColor: selected === v ? "#f59e0b" : "#334155",
            background: selected === v ? "rgba(245,158,11,0.12)" : "transparent",
            color: selected === v ? "#f59e0b" : "#64748b",
            transition: "all 0.15s",
          }}>
            {v}
          </button>
        ))}
      </div>

      {/* Resultaat na spanningskeuze */}
      {selected && (
        hasUrl ? (
          // Knop naar webshop — opent in nieuw tabblad
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              color: "#0f172a", borderRadius: 10, padding: "11px 20px",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
            }}
          >
            🛒 Bekijk {modelName} {selected} in onze webshop →
          </a>
        ) : (
          // Product bestaat nog niet in de webshop
          <div style={{
            background: "#0f172a", borderRadius: 8, padding: "10px 14px",
            border: "1px solid #334155", display: "inline-block",
          }}>
            <span style={{ color: "#475569", fontSize: 13 }}>
              ⏳ {modelName} {selected} komt binnenkort beschikbaar.
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default function App() {
  const [step,       setStep]       = useState(1);
  const [devices,    setDevices]    = useState([newDevice()]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [submitted,  setSubmitted]  = useState(false);
  const [sending,    setSending]    = useState(false);
  const [error,      setError]      = useState("");
  const [sendError,  setSendError]  = useState("");

  const totalWh  = devices.reduce((s, d) => s + calcWh(d), 0);
  const totalWp  = Math.round(calcWp(totalWh));
  const panels   = panelCount(totalWp);
  const sys      = getSystem(totalWh);
  const continuW = checkedIds.reduce((s, id) => { const d = devices.find((d) => d.id === id); return d ? s + calcW(d) : s; }, 0);
  const victron  = getVictronModel(continuW);

  const addDevice    = ()         => setDevices((p) => [...p, newDevice()]);
  const removeDevice = (id)       => { setDevices((p) => p.filter((d) => d.id !== id)); setCheckedIds((p) => p.filter((i) => i !== id)); };
  const updateDevice = (id, f, v) => setDevices((p) => p.map((d) => d.id === id ? { ...d, [f]: v } : d));
  const toggleCheck  = (id)       => setCheckedIds((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);

  const handleCalculate  = () => { if (devices.some((d) => !d.name || !d.value || !d.hours)) { setError("Vul alle apparaten volledig in."); return; } setError(""); setStep(2); };
  const handleToInverter = () => { if (checkedIds.length === 0) setCheckedIds(devices.map((d) => d.id)); setStep(3); };
  const reset = () => { setStep(1); setDevices([newDevice()]); setCheckedIds([]); setName(""); setEmail(""); setSubmitted(false); setSendError(""); setError(""); };

  const handleEmailSubmit = async () => {
    if (!name || !email) { setError("Vul je naam en e-mailadres in."); return; }
    setError(""); setSending(true); setSendError("");
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, totalWh, totalWp, panels, continuW, victron,
          devices: devices.map((d) => ({ name: d.name, wh: calcWh(d), w: calcW(d) })),
          shopUrls: Object.fromEntries(
            Object.entries(SHOP_URLS).map(([model, voltages]) => [
              model,
              Object.values(voltages).find((u) => !u.includes("VERVANG-DIT")) || null,
            ])
          ),
        }),
      });
      if (!res.ok) throw new Error("Serverfout");
      setSubmitted(true);
    } catch {
      setSendError("Er ging iets mis. Probeer het opnieuw of mail naar info@duurzaamopwielen.nl");
    } finally {
      setSending(false);
    }
  };

  const S = st;

  return (
    <div style={S.page}>
      <header style={S.header}>
        <div style={S.headerInner}>
          <img src={LOGO} alt="Duurzaam op Wielen" style={S.logo} onError={(e) => (e.target.style.display = "none")} />
          <div style={S.stepBar}>
            {["Apparaten", "Energie", "Omvormer", "Rapport"].map((label, i) => {
              const active = step === i + 1, done = step > i + 1;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ ...S.stepDot, background: done || active ? "#f59e0b" : "rgba(255,255,255,0.12)", color: done || active ? "#0f172a" : "rgba(255,255,255,0.35)" }}>
                    {done ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 12, color: done || active ? "#f59e0b" : "#475569" }}>{label}</span>
                  {i < 3 && <span style={{ color: "#1e293b", margin: "0 2px" }}>›</span>}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <main style={S.main}>

        {/* ══ STAP 1 ══ */}
        {step === 1 && (
          <div style={S.card}>
            <h1 style={S.h1}>Bereken jouw energieverbruik</h1>
            <p style={S.sub}>Voeg al je apparaten toe om je dagelijkse verbruik te berekenen</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 14 }}>
              {devices.map((d, idx) => (
                <div key={d.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={S.devNum}>{idx + 1}</div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                    <input style={S.input} placeholder="Naam apparaat (bijv. Koelkast)"
                      value={d.name} onChange={(e) => updateDevice(d.id, "name", e.target.value)} />
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                      <input style={{ ...S.input, flex: 1, minWidth: 70 }} placeholder="Verbruik" type="number"
                        value={d.value} onChange={(e) => updateDevice(d.id, "value", e.target.value)} />
                      <select style={S.select} value={d.unit} onChange={(e) => updateDevice(d.id, "unit", e.target.value)}>
                        <option>W</option><option>A</option>
                      </select>
                      {d.unit === "A" && (
                        <select style={S.select} value={d.voltage} onChange={(e) => updateDevice(d.id, "voltage", e.target.value)}>
                          {VOLTAGE_OPTIONS.map((v) => <option key={v} value={v}>{v}V</option>)}
                        </select>
                      )}
                      <input style={{ ...S.input, width: 90 }} placeholder="Uren/dag" type="number"
                        value={d.hours} onChange={(e) => updateDevice(d.id, "hours", e.target.value)} />
                    </div>
                    {calcWh(d) > 0 && <span style={S.badge}>{Math.round(calcWh(d))} Wh/dag · {Math.round(calcW(d))}W</span>}
                  </div>
                  {devices.length > 1 && <button style={S.removeBtn} onClick={() => removeDevice(d.id)}>✕</button>}
                </div>
              ))}
            </div>
            <button style={S.addBtn} onClick={addDevice}>+ Apparaat toevoegen</button>
            {totalWh > 0 && (
              <div style={S.liveTotal}>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>Huidig totaal</span>
                <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 18 }}>{Math.round(totalWh)} Wh/dag</span>
              </div>
            )}
            {error && <p style={S.error}>{error}</p>}
            <button style={S.primaryBtn} onClick={handleCalculate}>Bereken mijn systeem →</button>
          </div>
        )}

        {/* ══ STAP 2 ══ */}
        {step === 2 && (
          <div style={S.card}>
            <div style={{ textAlign: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #334155" }}>
              <span style={{ fontSize: 44, display: "block", marginBottom: 8 }}>{sys.icon}</span>
              <h2 style={{ color: "#f59e0b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{sys.label}</h2>
              <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>{sys.desc}</p>
            </div>
            <div style={{ display: "flex", background: "#0f172a", borderRadius: 14, overflow: "hidden", marginBottom: 20, border: "1px solid #334155" }}>
              {[[Math.round(totalWh), "Wh per dag", "Totaal verbruik"], [totalWp, "Wp nodig", "Zonnepanelen"], [`~${panels}`, "panelen", "à 400Wp"]].map(([val, unit, note], i) => (
                <div key={i} style={{ flex: 1, padding: "20px 10px", textAlign: "center", borderRight: i < 2 ? "1px solid #1e293b" : "none" }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: "#f59e0b", letterSpacing: -1 }}>{val}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{unit}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: "14px 16px", borderLeft: "3px solid #f59e0b", marginBottom: 20 }}>
              <strong style={{ color: "#f1f5f9", fontSize: 14 }}>Hoe berekend?</strong>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: "6px 0 0", lineHeight: 1.6 }}>
                {Math.round(totalWh)} Wh ÷ (4 zonuren × 70% rendement) = <strong style={{ color: "#f59e0b" }}>{totalWp} Wp</strong>
              </p>
              <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>Gebaseerd op 4 zonuren/dag (NL) en 70% systeemrendement</p>
            </div>
            <h3 style={S.sectionTitle}>Jouw apparaten</h3>
            <div style={{ marginBottom: 22 }}>
              {devices.map((d) => (
                <div key={d.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0f172a" }}>
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>{d.name}</span>
                  <span style={{ color: "#f59e0b", fontWeight: 600, fontSize: 14 }}>{Math.round(calcWh(d))} Wh</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 14, padding: "18px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 15, marginBottom: 4 }}>⚡ Bereken ook jouw omvormer</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Selecteer welke apparaten langdurig gelijktijdig aan staan → continu vermogen → Victron advies</div>
              </div>
              <button style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#0f172a", border: "none", borderRadius: 10, padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }} onClick={handleToInverter}>
                Omvormer berekenen →
              </button>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button style={S.secondaryBtn} onClick={() => setStep(1)}>← Aanpassen</button>
              <button style={S.primaryBtn} onClick={() => setStep(4)}>📩 Rapport per mail</button>
            </div>
          </div>
        )}

        {/* ══ STAP 3: Omvormer ══ */}
        {step === 3 && (
          <div style={S.card}>
            <h2 style={S.h1}>Omvormer calculator</h2>
            <p style={S.sub}>
              Vink aan welke apparaten <strong style={{ color: "#f59e0b" }}>langdurig gelijktijdig</strong> aan kunnen staan.
              De som bepaalt het <strong style={{ color: "#f59e0b" }}>benodigde continu vermogen</strong> van de omvormer.
            </p>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: "13px 16px", borderLeft: "3px solid #475569", marginBottom: 18 }}>
              <strong style={{ color: "#94a3b8", fontSize: 13 }}>💡 Waarom continu en niet piek?</strong>
              <p style={{ color: "#64748b", fontSize: 13, margin: "6px 0 0", lineHeight: 1.7 }}>
                Het <strong style={{ color: "#94a3b8" }}>continu vermogen</strong> is wat de omvormer <em>langdurig</em> kan leveren.<br />
                Het <strong style={{ color: "#94a3b8" }}>piek vermogen</strong> (bijv. motorstart koelkast) is 2–3× hoger maar duurt enkele seconden. Victron heeft dit ruim ingebouwd.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {devices.map((d) => {
                const checked = checkedIds.includes(d.id);
                const watt = Math.round(calcW(d));
                return (
                  <div key={d.id} onClick={() => toggleCheck(d.id)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                      background: checked ? "rgba(245,158,11,0.08)" : "#0f172a",
                      border: checked ? "1px solid rgba(245,158,11,0.4)" : "1px solid #334155", transition: "all 0.15s" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      background: checked ? "#f59e0b" : "transparent", border: checked ? "2px solid #f59e0b" : "2px solid #475569" }}>
                      {checked && <span style={{ color: "#0f172a", fontSize: 12, fontWeight: 900 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: checked ? "#f1f5f9" : "#94a3b8", fontWeight: checked ? 600 : 400, fontSize: 15 }}>{d.name}</div>
                      <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{d.hours}u/dag · {d.value}{d.unit}{d.unit === "A" ? ` @ ${d.voltage}V` : ""}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: checked ? "#f59e0b" : "#475569", fontWeight: 700, fontSize: 18 }}>{watt}W</div>
                      <div style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{checked ? "aan ⚡" : "uit"}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#0f172a", borderRadius: 14, padding: "20px", marginBottom: 20, border: "1px solid #334155" }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingBottom: continuW > 0 ? 18 : 0, marginBottom: continuW > 0 ? 18 : 0, borderBottom: continuW > 0 ? "1px solid #1e293b" : "none" }}>
                <div style={{ flex: 1, minWidth: 130 }}>
                  <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>Continu vermogen gelijktijdig</div>
                  <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 40, letterSpacing: -2 }}>
                    {Math.round(continuW)}<span style={{ fontSize: 22, fontWeight: 700 }}>W</span>
                  </div>
                  <div style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>
                    {checkedIds.length === 0 ? "Selecteer apparaten hierboven" : `${checkedIds.length} apparaat${checkedIds.length === 1 ? "" : "en"} langdurig aan`}
                  </div>
                </div>
                {continuW > 0 && (
                  <div style={{ flex: 1, minWidth: 130, borderLeft: "1px solid #1e293b", paddingLeft: 16 }}>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>Continu limiet aanbevolen model</div>
                    <div style={{ color: "#4caf62", fontWeight: 900, fontSize: 40, letterSpacing: -2 }}>
                      {victron.continuW.toLocaleString()}<span style={{ fontSize: 22, fontWeight: 700 }}>W</span>
                    </div>
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>
                      Ruimte over: <strong style={{ color: "#4caf62" }}>{(victron.continuW - Math.round(continuW)).toLocaleString()}W</strong>
                    </div>
                  </div>
                )}
              </div>

              {continuW > 0 && (
                <>
                  <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Aanbevolen Victron model</div>

                  {/* MultiPlus kaart */}
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px", marginBottom: victron.quattro ? 10 : 12, border: "1px solid #334155" }}>
                    <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                      {victron.va <= 2000 ? "MultiPlus" : "MultiPlus-II"}
                    </div>
                    <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{victron.multiplus}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ background: "rgba(76,175,98,0.15)", color: "#4caf62", fontSize: 12, padding: "4px 10px", borderRadius: 6, fontWeight: 700 }}>
                        {victron.continuW.toLocaleString()}W continu
                      </span>
                      <span style={{ background: "rgba(100,116,139,0.15)", color: "#94a3b8", fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>
                        {victron.va.toLocaleString()}VA
                      </span>
                    </div>
                    <VoltageSelector modelName={victron.multiplus} />
                  </div>

                  {/* Quattro kaart */}
                  {victron.quattro && (
                    <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px", marginBottom: 12, border: "1px solid #334155" }}>
                      <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Quattro</div>
                      <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{victron.quattro}</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(76,175,98,0.15)", color: "#4caf62", fontSize: 12, padding: "4px 10px", borderRadius: 6, fontWeight: 700 }}>
                          {victron.continuW.toLocaleString()}W continu
                        </span>
                        <span style={{ background: "rgba(100,116,139,0.15)", color: "#94a3b8", fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>
                          {victron.va.toLocaleString()}VA
                        </span>
                      </div>
                      <VoltageSelector modelName={victron.quattro} />
                    </div>
                  )}

                  <div style={{ background: "rgba(245,158,11,0.06)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>{victron.desc}</div>
                    <div style={{ color: "#64748b", fontSize: 12, fontStyle: "italic" }}>💡 {victron.tip}</div>
                    {!victron.quattro && <div style={{ color: "#475569", fontSize: 11, marginTop: 6 }}>ℹ️ De Quattro begint bij 3000VA — voor kleinere systemen is de MultiPlus de juiste keuze.</div>}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button style={S.secondaryBtn} onClick={() => setStep(2)}>← Energie resultaat</button>
              <button style={S.primaryBtn} onClick={() => setStep(4)}>📩 Rapport per mail</button>
            </div>
          </div>
        )}

        {/* ══ STAP 4: E-mail ══ */}
        {step === 4 && !submitted && (
          <div style={S.card}>
            <h2 style={S.h1}>Ontvang jouw rapport</h2>
            <p style={S.sub}>We sturen je een volledig rapport per e-mail — inclusief jouw berekening en omvormer advies.</p>
            <div style={{ background: "#0f172a", borderRadius: 12, padding: "18px 20px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["📊", "Volledige berekening overzichtelijk op een rij"],
                ["☀️", `${Math.round(totalWh)} Wh/dag · ${totalWp} Wp · ~${panels} panelen`],
                ...(continuW > 0 ? [["⚡", `${Math.round(continuW)}W continu · ${victron.multiplus}${victron.quattro ? ` of ${victron.quattro}` : ""}`]] : []),
                ["🛒", "Directe links naar de juiste producten in de webshop"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 10, alignItems: "center", color: "#94a3b8", fontSize: 14 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 13, marginBottom: 5 }}>Jouw naam</label>
              <input style={S.input} placeholder="Jan de Vries" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 13, marginBottom: 5 }}>E-mailadres</label>
              <input style={S.input} type="email" placeholder="jan@voorbeeld.nl" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <p style={{ color: "#475569", fontSize: 12, marginBottom: 16 }}>🔒 Geen spam. Alleen jouw rapport + relevante aanbiedingen van Duurzaam op Wielen.</p>
            {error && <p style={S.error}>{error}</p>}
            {sendError && <p style={S.error}>{sendError}</p>}
            <div style={{ display: "flex", gap: 10 }}>
              <button style={S.secondaryBtn} onClick={() => setStep(continuW > 0 ? 3 : 2)}>← Terug</button>
              <button style={{ ...S.primaryBtn, opacity: sending ? 0.6 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                onClick={handleEmailSubmit} disabled={sending}>
                {sending ? "⏳ Rapport versturen..." : "Stuur mij het rapport →"}
              </button>
            </div>
          </div>
        )}

        {/* ══ Bevestiging ══ */}
        {step === 4 && submitted && (
          <div style={{ ...S.card, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
            <h2 style={S.h1}>Rapport onderweg!</h2>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              Je rapport is verstuurd naar <strong style={{ color: "#f1f5f9" }}>{email}</strong>.<br />
              Controleer ook je spam-map als je het niet direct ziet.
            </p>
            <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 20, textAlign: "left" }}>
              <h3 style={{ color: "#f59e0b", fontSize: 14, margin: "0 0 14px" }}>Jouw resultaten</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[[Math.round(totalWh), "Wh/dag"], [totalWp, "Wp"], [`~${panels}`, "panelen"],
                  ...(continuW > 0 ? [[Math.round(continuW) + "W", "continu"], [victron.va + "VA", "Victron"]] : [])]
                  .map(([v, l]) => (
                    <div key={l} style={{ background: "#1e293b", borderRadius: 10, padding: "12px 14px", textAlign: "center", flex: 1, minWidth: 70 }}>
                      <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 16 }}>{v}</div>
                      <div style={{ color: "#64748b", fontSize: 11, marginTop: 3 }}>{l}</div>
                    </div>
                  ))}
              </div>
            </div>
            <button style={S.secondaryBtn} onClick={reset}>Nieuwe berekening starten</button>
          </div>
        )}
      </main>
    </div>
  );
}

const st = {
  page:        { minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI',system-ui,sans-serif" },
  header:      { background: "#0f172a", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 100 },
  headerInner: { maxWidth: 760, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 },
  logo:        { height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" },
  stepBar:     { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
  stepDot:     { width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 },
  main:        { maxWidth: 760, margin: "0 auto", padding: "28px 16px" },
  card:        { background: "#1e293b", borderRadius: 20, padding: "28px 24px", border: "1px solid #334155" },
  h1:          { fontSize: 22, fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px", letterSpacing: -.5 },
  sub:         { color: "#94a3b8", fontSize: 14, margin: "0 0 22px", lineHeight: 1.6 },
  sectionTitle:{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" },
  devNum:      { width: 28, height: 28, borderRadius: "50%", background: "#334155", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 10 },
  input:       { background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "10px 13px", color: "#f1f5f9", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
  select:      { background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "10px 11px", color: "#f1f5f9", fontSize: 14, outline: "none", cursor: "pointer" },
  badge:       { fontSize: 12, color: "#f59e0b", background: "rgba(245,158,11,0.1)", padding: "4px 10px", borderRadius: 20, display: "inline-block", fontWeight: 600 },
  removeBtn:   { background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 15, padding: 8, marginTop: 8 },
  addBtn:      { background: "none", border: "1px dashed #334155", borderRadius: 8, padding: "10px 18px", color: "#64748b", cursor: "pointer", fontSize: 14, width: "100%", marginBottom: 18 },
  liveTotal:   { display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "11px 16px", marginBottom: 14 },
  primaryBtn:  { background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#0f172a", border: "none", borderRadius: 10, padding: "13px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", marginTop: 6 },
  secondaryBtn:{ background: "none", border: "1px solid #334155", borderRadius: 10, padding: "12px 16px", color: "#94a3b8", fontSize: 14, cursor: "pointer" },
  error:       { color: "#f87171", fontSize: 13, marginBottom: 8 },
};
