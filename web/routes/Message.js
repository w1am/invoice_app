import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Message = ({ data }) => (
    <h1>{data.hello}</h1>
)

const MessageQuery = gql`
    query {
        hello
    }
`

export default graphql(MessageQuery)(Message);