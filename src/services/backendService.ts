import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../services/declarations/backend/backend.did.js";
import { Ownership, Report, Transaction, Asset, AssetStatus, AssetType, DocumentHash, IdentityNumberType, LocationType, Rule, UserOverviewResult, TypeReportEvidence, ReportType, ProposalResult, AssetSponsorship, AssetGuarantee } from "../types/rwa";
import { unwrapResult } from "../helper/rwa-helper.js";
import { Principal } from "@dfinity/principal";

// Updated environment variable names and fallback values
const BACKEND_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_BACKEND || "23all-uiaaa-aaaac-qb3ma-cai";
const IC_HOST = import.meta.env.VITE_IC_HOST || "https://icp-api.io";

let currentActor: any = null;
let isActorInitialized = false;
let agent: HttpAgent | null = null;

const initializeActor = async (identity?: any) => {
    try {
        console.log(`🔗 Initializing actor with canister ID: ${BACKEND_CANISTER_ID}`);
        console.log(`🌐 Using host: ${IC_HOST}`);
        
        // Create HTTP Agent
        agent = new HttpAgent({
            host: IC_HOST,
            identity: identity || null
        });

        // Fetch root key only for local development
        if (import.meta.env.VITE_DFX_NETWORK !== "ic" && identity) {
            try {
                await agent.fetchRootKey();
                console.log("🔑 Root key fetched for local development");
            } catch (error) {
                console.warn("⚠️ Failed to fetch root key:", error);
            }
        }

        const actor = Actor.createActor(idlFactory, {
            agent,
            canisterId: BACKEND_CANISTER_ID,
        });
        
        console.log("✅ Actor created successfully:", actor);
        return actor;
    } catch (error) {
        console.error("❌ Failed to initialize actor:", error);
        throw error;
    }
};

export const setBackendActor = async (actor?: any) => {
    try {
        // If actor is provided directly (from AuthContext), use it
        if (actor) {
            currentActor = actor;
            isActorInitialized = true;
            console.log('✅ Backend service actor set from AuthContext');
            return;
        }

        // Otherwise, create new actor
        currentActor = await initializeActor();
        isActorInitialized = true;
        console.log('✅ Backend service actor updated');
    } catch (error) {
        console.error("❌ Failed to set backend actor:", error);
        throw error;
    }
};

export const clearBackendActor = () => {
    currentActor = null;
    isActorInitialized = false;
    agent = null;
    console.log('🧹 Backend service actor cleared');
};

const getActor = async () => {
    if (currentActor && isActorInitialized) {
        console.log('🔒 Using authenticated actor');
        return currentActor;
    }

    console.log('👤 Using anonymous actor (fallback)');
    return await initializeActor();
};

export const backendService = {

    // done
    async getMyprofileInfo(): Promise<UserOverviewResult | null> {
        try {
            const actor = await getActor();
            const res = await actor.getMyProfiles();
            return res.length === 0 ? null : res[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    },

    // done
    async getAssets(): Promise<Asset[] | null> {
        try {
            const actor = await getActor();
            const res = await actor.getAllAssets();
            return res;
        } catch (error) {
            console.error('Error fetching all assets:', error);
            return null;
        }
    },

    async getAssetbyRange(start: bigint, end: bigint): Promise<Asset[] | null> {
        try {
            const actor = await getActor();
            const res = await actor.getAssetbyRange(start, end);
            return res;
        } catch (error) {
            throw (error)
        }
    },

    async getTotalAssetCount(): Promise<bigint> {
        try {
            const actor = await getActor();
            const res = await actor.getAssetTotalCount();
            return res;
        } catch (error) {
            throw (error)
        }
    },

    // done
    async getAssetById(assetId: string): Promise<Asset | null> {
        try {
            const actor = await getActor();
            const res = await actor.getAssetById(assetId);
            if (res.length > 0 && res[0]) {
                return res[0];
            }
            return null;

        } catch (error) {
            console.error('Error fetching all assets:', error);
            return null;

        }
    },

    // done
    async createAsset(
        name: string,
        description: string,
        totalToken: bigint,
        providedToken: bigint,
        minTokenPurchased: bigint,
        maxTokenPurchased: bigint,
        pricePerToken: bigint,
        locationInfo: LocationType,
        documentHash: Array<DocumentHash>,
        assetType: AssetType,
        assetStatus: AssetStatus,
        rule: Rule,
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.createAsset(
                name,
                description,
                totalToken,
                providedToken,
                minTokenPurchased,
                maxTokenPurchased,
                pricePerToken,
                locationInfo,
                documentHash,
                assetType,
                assetStatus,
                rule
            );

            if ((res as any).err) {
                throw new Error((res as any).err);
            }

            return unwrapResult(res);
        } catch (error) {
            throw error;
        }
    },

    // done
    async registUser(
        fullName: string,
        lastName: string,
        phone: string,
        country: string,
        city: string,
        userIDNumber: string,
        userIdentity: IdentityNumberType,
        publicKey: string,
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.registUser(
                fullName,
                lastName,
                phone,
                country,
                city,
                userIDNumber,
                userIdentity,
                publicKey
            );

            if ((res as any).err) {
                throw new Error((res as any).err);
            }

            return unwrapResult(res);
        } catch (error) {
            throw error;
        }
    },

    // done
    async getAssetDetails(assetId: string): Promise<[] | [{
        asset: Asset;
        ownerships: Array<Ownership>;
        transactions: Array<Transaction>;
        dividends: Array<Transaction>;
    }]> {
        try {
            const actor = await getActor();
            const res = await actor.getAssetFullDetails(assetId);

            if ((res as any).err) {
                throw new Error((res as any).err);
            }

            console.log(res);
            return res

        } catch (error) {
            throw error;
        }
    },

    // done
    async proposedToken(
        assetId: string,
        token: bigint,
        pricePerToken: bigint
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.proposedBuyToken(assetId, token, pricePerToken);
            return unwrapResult(res);
        } catch (error) {
            throw error;
        }
    },

    // done
    async getPubKeyUser(): Promise<string | null> {
        try {
            const actor = await getActor();
            const res = await actor.getUserPublicSignature();
            return res[0] ?? null;
        } catch (error) {
            console.log("get pub key: ", error);
            throw error;
        }
    },
    async getAssetDocumentHash(assetid: string): Promise<[DocumentHash[]] | []> {
        try {
            const actor = await getActor();
            const res = await actor.getAssetSignature(assetid);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    async searchAsset(query: string, assetType: [] | [AssetStatus]): Promise<[] | [Asset]> {
        try {
            const actor = await getActor();
            const res = await actor.seacrhAsset(query, assetType);
            console.log(query, assetType, res);
            return res;
        } catch (error) {
            console.log(error)
            throw (error)
        }
    },

    async getMyAssets(): Promise<Asset[]> {
        try {
            const actor = await getActor();
            const res = await actor.getMyAssets();
            if ((res as any).err) {
                throw new Error((res as any).err);
            }
            return res;
        } catch (error) {
            throw error;
        }
    },

    async distributeDividend(assetid: string, amount: bigint): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.distributeDividend(assetid, amount);
            return unwrapResult(res);
        } catch (error) {
            throw error;
        }
    },

    async getMyOwnerships(): Promise<Ownership[]> {
        try {
            const actor = await getActor();
            const res = await actor.getMyOwnerShip();
            if ((res as any).err) {
                throw new Error((res as any).err);
            }
            return res;
        } catch (error) {
            throw error;
        }
    },

    async changeAssetStatus(assetid: string, assetstatus: AssetStatus): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.changeAssetStatus(assetid, assetstatus);
            return unwrapResult(res);
        } catch (error) {
            throw error;
        }
    },

    async getMyAssetReport(): Promise<Report[]> {
        try {
            const actor = await getActor();
            const res = await actor.getMyAssetReport()
            return res;
        } catch (error) {
            throw error;
        }
    },

    async getUserPublicKeybyPrincipal(user: Principal): Promise<[string] | []> {
        try {
            const actor = await getActor();
            const res = await actor.getUserPublicKey(user);
            return res;
        } catch (error) {
            throw (error);
        }
    },

    async createReport(
        content: string,
        description: string,
        targetid: string,
        evidence: [] | [TypeReportEvidence],
        reporttype: ReportType
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.createReportAsset(content, description, targetid, evidence, reporttype);
            return unwrapResult(res);
        } catch (error) {
            throw error;
        }
    },

    async getReportById(id: string): Promise<Report[]> {
        try {
            const actor = await getActor();
            const res = await actor.getReportById(id);
            return res;
        } catch (error) {
            throw (error)
        }
    },

    async solveReport(
        id: string,
        clarification: string,
        signaturedhash: [] | [string],
        submissionsignaturedhash: [] | [string]
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.actionReport(id, clarification, signaturedhash, submissionsignaturedhash)
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async getProposalById(assetid: string): Promise<[ProposalResult[]] | []> {
        try {
            const actor = await getActor();
            const res = await actor.getProposalbyAssetId(assetid);
            return res;
        } catch (error) {
            throw (error);
        }
    },

    async getMyProposal(): Promise<[ProposalResult[]] | []> {
        try {
            const actor = await getActor();
            const res = await actor.getMyProposal();
            return res;
        } catch (error) {
            throw (error);
        }
    },

    async proceedDp(price: bigint, buyProposalId: string): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.proceedDownPayment(price, buyProposalId);
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async finishedPayment(price: bigint, buyProposalId: string): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.finishedPayment(buyProposalId, price);
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async approveBuyProposal(proposalId: string): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.approveBuyProposal(proposalId);
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async initializeNewAssetSponsor(
        assetid: string,
        content: string,
        trustGuatantee: bigint,
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.initializeNewAssetSponsor(assetid, content, trustGuatantee);
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async addNewSponsor(
        assetid: string,
        content: string,
        trustGuatantee: bigint,
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.addNewSponsor(assetid, content, trustGuatantee);
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async createAssetGuarantee(
        assetid: string,
        content: string,
        amount: bigint,
    ): Promise<string> {
        try {
            const actor = await getActor();
            const res = await actor.createAssetGuarantee(assetid, content, amount);
            return unwrapResult(res);
        } catch (error) {
            throw (error);
        }
    },

    async getAllSponsor(): Promise<AssetSponsorship[]> {
        try {
            const actor = await getActor();
            const res = await actor.getAllSponsor();
            return res;
        } catch (error) {
            throw (error);
        }
    },

    async getAllAssetGuarantees(): Promise<AssetGuarantee[]> {
        try {
            const actor = await getActor();
            const res = await actor.getAllAssetGuarantees();
            return res;
        } catch (error) {
            throw (error);
        }
    },

    async getAssetGuarantee(assetId: string): Promise<[] | [AssetGuarantee]> {
        try {
            const actor = await getActor();
            const res = await actor.getAssetGuarantee(assetId);
            return res;
        } catch (error) {
            throw (error);
        }
    },

    async getSponsorsByAssetId(assetId: string): Promise<AssetSponsorship[]> {
        try {
            const actor = await getActor();
            const res = await actor.getSponsorsByAssetId(assetId);
            return res;
        } catch (error) {
            throw (error);
        }
    },


};