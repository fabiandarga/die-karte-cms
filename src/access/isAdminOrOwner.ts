import { TypeWithID } from "payload/dist/globals/config/types";
import { FieldAccess, type Access } from "payload/types";
import { Restaurant, type User } from "../payload-types";

export const isAdminOrOwner = (idFieldName: string = 'restaurant'): Access<any, User> => ({ req: { user }}) => {
    if (!user){
        return false;
    }

    if (user.role === 'admin') {
        return true;
    }
    
    if (user.restaurants?.length > 0) {
        const ids: Array<string> = user.restaurants.map((r: string|Restaurant) => (typeof r === 'string') ? r : r.id);
        // Otherwise, we can restrict it based on the `site` field
        return {
            or: [
            {
                [idFieldName]: {
                    in: ids
                }
            },
            {
                [idFieldName]: {
                    exists: false,
                }
            }
            ]
        }
    }
}

export const isAdminOrOwnerField = <T extends TypeWithID>(idFieldName: string = 'restaurant'): FieldAccess<T, unknown, User> =>  ({ req: { user }, data }) => {
    if (!user) {
        return false;
    }
    if (user.role === 'admin') {
        return true;
    }
    if (user.restaurants?.length > 0) {
        const ids: Array<string> = user.restaurants.map((r: string|Restaurant) => (typeof r === 'string') ? r : r.id);
        // Otherwise, we can restrict it based on the `site` field
        return data[idFieldName] in ids;
    }
}