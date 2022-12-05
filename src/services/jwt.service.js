'use strict';
const jwt = require('jsonwebtoken');

const AppJwtTokens = {
    USER_LOGIN_TOKEN: 'USER_LOGIN_TOKEN'
};
const JWT_LOGIN_TOKEN_EXPIRE_IN = 3600;

const verifyToken = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return { isVerified: true, tokenError: null };
    } catch (e) {
        return { isVerified: false, tokenError: e.name };
    }
};

const validateAndDecodeToken = (token, tokenType) => {
    const { isVerified, tokenError } = verifyToken(token);

    const { sub, type, iat, exp } = jwt.decode(token);

    const isValidToken = isVerified && type === tokenType;

    if (!isValidToken) {
        if (tokenError === 'TokenExpiredError') {
            throw new Error('TokenExpiredError');
        } else if (tokenError === 'JsonWebTokenError') {
            throw new Error('JsonWebTokenError');
        }
        throw new Error('Unknown Error');
    }
    return {
        isValidToken,
        tokenError,
        sub
    };
};

const generateToken = (sub, tokenType, expiresInSeconds) => {
    const payload = { sub, type: tokenType };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresInSeconds
    });

    return {
        expiresAt: Date.now() + expiresInSeconds * 1000,
        accessToken
    };
};

const createUserLoginToken = (userId) => {
    return generateToken(userId, AppJwtTokens.USER_LOGIN_TOKEN, JWT_LOGIN_TOKEN_EXPIRE_IN);
};

const validateAndDecodeUserLoginToken = (token) => {
    return validateAndDecodeToken(token, AppJwtTokens.USER_LOGIN_TOKEN);
};

module.exports = {
    createUserLoginToken: createUserLoginToken,
    validateAndDecodeUserLoginToken: validateAndDecodeUserLoginToken,
    AppJwtTokens: AppJwtTokens
};
