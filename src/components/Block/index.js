import React, { PureComponent } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import RouteMap from '../RouteMap';
import EcoForm from '../EcoForm';
import IssueReport from '../IssueReport';
import './Block.css';

const apps = [
  {
    icon: '',
    appId: '1',
    appName: 'Построй маршрут',
    appLink: '/route',
    description: ''
  },
  {
    icon: '',
    appId: '2',
    appName: 'Эко-организации',
    appLink: '/eco',
    description: ''
  },
  {
    icon: '',
    appId: '3',
    appName: 'Сообщи о проблеме',
    appLink: '/issue-report',
    description: ''
  }
];

class Block extends PureComponent {
  render() {
    const { onIssueSubmit } = this.props;
    return (
      <div className="block">
        <div className="block__apps">
          {apps.map(({ appId, appName, appLink }) => (
            <NavLink
              key={appId}
              to={appLink}
              className="block__app"
              activeClassName="block__app--active"
            >
              {appName}
            </NavLink>
          ))}
        </div>
        <div className="block__content">
          <Switch>
            <Route path="/route" component={RouteMap} />
            <Route path="/eco" component={EcoForm} />
            <Route path="/issue-report" render={() => <IssueReport onSubmit={onIssueSubmit} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Block;
