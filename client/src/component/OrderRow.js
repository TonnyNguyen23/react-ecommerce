import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const OrderRow = ({ order }) => {
  const navigate = useNavigate()
  const handleNavigateOrderDetails = () => {
    navigate(`/orders/${order.id}`)
  }
  return (
    <tr>
      <td>{order.id.slice(-3)}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>
        {order.isPaid ? (
          <i className='fa fa-check' aria-hidden='true'></i>
        ) : (
          <i className='fa fa-times' aria-hidden='true'></i>
        )}
      </td>
      <td>
        {order.isDelivered ? (
          <i className='fa fa-check' aria-hidden='true'></i>
        ) : (
          <i className='fa fa-times' aria-hidden='true'></i>
        )}
      </td>
      <td>
        <Button size='sm' variant='info' onClick={handleNavigateOrderDetails}>
          Details
        </Button>
      </td>
    </tr>
  )
}

export default OrderRow
