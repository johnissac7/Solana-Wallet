import { Connection, clusterApiUrl } from "@solana/web3.js";

const cluster =
  import.meta.env.VITE_SOLANA_CLUSTER?.trim() ||
  import.meta.env.VITE_CLUSTER?.trim() ||
  "devnet";

const commitment =
  import.meta.env.VITE_SOLANA_COMMITMENT?.trim() ||
  import.meta.env.VITE_COMMITMENT?.trim() ||
  "confirmed";

export const connection = new Connection(
  clusterApiUrl(cluster),
  commitment,
);