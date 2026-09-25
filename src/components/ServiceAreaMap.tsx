// src/components/ServiceAreaMap.tsx
//
// Leaflet-based service-area coverage map. OpenStreetMap basemap darkened
// to the site theme, with one brand-orange circle per town we serve plus
// city labels (permanent on wider screens, tap-to-show on phones).
//
// Consumers (client:visible so the heavy leaflet imports only load once
// the section scrolls into view):
//   - src/pages/index.astro               (Areas We Serve section)
//   - src/pages/service-areas/index.astro (hub page)
//
// SERVICE_AREAS is the single source of truth for the towns drawn on the
// map. The homepage town list and the hub page's card grids are authored
// separately today; keep them in sync when adding a town.
//
// Coordinates are town centroids geocoded from OpenStreetMap/Nominatim.
// The circles show approximate coverage around each town, NOT surveyed
// route boundaries — the caption at the consumer site says so.

import { useEffect, useState } from 'react';

type ReactLeaflet = typeof import('react-leaflet');

interface ServiceArea {
  city: string;
  state: string;
  county: string;
  desc: string;
  lat: number;
  lng: number;
  radius: number;
  /** Home base — drawn with a stronger fill so it reads as the hub. */
  homeBase?: boolean;
}

const SERVICE_AREAS: ServiceArea[] = [
  { city: 'Hubbard', state: 'TX', county: 'Hill County', desc: 'Our home base in Hill County. This is where Tommy and Sydney live and where Rankin Waste Management started.', lat: 31.8468, lng: -96.7978, radius: 6000, homeBase: true },
  { city: 'Aquilla', state: 'TX', county: 'Hill County', desc: 'Weekly curbside pickup for Aquilla households, with the same local, family-owned service our neighbors count on.', lat: 31.8518, lng: -97.218, radius: 4000 },
  { city: 'Axtell', state: 'TX', county: 'McLennan County', desc: 'One of our core service areas in McLennan County. Whether you are right off Highway 31 or further out on the county roads, we run weekly routes through Axtell and the surrounding area.', lat: 31.6721, lng: -96.9712, radius: 5000 },
  { city: 'Birome', state: 'TX', county: 'Hill County', desc: 'We cover Birome and the surrounding area in Hill County for weekly curbside collection.', lat: 31.99, lng: -96.83, radius: 4000 },
  { city: 'Dawson', state: 'TX', county: 'Navarro County', desc: 'We serve families and households throughout Dawson in Navarro County with the same reliable weekly pickup. Dawson is a small town that deserves dependable service, and that is exactly what we deliver.', lat: 31.8979, lng: -96.712, radius: 5000 },
  { city: 'Hillsboro', state: 'TX', county: 'Hill County', desc: 'Hillsboro is the Hill County seat, and we serve homes in and around town with reliable weekly pickup and flat-rate pricing.', lat: 32.0109, lng: -97.1304, radius: 6500 },
  { city: 'Kopperl', state: 'TX', county: 'Bosque County', desc: 'We run weekly residential pickup out to Kopperl in Bosque County, including the rural properties outside of town.', lat: 32.0699, lng: -97.5039, radius: 4500 },
  { city: 'Laguna Park', state: 'TX', county: 'Bosque County', desc: 'Laguna Park sits near Lake Whitney in Bosque County, and we provide weekly trash service to households throughout the area.', lat: 31.8593, lng: -97.3797, radius: 4500 },
  { city: 'Malone', state: 'TX', county: 'Hill County', desc: 'Malone sits right along Highway 31 between Hubbard and Waco, and we have got it covered. Weekly curbside collection for Malone residents who want a local company they can actually reach on the phone.', lat: 31.9168, lng: -96.89, radius: 4500 },
  { city: 'Mertens', state: 'TX', county: 'Hill County', desc: 'Just south of Hubbard in Hill County, Mertens is part of our regular weekly route.', lat: 31.7896, lng: -96.79, radius: 4000 },
  { city: 'Mount Calm', state: 'TX', county: 'Hill County', desc: 'We serve Mount Calm and the surrounding area with weekly trash collection. Located in Hill County between Hubbard and Waco.', lat: 31.759, lng: -96.8821, radius: 4000 },
  { city: 'Navarro Mills', state: 'TX', county: 'Navarro County', desc: 'Located near Navarro Mills Lake in Navarro County, we provide weekly pickup service to the Navarro Mills area.', lat: 31.95, lng: -96.69, radius: 4000 },
  { city: 'Peoria', state: 'TX', county: 'Hill County', desc: 'Peoria sits in Hill County along FM 1304, and we run routes out that way for weekly residential pickup.', lat: 31.8321, lng: -96.915, radius: 4000 },
  { city: 'Prairie Hill', state: 'TX', county: 'Limestone County', desc: 'Prairie Hill is on our route for weekly trash pickup in Limestone County. Rural service is what we do. No road is too far off the beaten path.', lat: 31.6607, lng: -96.7998, radius: 4500 },
  { city: 'Purdon', state: 'TX', county: 'Navarro County', desc: 'Purdon is a tight-knit Navarro County community, and we are proud to serve the families out there with affordable weekly pickup.', lat: 31.9468, lng: -96.6181, radius: 4000 },
  { city: 'Whitney', state: 'TX', county: 'Hill County', desc: 'One of our service areas in Hill County, right near Lake Whitney. We provide weekly pickup to Whitney residents who prefer a local, family-owned company over the big national haulers.', lat: 31.9512, lng: -97.3212, radius: 5500 },
  { city: 'Woodbury', state: 'TX', county: 'Hill County', desc: 'We cover Woodbury and the surrounding Hill County countryside with dependable weekly trash collection.', lat: 32.0496, lng: -97.2308, radius: 4000 },
];

// Framing: the map fits itself to the bounding box of every circle above
// (each town's centroid pushed out by its radius), so it frames correctly
// at any container size and adding a town needs no manual re-centering.
const METERS_PER_DEG_LAT = 111_320;
const MAP_BOUNDS: [[number, number], [number, number]] = SERVICE_AREAS.reduce<[[number, number], [number, number]]>(
  ([[s, w], [n, e]], a) => {
    const dLat = a.radius / METERS_PER_DEG_LAT;
    const dLng = a.radius / (METERS_PER_DEG_LAT * Math.cos((a.lat * Math.PI) / 180));
    return [
      [Math.min(s, a.lat - dLat), Math.min(w, a.lng - dLng)],
      [Math.max(n, a.lat + dLat), Math.max(e, a.lng + dLng)],
    ];
  },
  [[Infinity, Infinity], [-Infinity, -Infinity]],
);

export default function ServiceAreaMap() {
  const [components, setComponents] = useState<ReactLeaflet | null>(null);
  // Touch devices: one-finger drags scroll the page instead of panning the
  // map (pinch-zoom still works), so the map never traps someone mid-scroll.
  const [isTouch, setIsTouch] = useState(false);
  // Narrow screens: 17 permanent labels pile on top of each other, so only
  // Hubbard stays labeled and the rest show on tap. The town list sits right
  // above the map on both consumer pages, so nothing is lost.
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    setIsCompact(window.matchMedia('(max-width: 639px)').matches);
    Promise.all([
      import('react-leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([leaflet]) => {
      setComponents(leaflet);
    });
  }, []);

  if (!components) return <div className="w-full h-full bg-dark-card animate-pulse" />;
  const { MapContainer, TileLayer, Circle, Tooltip } = components;
  // react-leaflet v5 typing gap: `radius` (Circle) and `permanent` (Tooltip)
  // are accepted at runtime but not declared on the public Props
  // interfaces. @ts-expect-error directives below mark the exact lines
  // where the typing gap manifests.
  return (
    <div className="relative w-full h-full">
      <MapContainer
        bounds={MAP_BOUNDS}
        // Phones: reserve a band at the bottom so the legend never sits on a
        // circle, and drop the +/- control (it covers Kopperl in the NW
        // corner; pinch-zoom still works).
        boundsOptions={isCompact
          ? { paddingTopLeft: [12, 12], paddingBottomRight: [12, 88] }
          : { padding: [16, 16] }}
        zoomControl={!isCompact}
        zoomSnap={0.25}
        scrollWheelZoom={false}
        dragging={!isTouch}
        style={{ height: '100%', width: '100%', background: '#101010' }}
        attributionControl={false}
      >
        {/* OpenStreetMap standard tiles: free, no API key (CARTO's basemaps
            now return an "API KEY REQUIRED" placeholder). Darkened to the
            site theme by the .rw-dark-tiles filter in global.css; the filter
            only touches the tile layer, so the orange circles stay true. */}
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" className="rw-dark-tiles" maxZoom={19} />
        {SERVICE_AREAS.map(area => (
          <Circle
            key={area.city}
            center={[area.lat, area.lng]}
            // @ts-expect-error — react-leaflet v5 typing gap (see comment above)
            radius={area.radius}
            pathOptions={{
              color: '#E8751A',
              fillColor: area.homeBase ? '#F6A84E' : '#E8751A',
              fillOpacity: area.homeBase ? 0.45 : 0.22,
              weight: area.homeBase ? 3 : 2,
              opacity: area.homeBase ? 1 : 0.85,
            }}
          >
            <Tooltip
              // @ts-expect-error — react-leaflet v5 typing gap (see comment above)
              permanent={!isCompact || area.homeBase}
              direction="center"
              className="service-area-label"
            >
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '11px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                {area.city}
              </span>
            </Tooltip>
          </Circle>
        ))}
      </MapContainer>

      {/* Legend: bottom-left, the one corner with no towns under it (top-left
          would cover Kopperl). Brand-styled, non-interactive. */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded-lg border border-border-subtle bg-dark/85 px-3 py-2.5 backdrop-blur-sm sm:bottom-4 sm:left-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">Our Coverage</p>
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 shrink-0 rounded-full border-2 border-orange-500 bg-orange-300/50"></span>
          <span className="text-[11px] text-text-muted">Hubbard (home base)</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-block size-3 shrink-0 rounded-full border-2 border-orange-500 bg-orange-500/25"></span>
          <span className="text-[11px] text-text-muted">Towns we serve weekly</span>
        </div>
        {isCompact && (
          <p className="mt-1.5 text-[10px] text-text-muted">Tap a circle for the town name</p>
        )}
      </div>

      {/* OpenStreetMap attribution (required by the OSM tile usage policy). */}
      <div className="absolute bottom-0 right-0 z-[500] bg-dark/80 px-1.5 py-0.5 text-[10px] leading-tight text-text-muted">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-text-muted">&copy; OpenStreetMap contributors</a>
      </div>
    </div>
  );
}
