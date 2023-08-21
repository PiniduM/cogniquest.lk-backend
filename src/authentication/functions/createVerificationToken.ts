import signJWT from "../../utils/signJWT.js";

const giveEmailVerificationToken = (email: string,type: string) => {
    const verificationToken = signJWT({email,type},"10m");
    return verificationToken;
}

export default giveEmailVerificationToken;