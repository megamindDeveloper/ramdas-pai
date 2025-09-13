import localFont from "next/font/local";
import { Bungee } from "next/font/google";
const helvetica = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Medium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Bold.woff",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/HelveticaNowDisplay-ExtraBold.woff",
      weight: "800",
      style: "extraBold",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Black.woff",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-helvetica",
});

const arkitype = localFont({
  src: "./fonts/Arkitype.woff",
  variable: "--font-arkitype",
  weight: "400 600 700 900",
});

const bungee = Bungee({
  variable: "--font-bungee",
  weight: ["400"],
  subsets: ["latin"],
});
export { helvetica, arkitype, bungee };
