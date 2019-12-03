import Client from '../models/Client';
import User from '../models/User';

export default {
    Mutation: {
        addClient: async (_, args, { user }) => {
            const { name, email, phone, fax, address } = args;
            console.log(user);
            try {
                const client = await new Client({
                    name,
                    email,
                    phone,
                    fax,
                    address
                }).save()

                if (user) {
                    const currentUser = await User.findById(user.id);
                    client.user = currentUser;
                    await client.save(client);
                    currentUser.clients.push(client)
                    await currentUser.save()
                }

                return {
                    ok: true,
                    client
                };
            } catch (err) {
                return {
                    path: 'client',
                    message: "Error adding client"
                }
            }
        }
    }
}