/* eslint-disable operator-linebreak */
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { Container, Header, Avatar } from './styles';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { theme } from '../../globals/styles/theme';

type UpdateProfileFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const updateProfileFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateProfileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: '',
    },
  });

  const profilePhoto = `https://avatars.dicebear.com/api/jdenticon/${getValues(
    'name',
  )}.svg`;

  const { colors } = theme;

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleSignOut = async (): Promise<void> => {
    Alert.alert('Are you sure?', 'Are you sure you want to sign out?', [
      {
        text: 'Yes',
        onPress: () => {
          signOut();
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const handleUpdateProfile: SubmitHandler<UpdateProfileFormData> =
    async data => {
      console.log(data);
    };

  return (
    <>
      <Header>
        <BorderlessButton onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={24} color={colors.title} />
        </BorderlessButton>

        <BorderlessButton onPress={handleSignOut}>
          <Feather name="log-out" size={22} color={colors.title} />
        </BorderlessButton>
      </Header>

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
            <Avatar width={128} height={128} uri={profilePhoto} />
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
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  autoCorrect={false}
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
                  autoCorrect={false}
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
                  autoCorrect={false}
                  error={errors.confirmPassword}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmPassword"
            />

            <Button
              isLoading={isSubmitting}
              onPress={handleSubmit(handleUpdateProfile) as any}
              style={{ marginTop: 12 }}
            >
              Update
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
