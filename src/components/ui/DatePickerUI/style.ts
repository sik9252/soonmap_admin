import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';

export const DatePickerContainer = styled.div`
  margin: 0 0 10px 10px;
  width: 30%;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  height: 48px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 14px;
  padding: 10px;
  background-color: transparent;
  color: #707070;
`;
