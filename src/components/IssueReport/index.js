import React, { PureComponent } from 'react';
import { Form } from 'semantic-ui-react';
import './IssueReport.css';

const initialFormData = {
  label: '',
  description: '',
  address: ''
};

class IssueReport extends PureComponent {
  state = {
    formData: initialFormData
  };

  onChange = ({ name, value }) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [name]: value } });
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { formData } = this.state;
    onSubmit(formData);
    this.setState({ formData: initialFormData });
  };

  render() {
    return (
      <div className="issue-report">
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            placeholder="Название темы"
            onChange={(e, { value }) => this.onChange({ name: 'label', value })}
          />
          <Form.TextArea
            placeholder="Описание"
            onChange={(e, { value }) => this.onChange({ name: 'description', value })}
          />
          <Form.Input
            placeholder="Введите адрес"
            onChange={(e, { value }) => this.onChange({ name: 'address', value })}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default IssueReport;
