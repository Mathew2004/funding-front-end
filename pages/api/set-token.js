import { serialize } from 'cookie'

export default function handler(req, res) {
  const { token } = req.body

  if (!token) return res.status(400).json({ message: 'Token missing' })

  res.setHeader('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 day
    path: '/',
  }))

  res.status(200).json({ message: 'Token saved in cookie' })
}
