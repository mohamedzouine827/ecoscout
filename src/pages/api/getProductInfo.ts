import { NextApiRequest, NextApiResponse } from 'next';

interface ProductData {
  name: string;
  image: string;
  rating: number | null;
  price: string | null;
}

// Fetch product data from Canopy API
async function fetchAmazonData(asin: string): Promise<ProductData> {
  const query = `
    query amazonProduct {
      amazonProduct(input: {asin: "${asin}"}) {
        title
        mainImageUrl
        rating
        price {
          display
        }
      }
    }
  `;

  const response = await fetch('https://graphql.canopyapi.co/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': process.env.CANOPY_API_KEY || '<YOUR_API_KEY>',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product data: ${response.statusText}`);
  }

  const data = await response.json();

  const product = data.data.amazonProduct;

  return {
    name: product.title,
    image: product.mainImageUrl,
    rating: product.rating,
    price: product.price?.display || null,
  };
}

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { link } = req.body;

    try {
      // Validate input
      if (!link) {
        return res.status(400).json({ error: 'Product link is required' });
      }

      // Extract ASIN from the provided link
      const asin = link.match(/\/([A-Z0-9]{10})(?:[/?]|$)/)?.[1];
      if (!asin) {
        return res.status(400).json({ error: 'Invalid Amazon link' });
      }

      // Fetch product data using the extracted ASIN
      const productData = await fetchAmazonData(asin);
      return res.status(200).json(productData);
    } catch (error: any) {
      console.error('Error fetching product data:', error.message);
      return res.status(500).json({ error: 'Failed to fetch product data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
