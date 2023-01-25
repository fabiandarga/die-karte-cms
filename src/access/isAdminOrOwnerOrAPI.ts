import { Access } from "payload/types";
import { User } from "../payload-types";

export const isAdminOrOwnerOrAPI = (idFieldName: string = 'restaurant'): Access<any, User> => ({req: { user, payloadAPI }}) => {
    if (payloadAPI === 'REST') {
      return true;
    }
    if (!user){
      return false;
  }
    if (user.role === 'admin') {
      return true;
    }
    if (user.restaurants?.length === 0) {
      return false;
    }
    return {
      [idFieldName]: {
        in: user.restaurants?.map(r => typeof r === 'string' ? r : r.id)
      }
    }
  }