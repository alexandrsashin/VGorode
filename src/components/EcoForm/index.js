import React, { PureComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { features } from './ecoOrganizationList.geojson';
import './EcoForm.css';

const organizations = features.map((feature, index) => ({
  key: index,
  value: index,
  text: feature.properties.Attributes.Name
}));

class EcoForm extends PureComponent {
  state = { selectedOrganization: {} };

  onSelect = text => {
    const { onOrganizationSelect } = this.props;
    const selectedOrganization = features.find(
      feature => feature.properties.Attributes.Name === text
    );
    this.setState({ selectedOrganization }, () => onOrganizationSelect(selectedOrganization));
  };

  render() {
    const { selectedOrganization } = this.state;
    return (
      <div>
        <Dropdown
          clearable
          fluid
          search
          selection
          options={organizations.slice(0, 10)}
          placeholder="Выберите организацию"
          onChange={e => this.onSelect(e.currentTarget.innerText)}
        />
        <div>
          {!_isEmpty(selectedOrganization) && (
            <div className="eco-form__organization">
              <div className="eco-form__organization-field">
                Организация: {selectedOrganization.properties.Attributes.Name}
              </div>
              <div className="eco-form__organization-field">
                Координаты: {String(selectedOrganization.geometry.coordinates)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EcoForm;
