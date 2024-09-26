import React, { useEffect, useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';
import { useReactTable, ColumnDef, getCoreRowModel, createColumnHelper, flexRender, } from '@tanstack/react-table';
import axios from 'axios';
import {getServerSideProps} from "./products.services";
import './products.css';
import PreviewIcon from '@mui/icons-material/Preview';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    sku: string;
    availabilityStatus: string;
    thumbnail: string;
    editor: any;
  }
  
  interface ProductsProps {
    products: Product[];
  }


 
const Products: React.FC<ProductsProps> = () => {
  const navigate = useNavigate();

  const navProduct = () => {
    navigate('/addproduct');
  }

  const [products, setProducts] = useState<Product[]>([]);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [product, setProduct] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      getServerSideProps().then((res) =>{
          setProducts(res.data.products);
      })
  },[])
  const columnHelper = createColumnHelper<Product>();

  const handleClick = (data:any) => {
    setProduct(data);
    setIsVisible(!isVisible);
  };
  const disable = () => {
    setIsVisible(!isVisible);
  }
  const columns = useMemo(() => [
    {
      accessorKey: 'id', 
      header: 'SN', 
    },
    {
      accessorKey: 'thumbnail',
      header: '',
      cell: (info: any) => (
        <img 
          src={info.getValue()} 
          alt="Thumbnail" 
          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
        />
      ),
    },
    {
      accessorKey: 'title',  
      header: 'Name', 
    },
    {
      accessorKey: 'description', 
      header: 'Description', 
    },
    {
      accessorKey: 'category', 
      header: 'Category', 
    },
    {
      accessorKey: 'price', 
      header: 'Price', 
    },
    {
      accessorKey: 'discountPercentage', 
      header: 'DiscountPercentage', 
    },
    {
      accessorKey: 'rating', 
      header: 'Rating', 
      cell: (props: { getValue: () => number; }) => {
        return (
          <div>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <span
                    className="star"
                    style={{
                      color: currentRating <= props.getValue() ? "#ffc107" : "#e4e5e9"
                    }}
                  >
                    &#9733; {/* Star character */}
                  </span>
                </label>
              );
            })}
          </div>
        );
      }
    },
    {
      accessorKey: 'stock', 
      header: 'Stock', 
    },
    {
      accessorKey: 'brand', 
      header: 'Brand', 
    },
    {
      accessorKey: 'sku', 
      header: 'SKU', 
    },
    {
      accessorKey: 'availabilityStatus', 
      header: 'AvailabilityStatus', 
    },
    {
      accessorKey: 'Editor', 
      header: 'Editor', 
      cell: (props: any) => {
        return (
          <div>
              <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PreviewIcon />} 
              onClick={() => handleClick(props.row.original)}
            >
              Preview
            </Button>
          </div>
        );
      } 
    }
  ],[]);

  const table = useReactTable({
      data: products,
      columns,
      getCoreRowModel: getCoreRowModel(),
  });
  
  return ( 

      <>
      <div>
      <div>
        <h1>Projects</h1>
      </div>
      <hr/>
      <div>
        <Button variant="outlined"  
            sx={{
                borderColor: 'lightblue',  
                borderRadius: '5px', 
                '&:hover': {
                    borderColor: 'lightblue', 
                },
                padding: '5px',
                margin: '10px',
                width: '15%'
            }} onClick={navProduct}>Add Project</Button>
      </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((column:any) => (
                    <TableCell key={column.id}>
                      {column.column.columnDef.header}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell:any) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        
        {isVisible ? 
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="cont">
                  <div className="product-card">
                      <div className="product-card__image" style={{position: 'relative'}}>
                          <img src={product.images[0]} alt="Red Nike Shoes"/>
                          <span style={{ color: 'white', position: 'absolute', top: '10px', right: '10px' }}>
                              <Button startIcon={<CloseIcon />}  onClick={() => disable()} >
                              </Button>
                          </span>
                      </div>
                      <div className="product-card__info">
                          <h2 className="product-card__title">{product.title}</h2>
                          <p className="product-card__description">{product.description}</p>
                          <div className="product-card__price-row">
                              <span className="product-card__price">${product.price}</span>
                              <button className="product-card__btn">Add to Cart</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        : <></>}
        </div>
      </>
  );
}
 
export default Products;