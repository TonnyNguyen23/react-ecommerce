import { Form } from 'react-bootstrap'

export const FormikControl = ({
  name,
  label,
  error,
  onChange,
  value,
  ...rest
}) => {
  return (
    <Form.Group controlId={name} className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
        {...rest}
      />
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  )
}
