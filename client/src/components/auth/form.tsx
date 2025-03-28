import { useState } from 'react';

import { Label, Input } from '../common/form';
import { AuthParams, register, login } from '../../api/auth';
import { useAppStore } from '../../lib/store';

type AuthFormType = {
  authType: 'register' | 'login';
};

export const AuthForm: React.FC<AuthFormType> = ({ authType }) => {
  const request = authType === 'register' ? register : login;
  const {
    actions: { setUser },
  } = useAppStore();

  const [params, setParams] = useState<AuthParams>({
    email: '',
    name: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await request(params);
    localStorage.setItem('token', response?.token!);
    setUser(response?.user);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setParams({ ...params, [target.id]: target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col space-y-2">
        <div className="flex w-full flex-col space-y-2 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="john@example.com"
            type="email"
            value={params.email}
            onChange={handleChange}
          />
        </div>
        {authType === 'register' && (
          <div className="flex w-full flex-col space-y-2 mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Example"
              type="name"
              value={params.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="flex w-full flex-col space-y-2 mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="**********"
            type="password"
            value={params.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full bg-violet-500 text-white py-2 px-4 rounded shadow capitalize"
          type="submit"
        >
          {authType}
        </button>
      </div>
    </form>
  );
};
