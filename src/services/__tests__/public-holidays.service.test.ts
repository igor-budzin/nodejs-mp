import axios from 'axios';
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays
} from '../public-holidays.service';

const holidayStub = {
  name: "New Year's Day",
  localName: "New Year's Day",
  date: '2023-01-01'
};

const country = 'GB';
const year = 2023;
const errorString = 'error text';

describe('public-holidays.service', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    axiosMock = null;
  });

  describe('getListOfPublicHolidays', () => {
    it('should return an array of holidays', async () => {
      axiosMock.mockImplementation(() => Promise.resolve({ data: [holidayStub] }));

      const result = await getListOfPublicHolidays(year, country);

      expect(result).toMatchObject([holidayStub]);
    });

    it('should return an empty array if invalid result', async () => {
      axiosMock.mockImplementation(() => Promise.resolve({ data: errorString }));

      const result = await getListOfPublicHolidays(year, country);

      expect(result).toMatchObject([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is holiday', async () => {
      axiosMock.mockImplementation(() => Promise.resolve({ status: 200 }));

      const result = await checkIfTodayIsPublicHoliday(country);

      expect(result).toBe(true);
    });

    it('should return false if today is not holiday', async () => {
      axiosMock.mockImplementation(() => Promise.resolve({ status: 404 }));

      const result = await checkIfTodayIsPublicHoliday(country);

      expect(result).toBe(false);
    });

    it('should return false if error', async () => {
      // axiosMock.mockImplementation(() => Promise.resolve({ data: errorString}));
      axiosMock.mockRejectedValueOnce(new Error(errorString));

      const result = await checkIfTodayIsPublicHoliday(country);

      expect(result).toBe(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    it('should return next array of next holidays', async () => {
      axiosMock.mockImplementation(() => Promise.resolve({ data: [holidayStub] }));

      const result = await getNextPublicHolidays(country);

      expect(result).toMatchObject([holidayStub]);
    });

    it('should return an empty array if error', async () => {
      axiosMock.mockImplementation(() => Promise.resolve({ data: errorString }));

      const result = await getNextPublicHolidays(country);

      expect(result).toMatchObject([]);
    });
  });
});
