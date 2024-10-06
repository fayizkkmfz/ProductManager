import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { ProductsContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './create.css'

function CreateProduct() {
  const navig = useNavigate()
  const { setNavHead, Products, setProducts } = useContext(ProductsContext);
  const [input, setinpuit] = useState({
    id: '',
    title: "",
    thumbnail: "",
    category: "",
    price: ""
  })
  setNavHead("Create New Product")

  const getinput = (e) => {
    setinpuit({ ...input, [e.target.name]: e.target.value })
  }

  const getValues = (e) => {
    e.preventDefault();
    console.log(input);
    const TotalDatas = ([...Products, input])
    setProducts(TotalDatas)
    console.log(Products);
    toast(`${input.title} Product Added Successfully`)
    navig('/')
  }
  return (
    <div className='create-div' >
      <Form className='create-form'>
        <Form.Group className="mb-4" controlId="">
          
          <Form.Control
            className='text-center'
            onChange={getinput}
            name='id'
            type="" placeholder="Enter Id" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="">
          
          <Form.Control type=""
            className='text-center'
            onChange={getinput}
            name='title'
            placeholder="Enter Product Title" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="">
          
          <Form.Control type=""
            className='text-center'
            onChange={getinput}
            name='thumbnail'
            placeholder="Enter Image Address" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="">
        
          <Form.Control type=""
            className='text-center'
            onChange={getinput}
            name='category'
            placeholder="Type of product" />
        </Form.Group>
        <Form.Group className="mb-5" controlId="">
          
          <Form.Control type=""
            className='text-center'
            onChange={getinput}
            name='price'
            placeholder="Enter Price of Product" />
        </Form.Group>
        <Link to={'/'}><Button className='sumit-btn' variant="primary">
          Cancel
        </Button></Link>
        <Button className='sumit-btn' onClick={getValues} variant="primary" type="submit">
          Add product
        </Button>
        
      </Form>
    </div>
  )
}

export default CreateProduct