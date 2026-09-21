import { useEffect, useState } from 'react';
import type { CreateUser, User } from '../types/user';

interface UserFormProps {
  onSubmit: (data: CreateUser) => void;
  initialValues: User | null;
  submitLabel: string;
  onCancel: () => void;
}

export const UserForm = ({ onSubmit, initialValues, submitLabel, onCancel }: UserFormProps) => {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [email, setEmail] = useState(initialValues?.email ?? '');

  useEffect(() => {
    setName(initialValues?.name ?? '');
    setEmail(initialValues?.email ?? '');
  }, [initialValues])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmit({ name, email });

    setName('');
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
      />

      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />

      <button type="submit">{submitLabel} User</button>
    </form>
  );
}