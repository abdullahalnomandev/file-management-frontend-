import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/util/local-storage";

export const isUserLoggedIn = () => {
  return !!getFromLocalStorage(authKey);
};
