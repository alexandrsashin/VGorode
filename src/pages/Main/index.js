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
    const { issue } = this.state;
    return <MainPage issue={issue} onIssueSubmit={this.onIssueSubmit} />;
  }
}

export default Main;
