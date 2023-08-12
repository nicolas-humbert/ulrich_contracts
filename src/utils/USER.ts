export let IS_LOGGED_IN_USER: boolean;
export let USER_IS_ADMIN: boolean;

const auth: number = 1;

if (auth) {
  IS_LOGGED_IN_USER = true;
  USER_IS_ADMIN = true;
} else {
  IS_LOGGED_IN_USER = false;
  USER_IS_ADMIN = false;
}

export default { IS_LOGGED_IN_USER, USER_IS_ADMIN };
