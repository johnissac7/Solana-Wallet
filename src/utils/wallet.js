import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import * as bip39 from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export const createWallet = async (index = 0) => {
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);

    const hd = HDKey.fromMasterSeed(seed);

    const path = `m/44'/501'/${index}'/0'`;
    const derived = hd.derive(path);

    // const seed32 = seed.slice(0, 32);
    const keypair = Keypair.fromSeed(derived.privateKey);

    return {
        seed,
        mnemonic,
        publicKey: keypair.publicKey.toString(),
        secretKey: Array.from(keypair.secretKey)
    }
}