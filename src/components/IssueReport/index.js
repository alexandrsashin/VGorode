import React, { PureComponent } from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';
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
    const { formData } = this.state;
    return (
      <div className="issue-report">
        <Form onSubmit={this.onSubmit}>
          <Input
            className="issue-report__field"
            value={formData.label}
            placeholder="Название темы"
            onChange={(e, { value }) => this.onChange({ name: 'label', value })}
          />
          <Input
            className="issue-report__field"
            value={formData.address}
            placeholder="Введите адрес"
            onChange={(e, { value }) => this.onChange({ name: 'address', value })}
          />
          <TextArea
            className="issue-report__field"
            value={formData.description}
            placeholder="Описание"
            onChange={(e, { value }) => this.onChange({ name: 'description', value })}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default IssueReport;
