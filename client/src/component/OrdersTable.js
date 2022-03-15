import { Table } from 'react-bootstrap'
import OrderRow from './OrderRow'

export const OrdersTable = ({ orders }) => {
  return (
    <>
      <Table size='sm'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th> Date Created</th>
            <th> Total price</th>
            <th> Paid</th>
            <th> Delivered </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </Table>
    </>
  )
}
