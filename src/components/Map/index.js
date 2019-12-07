import React, { PureComponent } from 'react';
import './Map.css';

class Map extends PureComponent {
  map = React.createRef();

  componentDidMount() {
    const platform = new H.service.Platform({
      apikey: 'HvVbNGT4fOCDM0GmtobBtgYiekLboSwmXUrdb-xtpFo'
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(this.map.current, defaultLayers.vector.normal.map, {
      center: {
        lat: 55.75203,
        lng: 37.61951
      },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });

    window.addEventListener('resize', () => map.getViewPort().resize());

    map.addEventListener('tap', function(evt) {
      // Log 'tap' and 'mouse' events:
      console.log(evt.type, evt.currentPointer.type);
    });

    H.map.IInteraction;

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    //Begin routing
    //Configure transportation mode, start, end points
    const request = {
      mode: 'fastest;car',
      waypoint0: 'geo!37.80221,-122.4191',
      waypoint1: 'geo!37.76839,-122.51089',
      representation: 'display'
    };
    //Initialize routing service
    const router = platform.getRoutingService();
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
      map.addObject(routeLine);
      //Zoom to bounds of the route shape
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });

    // // Инициализация соединения с облачным хранилищем HERE XYZ
    // const service = platform.getXYZService({
    //   token: "AMd-wn9MQLusUyHUMArtmQA"
    // })

    // // Провайдер даных из HERE XYZ
    // const spaceProvider = new H.service.xyz.Provider(service, "y7T1iuob")

    // // Создание нового тайлового слоя
    // const spaceLayer = new H.map.layer.TileLayer(spaceProvider)

    // // Добавление данных на карту
    // map.addLayer(customSpaceLayer)
  }

  render() {
    return <div ref={this.map} className="map"></div>;
  }
}

export default Map;
