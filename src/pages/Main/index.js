import React, { PureComponent } from 'react';
import MainPage from './MainPage';

class Main extends PureComponent {
  state = {
    issue: {},
    organization: {}
  };

  onOrganizationSelect = organization => this.setState({ organization });

  onIssueSubmit = issueData => {
    this.setState({ issue: issueData });
  };

  render() {
    const { issue, organization } = this.state;
    return (
      <MainPage
        issue={issue}
        organization={organization}
        onOrganizationSelect={this.onOrganizationSelect}
        onIssueSubmit={this.onIssueSubmit}
      />
    );
  }
}

export default Main;
