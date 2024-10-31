import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
const generateTokenAndSaveInCookies = async(userId, res) => {
    const token=jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d",
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite:"lax"
    })
    await User.findByIdAndUpdate(userId, { token });
    return token;
}

export default generateTokenAndSaveInCookies;