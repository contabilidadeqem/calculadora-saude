import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Inter font (Light 300 + Bold 700 + Black 900) — TTFs do Google Fonts.
// Satori só aceita TTF/OTF — não WOFF/WOFF2.
const INTER_LIGHT =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf";
const INTER_BOLD =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf";
const INTER_BLACK =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf";

// Paleta Q&M
const BG = "#F5EFE0";
const INK = "#0B2027";
const PETROLEUM = "#1A4D5C";
const GOLD = "#D4A574";
const GOLD_SOFT = "#E8DCC4";
const MUTED = "#6B7A80";

const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
    .format(n)
    .replace("R$", "")
    .trim();

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao carregar fonte: ${url}`);
  return await res.arrayBuffer();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nome = (searchParams.get("nome") || "Visitante")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join(" ");
  const economiaMensal = Math.max(0, Number(searchParams.get("em") || 0));
  const economiaAnual = Math.max(0, Number(searchParams.get("ea") || 0));
  const reducao = Math.max(0, Math.min(100, Number(searchParams.get("r") || 0)));

  const em5anos = economiaAnual * 5;
  const em10anos = economiaAnual * 10;

  const [light, bold, black] = await Promise.all([
    loadFont(INTER_LIGHT),
    loadFont(INTER_BOLD),
    loadFont(INTER_BLACK),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          padding: 56,
          fontFamily: "Inter",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: 4,
              color: GOLD,
            }}
          >
            Q&amp;M CONSULTORIA
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontSize: 20,
              fontWeight: 700,
              color: INK,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 99,
                background: "#10B981",
                marginRight: 12,
              }}
            />
            <div style={{ display: "flex" }}>ESPECIALISTAS EM SAÚDE</div>
          </div>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            color: GOLD,
            marginBottom: 8,
          }}
        >
          ANÁLISE PARA
        </div>

        {/* Nome */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: -1,
            marginBottom: 32,
          }}
        >
          {nome}
        </div>

        {/* Card escuro — economia anual */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: `linear-gradient(135deg, ${INK} 0%, ${PETROLEUM} 100%)`,
            borderRadius: 28,
            padding: 44,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              color: GOLD_SOFT,
              marginBottom: 18,
            }}
          >
            SUA ECONOMIA ANUAL
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                color: GOLD,
                marginRight: 14,
                marginBottom: 24,
              }}
            >
              R$
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 168,
                fontWeight: 900,
                color: GOLD,
                lineHeight: 0.9,
                letterSpacing: -4,
              }}
            >
              {formatBRL(economiaAnual)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 700,
                color: GOLD_SOFT,
                marginRight: 24,
              }}
            >
              R$ {formatBRL(economiaMensal)} / mês
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: GOLD,
              }}
            >
              {reducao.toFixed(0)}% menos imposto
            </div>
          </div>
        </div>

        {/* Dois cards claros — projeção */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: 24,
              padding: 28,
              flex: 1,
              marginRight: 18,
              border: `1.5px solid ${GOLD_SOFT}`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 3,
                color: MUTED,
                marginBottom: 12,
              }}
            >
              EM 5 ANOS
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                color: INK,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 700,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                R$
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 64,
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: -2,
                }}
              >
                {formatBRL(em5anos)}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: 24,
              padding: 28,
              flex: 1,
              border: `1.5px solid ${GOLD_SOFT}`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 3,
                color: MUTED,
                marginBottom: 12,
              }}
            >
              EM 10 ANOS
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                color: INK,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 700,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                R$
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 64,
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: -2,
                }}
              >
                {formatBRL(em10anos)}
              </div>
            </div>
          </div>
        </div>

        {/* Como funciona */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#FFFFFF",
            borderRadius: 24,
            padding: 32,
            border: `1.5px solid ${GOLD_SOFT}`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 3,
              color: GOLD,
              marginBottom: 12,
            }}
          >
            COMO FUNCIONA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 300,
              color: INK,
              lineHeight: 1.35,
            }}
          >
            A Equiparação Hospitalar reduz a base de cálculo do IRPJ e CSLL de
            32% para 8% e 12% — benefício previsto na Lei 9.249/95 com respaldo
            do STJ.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            color: MUTED,
          }}
        >
          LEI 9.249/95 · RESPALDO STJ · Q&amp;M CONSULTORIA
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      fonts: [
        { name: "Inter", data: light, weight: 300, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: black, weight: 900, style: "normal" },
      ],
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400",
      },
    }
  );
}
