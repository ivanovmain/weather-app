import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';



const EXCHANGE_RATES = gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <div>
        {currency}: {rate}
      </div>
    </div>
  ));
}

export default ExchangeRates;