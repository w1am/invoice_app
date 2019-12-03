import gql from 'graphql-tag';

export const usersQuery = gql`
    query {
        users {
            username
            age
        }
    }
`
export const clientsQuery = gql`
    query($id: String) {
        clients(id: $id) {
            name
            age
        }
    }
`
export const registerMutation = gql`
    mutation($companyName: String, $address: String, $phone: String, $email: String, $password: String) {
        register(companyName: $companyName, address: $address, phone: $phone, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
    }
`
export const signinMutation = gql`
    mutation($email: String, $password: String) {
        signin(email: $email, password: $password) {
            ok
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`

export const addClientMutation = gql`
    mutation($name: String, $email: String, $phone: String, $fax: String, $address: String) {
        addClient(name: $name, email: $email, phone: $phone, fax: $fax, address: $address) {
            client {
                name
                email
                phone
                fax
                address
            }
            ok
            errors {
                path
                message
            }
        }
    }
`