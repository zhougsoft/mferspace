import { useEffect, useCallback } from 'react';
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

	const _hasStoredConnection = useCallback(
		() => localStorage?.getItem('walletIsConnected') === 'true',
		[]
	);

	const _storeConnection = useCallback(() => {
		localStorage.setItem('walletIsConnected', 'true');
	}, []);

	const _removeStoredConnection = useCallback(() => {
		localStorage.removeItem('walletIsConnected');
	}, []);

	const useSigner = useCallback(() => provider.getSigner(), [provider]);

	const connectWallet = useCallback(async () => {
		try {
			await activate(connector);
			_storeConnection();
		} catch (error) {
			console.error(error);
		}
	}, []);

	const disconnectWallet = useCallback(async () => {
		try {
			deactivate();
			_removeStoredConnection();
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	useEffect(() => {
		if (_hasStoredConnection()) {
			try {
				connectWallet();
			} catch (error) {
				console.error(error);
			}
		}
	}, []);

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
