import {gql} from '@apollo/client';

const gql_countries = gql`
  {
    countries {
      name
      code
    }
  }
`;

const gql_country_details = gql`
  query ($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      continent {
        name
      }
      capital
      currency
      languages {
        name
        native
      }
      emoji
      states {
        name
      }
    }
  }
`;

export {gql_countries, gql_country_details};
