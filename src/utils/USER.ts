// This file is only for quick testing view, do not use in prod
// Only tweak auth and admin variables
// 0 for false, anything else number for true

export let IS_LOGGED_IN_USER: boolean;
export let USER_IS_ADMIN: boolean;

const auth: number = 1;
const admin: number = 1;

if (auth) {
  IS_LOGGED_IN_USER = true;
} else {
  IS_LOGGED_IN_USER = false;
}

if (admin) {
  USER_IS_ADMIN = true;
} else {
  USER_IS_ADMIN = false;
}

export default { IS_LOGGED_IN_USER, USER_IS_ADMIN };
