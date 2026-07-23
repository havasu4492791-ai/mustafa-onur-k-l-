import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TrustStat: React.FC<{
  value: number;
  caption: string;
  accentColor: string;
  textColor: string;
  start: number;
  fadeOutStart: number;
  end: number;
}> = ({ value, caption, accentColor, textColor, start, fadeOutStart, end }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [start, start + 10, fadeOutStart, end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const countProgress = spring({
    frame: frame - start - 5,
    fps,
    config: { damping: 200 },
  });

  const displayedValue = Math.round(
    interpolate(countProgress, [0, 1], [0, value], {
      extrapolateRight: "clamp",
    }),
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
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 170,
          fontWeight: 700,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: accentColor,
          lineHeight: 1,
        }}
      >
        {displayedValue}+
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 40,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: textColor,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        {caption}
      </div>
    </div>
  );
};
