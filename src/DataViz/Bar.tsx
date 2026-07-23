import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Bar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
  delay: number;
}> = ({ label, value, maxValue, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const growth = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 200,
    },
  });

  const heightPercentage = interpolate(growth, [0, 1], [0, value / maxValue]);
  const displayedValue = Math.round(
    interpolate(growth, [0, 1], [0, value], {
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        width: 140,
        height: "100%",
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: "#0b0d17",
          marginBottom: 12,
        }}
      >
        {displayedValue}
      </div>
      <div
        style={{
          width: "100%",
          height: `${heightPercentage * 100}%`,
          backgroundColor: color,
          borderRadius: "10px 10px 0 0",
        }}
      />
      <div
        style={{
          fontSize: 26,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: "#6b7280",
          marginTop: 16,
        }}
      >
        {label}
      </div>
    </div>
  );
};
