import React, { PureComponent } from 'react';
import _isEqual from 'lodash/isEqual';
import './Map.css';

class Map extends PureComponent {
  map = React.createRef();

  componentDidMount() {
    const {
      location: { pathname }
    } = this.props;

    this.platform = new H.service.Platform({
      apikey: 'HvVbNGT4fOCDM0GmtobBtgYiekLboSwmXUrdb-xtpFo'
    });

    const defaultLayers = this.platform.createDefaultLayers();

    this.drawingMap = new H.Map(this.map.current, defaultLayers.vector.normal.map, {
      center: {
        lat: 55.75203,
        lng: 37.61951
      },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });

    window.addEventListener('resize', () => this.drawingMap.getViewPort().resize());

    this.drawingMap.addEventListener('tap', function(evt) {
      // Log 'tap' and 'mouse' events:
      console.log(evt.type, evt.currentPointer.type);
    });

    H.map.IInteraction;

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.drawingMap));

    const ui = H.ui.UI.createDefault(this.drawingMap, defaultLayers);

    this.renderMapObjects(pathname);

    //Begin geocoding

    // // Инициализация соединения с облачным хранилищем HERE XYZ
    // const service = this.platform.getXYZService({
    //   token: "AMd-wn9MQLusUyHUMArtmQA"
    // })

    // // Провайдер даных из HERE XYZ
    // const spaceProvider = new H.service.xyz.Provider(service, "y7T1iuob")

    // // Создание нового тайлового слоя
    // const spaceLayer = new H.map.layer.TileLayer(spaceProvider)

    // // Добавление данных на карту
    // this.drawingMap.addLayer(customSpaceLayer)
  }

  renderMapObjects = pathname => {
    this.drawingMap.removeObjects(this.drawingMap.getObjects());
    switch (pathname) {
      case '/route':
        return this.drawRouting();
      case '/eco':
        return this.drawEcoOrganizations();
      case '/issue-report':
        return;
    }
  };

  drawRouting = () => {
    //Begin routing
    //Configure transportation mode, start, end points
    const request = {
      mode: 'fastest;car',
      waypoint0: 'geo!55.768576,37.649116',
      waypoint1: 'geo!55.774516,37.622296',
      representation: 'display'
    };
    //Initialize routing service
    const router = this.platform.getRoutingService();
    router.calculateRoute(request, response => {
      //Parse the route's shape
      const shape = response.response.route[0].shape.map(x => x.split(','));
      const linestring = new H.geo.LineString();
      shape.forEach(s => linestring.pushLatLngAlt(s[0], s[1]));
      //Create a polyline with the shape
      const routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: 'blue', lineWidth: 3 }
      });
      //Add route to map
      this.drawingMap.addObject(routeLine);
      //Zoom to bounds of the route shape
      this.drawingMap.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });
  };

  drawEcoOrganizations = () => {
    this.drawingMap.setZoom(11);
    const searchText = '103073, Moscow';
    const geocoder = this.platform.getGeocodingService();
    geocoder.geocode({ searchText }, result => {
      const location = result.Response.View[0].Result[0].Location.DisplayPosition;
      const { Latitude: lat, Longitude: lng } = location;
      const marker = new H.map.Marker({ lat, lng });
      this.drawingMap.addObject(marker);
    });
  };

  drawIssues = issue => {
    const { address: searchText } = issue;
    const geocoder = this.platform.getGeocodingService();
    geocoder.geocode({ searchText }, result => {
      const location = result.Response.View[0].Result[0].Location.DisplayPosition;
      const { Latitude: lat, Longitude: lng } = location;
      const marker = new H.map.Marker({ lat, lng });
      this.drawingMap.addObject(marker);
    });
  };

  componentDidUpdate(prevProps) {
    const { location, issue } = this.props;
    if (!_isEqual(prevProps.location, location)) {
      this.renderMapObjects(location.pathname);
    }
    if (!_isEqual(prevProps.issue, issue)) this.drawIssues(issue);
  }

  render() {
    return <div ref={this.map} className="map"></div>;
  }
}

export default Map;
