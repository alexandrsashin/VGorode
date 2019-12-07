import React, { PureComponent } from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import './IssueReport.css';

const initialFormData = {
  label: '',
  description: '',
  address: ''
};

class IssueReport extends PureComponent {
  state = {
    formData: initialFormData,
    issue: {}
  };

  onChange = ({ name, value }) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [name]: value } });
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { formData } = this.state;
    onSubmit(formData);
    this.setState({ issue: formData, formData: initialFormData });
  };

  render() {
    const { formData, issue } = this.state;
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
        {!_isEmpty(issue) && (
          <div className="issue-report__issue">
            <div className="issue-report__issue-field">Тема: {issue.label}</div>
            <div className="issue-report__issue-field">Адрес: {issue.address}</div>
            <div className="issue-report__issue-field">Описание: {issue.description}</div>
          </div>
        )}
      </div>
    );
  }
}

export default IssueReport;
