import React from 'react';
import Block from '../../components/Block';
import Map from '../../components/Map';
import './Main.css';

const MainPage = () => {
  return (
    <div className="main__container">
      <div className="main__text-block">
        <Block />
      </div>
      <Map />
    </div>
  );
};

export default MainPage;
