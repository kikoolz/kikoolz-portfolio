import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

console.log("JWT_SECRET loaded:", !!JWT_SECRET);

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    console.log("Verifying token with secret:", !!JWT_SECRET);
    const result = jwt.verify(token, JWT_SECRET!);
    console.log("Token verification result:", result);
    return result;
  } catch (error: any) {
    console.error("Token verification error:", error?.message || String(error));
    return null;
  }
}
