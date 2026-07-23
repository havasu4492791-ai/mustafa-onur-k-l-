import "./index.css";
import { Composition, staticFile } from "remotion";
import { DataViz, dataVizSchema } from "./DataViz";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { RealEstateAd, realEstateAdSchema } from "./RealEstateAd";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      <Composition
        id="DataViz"
        component={DataViz}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={dataVizSchema}
        defaultProps={{
          title: "Quarterly Revenue",
          bars: [
            { label: "Q1", value: 42, color: "#91EAE4" },
            { label: "Q2", value: 68, color: "#86A8E7" },
            { label: "Q3", value: 55, color: "#7F7FD5" },
            { label: "Q4", value: 91, color: "#5B4FE9" },
          ],
        }}
      />

      <Composition
        id="RealEstateAd"
        component={RealEstateAd}
        durationInFrames={390}
        fps={30}
        width={1080}
        height={1920}
        schema={realEstateAdSchema}
        defaultProps={{
          hookText: "İzmir'de Ev Almadan Önce Bunu İzleyin",
          trustNumber: 500,
          trustCaption: "Aileye İzmir'de Ev Bulduk",
          advisorPhoto: staticFile("images/advisor.jpg"),
          advisorCaption: "Size Özel Danışmanınız",
          brandName: "Good Invest",
          headline: "İzmir Merkezde Ev mi Arıyorsunuz?",
          benefits: [
            "Ücretsiz Danışmanlık Hizmeti",
            "Gerçek Fiyatlara Ulaşın",
            "Geniş Danışman Ağımızla Destek",
            "Sizi Aynı Gün Arayalım",
            "İlanda Olmayan Evleri de Sunalım",
          ],
          ctaText: "Formu Doldur",
          backgroundColor: "#0B1F3A",
          accentColor: "#D4AF37",
          textColor: "#F5F0E6",
        }}
      />

      {/* Variant B: scarcity / urgency angle, warm terracotta theme */}
      <Composition
        id="RealEstateAdScarcity"
        component={RealEstateAd}
        durationInFrames={390}
        fps={30}
        width={1080}
        height={1920}
        schema={realEstateAdSchema}
        defaultProps={{
          hookText: "Bu Ay Sadece 15 Aileye Özel Danışmanlık",
          trustNumber: 15,
          trustCaption: "Bu Ay Kalan Ücretsiz Danışmanlık Kontenjanı",
          advisorPhoto: staticFile("images/advisor.jpg"),
          advisorCaption: "Size Özel Danışmanınız",
          brandName: "Good Invest",
          headline: "İlanda Olmayan Evleri Kaçırmayın",
          benefits: [
            "Bu Ay Sınırlı Kontenjan",
            "İlanda Olmayan Evlere Erişim",
            "Sizi Aynı Gün Arayalım",
            "Ücretsiz Fiyat Analizi Raporu",
            "Hiçbir Taahhüt Yok",
          ],
          ctaText: "Hemen Başvur",
          backgroundColor: "#5C2A1D",
          accentColor: "#E07A5F",
          textColor: "#F5F0E6",
        }}
      />

      {/* Variant C: price-gap curiosity angle, modern purple/turquoise theme */}
      <Composition
        id="RealEstateAdModern"
        component={RealEstateAd}
        durationInFrames={390}
        fps={30}
        width={1080}
        height={1920}
        schema={realEstateAdSchema}
        defaultProps={{
          hookText: "İlan Fiyatı ile Gerçek Fiyat Arasındaki Farkı Öğrenin",
          trustNumber: 500,
          trustCaption: "Aileye İzmir'de Ev Bulduk",
          advisorPhoto: staticFile("images/advisor.jpg"),
          advisorCaption: "Size Özel Danışmanınız",
          brandName: "Good Invest",
          headline: "Gerçek Fiyatı Bilmeden Karar Vermeyin",
          benefits: [
            "Gerçek Fiyatlara Ulaşın",
            "Size Özel Portföy",
            "Geniş Danışman Ağımızla Destek",
            "Sizi Aynı Gün Arayalım",
            "Ücretsiz Fiyat Analizi",
          ],
          ctaText: "Formu Doldur",
          backgroundColor: "#3B1F63",
          accentColor: "#2DD4BF",
          textColor: "#F5F0E6",
        }}
      />
    </>
  );
};
