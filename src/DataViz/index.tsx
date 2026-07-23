import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Bar } from "./Bar";

export const dataVizSchema = z.object({
  title: z.string(),
  bars: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      color: zColor(),
    }),
  ),
});

const STAGGER_FRAMES = 6;
const BARS_START_FRAME = 20;

export const DataViz: React.FC<z.infer<typeof dataVizSchema>> = ({
  title,
  bars,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const maxValue = Math.max(...bars.map((bar) => bar.value));

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const overallOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 10],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f5f5f7",
        opacity: overallOpacity,
        alignItems: "center",
        paddingTop: 90,
      }}
    >
      <div
        style={{
          fontSize: 54,
          fontWeight: 700,
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          color: "#0b0d17",
          opacity: titleOpacity,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 48,
          height: 480,
          marginTop: 90,
        }}
      >
        {bars.map((bar, index) => (
          <Bar
            key={bar.label}
            label={bar.label}
            value={bar.value}
            maxValue={maxValue}
            color={bar.color}
            delay={BARS_START_FRAME + index * STAGGER_FRAMES}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
