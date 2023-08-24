import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Box } from '@chakra-ui/react';

interface TimerProps {
  isStart?: boolean;
  setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ isStart, setTimeUp }: TimerProps) => {
  const padZero = (value: number): string => {
    return String(value).padStart(2, '0');
  };

  const onTimerComplete = () => {
    setTimeUp(true);
  };

  const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
    return (
      <div>
        {padZero(minutes)}:{padZero(seconds)}
      </div>
    );
  };

  return (
    <Box color="#dc143c">
      {isStart && (
        <Countdown key={Date.now()} date={Date.now() + 180 * 1000} renderer={renderer} onComplete={onTimerComplete} />
      )}
    </Box>
  );
};

export default Timer;
