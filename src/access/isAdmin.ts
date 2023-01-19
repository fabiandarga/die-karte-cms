import { type FieldAccess, type Access } from "payload/types";
import { type User } from "../payload-types";

export const isAdmin: Access<any, User> = ({req: { user }}) => user.role === 'admin';

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => user.role === 'admin';