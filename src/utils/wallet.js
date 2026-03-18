import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import * as bip39 from "bip39";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export const createWallet = async () => {
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);

    const seed32 = seed.slice(0, 32);
    const keypair = Keypair.fromSeed(seed32);

    return {
        seed,
        mnemonic,
        publicKey: keypair.publicKey.toString(),
        secretKey: Array.from(keypair.secretKey)
    }
}