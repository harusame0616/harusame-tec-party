export type Success<Data = null> = {
  success: true;
  data: Data;
};

export type Failure = {
  success: false;
  message: string;
};

export type Result<SuccessData = null> = Success<SuccessData> | Failure;

export function succeed(): Success;
export function succeed<Data>(data: Data): Success<Data>;
export function succeed<Data>(data?: Data): Success<Data> | Success {
  if (data === undefined) {
    return { success: true, data: null };
  }

  return { success: true, data };
}

export function fail(message: string): Failure {
  return { success: false, message };
}
