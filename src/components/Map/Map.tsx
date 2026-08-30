import {useEffect, useRef} from 'react';
import {Icon, LayerGroup, Marker, TileLayer} from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  const markersRef = useRef(new globalThis.Map<string, Marker>());
  const initialCityLocationRef = useRef(city.location);

  useEffect(() => {
    if (mapRef.current === null || mapInstanceRef.current !== null) {
      return;
    }
    const markers = markersRef.current;

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

    markersLayerRef.current = new LayerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      markers.clear();
      markersLayerRef.current = null;
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
    const markersLayer = markersLayerRef.current;
    if (markersLayer === null) {
      return;
    }

    const visibleOfferIds = new Set(offers.map((offer) => offer.id));
    markersRef.current.forEach((marker, offerId) => {
      if (!visibleOfferIds.has(offerId)) {
        markersLayer.removeLayer(marker);
        markersRef.current.delete(offerId);
      }
    });

    offers.forEach((offer) => {
      const markerLocation = {
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      };
      const existingMarker = markersRef.current.get(offer.id);
      if (!existingMarker) {
        const marker = new Marker(markerLocation, { icon: DEFAULT_ICON }).addTo(markersLayer);
        markersRef.current.set(offer.id, marker);
        return;
      }
      existingMarker.setLatLng(markerLocation);
      existingMarker.setIcon(DEFAULT_ICON);
    });
  }, [offers]);

  useEffect(() => {
    markersRef.current.forEach((marker, offerId) => {
      marker.setIcon(selectedOfferId === offerId ? ACTIVE_ICON : DEFAULT_ICON);
    });
  }, [selectedOfferId]);

  return <section className={className} ref={mapRef}></section>;
};

export default Map;
