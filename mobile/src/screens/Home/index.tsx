import React from 'react';
import { Button } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container, Footer, SquareButton } from './styles';

import { useAuth } from '../../hooks/useAuth';

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
  const { signOut } = useAuth();
  const { colors } = theme;

  const handleSubmitLock: SubmitHandler<SendLockFormData> = async data => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <Container>
        <Button title="Sign Out" onPress={signOut} />
      </Container>
      <Footer>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
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
          <Feather name="lock" size={22} color={colors.white} />
        </SquareButton>
      </Footer>
    </>
  );
};
