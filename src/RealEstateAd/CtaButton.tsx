import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CtaButton: React.FC<{
  text: string;
  accentColor: string;
  backgroundColor: string;
  delay: number;
}> = ({ text, accentColor, backgroundColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const scaleIn = interpolate(entrance, [0, 1], [0.6, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const pulse =
    frame > delay + 20
      ? 1 + Math.sin((frame - delay) / 9) * 0.035
      : 1;

  const arrowBounce = Math.sin(frame / 6) * 6;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        opacity,
        transform: `scale(${scaleIn * pulse})`,
      }}
    >
      <div
        style={{
          backgroundColor: accentColor,
          color: backgroundColor,
          fontSize: 42,
          fontWeight: 700,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          padding: "26px 64px",
          borderRadius: 999,
          boxShadow: `0 12px 40px ${accentColor}55`,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: 28,
          color: accentColor,
          transform: `translateY(${arrowBounce}px)`,
        }}
      >
        ↑
      </div>
    </div>
  );
};
