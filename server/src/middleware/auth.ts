import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  console.log(token);
  

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; exp: number }

    // Check if the token has expired
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: "Token has expired" })
    }
    ;(req as any).user = decoded
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token", error: error.message })
    }
    return res.status(403).json({ message: "Error verifying token", error: (error as Error).message })
  }
}

