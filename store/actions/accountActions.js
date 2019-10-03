export const LOG_IN = 'LOG_IN';

export const logIn = credential => {
	return { type: LOG_IN, credential: credential };
};

