import { gql } from "@apollo/client";

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!) {
    addPerson(
      name: $name,
      phone: $phone,
      street: $street,
      city: $city
    ) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(
      name: $name,
      phone: $phone
    ) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`