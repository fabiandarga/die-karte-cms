import { FieldAccess, type Access } from "payload/types";
import { type User } from "../payload-types";

export const isAdminOrHasMultipleRestaurants: FieldAccess<{ id: string }, unknown, User> = ({ req: { user }}) => {
    return user.role === 'admin' || user.restaurants?.length > 0
}