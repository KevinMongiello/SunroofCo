export interface User {
  id: string;
  name: string;
  email: string;
  costPerHour: number;
  priceToCustomerPerHour: number;
}

type UserPropertiesWithDefaultValues = Partial<Pick<User, 'costPerHour' | 'priceToCustomerPerHour'>>

export type CreateUser = Pick<User, 'email' | 'name'> & UserPropertiesWithDefaultValues