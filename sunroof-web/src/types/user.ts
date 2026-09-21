export interface User {
  id: string;
  name: string;
  email: string;
}

export type CreateUser = Pick<User, 'email' | 'name'> 