import React from 'react';
import { ToastAndroid } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Container, Left, Description, Time, DeleteButton } from './styles';

import { theme } from '../../globals/styles/theme';
import { api } from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { useLock } from '../../hooks/useLock';

type Lock = {
  lock: {
    id: string;
    description: string;
    createdAt: string;
  };
};

export const LockItem: React.FC<Lock> = ({
  lock: { id, description, createdAt },
}) => {
  const { deleteLock } = useLock();
  const { colors } = theme;

  const handleDeleteLock = async (): Promise<void> => {
    try {
      await deleteLock(id);

      ToastAndroid.show('Lock deleted successfully', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
    }
  };

  return (
    <Container>
      <Left>
        <Time>{formatDate(createdAt)}</Time>
        <Description>{description}</Description>
      </Left>

      <DeleteButton onPress={handleDeleteLock}>
        <Feather name="trash" size={16} color={colors.white} />
      </DeleteButton>
    </Container>
  );
};
