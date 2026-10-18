const RESEND_API_KEY  = process.env.RESEND_API_KEY;
const SHOPIFY_STORE   = process.env.SHOPIFY_STORE;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const FROM_EMAIL      = "rapport@duurzaamopwielen.nl";
const SHOP_URL        = "https://duurzaamopwielen.nl";

const LOGO_URL = "https://offgrid-calculator.duurzaamopwielen.nl/logo.png";

// Huisstijl
const GROEN = "#2D5A3D";
const BRONS = "#C17A3A";
const CREME = "#F0EDE4";
const PAGINA = "#E4E0D6";
const TEKST = "#1d2a21";
const ZACHT = "#607858";
const LIJN = "#d9d4c6";

const nl = (n) => Math.round(n).toLocaleString("nl-NL");
const kwh = (wh) => (wh / 1000).toFixed(2).replace(".", ",");

const buildEmail = ({ name, totalWh, totalWp, continuW, victron, groter, devices, shopUrls }) => {
  const firstName = name.split(" ")[0];

  const deviceRows = (devices || []).map(d => `
    <tr>
      <td style="padding:9px 0;color:${TEKST};font-size:14px;border-bottom:1px solid ${LIJN};">${d.name}</td>
      <td style="padding:9px 0;color:${GROEN};font-size:14px;font-weight:700;text-align:right;border-bottom:1px solid ${LIJN};">${nl(d.wh)} Wh</td>
    </tr>
  `).join("");

  const omvormerKaart = (titel, model, url, label) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
      <tr>
        <td style="background:${label === "advies" ? GROEN : "#ffffff"};border:1px solid ${label === "advies" ? GROEN : LIJN};border-radius:10px;padding:18px 20px;">
          <p style="color:${label === "advies" ? "#cfe0d4" : ZACHT};font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">${titel}</p>
          <p style="color:${label === "advies" ? "#ffffff" : GROEN};font-size:18px;font-weight:700;margin:0 0 6px;">${model.multiplus}</p>
          <p style="color:${label === "advies" ? "#cfe0d4" : ZACHT};font-size:13px;margin:0;">
            ${nl(model.continuW)} W continue, ${nl(model.va)} VA
          </p>
          <a href="${url}" style="display:inline-block;margin-top:14px;background:${label === "advies" ? BRONS : GROEN};color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:700;">
            ${model.multiplus} bekijken
          </a>
        </td>
      </tr>
    </table>`;

  const omvormerBlok = continuW > 0 && victron ? `
    <p style="color:${ZACHT};font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:28px 0 0;">Aanbevolen omvormer</p>
    ${omvormerKaart("Ons advies", victron, shopUrls?.[victron.multiplus] || SHOP_URL, "advies")}
    ${groter ? omvormerKaart("Ruimer alternatief", groter, shopUrls?.[groter.multiplus] || SHOP_URL, "alt") : ""}
    <p style="color:${ZACHT};font-size:13px;line-height:1.6;margin:14px 0 0;">
      Gebruik je af en toe een generator op de ingang als backup? Dan is een MultiPlus voldoende.
      Staat er een permanente generator naast, wat vaak voorkomt bij boten? Dan adviseren we een Quattro,
      omdat deze 2 AC-ingangen heeft.
    </p>
  ` : "";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Jouw off-grid rapport</title>
</head>
<body style="margin:0;padding:0;background:${PAGINA};font-family:Manrope,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:#ffffff;border-radius:12px 12px 0 0;padding:24px 32px;text-align:center;border-bottom:3px solid ${BRONS};">
              <img src="${LOGO_URL}" alt="Duurzaam op Wielen" width="260"
                style="display:block;margin:0 auto;width:260px;max-width:100%;height:auto;border:0;"/>
            </td>
          </tr>

          <tr>
            <td style="background:${CREME};padding:32px 32px 0;">
              <h1 style="color:${GROEN};font-size:22px;font-weight:700;margin:0 0 8px;">Hoi ${firstName}, jouw rapport is klaar</h1>
              <p style="color:${TEKST};font-size:15px;line-height:1.7;margin:0 0 24px;">
                Hieronder vind je jouw volledige off-grid berekening.
                Bewaar deze mail, je hebt hem nodig als je een systeem gaat samenstellen.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:${CREME};padding:0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid ${LIJN};border-radius:10px;">
                <tr>
                  <td width="50%" style="padding:20px 12px;text-align:center;border-right:1px solid ${LIJN};">
                    <div style="font-size:30px;font-weight:800;color:${BRONS};">${nl(totalWh)}</div>
                    <div style="font-size:11px;color:${ZACHT};margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Wh per dag</div>
                    <div style="font-size:12px;color:${ZACHT};margin-top:3px;">${kwh(totalWh)} kWh per dag</div>
                  </td>
                  <td width="50%" style="padding:20px 12px;text-align:center;">
                    <div style="font-size:30px;font-weight:800;color:${BRONS};">${nl(totalWp)}</div>
                    <div style="font-size:11px;color:${ZACHT};margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Wp benodigd</div>
                    <div style="font-size:12px;color:${ZACHT};margin-top:3px;">aan zonnepanelen</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:${CREME};padding:16px 32px 0;">
              <div style="background:#ffffff;border-radius:8px;padding:14px 16px;border-left:3px solid ${BRONS};">
                <p style="color:${TEKST};font-size:13px;margin:0;line-height:1.6;">
                  <strong style="color:${GROEN};">Hoe rekenen we dit?</strong><br/>
                  ${nl(totalWh)} Wh / (4 zonuren x 70% rendement) = <strong style="color:${BRONS};">${nl(totalWp)} Wp</strong><br/>
                  <span style="color:${ZACHT};font-size:12px;">Gebaseerd op 4 zonuren op een gemiddelde zonnige dag (ongeveer 200 dagen per jaar) en 70% systeemrendement.</span>
                </p>
              </div>
              <p style="color:${ZACHT};font-size:13px;line-height:1.6;margin:14px 0 0;">
                <strong style="color:${GROEN};">Let op in de winter.</strong>
                Wat de zon in de winter echt oplevert, hangt af van waar je bent. In Nederland is het vaak maar 1 uur per dag,
                in het zuiden van Spanje kan het ook in de winter nog 3 tot 4 uur zijn. Bij weinig zon kun je extra zonnepanelen
                plaatsen, als er ruimte is op je dak. Is die ruimte er niet, houd er dan rekening mee dat je een generator nodig hebt
                of afhankelijk bent van walstroom.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:${CREME};padding:0 32px;">
              ${omvormerBlok}
            </td>
          </tr>

          <tr>
            <td style="background:${CREME};padding:28px 32px 28px;">
              <p style="color:${ZACHT};font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Jouw apparaten</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${deviceRows}
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:${CREME};padding:0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:${GROEN};border-radius:10px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="color:#ffffff;font-size:15px;font-weight:700;margin:0 0 6px;">Klaar voor een compleet systeem?</p>
                    <p style="color:#cfe0d4;font-size:13px;margin:0 0 16px;line-height:1.6;">
                      Bekijk onze complete off-grid pakketten.
                    </p>
                    <a href="${SHOP_URL}" style="display:inline-block;background:${BRONS};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:700;">
                      Naar de webshop
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:${GROEN};border-radius:0 0 12px 12px;padding:22px 32px;text-align:center;">
              <p style="color:#cfe0d4;font-size:12px;margin:0 0 6px;">
                Vragen? Stuur een mail naar info@duurzaamopwielen.nl
              </p>
              <p style="color:#9fbfa9;font-size:11px;margin:0;">
                Duurzaam op Wielen, off grid systems
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

const addToShopify = async ({ name, email, totalWh, totalWp, continuW, victron }) => {
  if (!SHOPIFY_STORE || !SHOPIFY_API_KEY) return;
  const firstName = name.split(" ")[0];
  const lastName  = name.split(" ").slice(1).join(" ") || "";
  const note = [
    "=== Off-Grid Rapport ===",
    "Verbruik: " + Math.round(totalWh) + " Wh/dag",
    "Zonnepanelen: " + totalWp + " Wp",
    continuW > 0 ? "Continue vermogen: " + Math.round(continuW) + "W" : null,
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

  const { name, email, totalWh, totalWp, continuW, victron, groter, devices, shopUrls } = req.body;

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
        subject: "Jouw off-grid rapport: " + Math.round(totalWh) + " Wh per dag" + (continuW > 0 && victron ? ", " + victron.multiplus : ""),
        html: buildEmail({ name, totalWh, totalWp, continuW, victron, groter, devices, shopUrls }),
      }),
    });

    if (!emailResponse.ok) {
      const err = await emailResponse.json();
      throw new Error("Resend fout: " + JSON.stringify(err));
    }

    await addToShopify({ name, email, totalWh, totalWp, continuW, victron }).catch(console.error);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("send-report fout:", err);
    return res.status(500).json({ error: "Er ging iets mis bij het versturen." });
  }
}
