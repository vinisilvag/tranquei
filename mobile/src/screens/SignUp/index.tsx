import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';

import {
  Container,
  Title,
  SignUpButton,
  SignUpText,
  SignUpTextDetail,
} from './styles';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNavigateToSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp: SubmitHandler<SignUpFormData> = async data => {
    try {
      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      ToastAndroid.show('Account created successfully', ToastAndroid.LONG);

      navigation.goBack();
    } catch (err) {
      ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Title>Sign Up</Title>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Name"
                autoCorrect={false}
                error={errors.name}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.email}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                passwordInput
                autoCapitalize="none"
                error={errors.password}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Confirm password"
                passwordInput
                autoCapitalize="none"
                error={errors.password}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />

          <Button
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSignUp) as any}
            style={{ marginTop: 12 }}
          >
            Sign Up
          </Button>

          <SignUpButton onPress={handleNavigateToSignInScreen}>
            <SignUpText>
              Already have an account?
              <SignUpTextDetail> Sign in!</SignUpTextDetail>
            </SignUpText>
          </SignUpButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
