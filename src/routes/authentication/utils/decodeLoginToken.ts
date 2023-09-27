import verifyAndDecodeJWT from "../../../utils/verifyAndDecodeJWT.js";
import { ILoginPayload } from "../../../types/commonInterfaces.js";

const decodeLoginToken = (loginToken: string) => {
  const payload = verifyAndDecodeJWT(loginToken) as ILoginPayload | false;
  const { user_id, account_type } = payload || {};
  if (!user_id) return false;
  return { userId: user_id, accountType: account_type };
};

export default decodeLoginToken;
