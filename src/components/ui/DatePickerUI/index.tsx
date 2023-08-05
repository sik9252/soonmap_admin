import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { DatePickerContainer, StyledDatePicker } from './style';

export const DatePickerUI = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

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
