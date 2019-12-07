import React, { PureComponent } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import SearchForm from '../SearchForm';
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
    return (
      <div className="block">
        {apps.map(({ appId, appName, appLink }) => (
          <Link key={appId} to={appLink}>
            {appName}
          </Link>
        ))}
        <Switch>
          <Route exact path="/" component={SearchForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Block;
