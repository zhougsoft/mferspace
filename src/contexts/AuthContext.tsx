import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const NONCE_ENDPOINT = '/api/auth/nonce';
const VERIFICATION_ENDPOINT = '/api/auth/verify';

// so TypeScript allows `window.ethereum`
declare const window: any;

interface AuthContextProps {
	address?: string;
	login: Function;
	logout: Function;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
	const [address, setAddress] = useState<string | undefined>();

	// Check for existing stored address on page load
	useEffect(() => {
		const storedAddress = localStorage.getItem('address');
		if (storedAddress) {
			setAddress(storedAddress);
		}
	}, []);

	// Persist address in browser's local storage
	useEffect(() => {
		if (address) {
			// If new login address detected, update local storage value
			const storedAddress = localStorage.getItem('address');
			if (address !== storedAddress) {
				localStorage.setItem('address', address);
			}
		}

		return () => {
			localStorage.removeItem('address');
		};
	}, [address]);

	// Authenticates w/ DB & gets JWT token cookie
	const login = async () => {
		if (window.ethereum) {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();

				// Fetch user nonce from DB
				const signerAddress = await signer.getAddress();
				const nonceResult = await fetch(NONCE_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ address: signerAddress }),
				}).then(res => res.json());

				// sign fetched nonce with wallet
				const signature = await signer.signMessage(
					nonceResult.nonce.toString()
				);

				// send signature to server for verification
				const authResult = await fetch(VERIFICATION_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ address: signerAddress, signature }),
				}).then(res => res.json());

				if (authResult.ok) {
					setAddress(signerAddress);
				}
			} catch (error) {
				console.log(error);
				alert(
					'Error! make sure MetaMask is logged in & connected to mainnet...'
				);
			}
		}
	};

	// TODO: any way to remove validity of JWT as well?
	// Removes address from state & browser storage
	const logout = () => {
		localStorage.removeItem('address');
		setAddress('');
	};

	const value = { address, login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
