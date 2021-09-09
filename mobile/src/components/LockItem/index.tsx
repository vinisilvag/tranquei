import React, { useState } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Container, Left, Description, Time, DeleteButton } from './styles';

import { formatDate } from '../../utils/formatDate';
import { useLock } from '../../hooks/useLock';

import { theme } from '../../globals/styles/theme';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteLock } = useLock();
  const { colors } = theme;

  const handleDeleteLock = async (): Promise<void> => {
    try {
      setIsDeleting(true);

      await deleteLock(id);

      ToastAndroid.show('Lock deleted successfully', ToastAndroid.SHORT);
    } catch (err: any) {
      console.log(err);

      const errorMessage = err.response.data.message || 'Unexpected error';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container>
      <Left>
        <Time>{formatDate(createdAt)}</Time>
        <Description>{description}</Description>
      </Left>

      <DeleteButton onPress={handleDeleteLock} enabled={!isDeleting}>
        {isDeleting ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Feather name="trash" size={16} color={colors.white} />
        )}
      </DeleteButton>
    </Container>
  );
};
