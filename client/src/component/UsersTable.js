import { useState } from 'react'
import { Modal, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import UserRow from './UserRow'

export const UsersTable = ({ users }) => {
  const [showModal, setShowModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState('')
  const navigate = useNavigate()

  const handleCloseModal = () => setShowModal(false)

  const handleNavigateEditUser = userId => {
    navigate(`/admin/users/${userId}/edit`)
  }

  const handleShowModalDelete = userId => {
    setDeleteUserId(userId)
    setShowModal(true)
  }

  const deleteUserHandler = () => {
    console.log(deleteUserId)
    setShowModal(false)
  }

  return (
    <>
      <Table size='sm'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th> Date Created</th>
            <th> Role</th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              onShowModalDelete={handleShowModalDelete}
              onNavigateEditUser={handleNavigateEditUser}
            />
          ))}
        </tbody>
      </Table>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className='my-0 pt-3 pb-0'>
          <p variant='danger'>
            Delete user <b>#{deleteUserId.slice(-3)}</b>.
          </p>
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
