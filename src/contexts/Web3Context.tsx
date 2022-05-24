import React, { useState, useEffect, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import { CHAIN_ID } from '../config/constants';

// so TypeScript doesn't complain about `window.ethereum`
declare const window: any;

interface Web3ContextProps {
	web3IsAvailable: boolean;
	activeAddress?: string;
	provider: any; // ethers.js provider object
	connectWallet: Function;
}

interface Web3ProviderProps {
	children?: React.ReactNode;
}

const Web3Context = createContext<Web3ContextProps>({} as Web3ContextProps);

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
	const [web3IsAvailable, setWeb3IsAvailable] = useState<boolean>(false);
	const [activeAddress, setActiveAddress] = useState<string>();
	const [provider, setProvider] = useState<any>();

	// Check if the browser supports wallet on-mount
	useEffect(() => {
		if (!!window && !!window.ethereum) {
			setWeb3IsAvailable(true);
		}
	}, []);

	// Connect user wallet to site and fetch active account
	const connectWallet = async () => {
		if (web3IsAvailable) {
			try {
				// Check if user connected to either correct production or development network
				const clientChainId = parseInt(window.ethereum.networkVersion);

				if (clientChainId !== CHAIN_ID) {
					alert(`Invalid network - connect to ${CHAIN_ID}`);
					return;
				}

				// Instantiate web3 provider
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				setProvider(provider);

				// Request user accounts
				const accounts = await provider.send('eth_requestAccounts', []);

				// If accounts available, set first account as active & add wallet change event handlers
				if (accounts.length > 0) {
					setActiveAddress(accounts[0]);
					window.ethereum.on('accountsChanged', () => window.location.reload());
					window.ethereum.on('chainChanged', () => window.location.reload());
				} else {
					alert('No valid Ethereum addresses found');
				}
			} catch (error) {
				console.error(error);
				alert('Error connecting! Are you logged into your wallet?');
			}
		}
	};

	return (
		<Web3Context.Provider
			value={{ web3IsAvailable, activeAddress, provider, connectWallet }}
		>
			{children}
		</Web3Context.Provider>
	);
};
