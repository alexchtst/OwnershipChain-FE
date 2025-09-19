import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backend_idl } from "../services/declarations/backend/index.js";
import { canisterId as backend_id } from "../services/declarations/backend/index.js";
import { setBackendActor, clearBackendActor } from "../services/backendService";

type AuthContextType = {
    authClient: AuthClient | null;
    isAuthenticated: boolean;
    principal: string | null;
    actor: any;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    authClient: null,
    isAuthenticated: false,
    principal: null,
    actor: null,
    login: async () => { },
    logout: async () => { },
    isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [principal, setPrincipal] = useState<string | null>(null);
    const [actor, setActor] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const client = await AuthClient.create();
            setAuthClient(client);

            if (await client.isAuthenticated()) {
                await handleLoginSuccess(client);
            }

            setIsLoading(false);

        })();
    }, []);

    const handleLoginSuccess = async (client: AuthClient) => {
        setIsAuthenticated(true);
        const identity = client.getIdentity();
        const principalText = identity.getPrincipal().toString();
        console.log("✅ Logged in principal:", principalText);
        setPrincipal(identity.getPrincipal().toString());

        // Get canister ID with fallback
        const canisterId = backend_id || import.meta.env.VITE_CANISTER_ID_BACKEND || "engfj-myaaa-aaaac-qaita-cai";
        
        if (!canisterId) {
            console.error("❌ No canister ID found!");
            return;
        }

        console.log("🔗 Using canister ID:", canisterId);

        const host = import.meta.env.VITE_DFX_NETWORK === "ic" 
            ? "https://icp-api.io" 
            : "http://localhost:4943";

        const agent = new HttpAgent({ 
            identity,
            host 
        });

        if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
            try {
                await agent.fetchRootKey();
            } catch (error) {
                console.warn("⚠️ Failed to fetch root key:", error);
            }
        }

        try {
            const myActor = Actor.createActor(backend_idl, {
                agent,
                canisterId,
            });

            setActor(myActor);
            // Pass the actor directly to backendService
            setBackendActor(myActor);
            console.log("✅ Actor created successfully");
        } catch (error) {
            console.error("❌ Failed to create actor:", error);
        }
    };

    const login = async () => {
        if (!authClient) return;

        await new Promise<void>((resolve, reject) => {
            authClient.login({
                identityProvider:
                    import.meta.env.VITE_DFX_NETWORK === "ic"
                        ? "https://identity.ic0.app"
                        : `http://${import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`,
                onSuccess: async () => {
                    await handleLoginSuccess(authClient);
                    resolve();
                },
                onError: reject,
            });
        });
    };

    const logout = async () => {
        if (!authClient) return;
        await authClient.logout();
        setIsAuthenticated(false);
        setPrincipal(null);
        setActor(null);

        clearBackendActor();
    };

    return (
        <AuthContext.Provider value={{
            authClient,
            isAuthenticated,
            principal,
            actor,
            login,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);