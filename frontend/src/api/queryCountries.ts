import { gql } from "../gql";

export const queryCountries = gql(`
  query Countries {
    countries {
      id
      name
      emoji
      code
      continent {
        id
        name
      }
    }
  }
`);