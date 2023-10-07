import axios from 'axios';
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays
} from '../public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const country = 'GB';
const year = 2023;

describe('public-holidays.service integration test', () => {
  describe('getListOfPublicHolidays', () => {
    it('should call enpoint with right parameters', async () => {
      const axiosSpy = jest.spyOn(axios, 'get');

      await getListOfPublicHolidays(year, country);

      expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    it('should call enpoint with right parameters', async () => {
      const axiosSpy = jest.spyOn(axios, 'get');

      await checkIfTodayIsPublicHoliday(country);

      expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });
  });

  describe('getNextPublicHolidays', () => {
    it('should call enpoint with right parameters', async () => {
      const axiosSpy = jest.spyOn(axios, 'get');

      await getNextPublicHolidays(country);

      expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    });
  });
});
