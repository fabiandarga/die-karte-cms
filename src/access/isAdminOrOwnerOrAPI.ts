import { Access } from "payload/types";
import { User } from "../payload-types";

export const isAdminOrOwnerOrAPI: Access<any, User> = ({req: { user, payloadAPI }}) => {
    if (payloadAPI === 'REST') {
      return true;
    }
    if (user.role === 'admin') {
      return true;
    }
    if (user.restaurants?.length === 0) {
      return false;
    }
    return {
      restaurant: {
        in: user.restaurants?.map(r => typeof r === 'string' ? r : r.id)
      }
    }
  }