import { Pagination } from 'react-bootstrap'

export const PaginationTable = () => {
  return (
    <Pagination className='d-flex justify-content-end' size='sm'>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item active>4</Pagination.Item>
    </Pagination>
  )
}
