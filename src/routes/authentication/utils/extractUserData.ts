import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";
import { ILoginPayload } from "../../types/serverSpecifics.js";

const extractUserData = (loginToken: string) => {
        const payload = verifyAndDecodeJWT(loginToken) as ILoginPayload;
        const {user_id,account_type} = payload;
        if(!user_id) throw "invalid_user_id";
        return {userId: user_id,accountType: account_type};
}

export default extractUserData;