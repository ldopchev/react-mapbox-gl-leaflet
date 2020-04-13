import L from 'leaflet';

// Global imports
import {} from 'mapbox-gl';
import {} from 'mapbox-gl-leaflet';

import { GridLayer, withLeaflet } from 'react-leaflet';

class MapboxGlLayer extends GridLayer {
  constructor(props) {
    super(props);

    this._addLayer = this._addLayer.bind(this);
    this._removeLayer = this._removeLayer.bind(this);
  }

  createLeafletElement(props) {
    const { map } = props.leaflet || this.context;

    map.on('layeradd', e => {
      this._addLayer(e);
    });

    map.on('layerremove', e => {
      this._removeLayer(e);
    });

    return L.mapboxGL(props);
  }

  _addLayer({ layer }) {
    this._layer = layer;
    const { _map } = this._layer;

    if (_map) {
      // Force a resize calculation on the map so that
      // Mapbox GL layer correctly repaints its height after it has been added.
      setTimeout(_map._onResize, 200);
    }
  }

  _removeLayer() {
    this._layer = null;
  }
}

export default withLeaflet(MapboxGlLayer);
export { MapboxGlLayer };
