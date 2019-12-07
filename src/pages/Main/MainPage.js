import React from 'react';
import { Route } from 'react-router-dom';
import Block from '../../components/Block';
import Map from '../../components/Map';
import './Main.css';

const MainPage = () => {
  return (
    <div className="main__container">
      <div className="main__text-block">
        <Block />
      </div>
      <Route render={({ location }) => <Map location={location} />} />
    </div>
  );
};

export default MainPage;
