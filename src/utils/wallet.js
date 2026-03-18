import * as bip39 from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;

async function generate(mnemonic, index = 0) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid recovery phrase (mnemonic).");
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hd = HDKey.fromMasterSeed(seed);

  const path = `m/44'/501'/${index}'/0'`;
  const derived = hd.derive(path);

  const keypair = Keypair.fromSeed(derived.privateKey);

  return {
    mnemonic,
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey),
  };
}

export const createWallet = async () => {
  const mnemonic = bip39.generateMnemonic();
  return generate(mnemonic);
};

export const importWalletMnemonic = async (mnemonic) => {
  return generate(mnemonic);
};
