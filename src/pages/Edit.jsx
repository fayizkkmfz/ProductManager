import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { ProductsContext } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './edit.css'


function Edit() {
  const navig=useNavigate()
  const {setNavHead,EditProduct,setProducts}=useContext(ProductsContext)
  const [EditedInput, setEditedInput] = useState({
    id:EditProduct.id,
    title:EditProduct.title,
    thumbnail:EditProduct.thumbnail,
    category:EditProduct.category,
    price:EditProduct.price
  })
  setNavHead("Modify Product")
  const getinput=(e)=>{
    setEditedInput({...EditedInput,[e.target.name]:e.target.value})
  }

  const saveChage=(e)=>{
    e.preventDefault()
    setProducts((product)=>{
      const updatedProduct=product.map((data)=>{
        if(data.id===EditProduct.id){
          const updateProduct={
            ...data,
            id:EditedInput.id,
            title:EditedInput.title,
            thumbnail:EditedInput.thumbnail,
            category:EditedInput.category,
            price:EditedInput.price
          }
          return updateProduct
        }
        return data
      })
      return updatedProduct
    }
    )
    navig('/')
    toast(`${EditProduct.title} Product Details Edited`)
  }
  return (
    <div className='edit-div'>
        <Form className='edit-form' onSubmit={saveChage}>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>ID</Form.Label>
        <Form.Control
        name='id'
        type="" placeholder="Enter Id" 
        onChange={getinput}
        defaultValue={EditProduct.id}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>TITLE</Form.Label>
        <Form.Control type=""
        name='title'
        onChange={getinput}
        placeholder="Enter Product Title" 
        defaultValue={EditProduct.title}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>IMAGE
        </Form.Label>
        <Form.Control type="" 
        name='thumbnail'
        onChange={getinput}
        placeholder="Image address of product"
        defaultValue={EditProduct.thumbnail} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>CATEGORY
        </Form.Label>
        <Form.Control type="" 
        name='category'
        onChange={getinput}
        placeholder="type of product"
        defaultValue={EditProduct.category} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>PRICE
        </Form.Label>
        <Form.Control type="" 
        name='price'
        onChange={getinput}
        placeholder="Enter Price of Product"
        defaultValue={EditProduct.price} />
      </Form.Group>
      <Link to={'/'}><Button className='sumit-btn' variant="primary">
          Cancel
        </Button></Link>
      <Button className='sumit-btn' variant="primary" type="submit">
        Save Change
      </Button>
    </Form>
    </div>
  )
}

export default Edit