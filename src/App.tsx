import {Dna} from 'react-loader-spinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import {ApolloClient, InMemoryCache, useQuery} from '@apollo/client';
import {CountryDetails} from './components/CountryDetails/CountryDetails';
import {gql_countries} from './queries';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com',
});

interface Country {
  name: string;
  code: string;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [code, setCode] = useState('');

  const {
    data: data,
    loading: loading,
    error: error,
  } = useQuery(gql_countries, {
    client,
    skip: countries.length > 0,
  });

  const handleCountryDetailsClick = (countryCode: string) => {
    setCode(countryCode);
    setFirstClick(true);
  };

  // Paginate logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = countries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(countries.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const disablePrevious = currentPage === 1;
  const disableNext = endIndex >= countries.length;

  // Search logic
  const [searchText, setSearchText] = useState('');

  const filteredItems = countries.filter((country: Country) => {
    return country.name.toLowerCase().includes(searchText.toLowerCase());
  });

  if (loading)
    return (
      <div className='flex-center'>
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

  if (data && data.countries) {
    if (countries.length === 0) {
      setCountries(data.countries);
    }
  }

  return (
    <div className='container'>
      <div className='coll-span2'>
        <h1 className='title'>Countries List with Details</h1>
      </div>
      <div>
        <h2 className='has-text-weight-bold'>Contry List</h2>
        <p className='control has-icons-left'>
          <input
            className='input is-medium input-styling'
            type='search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            maxLength={20}
          />
          <span className='icon is-small is-left'>
            <i>
              <FontAwesomeIcon icon={faSearch} className='fas fa-search' />
            </i>
          </span>
        </p>
        {searchText.length > 0 ? (
          filteredItems.slice(0, 15).map((country: Country) => (
            <div key={country.code} className='add-nowrap'>
              <div className='special'>
                <span
                  className='add-pointer'
                  onClick={(event) => {
                    event.preventDefault();
                    handleCountryDetailsClick(country.code);
                  }}
                >
                  {country.name}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>
            {currentData.map((country: Country) => (
              <div key={country.code} className='add-nowrap'>
                <div className='special'>
                  <span
                    className='add-pointer country-list--styling'
                    onClick={(event) => {
                      event.preventDefault();
                      handleCountryDetailsClick(country.code);
                    }}
                  >
                    {country.name}
                  </span>
                </div>
              </div>
            ))}
            <div className='button-grid'>
              <button
                className='button is-success is-light  is-medium'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={disablePrevious}
              >
                Previous
              </button>
              <div className='pages-number--color pages-count--styling'>
                {currentPage} / {totalPages}
              </div>
              <button
                className='button is-success is-light is-medium'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={disableNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {firstClick ? (
          <CountryDetails code={code} />
        ) : (
          <div className='flex-left'>
            <i>
              <h3 className='light-grey'>Select country to display details.</h3>
            </i>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
