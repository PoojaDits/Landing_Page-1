import { GraphQLClient } from 'graphql-request'


export const GRAPHQL_ENDPOINT = 'https://api.escuelajs.co/graphql'

export const gqlClient = new GraphQLClient(GRAPHQL_ENDPOINT)

export const setGraphQLAuthToken = (token: string | null) => {
    if (token) {
        gqlClient.setHeader('Authorization', `Bearer ${token}`)
    } else {
        gqlClient.setHeader('Authorization', '')
    }
}
