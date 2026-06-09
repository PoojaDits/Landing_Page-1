import { gql } from 'graphql-request'


export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $offset: Int!, $title: String, $categoryId: Float) {
    products(limit: $limit, offset: $offset, title: $title, categoryId: $categoryId) {
      id
      title
      price
      description
      images
      category {
        id
        name
      }
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      images
      category {
        id
        name
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`


export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`

export const GET_PROFILE = gql`
  query GetProfile {
    myProfile {
      id
      name
      email
      role
      avatar
    }
  }
`

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!, $avatar: String!) {
    addUser(data: { name: $name, email: $email, password: $password, avatar: $avatar }) {
      id
      name
      email
      role
    }
  }
`
