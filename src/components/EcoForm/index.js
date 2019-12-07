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

const cutOptionsList = items => items.slice(0, 10);

class EcoForm extends PureComponent {
  state = {
    selectedOrganization: {},
    organizationOptions: cutOptionsList(organizations)
  };

  onSelect = text => {
    const { onOrganizationSelect } = this.props;
    const selectedOrganization = features.find(
      feature => feature.properties.Attributes.Name === text
    );
    this.setState({ selectedOrganization }, () => onOrganizationSelect(selectedOrganization));
  };

  onSearchChange = (e, { searchQuery }) => {
    const filteredOrganizations = organizations.filter(organization =>
      organization.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const organizationOptions = cutOptionsList(filteredOrganizations);
    this.setState({ organizationOptions });
  };

  render() {
    const { selectedOrganization, organizationOptions } = this.state;
    return (
      <div>
        <Dropdown
          clearable
          fluid
          search
          selection
          options={organizationOptions}
          placeholder="Выберите организацию"
          onSearchChange={this.onSearchChange}
          onChange={e => this.onSelect(e.currentTarget.innerText)}
        />
        <div>
          {!_isEmpty(selectedOrganization) && (
            <div className="eco-form__organization">
              <div className="eco-form__organization-field">
                <strong>Организация:</strong> {selectedOrganization.properties.Attributes.Name}
              </div>
              <div className="eco-form__organization-field">
                <strong>Адрес:</strong> {selectedOrganization.properties.Attributes.LegalAddress}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EcoForm;
