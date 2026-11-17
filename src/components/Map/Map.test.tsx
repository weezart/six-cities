import {render} from '@testing-library/react';
import {makeFakeOffer} from '../../utils/mocks';
import Map from './Map';

const leaflet = vi.hoisted(() => {
  const setIcon = vi.fn();
  const addTo = vi.fn();
  let markerCount = 0;

  class Icon {
    options: {iconUrl: string};

    constructor(options: {iconUrl: string}) {
      this.options = options;
    }
  }

  class Marker {
    constructor() {
      markerCount += 1;
    }

    setIcon = setIcon;

    setLatLng = vi.fn();

    addTo = (layer: unknown) => {
      addTo(layer);
      return this;
    };
  }

  class LayerGroup {
    addTo = () => this;

    removeLayer = vi.fn();
  }

  class TileLayer {
    addTo = vi.fn();
  }

  class LeafletMap {
    setView = vi.fn();

    remove = vi.fn();
  }

  return {
    Icon,
    Marker,
    LayerGroup,
    TileLayer,
    Map: LeafletMap,
    setIcon,
    addTo,
    getMarkerCount: () => markerCount,
    resetMarkerCount: () => {
      markerCount = 0;
    },
  };
});

vi.mock('leaflet', () => ({
  Icon: leaflet.Icon,
  Marker: leaflet.Marker,
  LayerGroup: leaflet.LayerGroup,
  TileLayer: leaflet.TileLayer,
  Map: leaflet.Map,
}));

describe('Component: Map', () => {
  beforeEach(() => {
    leaflet.setIcon.mockClear();
    leaflet.addTo.mockClear();
    leaflet.resetMarkerCount();
  });

  it('should render a map section and a marker for every offer', () => {
    const offer = makeFakeOffer('first');
    const anotherOffer = makeFakeOffer('second');
    const {container} = render(
      <Map city={offer.city} offers={[offer, anotherOffer]} />,
    );

    expect(container.querySelector('section')).toHaveClass('cities__map');
    expect(leaflet.getMarkerCount()).toBe(2);
    expect(leaflet.addTo).toHaveBeenCalledTimes(2);
  });

  it('should use the active icon for the selected offer', () => {
    const offer = makeFakeOffer('first');
    const anotherOffer = makeFakeOffer('second');

    render(
      <Map
        city={offer.city}
        offers={[offer, anotherOffer]}
        selectedOfferId={offer.id}
      />,
    );

    const calls = leaflet.setIcon.mock.calls as {options: {iconUrl: string}}[][];
    const iconUrls = calls.map((call) => call[0].options.iconUrl);

    expect(iconUrls).toContain('/img/pin-active.svg');
    expect(iconUrls).toContain('/img/pin.svg');
  });
});
