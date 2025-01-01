import { query } from '../../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    try {
      // Check if the email already exists
      const existingUser = await query('SELECT 1 FROM users WHERE email = $1 LIMIT 1', [email]);
      if (existingUser.rowCount > 0) {
        return res.status(400).json({ success: false, error: 'Email is already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      const result = await query(
        'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [firstName, lastName, email, hashedPassword]
      );

      // Return the created user data
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}