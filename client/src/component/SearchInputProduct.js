import { InputGroup, FormControl } from 'react-bootstrap'

export const SearchProduct = () => {
  return (
    <InputGroup size='sm' style={{ minWidth: '280px' }}>
      <FormControl placeholder='Search product...' aria-describedby='search' />
      <InputGroup.Text className='bg-primary text-white' id='search'>
        <i className='fa fa-search'></i>
      </InputGroup.Text>
    </InputGroup>
  )
}
