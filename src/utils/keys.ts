import crypto from "crypto";

const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);

export function encrypt(value: string, secretKey: string): {
    iv: string;
    content: string;
} {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex")
    }
}

export function decrypt(hash: {
    content: string;
    iv: string;
}, secretKey: string): string {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(hash.iv, "hex"))

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);

    return decrypted.toString();
}
