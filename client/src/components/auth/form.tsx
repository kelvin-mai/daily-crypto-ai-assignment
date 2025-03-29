import { useState } from 'react';

import { FormInput } from '../common/form';
import { AuthParams, register, login } from '../../api/auth';
import { useAppStore } from '../../lib/store';
import { SpinnerOne } from '@mynaui/icons-react';

type AuthFormProps = {
  mode: 'register' | 'login';
  onComplete(): void;
};

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onComplete }) => {
  const action = mode === 'register' ? register : login;
  const {
    actions: { setUser },
  } = useAppStore();

  const [params, setParams] = useState<AuthParams>({
    email: '',
    name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await action(params);
    setLoading(false);
    localStorage.setItem('token', response?.token!);
    setUser(response?.user);
    onComplete();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setParams({ ...params, [target.id]: target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col space-y-2">
        <FormInput
          className="mb-4"
          id="email"
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          value={params.email}
          onChange={handleChange}
        />
        {mode === 'register' && (
          <FormInput
            className="mb-4"
            id="name"
            label="Name"
            placeholder="John Example"
            type="name"
            value={params.name}
            onChange={handleChange}
          />
        )}
        <FormInput
          className="mb-4"
          id="password"
          label="Password"
          placeholder="**********"
          type="password"
          value={params.password}
          onChange={handleChange}
        />
        <button
          className="w-full bg-violet-500 text-white py-2 px-4 rounded shadow capitalize flex justify-center items-center"
          type="submit"
        >
          {loading ? <SpinnerOne className="animate-spin" /> : mode}
        </button>
      </div>
    </form>
  );
};
