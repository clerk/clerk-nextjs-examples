import type { ClerkAPIError } from "@clerk/types";

export interface APIResponseError {
  errors: ClerkAPIError[];
}

export function parseError(err: APIResponseError): string {
  if (!err) {
    return "";
  }

  if (err.errors) {
    return err.errors[0].longMessage || "";
  }

  throw err;
}
