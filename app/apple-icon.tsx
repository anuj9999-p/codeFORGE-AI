import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #343943 0%, #FF6B35 55%, #FFB627 85%, #7DD3FC 100%)",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 7 7 7 12a5 5 0 0 0 10 0c0-1.5-.5-2.5-1-3.5.5 2 0 3-1 3.5.5-2-1-4-3-6.5.5 2.5-1 3.5-2 5-.5.7-1 1.5-1 2.5a3 3 0 0 0 6 0c0-3-3-6-3-6"
            fill="#0B0C0F"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
