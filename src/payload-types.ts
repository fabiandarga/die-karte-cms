/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  role?: 'admin' | 'owner' | 'editor';
  restaurants?: string[] | Restaurant[];
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "restaurants".
 */
export interface Restaurant {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  name?: string;
  published?: boolean;
  restaurant: string | Restaurant;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "items".
 */
export interface Item {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  additives?: string[] | Additive[];
  published?: boolean;
  restaurant: string | Restaurant;
  category?: string | Category;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "additives".
 */
export interface Additive {
  id: string;
  name?: string;
  publicId?: string;
  type?: 'additive' | 'allergen';
  createdAt: string;
  updatedAt: string;
}
