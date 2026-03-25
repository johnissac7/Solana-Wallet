import * as bip39 from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js";

async function generate(mnemonic, index = 0) {
  const normalizedMnemonic = String(mnemonic)
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .join(" ");

  if (!bip39.validateMnemonic(normalizedMnemonic)) {
    throw new Error("Invalid recovery phrase (mnemonic).");
  }

  const seed = await bip39.mnemonicToSeed(normalizedMnemonic);
  const hd = HDKey.fromMasterSeed(seed);

  const path = `m/44'/501'/${index}'/0'`;
  const derived = hd.derive(path);
  if (!derived.privateKey) {
    throw new Error("Failed to derive private key");
  }

  const keypair = Keypair.fromSeed(derived.privateKey);

  return {
    index,
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey),
  };
}

//Add Wallet
export const addWallet = async (walletData) => {
  const { mnemonic, wallets = [] } = walletData;

  const nextIndex = wallets.length;
  const newWallet = await generate(mnemonic, nextIndex);

  return {
    ...walletData,
    wallets: [...wallets, newWallet],
    activeIndex: nextIndex,
  };
};

//Create Wallet
export const createWallet = async () => {
  const mnemonic = bip39.generateMnemonic();
  const firstWallet = await generate(mnemonic, 0);

  return {
    mnemonic,
    wallets: [firstWallet],
    activeIndex: 0,
  };
};

//Import Wallet Through Mnemonic
export const importWalletMnemonic = async (mnemonic) => {
  const firstWallet = await generate(mnemonic, 0);

  return {
    mnemonic,
    wallets: [firstWallet],
    activeIndex: 0,
  };
};
