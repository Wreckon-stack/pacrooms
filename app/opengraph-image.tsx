import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PACROOMS — The Tokenized Entity Is Hungry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background:
            "radial-gradient(ellipse at center, #1a1208 0%, #0a0805 60%, #050402 100%)",
          color: "#cda434",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            borderTop: "3px solid #cda434",
            borderLeft: "3px solid #cda434",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 40,
            height: 40,
            borderTop: "3px solid #cda434",
            borderRight: "3px solid #cda434",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            width: 40,
            height: 40,
            borderBottom: "3px solid #cda434",
            borderLeft: "3px solid #cda434",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            width: 40,
            height: 40,
            borderBottom: "3px solid #cda434",
            borderRight: "3px solid #cda434",
          }}
        />

        {/* top status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 6,
            color: "#cda434",
            opacity: 0.8,
          }}
        >
          <span>● REC // CAM-07 / LEVEL_7</span>
          <span style={{ color: "#ff1a1a" }}>● HUNGER: 87%</span>
        </div>

        {/* main */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 10,
              color: "#cda434",
              opacity: 0.75,
            }}
          >
            ░░ TOKENIZED AGENT // PUMP.FUN ORIGIN ░░
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              letterSpacing: 8,
              color: "#cda434",
              marginTop: 12,
              textShadow: "0 0 30px rgba(205,164,52,0.6)",
              display: "flex",
            }}
          >
            PACROOMS
          </div>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 5,
              color: "#e4e4e7",
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ color: "#ff1a1a" }}>▌</span>
            <span>THE TOKENIZED ENTITY IS HUNGRY.</span>
          </div>
        </div>

        {/* bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            color: "#a1a1aa",
          }}
        >
          <span>BORN ON PUMP.FUN ▸ TRAPPED IN THE BACKROOMS ▸ SOLANA</span>
          <span style={{ color: "#39ff14" }}>● AGENT ONLINE</span>
        </div>

        {/* scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0.25) 4px, rgba(0,0,0,0) 5px)",
            pointerEvents: "none",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
