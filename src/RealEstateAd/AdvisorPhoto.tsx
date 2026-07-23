import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const AdvisorPhoto: React.FC<{
  src: string;
  caption: string;
  accentColor: string;
  delay: number;
}> = ({ src, caption, accentColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(progress, [0, 1], [0.7, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: `4px solid ${accentColor}`,
          overflow: "hidden",
          boxShadow: `0 12px 40px ${accentColor}55`,
        }}
      >
        <Img
          src={src}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 26,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: accentColor,
        }}
      >
        {caption}
      </div>
    </div>
  );
};
