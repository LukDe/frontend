import { PropTypes } from 'react';

export const LocationPropType = PropTypes.shape({
  Lat: PropTypes.number,
  Lng: PropTypes.number
});

export function isLocation(location) {
  return location && location.Lat && location.Lng;
}
export function toLeaflet(location) {
  if (Array.isArray(location)) {
    return location.map(toLeaflet);
  }
  return {lat: location.Lat, lng: location.Lng};
}
export function fromLeaflet(location) {
  if (Array.isArray(location)) {
    return location.map(fromLeaflet);
  }
  return {Lat: location.lat, Lng: location.lng};
}

function toArcMinutes(decimalDegrees) {
  let degrees = Math.floor(decimalDegrees);
  let minutes = Math.floor((decimalDegrees - degrees) * 60);
  let seconds = Math.floor((decimalDegrees - degrees - minutes / 60) * 60 * 60);
  return `${degrees}°${minutes}'${seconds}"`;
}
export function toString(location) {
  return `${toArcMinutes(location.Lat)}${location.Lat > 0 ? 'N' : 'S'} ${toArcMinutes(location.Lng)}${location.Lng > 0 ? 'E' : 'W'}`;
}

export function calculateCenter(arrayOfLocations) {
  return {
    Lat: arrayOfLocations.map(point => point.Lat).reduce((a, b) => a + b) / arrayOfLocations.length,
    Lng: arrayOfLocations.map(point => point.Lng).reduce((a, b) => a + b) / arrayOfLocations.length
  }
}

// from: https://github.com/Leaflet/Leaflet.draw/blob/master/src/ext/GeometryUtil.js
export function geodesicArea(latLngs) {
  var pointsCount = latLngs.length,
    area = 0.0,
    d2r = Math.PI / 180.0,
    p1, p2;

  if (pointsCount > 2) {
    for (var i = 0; i < pointsCount; i++) {
      p1 = latLngs[i];
      p2 = latLngs[(i + 1) % pointsCount];
      area += ((p2.Lng - p1.Lng) * d2r) *
        (2 + Math.sin(p1.Lat * d2r) + Math.sin(p2.Lat * d2r));
    }
    area = area * 6378137.0 * 6378137.0 / 2.0;
  }

  return Math.abs(area);
}

export default {
  LocationPropType,
  toLeaflet,
  fromLeaflet,
  isLocation,
  calculateCenter
}