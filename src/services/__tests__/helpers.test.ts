import { shortenPublicHoliday, validateInput } from '../helpers';
import { PublicHoliday } from '../types';

const year = 2023;
const country = 'GB';
const holiday: PublicHoliday = {
  date: new Date().toISOString(),
  localName: 'Test local name',
  name: 'Test name',
  countryCode: 'GB',
  fixed: false,
  global: false,
  counties: ['GB'],
  launchYear: 1980,
  types: []
};

describe('helpers', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(year, 1, 1, 1, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('validateInput', () => {
    it('should validate return true if parameters pass validation', () => {
      const result = validateInput({ year, country });

      expect(result).toBeTruthy();
    });

    it('should throw an error if passed not current year', () => {
      expect(() => validateInput({ year: 2022 })).toThrowError();
    });

    it('should throw an error if passed invalid country', () => {
      expect(() => validateInput({ country: 'blabla' })).toThrowError();
    });
  });

  describe('shortenPublicHoliday', () => {
    it('should return all necessary fields', () => {
      const result = shortenPublicHoliday(holiday);

      expect(result.date).toEqual(holiday.date);
      expect(result.localName).toEqual(holiday.localName);
      expect(result.name).toEqual(holiday.name);
    });
  });
});