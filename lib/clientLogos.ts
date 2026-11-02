import type { StaticImageData } from "next/image";
import bbva from "@/public/assets/img/clients/01_bbva.png";
import mckinsey from "@/public/assets/img/clients/02_mckinsey-company.png";
import repsol from "@/public/assets/img/clients/03_repsol.png";
import mediapro from "@/public/assets/img/clients/04_mediapro.png";
import auren from "@/public/assets/img/clients/05_auren.png";
import qonto from "@/public/assets/img/clients/06_qonto.png";
import vestel from "@/public/assets/img/clients/07_vestel-ingenieros.png";
import econocom from "@/public/assets/img/clients/08_econocom.png";
import spaceGo from "@/public/assets/img/clients/09_space-go.png";
import tailorHub from "@/public/assets/img/clients/10_tailor-hub.png";
import igeneris from "@/public/assets/img/clients/11_igeneris.png";
import impackta from "@/public/assets/img/clients/14_impackta.png";
import shakers from "@/public/assets/img/clients/15_shakers.png";

// Client logos shown on the site (white PNGs, shown inverted at 70%), in the
// prototype's order. Daily Playlists, Incentro and ioforge are deliberately
// left out.
// `k` is the optical factor that makes every logo weigh the same: height is
// 26px x k on desktop and 20px x k on mobile.
//
// `permission` tracks the claims document: only "written" logos may go live
// (FEATURES.onlyApprovedLogos hides the rest). On 2 Nov 2026 the project owner
// approved the logos as they are, including McKinsey, Repsol, Auren and Qonto, so
// every entry is "written" and the flag stays off. Set an entry back to
// "pending"/"excluded" and turn the flag on to withdraw a logo.
export type ClientLogo = {
  name: string;
  src: StaticImageData;
  k: number;
  permission: "written" | "pending" | "excluded";
};

export const CLIENT_LOGOS: readonly ClientLogo[] = [
  { name: "BBVA", src: bbva, k: 0.99, permission: "written" },
  { name: "McKinsey & Company", src: mckinsey, k: 1.29, permission: "written" },
  { name: "Repsol", src: repsol, k: 0.84, permission: "written" },
  { name: "Mediapro", src: mediapro, k: 1.45, permission: "written" },
  { name: "Auren", src: auren, k: 1.23, permission: "written" },
  { name: "Qonto", src: qonto, k: 0.95, permission: "written" },
  { name: "Vestel Ingenieros", src: vestel, k: 0.97, permission: "written" },
  { name: "Econocom", src: econocom, k: 0.5, permission: "written" },
  { name: "Space Go", src: spaceGo, k: 1.27, permission: "written" },
  { name: "Tailor Hub", src: tailorHub, k: 0.82, permission: "written" },
  { name: "iGeneris", src: igeneris, k: 0.83, permission: "written" },
  { name: "Impackta", src: impackta, k: 0.77, permission: "written" },
  { name: "Shakers", src: shakers, k: 1.45, permission: "written" },
];
