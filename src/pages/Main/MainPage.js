import React from 'react';
import { Route } from 'react-router-dom';
import Block from '../../components/Block';
import Map from '../../components/Map';
import './Main.css';

const MainPage = ({ issue, organization, onOrganizationSelect, onIssueSubmit }) => {
  return (
    <div className="main__container">
      <div className="main__text-block">
        <Block onOrganizationSelect={onOrganizationSelect} onIssueSubmit={onIssueSubmit} />
      </div>
      <Route
        render={({ location }) => (
          <Map location={location} issue={issue} organization={organization} />
        )}
      />
    </div>
  );
};

export default MainPage;
