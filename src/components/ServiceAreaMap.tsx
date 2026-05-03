// src/components/ServiceAreaMap.tsx
//
// Leaflet-based service-area map. Byte-identical port of pre-migration
// LazyMap component (src/App.jsx:587-634) and SERVICE_AREAS data
// (src/App.jsx:120-133).
//
// DEAD CODE STATUS:
//   Pre-migration parent <ServiceAreas /> was defined in App.jsx but
//   never rendered anywhere on master. This island is preserved per
//   "no improvements" rule but is not yet wired into any page. The
//   leaflet + leaflet-css dynamic imports only fire if/when a page
//   actually mounts <ServiceAreaMap client:visible />.
//
// SERVICE_AREAS data: inlined here because pre-migration the constant
// lived in src/App.jsx (now deleted) and no other module references
// it. Inlining matches the new file structure with byte-identical data.
// If a future page wires this component up, extracting to
// src/data/serviceAreas.ts becomes the right move (logged separately).
//
// Hydration: <ServiceAreaMap client:visible /> at the consumer site
// (none today). client:visible defers heavy leaflet imports until the
// section scrolls into view.

import { useEffect, useState } from 'react';

type ReactLeaflet = typeof import('react-leaflet');

interface ServiceArea {
  city: string;
  state: string;
  desc: string;
  lat: number;
  lng: number;
  radius: number;
}

const SERVICE_AREAS: ServiceArea[] = [
  { city: 'Hubbard', state: 'TX', desc: 'Our home base in Hill County. This is where Tommy and Sydney live and where Rankin Waste Management started.', lat: 31.8468, lng: -96.7978, radius: 6000 },
  { city: 'Axtell', state: 'TX', desc: 'One of our core service areas in McLennan County. Whether you\'re right off Highway 31 or further out on the county roads, we run weekly routes through Axtell and the surrounding area.', lat: 31.6721, lng: -96.9712, radius: 5000 },
  { city: 'Dawson', state: 'TX', desc: 'We serve families and households throughout Dawson in Navarro County with the same reliable weekly pickup. Dawson\'s a small town that deserves dependable service, and that\'s exactly what we deliver.', lat: 31.8979, lng: -96.7120, radius: 5000 },
  { city: 'Malone', state: 'TX', desc: 'Malone sits right along Highway 31 between Hubbard and Waco, and we\'ve got it covered. Weekly curbside collection for Malone residents who want a local company they can actually reach on the phone.', lat: 31.9168, lng: -96.8900, radius: 4500 },
  { city: 'Purdon', state: 'TX', desc: 'Purdon is a tight-knit Navarro County community, and we\'re proud to serve the families out there with affordable weekly pickup.', lat: 31.9468, lng: -96.6181, radius: 4000 },
  { city: 'Mertens', state: 'TX', desc: 'Just south of Hubbard in Hill County, Mertens is part of our regular weekly route.', lat: 31.7896, lng: -96.7900, radius: 4000 },
  { city: 'Whitney', state: 'TX', desc: 'One of our service areas in Hill County, right near Lake Whitney. We provide weekly pickup to Whitney residents who prefer a local, family-owned company over the big national haulers.', lat: 31.9512, lng: -97.3212, radius: 5500 },
  { city: 'Mount Calm', state: 'TX', desc: 'We serve Mount Calm and the surrounding area with weekly trash collection. Located in Hill County between Hubbard and Waco.', lat: 31.7590, lng: -96.8821, radius: 4000 },
  { city: 'Peoria', state: 'TX', desc: 'Peoria sits in Hill County along FM 1304, and we run routes out that way for weekly residential pickup.', lat: 31.8321, lng: -96.9150, radius: 4000 },
  { city: 'Birome', state: 'TX', desc: 'We cover Birome and the surrounding area in Hill County for weekly curbside collection.', lat: 31.9900, lng: -96.8300, radius: 4000 },
  { city: 'Prairie Hill', state: 'TX', desc: 'Prairie Hill is on our route for weekly trash pickup in Limestone County. Rural service is what we do. No road is too far off the beaten path.', lat: 31.6607, lng: -96.7998, radius: 4500 },
  { city: 'Navarro Mills', state: 'TX', desc: 'Located near Navarro Mills Lake in Navarro County, we provide weekly pickup service to the Navarro Mills area.', lat: 31.9500, lng: -96.6900, radius: 4000 },
];

interface ServiceAreaMapProps {
  isMobile?: boolean;
}

export default function ServiceAreaMap({ isMobile = false }: ServiceAreaMapProps) {
  const [components, setComponents] = useState<ReactLeaflet | null>(null);

  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([leaflet]) => {
      setComponents(leaflet);
    });
  }, []);

  if (!components) return <div className="w-full h-full bg-dark-card animate-pulse" />;
  const { MapContainer, TileLayer, Circle, Tooltip } = components;
  // react-leaflet v5 typing gap: `center` (MapContainer), `radius` (Circle),
  // and `permanent` (Tooltip) are accepted at runtime but not declared on
  // the public Props interfaces. Pre-migration .jsx skipped type-checking
  // so this never surfaced. @ts-expect-error directives below mark the
  // exact lines where the typing gap manifests.
  return (
    <MapContainer
      // @ts-expect-error — react-leaflet v5 typing gap (see comment above)
      center={isMobile ? [31.82, -96.85] : [31.84, -96.85]}
      zoom={isMobile ? 8.5 : 10}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {SERVICE_AREAS.map(area => (
        <Circle
          key={area.city}
          center={[area.lat, area.lng]}
          // @ts-expect-error — react-leaflet v5 typing gap (see comment above)
          radius={area.radius}
          pathOptions={{
            color: '#E8751A',
            fillColor: '#E8751A',
            fillOpacity: 0.2,
            weight: 2,
            opacity: 0.8,
          }}
        >
          <Tooltip
            // @ts-expect-error — react-leaflet v5 typing gap (see comment above)
            permanent
            direction="center"
            className="service-area-label"
          >
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '11px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {area.city}
            </span>
          </Tooltip>
        </Circle>
      ))}
    </MapContainer>
  );
}
