// This file is only for quick testing view, do not use in prod
// Only tweak auth and admin variables
// 0 for false, anything else number for true

export let IS_LOGGED_IN_USER: boolean;
export let IS_ADMIN_USER: boolean;

export const LOCAL_STORAGE_TOKEN_KEY: string = "smartract_user_token";

const auth: number = 0;
const admin: number = 0;

if (auth) {
  IS_LOGGED_IN_USER = true;
} else {
  IS_LOGGED_IN_USER = false;
}

if (admin) {
  IS_ADMIN_USER = true;
} else {
  IS_ADMIN_USER = false;
}

export default { IS_LOGGED_IN_USER, IS_ADMIN_USER };
