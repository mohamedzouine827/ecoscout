import React, { useState } from 'react';

export default function GetProductInfo() {
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('amazon');
  const [productData, setProductData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/getProductInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link, platform }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const data = await response.json();
      setProductData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Get Product Information</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="link" style={{ display: 'block', fontWeight: 'bold' }}>
            Product Link:
          </label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter product link"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="platform" style={{ display: 'block', fontWeight: 'bold' }}>
            Platform:
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="amazon">Amazon</option>
            <option value="ebay">eBay</option>
            <option value="walmart">Walmart</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Fetching...' : 'Get Info'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {productData && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px' }}>
          <h2>Product Information</h2>
          <p><strong>Name:</strong> {productData.name}</p>
          <p><strong>Price:</strong> {productData.price}</p>
          {productData.reviews && <p><strong>Reviews:</strong> {productData.reviews}</p>}
          {productData.sales && <p><strong>Sales:</strong> {productData.sales}</p>}
          <img
            src={productData.image}
            alt={productData.name}
            style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
}
