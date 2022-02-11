import { ChangeEvent, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';
import { parseCookies } from 'nookies';

import { Sign } from '../components/Sign';
import { FormAction } from '../components/Sign/FormAction';
import { Input } from '../components/Sign/Input';

import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

import { AvatarInput } from '../styles/AvatarInput';

type UpdateFormData = {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

const updateFormSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('Email invalid'),
  password: yup.string(),
  confirm_password: yup
    .string()
    .when('password', {
      is: (val: string) => !!val.length,
      then: yup
        .string()
        .required('Password confirmation is required')
        .min(6, 'Password must contain at least 6 characters'),
      otherwise: yup.string(),
    })
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Profile: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: yupResolver(updateFormSchema),
  });

  const { user } = useAuth();

  const updateAvatar = async (formData: FormData) => {
    try {
      const { 'tasked.token': token } = parseCookies();

      api.post('/users/me/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        Router.reload();
      }, 1000);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();

      formData.append('avatar', e.target.files[0]);

      toast.promise(
        updateAvatar(formData),
        {
          loading: 'Hold on...',
          success: (
            <span>
              <b>Avatar updated!</b>
              <br />
              Enjoy.
            </span>
          ),
          error: (
            <span>
              <b>This went wrong.</b>
              <br />
              Try again.
            </span>
          ),
        },
        {
          style: {
            minWidth: '250px',
          },
        }
      );
    }
  };

  const updateUser = async (data: UpdateFormData) => {
    try {
      const { 'tasked.token': token } = parseCookies();

      api.patch('/users/me', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        Router.reload();
      }, 1000);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  };

  const onSubmit: SubmitHandler<UpdateFormData> = async (values) => {
    const updatedData = {};

    for (const item in values) {
      if (item !== 'confirm_password' && values[item].trim() !== '') {
        updatedData[item] = values[item];
      }
    }

    toast.promise(
      updateUser(updatedData),
      {
        loading: 'Hold on...',
        success: (
          <span>
            <b>Profile updated!</b>
            <br />
            Enjoy.
          </span>
        ),
        error: (
          <span>
            <b>This went wrong.</b>
            <br />
            Try again.
          </span>
        ),
      },
      {
        style: {
          minWidth: '250px',
        },
      }
    );
  };

  const handleButtonSubmit = () => {
    btnRef.current?.click();
  };

  return (
    <>
      <Sign>
        <AvatarInput>
          <img
            src={`${api.defaults.baseURL}/users/${user?._id}/avatar` || ''}
            alt={user?.name}
            width="150"
            height="150"
          />

          <label htmlFor="avatar">
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="New Name"
            error={errors.name}
            {...register('name')}
          />
          <Input
            type="email"
            placeholder="New Email"
            error={errors.email}
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="New Password"
            error={errors.password}
            {...register('password')}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            error={errors.confirm_password}
            {...register('confirm_password')}
          />

          <button
            ref={btnRef}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </form>
      </Sign>

      <FormAction>
        <button onClick={handleButtonSubmit}>confirm</button>

        <Toaster position="top-center" />
      </FormAction>
    </>
  );
};

export default Profile;
