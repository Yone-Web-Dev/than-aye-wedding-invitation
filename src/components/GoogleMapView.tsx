import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface GoogleMapViewProps {
  apiKey: string;
  lat: number;
  lng: number;
}

export default function GoogleMapView({ apiKey, lat, lng }: GoogleMapViewProps) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={{ lat, lng }}
        defaultZoom={17}
        mapId="WEDDING_MAP_ID"
        className="w-full h-full"
      >
        <AdvancedMarker position={{ lat, lng }}>
          <Pin background="#064e3b" glyphColor="#d4af37" borderColor="#d4af37" />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
