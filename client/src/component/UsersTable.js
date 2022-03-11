import { useState } from 'react'
import { Col, Modal, Table, Button, Pagination } from 'react-bootstrap'

export const UsersTable = () => {
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => {
    setShowModal(true)
  }
  const deleteUserHandler = () => {
    // dispatch(deleteUser(userId))
    setShowModal(false)
  }

  return (
    <>
      <Col md={6} className='pe-4'>
        {/* Heading */}
        <h5 className='text-primary'>
          Users <small style={{ fontSize: '12px', color: 'red' }}>(20)</small>
        </h5>
        {/* Table */}
        <Table size='sm'>
          <thead className='table-dark'>
            <tr>
              <th>#</th>
              <th> Date Created</th>
              <th> Role</th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <Button className='btn btn-sm me-2' variant='light'>
                  <i className='fa fa-cog text-primary'></i>
                </Button>
                <Button
                  className='btn btn-sm'
                  variant='light'
                  onClick={handleShowModal}
                >
                  <i className='fa fa-times-circle text-danger'></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* Pagination */}
        <Pagination className='d-flex justify-content-end' size='sm'>
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Item active>4</Pagination.Item>
        </Pagination>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className='my-0 pt-3 pb-0'>
          <p variant='danger'>Delete user #userId.</p>
        </Modal.Body>

        <Modal.Footer className='my-0 py-2'>
          <Button
            onClick={deleteUserHandler}
            className='btn-sm'
            variant='danger'
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
