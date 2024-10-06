
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductTable from './pages/ProductTable';
import CreateProduct from './pages/CreateProduct';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Edit from './pages/Edit';
import Navigbar from './pages/Navigbar';

const ProductsContext = createContext()

function App() {
  const [NavHead, setNavHead] = useState("")
  const [Products, setProducts] = useState([])
  const [EditProduct, setEditProduct] = useState({})
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setProducts(res.data.products);
    })
  }, [])
  return (
    <div>
      <ProductsContext.Provider value={{ NavHead, setNavHead, setProducts, Products, EditProduct, setEditProduct }}>
        <BrowserRouter>
          <Navigbar />
          <Routes>
            <Route path='/' element={<ProductTable />} />
            <Route path='/create' element={<CreateProduct />} />
            <Route path='/edit' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
export { ProductsContext }

