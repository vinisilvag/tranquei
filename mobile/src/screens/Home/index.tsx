import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ToastAndroid,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container, Footer, SquareButton, Loading } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { theme } from '../../globals/styles/theme';
import { LockItem } from '../../components/LockItem';
import { useLock } from '../../hooks/useLock';

type SendLockFormData = {
  description: string;
};

const sendLockFormSchema = yup.object({
  description: yup.string().notRequired(),
});

export const Home: React.FC = () => {
  const { locks, isLoading, createLock, onRefresh, isRefreshing } = useLock();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(sendLockFormSchema),
  });

  const { colors } = theme;

  const handleSubmitLock: SubmitHandler<SendLockFormData> = async ({
    description,
  }) => {
    try {
      await createLock(description);

      reset({ description: '' });

      Keyboard.dismiss();

      ToastAndroid.show('Lock recorded successfully', ToastAndroid.SHORT);
    } catch (err: any) {
      console.log(err);

      const errorMessage = err.response.data.message || 'Unexpected error';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  };

  return (
    <>
      <Header />
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={locks}
            keyExtractor={item => item.id}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={({ item: lockItem }) => <LockItem lock={lockItem} />}
          />
        )}
      </Container>
      <Footer>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Description"
              placeholderTextColor={colors.text}
              error={errors.description}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
          defaultValue=""
        />
        <SquareButton
          onPress={handleSubmit(handleSubmitLock) as any}
          enabled={!isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Feather name="lock" size={20} color={colors.white} />
          )}
        </SquareButton>
      </Footer>
    </>
  );
};
