import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Background } from "./Background";
import { Benefits } from "./Benefits";
import { CtaButton } from "./CtaButton";
import { HouseIcon } from "./HouseIcon";

export const realEstateAdSchema = z.object({
  brandName: z.string(),
  headline: z.string(),
  benefits: z.array(z.string()),
  ctaText: z.string(),
  backgroundColor: zColor(),
  accentColor: zColor(),
  textColor: zColor(),
});

const HOUSE_ICON_DELAY = 10;
const HEADLINE_DELAY = 45;
const BENEFITS_START = 100;
const BENEFITS_STAGGER = 22;
const CTA_DELAY = 175;

export const RealEstateAd: React.FC<z.infer<typeof realEstateAdSchema>> = ({
  brandName,
  headline,
  benefits,
  ctaText,
  backgroundColor,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineProgress = spring({
    frame: frame - HEADLINE_DELAY,
    fps,
    config: { damping: 200 },
  });
  const headlineTranslateY = interpolate(headlineProgress, [0, 1], [40, 0]);
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <Background backgroundColor={backgroundColor} accentColor={accentColor} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          paddingTop: 90,
        }}
      >
        <div
          style={{
            fontSize: 32,
            letterSpacing: 4,
            fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
            color: accentColor,
            opacity: brandOpacity,
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </div>

        <Sequence from={HOUSE_ICON_DELAY - 5} layout="none">
          <div style={{ marginTop: 60 }}>
            <HouseIcon color={accentColor} delay={5} />
          </div>
        </Sequence>

        <div
          style={{
            marginTop: 50,
            padding: "0 90px",
            textAlign: "center",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
            color: textColor,
            opacity: headlineOpacity,
            transform: `translateY(${headlineTranslateY}px)`,
          }}
        >
          {headline}
        </div>

        <div style={{ marginTop: 80 }}>
          <Benefits
            items={benefits}
            accentColor={accentColor}
            textColor={textColor}
            startFrame={BENEFITS_START}
            stagger={BENEFITS_STAGGER}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 130 }}>
        <CtaButton
          text={ctaText}
          accentColor={accentColor}
          backgroundColor={backgroundColor}
          delay={CTA_DELAY}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
