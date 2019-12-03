import jwt from 'jsonwebtoken';
import _ from 'lodash';
import User from '../models/User';

export const createToken = async (user, secret, secret2) => {
    const createToken = jwt.sign({
        user: _.pick(user, ['id', 'email', 'companyName', 'address', 'phone'])
    },
        secret
    )

    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, '1s'),
        },
        secret2,
    );

    return [createToken, createRefreshToken];
}

export const refreshTokens = async (token, refreshToken, SECRET, SECRET2) => {
    let userId = 0;
    try {
        if (refreshToken) {
            const {
                user: { id },
            } = jwt.decode(refreshToken, { header: true });
            userId = id;
        }
    } catch (err) {
        return {};
    }

    if (!userId) {
        return {};
    }

    const user = await User.findOne({ id: userId });

    if (!user) {
        return {};
    }

    const refreshSecret = user.password + SECRET2;

    try {
        jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }

    const [newToken, newRefreshToken] = await createTokens(
        user,
        SECRET,
        refreshSecret,
    );
    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
};


export const tryLogin = async (email, password, model, SECRET, SECRET2) => {
    const user = await model.findOne({ email });
    if (!user) {
        return {
            ok: false,
            errors: {
                path: 'signin',
                message: 'User does not exists'
            }
        }
    } else {
        if (user.password == password && user.email == email) {
            const refreshTokenSecret = user.password + SECRET2
            const [token, refreshToken] = await createToken(user, SECRET, refreshTokenSecret)
            return {
                ok: true,
                user,
                token,
                refreshToken
            }
        } else {
            return {
                ok: false,
                errors: {
                    path: 'signin',
                    message: 'Invalid email or password'
                }
            }
        }
    }
}