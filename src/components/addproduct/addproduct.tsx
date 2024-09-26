import React, { useState } from "react";
import './product.css';
import { countries, stock, category } from "../config/product";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Box
} from '@mui/material';

interface AddProductProps {
    
}
 
const AddProduct: React.FC<AddProductProps> = () => {

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        availabilityStatus: 'InStock',
    });

    const handleChange = (e: any ) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return ( 
        <>
            <div className="container">
                <div className="title">
                    <h2>Product Form</h2>
                </div>
                <div className="d-flex">
                    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {category.map((data,index) => (
                                    <MenuItem key={index} value={data.value}>{data.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Availability Status</InputLabel>
                            <Select
                                name="availabilityStatus"
                                value={formData.availabilityStatus}
                                onChange={handleChange}
                            >
                                {stock.map((data,index) => (
                                    <MenuItem key={index} value={data.value}>{data.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Box>
                </div>
            </div>
        </>
     );
}
 
export default AddProduct;