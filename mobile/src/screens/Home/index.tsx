import React from 'react';

import { Feather } from '@expo/vector-icons';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container, Footer, SquareButton } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { theme } from '../../globals/styles/theme';

type SendLockFormData = {
  description: string;
};

const sendLockFormSchema = yup.object({
  description: yup.string().notRequired(),
});

export const Home: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(sendLockFormSchema),
  });
  const { colors } = theme;

  const handleSubmitLock: SubmitHandler<SendLockFormData> = async data => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <Container />
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
          <Feather name="lock" size={20} color={colors.white} />
        </SquareButton>
      </Footer>
    </>
  );
};
