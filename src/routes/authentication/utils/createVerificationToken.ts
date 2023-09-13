import signJWT from "../../utils/signJWT.js";

const giveEmailVerificationToken = (email: string) => {
    const verificationToken = signJWT({email},"10h");
    return verificationToken;
}

export default giveEmailVerificationToken;