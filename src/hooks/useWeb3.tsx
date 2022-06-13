import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAIN_ID } from '../config/constants';

const connector = new InjectedConnector({ supportedChainIds: [CHAIN_ID] });

const useWeb3 = () => {
	const {
		library: provider,
		active: isActive,
		account,
		activate,
		deactivate,
		error,
	} = useWeb3React();

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	const useSigner = () => provider.getSigner();

	const connectWallet = async () => {
		try {
			await activate(connector);
		} catch (error) {
			console.error(error);
		}
	};

	const disconnectWallet = async () => {
		try {
			deactivate();
		} catch (error) {
			console.error(error);
		}
	};

	return {
		provider,
		isActive,
		account,
		useSigner,
		connectWallet,
		disconnectWallet,
	};
};

export default useWeb3;
