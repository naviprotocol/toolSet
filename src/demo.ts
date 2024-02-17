
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import {
    PACKAGE_ID,
    VOLO_NAVTIEPOOL_OBJECT,
    VOLO_CERT_OBJECT,
    VOLO_SYSTEMSTATE_OBJECT,
    VSUI,
    NAVI_STAKE_TARGET,
    CLOCK_OBJECT,
    STORAGE_OBJECT,
    vSui_POOLID_OBJECT,
    INCENTIVE_OBJECT,
    INCENTIVEV2_OBJECT
} from "./constants";
import { assert } from "console";
import * as dotenv from "dotenv";
dotenv.config();


const secret_key_mnemonics = process.env.mnemonics as string;
const network = process.env.network as "mainnet" | "testnet" | "devnet" | "localnet";

const keypair = Ed25519Keypair.deriveKeypair(secret_key_mnemonics);
console.log(keypair.getPublicKey().toSuiAddress())

const client = new SuiClient({
    url: getFullnodeUrl(network),
});

const stake_amount = 1_100_000_000; // 1 SUI = 0.994 vSui, stake 1.1 sui to get moe than 1 vsui
const decimal = 1e9;

const txb = new TransactionBlock();
const [coin] = txb.splitCoins(txb.gas, [stake_amount]);
txb.moveCall({
    target: `${PACKAGE_ID}::native_pool::stake`,
    arguments: [
        txb.object(VOLO_NAVTIEPOOL_OBJECT),
        txb.object(VOLO_CERT_OBJECT),
        txb.object(VOLO_SYSTEMSTATE_OBJECT),
        coin
    ],
});
let sender = keypair.getPublicKey().toSuiAddress();
txb.setSender(sender);

//get All vsui and check their balance
const allVsuiTokens = await client.getBalance({
    owner: sender,
    coinType: VSUI,
});
const vSuiBalance = Number(allVsuiTokens.totalBalance);
assert(vSuiBalance >= 1 * decimal, "No vSUI Balance");

let allvSuitokens = await client.getCoins({
    owner: sender,
    coinType: VSUI,
});

//Merge Token if there are more than 1 objects
if (allvSuitokens.data.length >= 2) {
    let baseObj = allvSuitokens.data[0].coinObjectId;
    let i = 1;
    while (i < allvSuitokens.data.length) {
        txb.mergeCoins(baseObj, [allvSuitokens.data[i].coinObjectId]);
        i++;
    }
}
let mergedCoin = txb.object(allvSuitokens.data[0].coinObjectId);

//Deposite 1 vSui to Navi Pool

txb.moveCall({
    target: NAVI_STAKE_TARGET,
    arguments: [
        txb.object(CLOCK_OBJECT),
        txb.object(STORAGE_OBJECT),
        txb.object(vSui_POOLID_OBJECT),
        txb.pure(5),
        mergedCoin,
        txb.pure(1_000_000_000), //stake 1 vSui
        txb.object(INCENTIVE_OBJECT),
        txb.object(INCENTIVEV2_OBJECT),
    ],
    typeArguments: [VSUI],
});

const result = await client.signAndExecuteTransactionBlock({
    transactionBlock: txb,
    signer: keypair,
    requestType: 'WaitForLocalExecution',
    options: {
        showEffects: true,
    },
});

console.log(result);