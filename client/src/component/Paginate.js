import { LinkContainer } from 'react-router-bootstrap'
import { Pagination } from 'react-bootstrap'

export const Paginate = ({ info, keyword = '' }) => {
  // const pageNumbers = [...Array(info.totalPages)].map((_, i) => i + 1)
  // [...Array(info.totalUsers).keys()]
  return (
    <>
      {info.totalPages > 1 && (
        <>
          <Pagination className='d-flex justify-content-end' size='sm'>
            {[...Array(info.totalPages)].map((_, i) => (
              <LinkContainer key={i + 1} to={`/admin/users?page=${i + 1}`}>
                <Pagination.Item active={+info.page === i + 1}>
                  {i + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination>
        </>
      )}
    </>
  )
}
