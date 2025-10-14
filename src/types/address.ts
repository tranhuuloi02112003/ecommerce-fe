export interface Address {
  id: string;
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
  defaultAddress: boolean;
}

export interface AddressRequest {
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
}
