import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import FingerprintIcon from 'material-ui/svg-icons/action/fingerprint'
import CropFreeIcon from 'material-ui/svg-icons/image/crop-free'

import Leaflet from 'leaflet';
import SimpleMap from '../maps/SimpleMap'
import { geodesicArea } from '../../helpers/Location';

import { RegionPropType } from '../../schemas/RegionSchema'

export default class Region extends Component {
  static propTypes = {
    region: RegionPropType.isRequired
  };

  render() {
    const region = this.props.region;
    console.dir(Leaflet);

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={region.Name} />
        <CardText>
          <h2>{region.Name}</h2>
          {region.Description}
        </CardText>
        <SimpleMap area={region.Boundaries} style={{'height': '400px'}} />
        <CardText>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <CropFreeIcon style={{marginRight: '0.5rem'}} /> {(geodesicArea(region.Boundaries) / 1e6).toFixed(2)}km²
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <FingerprintIcon style={{marginRight: '0.5rem'}} /> {region.ID}
          </div>
        </CardText>
      </Card>
    )
  }
}