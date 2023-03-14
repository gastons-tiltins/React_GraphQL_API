import {useQuery} from '@apollo/client';
import {Dna} from 'react-loader-spinner';
import {gql_country_details} from '../../queries';
import CountryFlag from '../CountryFlag/CountryFlag';
import {client} from '../../App';
import './CountryDetails.scss';

export type CountryCode = {
  code: string;
};

export const CountryDetails = ({code}: CountryCode) => {
  const {data, loading, error} = useQuery(gql_country_details, {
    client,
    variables: {code},
  });

  if (loading)
    return (
      <div className='flex-left'>
        <Dna
          visible={true}
          height='150'
          width='150'
          ariaLabel='dna-loading'
          wrapperStyle={{}}
          wrapperClass='dna-wrapper'
        />
      </div>
    );
  if (error)
    return <p className='flex-center'>Error: {error.message} has occured.</p>;

  return (
    <div>
      <div>
        <h2 className='details-text--bold'>Selected country details</h2>
        <ul>
          <CountryFlag code={code} />
          <li className='is-size-2'>
            <b>{data.country.name}</b>
          </li>
          <li>
            Country Alpha-2 code:{' '}
            <span className='details-text--bold'>{data.country.code}</span>
          </li>
          <li>
            Native country name:{' '}
            <span className='details-text--bold'>{data.country.native}</span>
          </li>
          <li>
            Country numeric code:{' '}
            <span className='details-text--bold'>{data.country.phone}</span>
          </li>
          <li>
            Continent:{' '}
            <span className='details-text--bold'>
              {data.country.continent.name}
            </span>
          </li>
          {data.country.capital !== null && (
            <li>
              Capital:{' '}
              <span className='capital--styling details-text--bold'>
                {data.country.capital}
              </span>
            </li>
          )}
          {data.country.currency !== null && (
            <li>
              Currency:{' '}
              <span className='details-text--bold'>
                {data.country.currency}
              </span>
            </li>
          )}
          {data.country.languages.length > 0 && (
            <li>
              Languages:{' '}
              <span className='details-text--bold'>
                {' '}
                {data.country.languages
                  .map((lang: {name: string}) => lang.name)
                  .join(', ')}
              </span>
            </li>
          )}
          {data.country.states.length > 0 && (
            <li>
              States:{' '}
              <span className='details-text--bold'>
                {' '}
                {data.country.states
                  .map((state: {name: string}) => state.name)
                  .join(', ')}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
