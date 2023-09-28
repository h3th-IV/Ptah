"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const challengeUtils = require("../lib/challengeUtils");
const utils = __importStar(require("../lib/utils"));
const nftABI = require('../data/static/contractABIs').nftABI;
const ethers = require('ethers');
const challenges = require('../data/datacache').challenges;
const nftAddress = '0x41427790c94E7a592B17ad694eD9c06A02bb9C39';
const addressesMinted = new Set();
let isEventListenerCreated = false;
module.exports.nftMintListener = function nftMintListener() {
    return (req, res) => {
        try {
            const customHttpProvider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/0b88ff4d03a647b8a4649e9bfdf6644f');
            const contract = new ethers.Contract(nftAddress, nftABI, customHttpProvider);
            if (!isEventListenerCreated) {
                contract.on('NFTMinted', (minter) => {
                    if (!addressesMinted.has(minter)) {
                        addressesMinted.add(minter);
                    }
                });
                isEventListenerCreated = true;
            }
            res.status(200).json({ success: true, message: 'Event Listener Created' });
        }
        catch (error) {
            res.status(500).json(utils.getErrorMessage(error));
        }
    };
};
module.exports.walletNFTVerify = function walletNFTVerify() {
    return (req, res) => {
        try {
            const metamaskAddress = req.body.walletAddress;
            if (addressesMinted.has(metamaskAddress)) {
                addressesMinted.delete(metamaskAddress);
                challengeUtils.solveIf(challenges.nftMintChallenge, () => true);
                res.status(200).json({ success: true, message: 'Challenge successfully solved', status: challenges.nftMintChallenge });
            }
            else {
                res.status(200).json({ success: false, message: 'Wallet did not mint the NFT', status: challenges.nftMintChallenge });
            }
        }
        catch (error) {
            res.status(500).json(utils.getErrorMessage(error));
        }
    };
};
//# sourceMappingURL=nftMint.js.map