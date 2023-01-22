import { User } from '../../users/entities';

export interface SeedProduct {
  description: string;
  images: string[];
  stock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  name: string;
  type: ValidTypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}

export type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

export interface SeedData {
  products: SeedProduct[];
  users: Partial<User>[];
}
