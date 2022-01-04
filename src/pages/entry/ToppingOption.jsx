import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  function handleChange(event) {
    const isChecked = event.target.checked ? 1 : 0;
    updateItemCount(name, isChecked);
  }

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-topping-checkbox`}
        style={{ marginTop: '10px' }}
      >
        <Form.Check
          type='checkbox'
          label={name}
          onChange={handleChange}
          defaultChecked={false}
        />
      </Form.Group>
    </Col>
  );
}
