import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/libs/supabase';

type Data = {
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const { data, error } = await supabase
    .from('ECO')  // Replace with your table name
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
