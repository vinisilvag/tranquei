import React from 'react';
import { Button } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import { Container } from './styles';

export const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Button title="Sign Out" onPress={signOut} />
    </Container>
  );
};
