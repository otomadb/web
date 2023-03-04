export type TurnstileVerifyResponse = {
  "success": boolean;
  "challenge_ts"?: string;
  "hostname"?: string;
  "error-codes"?: (
    | "missing-input-secret"
    | "invalid-input-secret"
    | "missing-input-response"
    | "invalid-input-response"
    | "bad-request"
    | "timeout-or-duplicate"
    | "internal-error"
  )[];
  "action"?: string;
  "cdata"?: string;
};
