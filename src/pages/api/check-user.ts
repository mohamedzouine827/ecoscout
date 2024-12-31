import { query } from '../../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      const result = await query('SELECT 1 FROM users WHERE email = $1 LIMIT 1', [email]);
      res.status(200).json({ emailExists: result.rowCount > 0 });
    } catch (error) {
      console.error('Error checking user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
