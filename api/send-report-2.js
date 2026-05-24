const RESEND_API_KEY  = process.env.RESEND_API_KEY;
const SHOPIFY_STORE   = process.env.SHOPIFY_STORE;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const FROM_EMAIL      = "rapport@duurzaamopwielen.nl";
const SHOP_URL        = "https://duurzaamopwielen.nl";

const buildEmail = ({ name, totalWh, totalWp, panels, continuW, victron, devices, shopUrls }) => {
  const firstName = name.split(" ")[0];

  const deviceRows = devices.map(d => `
    <tr>
      <td style="padding:8px 0;color:#cbd5e1;font-size:14px;border-bottom:1px solid #1e293b;">${d.name}</td>
      <td style="padding:8px 0;color:#f59e0b;font-size:14px;font-weight:600;text-align:right;border-bottom:1px solid #1e293b;">${Math.round(d.wh)} Wh</td>
    </tr>
  `).join("");

  const omvormerUrl = shopUrls?.[victron.multiplus] || SHOP_URL;
  const quattroUrl  = victron.quattro ? (shopUrls?.[victron.quattro] || SHOP_URL) : null;

  const omvormerBlok = continuW > 0 ? `
    <div style="margin:28px 0;">
      <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Aanbevolen omvormer</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#0f172a;border-radius:12px;padding:18px 20px;border:1px solid #334155;">
            <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">
              ${victron.va <= 2000 ? "MultiPlus" : "MultiPlus-II"}
            </p>
            <p style="color:#f59e0b;font-size:18px;font-weight:700;margin:0 0 10px;">${victron.multiplus}</p>
            <span style="background:rgba(76,175,98,0.15);color:#4caf62;font-size:12px;padding:4px 10px;border-radius:6px;font-weight:700;">
              ${victron.continuW.toLocaleString()}W continu
            </span>
            <span style="background:rgba(100,116,139,0.15);color:#94a3b8;font-size:12px;padding:4px 10px;border-radius:6px;margin-left:6px;">
              ${victron.va.toLocaleString()}VA
            </span>
            <br/>
            <a href="${omvormerUrl}" style="display:inline-block;margin-top:14px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0f172a;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:700;">
              🛒 ${victron.multiplus} bekijken →
            </a>
          </td>
        </tr>
      </table>
      ${quattroUrl ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
        <tr>
          <td style="background:#0f172a;border-radius:12px;padding:18px 20px;border:1px solid #334155;">
            <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Quattro</p>
            <p style="color:#f59e0b;font-size:18px;font-weight:700;margin:0 0 10px;">${victron.quattro}</p>
            <span style="background:rgba(76,175,98,0.15);color:#4caf62;font-size:12px;padding:4px 10px;border-radius:6px;font-weight:700;">
              ${victron.continuW.toLocaleString()}W continu
            </span>
            <br/>
            <a href="${quattroUrl}" style="display:inline-block;margin-top:14px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0f172a;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:700;">
              🛒 ${victron.quattro} bekijken →
            </a>
          </td>
        </tr>
      </table>` : ""}
    </div>
  ` : "";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Jouw off-grid rapport</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:#1e293b;border-radius:20px 20px 0 0;padding:28px 32px;border-bottom:1px solid #334155;text-align:center;">
              <img src="https://duurzaamopwielen.nl/cdn/shop/files/Logo_Duurzaamopwielen_PNG.png?v=1681938634"
                alt="Duurzaam op Wielen" height="44"
                style="filter:brightness(0) invert(1);max-width:200px;"/>
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;padding:32px 32px 0;">
              <h1 style="color:#f1f5f9;font-size:22px;font-weight:700;margin:0 0 8px;">
                Hoi ${firstName}, jouw rapport is klaar! ⚡
              </h1>
              <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 28px;">
                Hieronder vind je jouw volledige off-grid berekening.
                Bewaar deze mail — je hebt hem nodig als je een systeem gaat samenstellen.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;padding:0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#0f172a;border-radius:14px;overflow:hidden;border:1px solid #334155;">
                <tr>
                  <td width="33%" style="padding:20px 10px;text-align:center;border-right:1px solid #1e293b;">
                    <div style="font-size:32px;font-weight:900;color:#f59e0b;">${Math.round(totalWh)}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Wh per dag</div>
                    <div style="font-size:11px;color:#475569;margin-top:3px;">Totaal verbruik</div>
                  </td>
                  <td width="33%" style="padding:20px 10px;text-align:center;border-right:1px solid #1e293b;">
                    <div style="font-size:32px;font-weight:900;color:#f59e0b;">${totalWp}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Wp nodig</div>
                    <div style="font-size:11px;color:#475569;margin-top:3px;">Zonnepanelen</div>
                  </td>
                  <td width="33%" style="padding:20px 10px;text-align:center;">
                    <div style="font-size:32px;font-weight:900;color:#f59e0b;">~${panels}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Panelen</div>
                    <div style="font-size:11px;color:#475569;margin-top:3px;">à 400Wp</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;padding:16px 32px 0;">
              <div style="background:#0f172a;border-radius:10px;padding:14px 16px;border-left:3px solid #f59e0b;">
                <p style="color:#94a3b8;font-size:13px;margin:0;line-height:1.6;">
                  <strong style="color:#f1f5f9;">Hoe berekend?</strong><br/>
                  ${Math.round(totalWh)} Wh / (4 zonuren x 70% rendement) =
                  <strong style="color:#f59e0b;">${totalWp} Wp</strong><br/>
                  <span style="color:#64748b;font-size:12px;">Gebaseerd op 4 zonuren/dag (NL) en 70% systeemrendement</span>
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;padding:0 32px;">
              ${omvormerBlok}
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;padding:0 32px 28px;">
              <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Jouw apparaten</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${deviceRows}
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;padding:0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:14px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="color:#f1f5f9;font-size:15px;font-weight:700;margin:0 0 6px;">
                      Klaar voor een compleet systeem?
                    </p>
                    <p style="color:#94a3b8;font-size:13px;margin:0 0 16px;line-height:1.6;">
                      Bekijk onze complete off-grid pakketten.
                    </p>
                    <a href="${SHOP_URL}" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0f172a;text-decoration:none;padding:12px 22px;border-radius:10px;font-size:14px;font-weight:700;">
                      Naar de webshop
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#0f172a;border-radius:0 0 20px 20px;padding:24px 32px;text-align:center;border-top:1px solid #1e293b;">
              <p style="color:#475569;font-size:12px;margin:0 0 6px;">
                Vragen? Stuur een mail naar info@duurzaamopwielen.nl
              </p>
              <p style="color:#334155;font-size:11px;margin:0;">
                Duurzaam op Wielen
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const addToShopify = async ({ name, email, totalWh, totalWp, panels, continuW, victron }) => {
  if (!SHOPIFY_STORE || !SHOPIFY_API_KEY) return;
  const firstName = name.split(" ")[0];
  const lastName  = name.split(" ").slice(1).join(" ") || "";
  const note = [
    "=== Off-Grid Rapport ===",
    "Verbruik: " + Math.round(totalWh) + " Wh/dag",
    "Zonnepanelen: " + totalWp + " Wp (~" + panels + " panelen a 400Wp)",
    continuW > 0 ? "Continu vermogen: " + Math.round(continuW) + "W" : null,
    continuW > 0 ? "Omvormer: " + victron.multiplus + (victron.quattro ? " of " + victron.quattro : "") : null,
    "Bron: Off-Grid Calculator",
  ].filter(Boolean).join("\n");

  await fetch("https://" + SHOPIFY_STORE + "/admin/api/2024-01/customers.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_API_KEY,
    },
    body: JSON.stringify({
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        verified_email: true,
        accepts_marketing: true,
        note: note,
        tags: "off-grid-calculator,lead",
        send_email_welcome: false,
      },
    }),
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "https://calculator.duurzaamopwielen.nl");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { name, email, totalWh, totalWp, panels, continuW, victron, devices, shopUrls } = req.body;

  if (!name || !email || !totalWh) {
    return res.status(400).json({ error: "Ontbrekende gegevens" });
  }

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Duurzaam op Wielen <" + FROM_EMAIL + ">",
        to: [email],
        subject: "Jouw off-grid rapport - " + Math.round(totalWh) + " Wh/dag" + (continuW > 0 ? " - " + victron.multiplus : ""),
        html: buildEmail({ name, totalWh, totalWp, panels, continuW, victron, devices, shopUrls }),
      }),
    });

    if (!emailResponse.ok) {
      const err = await emailResponse.json();
      throw new Error("Resend fout: " + JSON.stringify(err));
    }

    await addToShopify({ name, email, totalWh, totalWp, panels, continuW, victron }).catch(console.error);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("send-report fout:", err);
    return res.status(500).json({ error: "Er ging iets mis bij het versturen." });
  }
}
