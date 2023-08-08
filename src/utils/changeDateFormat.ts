import moment from 'moment';

export const changeDateFormat = (date: Date, format: string) => {
  return moment(date).format(format);
};
