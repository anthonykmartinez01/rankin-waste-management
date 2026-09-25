// src/components/ServiceAreaMap.tsx
//
// Service-area map: one shaded zone per county we serve (brand orange
// shades, edges meeting on real county lines) with a dot for every served
// town. Modeled on the zoned "pickup map" style. OpenStreetMap basemap,
// darkened to the site theme by .rw-dark-tiles in global.css.
//
// Data: src/data/serviceArea.ts (towns + precomputed zone outlines). The
// homepage town list and the hub page cards read the same file.
//
// Consumers (client:visible so the leaflet chunk + CSS only download once
// the section scrolls into view):
//   - src/pages/index.astro               (Areas We Serve section)
//   - src/pages/service-areas/index.astro (hub page)

import { useEffect, useState } from 'react';
import { SERVICE_TOWNS, SERVICE_ZONES, type ServedCounty } from '../data/serviceArea';

type ReactLeaflet = typeof import('react-leaflet');
type LatLng = [number, number];

// Brand palette only (tokens from global.css). Hill borders all four other
// zones, so it gets the boldest orange (also marks Hubbard's home county)
// and every neighbor a clearly lighter shade.
const ZONE_COLOR: Record<ServedCounty, string> = {
  Hill: '#E8751A',      // orange-500 (home county)
  McLennan: '#FDDBB3',  // orange-100
  Navarro: '#F6A84E',   // orange-300
  Limestone: '#F59E0B', // star amber
  Bosque: '#FFF3E8',    // orange-50
};
const ZONE_FILL: Record<ServedCounty, number> = {
  Hill: 0.42, McLennan: 0.28, Navarro: 0.32, Limestone: 0.32, Bosque: 0.24,
};

// Label side per town (default right). Only where a label would collide.
const LABEL_LEFT = new Set(['Navarro Mills']);

// GeoJSON is [lng, lat]; Leaflet wants [lat, lng].
const flip = (ring: number[][]): LatLng[] => ring.map(([lng, lat]) => [lat, lng]);
const ZONES = SERVICE_ZONES.map((z) => ({
  county: z.county,
  positions: z.geometry.type === 'Polygon'
    ? z.geometry.coordinates.map(flip)
    : z.geometry.coordinates.map((poly) => poly.map(flip)),
}));

// Frame the whole shaded region (not just the town dots).
const MAP_BOUNDS: [LatLng, LatLng] = (() => {
  let s = 90, w = 180, n = -90, e = -180;
  const visit = (c: unknown): void => {
    if (Array.isArray(c) && typeof c[0] === 'number') {
      const [lng, lat] = c as number[];
      s = Math.min(s, lat); n = Math.max(n, lat); w = Math.min(w, lng); e = Math.max(e, lng);
    } else if (Array.isArray(c)) c.forEach(visit);
  };
  SERVICE_ZONES.forEach((z) => visit(z.geometry.coordinates));
  return [[s, w], [n, e]];
})();

const LEGEND_ORDER: ServedCounty[] = ['Hill', 'McLennan', 'Navarro', 'Limestone', 'Bosque'];

export default function ServiceAreaMap() {
  const [components, setComponents] = useState<ReactLeaflet | null>(null);
  // Touch devices: one-finger drags scroll the page instead of panning the
  // map (pinch-zoom still works), so the map never traps someone mid-scroll.
  const [isTouch, setIsTouch] = useState(false);
  // Narrow screens: 23 permanent labels would pile up, so only Hubbard stays
  // labeled; zones show their county on tap. The full town list sits right
  // above the map on both consumer pages.
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
  const { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip } = components;
  // react-leaflet v5 typing gap: `permanent` (Tooltip) is accepted at runtime
  // but not declared on the public Props interface.
  return (
    <div className="relative w-full h-full">
      <MapContainer
        bounds={MAP_BOUNDS}
        // Phones: reserve a band at the bottom for the legend so it never
        // covers a zone, and drop the +/- control (pinch-zoom still works).
        boundsOptions={isCompact
          ? { paddingTopLeft: [10, 10], paddingBottomRight: [10, 146] }
          : { padding: [18, 18] }}
        zoomControl={!isCompact}
        zoomSnap={0.25}
        scrollWheelZoom={false}
        dragging={!isTouch}
        style={{ height: '100%', width: '100%', background: '#101010' }}
        attributionControl={false}
      >
        {/* OpenStreetMap standard tiles: free, no API key (CARTO's basemaps
            now return an "API KEY REQUIRED" placeholder). */}
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" className="rw-dark-tiles" maxZoom={19} />

        {ZONES.map((z) => (
          <Polygon
            key={z.county}
            positions={z.positions}
            pathOptions={{
              color: ZONE_COLOR[z.county],
              weight: 2,
              opacity: 0.95,
              fillColor: ZONE_COLOR[z.county],
              fillOpacity: ZONE_FILL[z.county],
              lineJoin: 'miter',
            }}
          >
            <Tooltip sticky className="rw-zone-tip">{z.county} County</Tooltip>
          </Polygon>
        ))}

        {SERVICE_TOWNS.map((t) => (
          <CircleMarker
            key={t.city}
            center={[t.lat, t.lng]}
            radius={t.homeBase ? 7 : 3.5}
            pathOptions={{
              color: t.homeBase ? '#FFFFFF' : '#101010',
              weight: t.homeBase ? 2.5 : 1.5,
              fillColor: t.homeBase ? '#E8751A' : '#FFF3E8',
              fillOpacity: 1,
            }}
          >
            <Tooltip
              // @ts-expect-error — react-leaflet v5 typing gap (see comment above)
              permanent={!isCompact || t.homeBase}
              direction={LABEL_LEFT.has(t.city) ? 'left' : 'right'}
              offset={[(t.homeBase ? 8 : 5) * (LABEL_LEFT.has(t.city) ? -1 : 1), 0]}
              className="service-area-label"
            >
              <span style={{ color: '#fff', fontWeight: t.homeBase ? 700 : 600, fontSize: t.homeBase ? '12px' : '11px', textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.8)' }}>
                {t.city}
              </span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend: bottom-left, clear of every zone. Two columns on phones so
          it fits the reserved band under the map. Non-interactive. */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded-lg border border-border-subtle bg-dark/85 px-3 py-2.5 backdrop-blur-sm sm:bottom-4 sm:left-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">Our Service Area</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1">
          {LEGEND_ORDER.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <span className="inline-block h-3 w-4 shrink-0 rounded-sm border" style={{ backgroundColor: `${ZONE_COLOR[c]}${Math.round(ZONE_FILL[c] * 255 + 25).toString(16)}`, borderColor: ZONE_COLOR[c] }}></span>
              <span className="text-[11px] text-text-muted">{c} County</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="inline-block size-3 shrink-0 rounded-full border-2 border-white bg-orange-500"></span>
            <span className="text-[11px] text-text-muted">Hubbard (home base)</span>
          </div>
        </div>
        {isCompact && (
          <p className="mt-1.5 text-[10px] text-text-muted">Tap a zone for its county</p>
        )}
      </div>

      {/* OpenStreetMap attribution (required by the OSM tile usage policy). */}
      <div className="absolute bottom-0 right-0 z-[500] bg-dark/80 px-1.5 py-0.5 text-[10px] leading-tight text-text-muted">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-white">&copy; OpenStreetMap contributors</a>
      </div>
    </div>
  );
}
