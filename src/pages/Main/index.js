import React, { PureComponent } from 'react';
import MainPage from './MainPage';

class Main extends PureComponent {
  state = {
    issue: {}
  };

  onIssueSubmit = issueData => {
    this.setState({ issue: issueData });
  };

  render() {
    return <MainPage onIssueSubmit={this.onIssueSubmit} />;
  }
}

export default Main;
