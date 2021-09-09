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
        <Avatar width={33} height={33} uri={user.avatarUrl} />
        <Column>
          <Subtitle>Hello,</Subtitle>
          <Title>{user.name}</Title>
        </Column>
      </ProfileButton>

      <IconButton>
        <Feather name="info" size={24} color={colors.title} />
      </IconButton>
    </Container>
  );
};
