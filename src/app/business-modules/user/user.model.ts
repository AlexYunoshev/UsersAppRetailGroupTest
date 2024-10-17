export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  age: number;
  gender: string;
  phone: string;
  address: Address;
  photo: string;
}