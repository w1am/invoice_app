import User from '../models/User';
import { tryLogin } from '../utils/auth';

export default {
    Query: {
        users: async () => {
            try {
                const users = await User.find({});
                return users
            } catch (err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            const { companyName, address, phone, email, password } = args;
            try {
                const dbUser = await User.find({ address });
                if (dbUser.length > 0) {
                    return {
                        ok: false,
                        errors: {
                            path: 'register',
                            message: 'User already exists'
                        }
                    }
                } else {
                    const user = await new User({
                        companyName,
                        address,
                        phone,
                        email,
                        password
                    }).save()
                    return {
                        ok: true,
                        user
                    };
                }
            } catch (err) {
                return {
                    path: 'register',
                    message: "Error registering user"
                }
            }
        },


        signin: async (_, { email, password }, { SECRET, SECRET2 }) => {
            return tryLogin(email, password, User, SECRET, SECRET2);
        }
    }
}