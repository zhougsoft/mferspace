import { createContext, useContext } from 'react';
import { ethers } from 'ethers';
import Cookies from 'js-cookie';

const NONCE_ENDPOINT = '/api/auth/nonce';
const VERIFICATION_ENDPOINT = '/api/auth/verify';

// so TypeScript allows `window.ethereum`
declare const window: any;

interface AuthContextProps {
	login: Function;
	logout: Function;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {

	// Fetch server & client auth cookies
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






					// TODO:
					// drop a secondary cookie here
					// with same expiry time as http-only cookie
					// with logged in user address

					console.log('http-only token cookie received!');

					console.log('dropping auth cookie here...');

                    // TODO: add AUTH_TIMEOUT to .env (in seconds)

					// Cookies.set('key', 'value', { expires: AUTH_TIMEOUT });






				}
			} catch (error) {
				console.log(error);
				alert(
					'Error! make sure MetaMask is logged in & connected to mainnet...'
				);
			}
		}
	};

	const logout = () => {



		// TODO:
		// Remove clientside auth cookie



	};

	const value = { login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
