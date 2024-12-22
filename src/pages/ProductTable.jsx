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
      <div className="search">
        <input
          className='search_input'
          type="search"
          placeholder='Find Product'
          onChange={SearchValue}
        />
       
      <Link to={'/create'}><Button className='add_btn'>Add Product</Button></Link>
      </div>
      
      </div>
      <div className='table'>

      
        <Table >
          <thead>
            <tr className='table-row'>
              <th>Item Code</th>
              <th>Product Name</th>
              <th>Image</th>
              <th className='category'>Category</th>
              <th className='category'>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Products.filter((product) => product.title.includes(SearchText)).map((item) => {
              return (
                <tr className='table-row' key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td><img style={{ height: "100px" }} src={item.thumbnail} alt="" /></td>
                  <td className='category'>{item.category}</td>
                  <td className='category'>{item.price}</td>
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
        <Modal className='modal' show={show} onHide={handleClose}>
          <Modal.Header className='modal-head' closeButton>
            <Modal.Title className='fw-bolder' >{ModalItem.title}</Modal.Title>
          </Modal.Header>
          <img src={ModalItem.thumbnail} alt="" />
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
      <Modal className='delete-modal'  show={Deleteshow} onHide={handleDeleteClose}>
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
      <span>Made with by  </span><FaCode className='code-icon'/><span> <Link to={'https://github.com/fayizkkmfz'} target='_blank' style={{textDecoration:'none', color:'black'}}>fayizkkmfz</Link></span>
      </div>
    </>
  )
}

export default ProductTable