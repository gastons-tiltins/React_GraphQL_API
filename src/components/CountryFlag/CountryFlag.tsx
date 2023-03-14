import ReactCountryFlag from 'react-country-flag';
import './CountryFlag.scss';

export type Code = {
  code: string;
};

function CountryFlag({code}: Code) {
  return (
    <div>
      <ReactCountryFlag
        className='flag-container'
        countryCode={code}
        svg
        style={{
          width: '5.7em',
          height: '4.3em',
        }}
      />
    </div>
  );
}

export default CountryFlag;
