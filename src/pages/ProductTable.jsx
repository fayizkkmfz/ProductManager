import React, { useContext, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import './Table.css'
import { Link } from 'react-router-dom'
import { IoIosEye } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { TbTrashXFilled } from "react-icons/tb";
import { ProductsContext } from '../App'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { FaCode } from "react-icons/fa";

function ProductTable() {
  const { setNavHead, Products, setProducts, setEditProduct } = useContext(ProductsContext);
  const [show, setShow] = useState(false);
  const [ModalItem, setModalItem] = useState()
  const [Deleteshow, setDeleteShow] = useState(false);
  const [deletingProduct, setdeletingProduct] = useState({})
  const [SearchText, setSearchText] = useState("")

  setNavHead("Top Products")

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    setModalItem(item)
    setShow(true);
  }

  const gotoEdit = (item) => {
    setEditProduct(item)
  }

  const Delete = (item) => {
    setdeletingProduct(item)
    setDeleteShow(true)
  }

  const handleDeleteClose = (item) => {
    setModalItem(item)
    setDeleteShow(false)
  }

  const RemoveItem = () => {
    const finalproducts = Products.filter((product) => product.id !== deletingProduct.id)
    console.log(finalproducts);
    setProducts(finalproducts)
    setDeleteShow(false)
    toast(`${deletingProduct.title}  Deleted Succefully`)
  }

  const SearchValue = (e) => {
    setSearchText(e.target.value);
  }

  return (
    <>
      <div className='top-bg'>
      <ToastContainer
      />
      <Link to={'/create'}><Button className='add_btn'>Add Product</Button></Link>
      <div className="search">
        <input
          className='search_input'
          type="search"
          placeholder='Find Product'
          onChange={SearchValue}
        />
       
      </div>
      
      </div>
      <div className='product-table'>
        <Table striped bordered hover>
          <thead>
            <tr className='table-row'>
              <th>Item Code</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Products.filter((product) => product.title.toLowerCase().includes(SearchText)).map((item) => {
              return (
                <tr className='table-row' key={item.id}>
                  <td className='table-data'>{item.id}</td>
                  <td>{item.title}</td>
                  <td><img style={{ height: "100px" }} src={item.thumbnail} alt="" /></td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td><IoIosEye style={{ cursor: "pointer" }} onClick={() => handleShow(item)} /><br />
                    <Link to={'/edit'}> <CiEdit onClick={() => gotoEdit(item)} />  </Link><br />
                    <TbTrashXFilled onClick={() => Delete(item)} style={{ cursor: "pointer" }} /></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        
      </div>
      {ModalItem && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modal-head' closeButton>
            <Modal.Title className='fw-bolder' >{ModalItem.title}</Modal.Title>
          </Modal.Header>
          <img style={{ height: "300px" }} src={ModalItem.thumbnail} alt="" />
          <Modal.Body className='modal-body'>{ModalItem.description}</Modal.Body>
          <Modal.Footer className='modal-head'>
            <h4 className='mr-10'>Rate : {ModalItem.price}</h4>
            <Button variant="success" onClick={handleClose}>
              Cancel
            </Button>
            <Link to={'/edit'}> 
            <Button variant="success" onClick={() => gotoEdit(ModalItem)}>
              Edit
            </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
      <Modal  show={Deleteshow} onHide={handleDeleteClose}>
        <Modal.Header className='delete-modal-head' closeButton>
          <Modal.Title>{deletingProduct.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are You Sure ? <br />
          Do You Want To Delete This Product
        </Modal.Body>
        <Modal.Footer className='modal-head'>
          <Button variant="success" onClick={handleDeleteClose}>
            Cancel
          </Button>
          
          <Button variant="danger" onClick={RemoveItem}>
            Delete
          </Button>
          
        </Modal.Footer>
      </Modal>
      <div className='about'>
      <h5 className='mt-2 me-2 fw-light'>Made with by  </h5><FaCode className='code-icon'/><h5 className='text-center mt-2 ms-2'> <Link to={'https://github.com/fayizkkmfz'} style={{textDecoration:'none', color:'black'}}>fayizkkmfz</Link></h5>
      </div>
    </>
  )
}

export default ProductTable