import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { DatePickerContainer, StyledDatePicker } from './style';

export interface DatePickerProps {
  setDateRange: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
  startDate: Date | null;
  endDate: Date | null;
}

export const DatePickerUI = ({ setDateRange, startDate, endDate }: DatePickerProps) => {
  return (
    <DatePickerContainer>
      <StyledDatePicker
        locale={ko}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        dateFormat={'yyyy/MM/dd'}
        dateFormatCalendar={'yyyy년 MM월'}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update);
        }}
        isClearable={true}
        placeholderText="검색할 기간을 설정해주세요."
      />
    </DatePickerContainer>
  );
};
