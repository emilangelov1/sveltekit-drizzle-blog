export const generateSalt = (length: number): string => {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let salt = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		salt += charset[randomIndex];
	}
	return salt;
};

const pepper = 'GOTtnhRD';

const hashStringToSHA512 = async (string: string) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(string);
	const hashBuffer = await crypto.subtle.digest('SHA-512', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
	return hashHex;
};

export const hashPassword = (password: string, salt: string) => {
	return hashStringToSHA512(salt + password + pepper);
};
