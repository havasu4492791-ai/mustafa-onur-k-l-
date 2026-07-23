import { interpolate, useCurrentFrame } from "remotion";

export const Hook: React.FC<{
  text: string;
  textColor: string;
  accentColor: string;
  start: number;
  fadeOutStart: number;
  end: number;
}> = ({ text, textColor, accentColor, start, fadeOutStart, end }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [start, start + 10, fadeOutStart, end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const underlineWidth = interpolate(
    frame,
    [start + 10, start + 30],
    [0, 160],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 100px",
        opacity,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 62,
          fontWeight: 700,
          lineHeight: 1.25,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: textColor,
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 28,
          width: underlineWidth,
          height: 4,
          backgroundColor: accentColor,
          borderRadius: 2,
        }}
      />
    </div>
  );
};
