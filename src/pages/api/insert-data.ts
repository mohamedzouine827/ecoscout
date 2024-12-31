import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const result = await query(
        'INSERT INTO ecos (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error: any) {
      console.error('Error inserting data:', error.message);
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
