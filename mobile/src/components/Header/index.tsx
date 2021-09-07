import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import {
  Container,
  ProfileButton,
  Avatar,
  Title,
  Subtitle,
  Column,
  IconButton,
} from './styles';

import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../globals/styles/theme';

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { colors } = theme;

  const handleNavigateToProfileScreen = () => {
    navigation.navigate('Profile');
  };

  return (
    <Container>
      <ProfileButton onPress={handleNavigateToProfileScreen}>
        <Avatar
          source={{
            uri: 'https://avatars.githubusercontent.com/u/58532241?v=4',
          }}
        />
        <Column>
          <Subtitle>Hello,</Subtitle>
          <Title>{user.name}</Title>
        </Column>
      </ProfileButton>

      <IconButton>
        <Feather name="settings" size={24} color={colors.title} />
      </IconButton>
    </Container>
  );
};
