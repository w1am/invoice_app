import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        users: [User]
    }

    type Error {
        path: String
        message: String
    }
    
    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: Error
    }

    type LoginResponse {
        ok: Boolean!
        user: User
        errors: Error
        token: String
        refreshToken: String
    }
    
    type User {
        id: String
        companyName: String
        address: String
        phone: String
        email: String
        password: String
        clients: [Client]
    }

    type Mutation {
        register(companyName: String, address: String, phone: String, email: String, password: String): RegisterResponse!
        signin(email: String, password: String): LoginResponse!
    }
`