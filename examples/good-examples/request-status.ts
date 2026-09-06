export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export type RequestStatus =
  typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];

export const BUTTON_ACTION = {
  SUBMIT: 'submit',
  CANCEL: 'cancel',
  RESET: 'reset'
} as const;

export const BUTTON_LABEL = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
  RESET: 'Reset'
} as const;

export const APP_CONFIG = {
  API_TIMEOUT_MS: 30000,
  MAX_RETRY_COUNT: 3,
  DEFAULT_PAGE_SIZE: 20
} as const;
