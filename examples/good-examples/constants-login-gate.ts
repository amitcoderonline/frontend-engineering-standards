export const USER_ROLE = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export const USER_STATUS = {
  ACTIVE: 'active',
  INVITED: 'invited',
  SUSPENDED: 'suspended'
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

export const APP_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5
} as const;

export const BUTTON_ACTION = {
  SUBMIT: 'submit'
} as const;

export const BUTTON_LABEL = {
  SUBMIT: 'Submit'
} as const;

export interface User {
  role: UserRole;
  status: UserStatus;
}

export function shouldShowSubmitButton(
  user: User,
  loginAttempts: number
): boolean {
  return (
    user.role === USER_ROLE.ADMIN &&
    user.status === USER_STATUS.ACTIVE &&
    loginAttempts < APP_CONFIG.MAX_LOGIN_ATTEMPTS
  );
}

export function submitButtonLabel(): string {
  return BUTTON_LABEL.SUBMIT;
}

export function submitButtonAction(): typeof BUTTON_ACTION.SUBMIT {
  return BUTTON_ACTION.SUBMIT;
}
