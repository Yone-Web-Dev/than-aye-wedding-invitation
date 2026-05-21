import { lazy, Suspense } from 'react';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { VENUE_LAT, VENUE_LNG, VENUE_MAPS_URL } from '../config';

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${VENUE_LAT},${VENUE_LNG}&hl=en&z=17&output=embed`;

const GoogleMapView = lazy(() => import('./GoogleMapView'));

interface VenueMapProps {
  apiKey: string;
}

export default function VenueMap({ apiKey }: VenueMapProps) {
  const hasValidKey = Boolean(apiKey);

  return (
    <div className="gold-frame w-full">
      <div className="gold-frame-inner relative aspect-[4/3] sm:aspect-square lg:aspect-video min-h-[260px] sm:min-h-[280px]">
        {hasValidKey ? (
          <Suspense
            fallback={
              <div className="w-full h-full bg-emerald-900/60 flex items-center justify-center">
                <p className="font-display text-[10px] text-gold/50 tracking-widest uppercase">Loading map…</p>
              </div>
            }
          >
            <GoogleMapView apiKey={apiKey} lat={VENUE_LAT} lng={VENUE_LNG} />
          </Suspense>
        ) : (
          <iframe
            title="Wedding venue location"
            src={MAP_EMBED_URL}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
      <a
        href={VENUE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 py-3 font-display text-[10px] text-gold tracking-[0.3em] uppercase hover:text-gold-light transition-colors"
      >
        <MapPin size={14} />
        Open in Google Maps
      </a>
    </div>
  );
}

/** Placeholder export for map fallback icon reuse */
export function MapPlaceholder() {
  return <MapIcon size={48} className="text-gold/20" />;
}
