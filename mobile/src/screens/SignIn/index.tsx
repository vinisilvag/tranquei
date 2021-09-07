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
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Title,
  SignUpButton,
  SignUpText,
  SignUpTextDetail,
} from './styles';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useAuth();

  const handleNavigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    try {
      await signIn(data);
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
          <Title>Sign In</Title>

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
            defaultValue=""
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
            defaultValue=""
          />

          <Button
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSignIn) as any}
            style={{ marginTop: 12 }}
          >
            Sign In
          </Button>

          <SignUpButton onPress={handleNavigateToSignUpScreen}>
            <SignUpText>
              Don’t have an account?
              <SignUpTextDetail> Sign up here!</SignUpTextDetail>
            </SignUpText>
          </SignUpButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
