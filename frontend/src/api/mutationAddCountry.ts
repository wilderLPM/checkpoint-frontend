import { gql } from "../gql";

export const mutationAddCountry = gql(`
    mutation ddCountry($data: NewCountryInput!) {
        addCountry(data: $data) {
            name
            emoji
            code
            continent {
                name
            }
        }
    }`);