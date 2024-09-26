import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    setProducts(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { name, price });
    } else {
      await axios.post(API_URL, { name, price });
    }
    setName('');
    setPrice('');
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>
      <ul>
        {/* {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default ProductManager;