import React from 'react';
import { Container, PageTitle } from './style';

interface RightContainerProps {
  title: string;
  children: React.ReactNode;
}

function RightContainer({ title, children }: RightContainerProps) {
  return (
    <Container>
      <PageTitle>{title}</PageTitle>
      {children}
    </Container>
  );
}

export default RightContainer;
