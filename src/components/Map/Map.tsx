import {useEffect, useRef} from 'react';
import {Icon, LayerGroup, Marker, TileLayer} from 'leaflet';
import {Map as LeafletMap} from 'leaflet';
import {MapProps} from '../../types/types';

const DEFAULT_ICON = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const ACTIVE_ICON = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const URL_MARKER_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION_MARKER_LAYER = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({city, offers, selectedOfferId, className = 'cities__map map'}: MapProps) => {
  const mapRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const initialCityLocationRef = useRef(city.location);

  useEffect(() => {
    if (mapRef.current === null || mapInstanceRef.current !== null) {
      return;
    }

    const map = new LeafletMap(mapRef.current, {
      center: {
        lat: initialCityLocationRef.current.latitude,
        lng: initialCityLocationRef.current.longitude,
      },
      zoom: initialCityLocationRef.current.zoom,
    });

    new TileLayer(URL_MARKER_LAYER, {
      attribution: ATTRIBUTION_MARKER_LAYER,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current === null) {
      return;
    }

    mapInstanceRef.current.setView(
      {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      city.location.zoom
    );
  }, [city]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map === null) {
      return;
    }

    const markersLayer = new LayerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    offers.forEach((offer) => {
      new Marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: selectedOfferId === offer.id ? ACTIVE_ICON : DEFAULT_ICON,
        }
      ).addTo(markersLayer);
    });

    return () => {
      markersLayer.clearLayers();
      map.removeLayer(markersLayer);
      markersLayerRef.current = null;
    };
  }, [offers, selectedOfferId]);

  return <section className={className} ref={mapRef}></section>;
};

export default Map;
