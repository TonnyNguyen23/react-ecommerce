import { Alert } from 'react-bootstrap'

export const Message = ({ children, ...rest }) => {
  return <Alert {...rest}>{children}</Alert>
}
