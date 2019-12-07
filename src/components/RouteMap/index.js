import React, { PureComponent } from 'react';
import { Input } from 'semantic-ui-react';
import './RouteMap.css';

class RouteMap extends PureComponent {
  render() {
    return (
      <div>
        <Input className="route-map__input" label="от" onChange={() => {}} />
        <Input className="route-map__input" label="до" />
      </div>
    );
  }
}

export default RouteMap;
