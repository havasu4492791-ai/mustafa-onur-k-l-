import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Background: React.FC<{
  backgroundColor: string;
  accentColor: string;
}> = ({ backgroundColor, accentColor }) => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 240], [0, 12]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${backgroundColor} 0%, color-mix(in srgb, ${backgroundColor} 35%, black) 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -220,
          width: 620,
          height: 620,
          borderRadius: "50%",
          border: `2px solid ${accentColor}`,
          opacity: 0.25,
          transform: `rotate(${rotation}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -320,
          left: -260,
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `2px solid ${accentColor}`,
          opacity: 0.15,
          transform: `rotate(${-rotation}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};
