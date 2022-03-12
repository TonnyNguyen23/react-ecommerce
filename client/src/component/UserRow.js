import { Button } from 'react-bootstrap'

const UserRow = ({ user, onShowModalDelete, onNavigateEditUser }) => {
  return (
    <tr>
      <td>{user.id.slice(-3)}</td>
      <td>{user.name}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>{user.role}</td>
      <td>
        <Button
          className='btn btn-sm me-2'
          onClick={() => onNavigateEditUser(user.id)}
          variant='light'
        >
          <i className='fa fa-cog text-primary'></i>
        </Button>
        <Button
          className='btn btn-sm'
          variant='light'
          onClick={() => onShowModalDelete(user.id)}
        >
          <i className='fa fa-times-circle text-danger'></i>
        </Button>
      </td>
    </tr>
  )
}

export default UserRow
