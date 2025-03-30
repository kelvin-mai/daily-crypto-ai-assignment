import { useState } from 'react';
import { SpinnerOne } from '@mynaui/icons-react';
import { toast } from 'sonner';

import { FormInput } from '../common/form';
import { AuthParams, register, login } from '../../api/auth';
import { useAppStore } from '../../lib/store';
import { Button } from '../common/button';

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
    try {
      const response = await action(params);
      localStorage.setItem('token', response?.token!);
      setUser(response?.user);
      toast.success('Authentication Successful');
      onComplete();
    } catch (e) {
      toast.error('Authentication Error', {
        description: (e as Error).message
          ? (e as Error).message
          : 'Please try again',
      });
    }
    setLoading(false);
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
        <Button
          className="font-bold capitalize bg-violet-500 text-white"
          type="submit"
          disabled={
            loading ||
            !params.email ||
            !params.password ||
            (mode === 'register' && !params.name)
          }
        >
          {loading ? <SpinnerOne className="animate-spin h-5 w-5" /> : mode}
        </Button>
      </div>
    </form>
  );
};
