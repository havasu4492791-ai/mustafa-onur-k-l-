import { interpolate, useCurrentFrame } from "remotion";

const PATH_LENGTH = 620;

export const HouseIcon: React.FC<{ color: string; delay: number }> = ({
  color,
  delay,
}) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame - delay, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fillOpacity = interpolate(frame - delay, [35, 60], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={180} height={180} viewBox="0 0 200 200" fill="none">
      <path
        d="M100 20 L180 90 H160 V180 H120 V120 H80 V180 H40 V90 H20 Z"
        stroke={color}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={color}
        fillOpacity={fillOpacity}
        strokeDasharray={PATH_LENGTH}
        strokeDashoffset={PATH_LENGTH * (1 - drawProgress)}
      />
    </svg>
  );
};
