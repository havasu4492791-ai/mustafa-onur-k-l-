import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const BenefitRow: React.FC<{
  text: string;
  accentColor: string;
  textColor: string;
  delay: number;
}> = ({ text, accentColor, textColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const translateX = interpolate(progress, [0, 1], [-60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `2px solid ${accentColor}`,
          color: accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontSize: 34,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: textColor,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Benefits: React.FC<{
  items: string[];
  accentColor: string;
  textColor: string;
  startFrame: number;
  stagger: number;
}> = ({ items, accentColor, textColor, startFrame, stagger }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {items.map((item, index) => (
        <BenefitRow
          key={item}
          text={item}
          accentColor={accentColor}
          textColor={textColor}
          delay={startFrame + index * stagger}
        />
      ))}
    </div>
  );
};
