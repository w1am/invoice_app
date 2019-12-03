import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        dummy: String
    }

    type Error {
        path: String
        message: String
    }
    
    type Client {
        name: String
        email: String
        phone: String
        fax: String
        address: String
    }

    type ClientResponse {
        ok: Boolean
        client: Client
        errors: Error
    }

    type Mutation {
        addClient(name: String, email: String, phone: String, fax: String, address: String): ClientResponse!
    }
`