import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { AdvisorPhoto } from "./AdvisorPhoto";
import { Background } from "./Background";
import { Benefits } from "./Benefits";
import { CtaButton } from "./CtaButton";
import { Hook } from "./Hook";
import { TrustStat } from "./TrustStat";

export const realEstateAdSchema = z.object({
  hookText: z.string(),
  trustNumber: z.number(),
  trustCaption: z.string(),
  advisorPhoto: z.string(),
  advisorName: z.string(),
  advisorCaption: z.string(),
  brandName: z.string(),
  headline: z.string(),
  benefits: z.array(z.string()),
  ctaText: z.string(),
  backgroundColor: zColor(),
  accentColor: zColor(),
  textColor: zColor(),
});

// Opening beats: curiosity hook, then a trust-building stat, before the
// branded pitch begins.
const HOOK_START = 0;
const HOOK_FADE_OUT = 38;
const HOOK_END = 50;

const STAT_START = 42;
const STAT_FADE_OUT = 92;
const STAT_END = 102;

// Everything below is offset so the branded pitch begins once the two
// opening beats have finished.
const MAIN_OFFSET = 100;
const ADVISOR_PHOTO_DELAY = MAIN_OFFSET + 10;
const HEADLINE_DELAY = MAIN_OFFSET + 45;
const BENEFITS_START = MAIN_OFFSET + 95;
const BENEFITS_STAGGER = 18;
const CTA_DELAY = MAIN_OFFSET + 215;

export const RealEstateAd: React.FC<z.infer<typeof realEstateAdSchema>> = ({
  hookText,
  trustNumber,
  trustCaption,
  advisorPhoto,
  advisorName,
  advisorCaption,
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

  const brandOpacity = interpolate(
    frame,
    [MAIN_OFFSET, MAIN_OFFSET + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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

      <Hook
        text={hookText}
        textColor={textColor}
        accentColor={accentColor}
        start={HOOK_START}
        fadeOutStart={HOOK_FADE_OUT}
        end={HOOK_END}
      />

      <TrustStat
        value={trustNumber}
        caption={trustCaption}
        accentColor={accentColor}
        textColor={textColor}
        start={STAT_START}
        fadeOutStart={STAT_FADE_OUT}
        end={STAT_END}
      />

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

        <div style={{ marginTop: 60 }}>
          <AdvisorPhoto
            src={advisorPhoto}
            name={advisorName}
            caption={advisorCaption}
            accentColor={accentColor}
            textColor={textColor}
            delay={ADVISOR_PHOTO_DELAY}
          />
        </div>

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
