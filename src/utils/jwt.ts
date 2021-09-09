import jwt from "jwt-simple";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function generateToken(data: {
    uid: string;
}) {
    return jwt.encode(data, SECRET_KEY);
}

export function decodeToken(token: string) {
    return jwt.decode(token, SECRET_KEY)
}