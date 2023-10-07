import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const country = 'GB';
const countryInfiStub = {
  "commonName": "United Kingdom",
  "officialName": "United Kingdom of Great Britain and Northern Ireland",
  "countryCode": "GB",
  "region": "Europe",
  "borders": [
    {
      "commonName": "Ireland",
      "officialName": "Republic of Ireland",
      "countryCode": "IE",
      "region": "Europe",
      "borders": null
    }
  ]
};

describe('Nager.Date API', () => {
  describe('/CountryInfo', () => {
    it('should return country info', async () => {
      const { status, data } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/CountryInfo/${country}`)

      expect(status).toEqual(200);
      expect(data).toEqual(
        expect.objectContaining(countryInfiStub)
      );
    });
  });

  describe('/AvailableCountries', () => {
    it('should return an array available countries', async () => {
      const { status, data } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/AvailableCountries`)

      expect(status).toEqual(200);
      expect(data).toEqual(expect.any(Array));
    });
  });
});
