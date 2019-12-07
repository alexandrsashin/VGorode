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

    // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    // const ui = H.ui.UI.createDefault(map, defaultLayers)

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
