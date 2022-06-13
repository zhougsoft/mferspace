import { useEffect, useMemo, useCallback } from 'react';
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

	const _hasStoredConnection = () => {
		return localStorage?.getItem('walletIsConnected') === 'true';
	};

	const _storeConnection = () => {
		localStorage.setItem('walletIsConnected', 'true');
	};

	const _removeStoredConnection = () => {
		localStorage.removeItem('walletIsConnected');
	};

	const useSigner = () => provider.getSigner();

	const connectWallet = async () => {
		try {
			await activate(connector);
			_storeConnection();
		} catch (error) {
			console.error(error);
		}
	};

	const disconnectWallet = async () => {
		try {
			deactivate();
			_removeStoredConnection();
		} catch (error) {
			console.error(error);
		}
	};

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
