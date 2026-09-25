// src/data/serviceArea.ts
//
// SINGLE SOURCE OF TRUTH for where Rankin Waste Management serves. Read by:
//   - src/components/ServiceAreaMap.tsx   (zones + town dots)
//   - src/pages/index.astro               ("Areas We Serve" town list)
//   - src/pages/service-areas/index.astro ("Additional Communities" cards)
// Add or remove a town HERE and all three stay in sync.
//
// SERVICE_TOWNS: every town named anywhere on the site (homepage list +
// every /service-areas/* location page). Coordinates and counties were
// geocoded from OpenStreetMap/Nominatim on 2026-09-25. (The old map data
// had Birome, Mertens and Peoria plotted 23 to 33 km from their real spots.)
//
// SERVICE_ZONES: one shaded zone per served county, precomputed so the
// browser only downloads finished outlines (no geometry library at runtime):
//   coverage = union of each county's towns (convex hull) buffered 6 km
//   zone     = (coverage clipped to that county) + any buffer spill into
//              a county we do not serve
// 6 km is the smallest buffer that makes coverage ONE continuous area with
// no gaps (5 km leaves a gap). Zones meet exactly on real county lines.
// Waco, Mexia, Corsicana, Groesbeck and Mart stay outside; West and Bynum
// fall inside because they sit between served towns.
// To regenerate after adding a town, rerun the turf script (buffer 6 km,
// simplify 0.0015 deg, coords rounded to 4 decimals) and paste the output.

export type ServedCounty = 'Hill' | 'McLennan' | 'Navarro' | 'Limestone' | 'Bosque';

export interface ServiceTown {
  city: string;
  county: ServedCounty;
  lat: number;
  lng: number;
  /** Home base: drawn larger and always labeled. */
  homeBase?: boolean;
}

export const SERVICE_TOWNS: ServiceTown[] = [
  { city: 'Abbott', county: 'Hill', lat: 31.8899, lng: -97.0871 },
  { city: 'Aquilla', county: 'Hill', lat: 31.8518, lng: -97.218 },
  { city: 'Axtell', county: 'McLennan', lat: 31.658, lng: -96.9704 },
  { city: 'Birome', county: 'Hill', lat: 31.8132, lng: -96.9628 },
  { city: 'Dawson', county: 'Navarro', lat: 31.894, lng: -96.7147 },
  { city: 'Echols', county: 'Limestone', lat: 31.686, lng: -96.6375 },
  { city: 'Hillsboro', county: 'Hill', lat: 32.0109, lng: -97.1304 },
  { city: 'Hubbard', county: 'Hill', lat: 31.8476, lng: -96.7963, homeBase: true },
  { city: 'Kirk', county: 'Limestone', lat: 31.5871, lng: -96.728 },
  { city: 'Kopperl', county: 'Bosque', lat: 32.0699, lng: -97.5039 },
  { city: 'Laguna Park', county: 'Bosque', lat: 31.8593, lng: -97.3797 },
  { city: 'Leroy', county: 'McLennan', lat: 31.7316, lng: -97.0178 },
  { city: 'Malone', county: 'Hill', lat: 31.9179, lng: -96.8947 },
  { city: 'Mertens', county: 'Hill', lat: 32.0585, lng: -96.8967 },
  { city: 'Mount Calm', county: 'Hill', lat: 31.7563, lng: -96.8792 },
  { city: 'Navarro Mills', county: 'Navarro', lat: 31.9579, lng: -96.6822 },
  { city: 'Penelope', county: 'Hill', lat: 31.8602, lng: -96.9267 },
  { city: 'Peoria', county: 'Hill', lat: 31.9782, lng: -97.222 },
  { city: 'Prairie Hill', county: 'Limestone', lat: 31.6552, lng: -96.7889 },
  { city: 'Purdon', county: 'Navarro', lat: 31.9487, lng: -96.6163 },
  { city: 'Watt', county: 'Limestone', lat: 31.6438, lng: -96.8589 },
  { city: 'Whitney', county: 'Hill', lat: 31.9518, lng: -97.3214 },
  { city: 'Woodbury', county: 'Hill', lat: 32.0496, lng: -97.2308 },
];

export interface ServiceZone {
  county: ServedCounty;
  /** GeoJSON geometry, [lng, lat] order. */
  geometry: { type: 'Polygon'; coordinates: number[][][] } | { type: 'MultiPolygon'; coordinates: number[][][][] };
}

export const SERVICE_ZONES: ServiceZone[] = [
  { county: 'Hill', geometry: { type: 'MultiPolygon', coordinates: [[[[-97.492,32.1224],[-97.4855,32.1106],[-97.4707,32.095],[-97.4696,32.0891],[-97.4915,32.0623],[-97.4854,32.0417],[-97.4856,32.0172],[-97.4745,32.0099],[-97.4497,32.0122],[-97.4418,32.0145],[-97.4345,32.0261],[-97.4271,32.0291],[-97.4232,32.022],[-97.4217,32.0039],[-97.4062,31.988],[-97.3831,31.9856],[-97.447,32.0941],[-97.4563,32.1057],[-97.4688,32.1149],[-97.492,32.1224]]],[[[-97.4394,31.9298],[-97.4313,31.9245],[-97.4222,31.9229],[-97.4106,31.9087],[-97.3968,31.9095],[-97.3594,31.8899],[-97.3661,31.885],[-97.3829,31.8832],[-97.3855,31.8784],[-97.3815,31.8703],[-97.3558,31.862],[-97.3409,31.8531],[-97.3302,31.8417],[-97.319,31.8444],[-97.3163,31.856],[-97.3171,31.8659],[-97.2977,31.8471],[-97.2793,31.8414],[-97.2766,31.8338],[-97.2782,31.8283],[-97.253,31.8068],[-97.1922,31.7877],[-97.0372,31.8632],[-96.9323,31.7089],[-96.9349,31.7152],[-96.9252,31.7124],[-96.7678,31.7907],[-96.746,31.8146],[-96.7377,31.8267],[-96.7344,31.8371],[-96.8962,32.0738],[-96.8515,32.096],[-96.8686,32.1069],[-96.8832,32.1112],[-96.8986,32.1124],[-97.2329,32.1035],[-97.251,32.1008],[-97.2675,32.0937],[-97.2809,32.0829],[-97.3714,31.9851],[-97.382,31.9706],[-97.4067,31.9522],[-97.4285,31.9414],[-97.4378,31.9343],[-97.4394,31.9298]]]] } },
  { county: 'McLennan', geometry: { type: 'Polygon', coordinates: [[[-97.1922,31.7877],[-97.0747,31.7545],[-97.0787,31.7467],[-97.0812,31.7328],[-97.0794,31.7188],[-97.0734,31.7056],[-97.026,31.6321],[-97.0162,31.6207],[-97.0033,31.6119],[-96.9882,31.6062],[-96.9718,31.6041],[-96.9554,31.6056],[-96.94,31.6107],[-96.9266,31.619],[-96.9189,31.6271],[-96.9127,31.6153],[-96.9017,31.604],[-96.8876,31.5957],[-96.8373,31.5739],[-96.9089,31.6762],[-96.9105,31.6745],[-96.9199,31.6919],[-97.0372,31.8632],[-97.1922,31.7877]]] } },
  { county: 'Navarro', geometry: { type: 'Polygon', coordinates: [[[-96.8962,32.0738],[-96.7344,31.8371],[-96.7334,31.8429],[-96.7103,31.8402],[-96.6945,31.8429],[-96.6799,31.8489],[-96.5815,31.9035],[-96.5687,31.9129],[-96.5593,31.9248],[-96.5539,31.9384],[-96.5529,31.9527],[-96.5564,31.9667],[-96.5641,31.9795],[-96.5755,31.9901],[-96.5898,31.9977],[-96.606,32.0019],[-96.6719,32.0111],[-96.6887,32.0116],[-96.7051,32.0083],[-96.7198,32.0014],[-96.732,31.9915],[-96.7406,31.9793],[-96.7663,31.9286],[-96.8377,32.0787],[-96.8451,32.0902],[-96.8515,32.096],[-96.8962,32.0738]]] } },
  { county: 'Limestone', geometry: { type: 'MultiPolygon', coordinates: [[[[-96.9323,31.7089],[-96.9158,31.6855],[-96.9312,31.7094],[-96.9323,31.7089]]],[[[-96.9252,31.7124],[-96.8839,31.7025],[-96.8683,31.7031],[-96.8534,31.707],[-96.84,31.7139],[-96.829,31.7233],[-96.7678,31.7907],[-96.9252,31.7124]]],[[[-96.9091,31.676],[-96.8375,31.574],[-96.7567,31.539],[-96.7403,31.5342],[-96.7229,31.5333],[-96.7059,31.5365],[-96.6905,31.5436],[-96.678,31.5539],[-96.5875,31.6528],[-96.5789,31.6655],[-96.5745,31.6797],[-96.5748,31.6943],[-96.5798,31.7084],[-96.589,31.7208],[-96.6018,31.7306],[-96.6172,31.7371],[-96.6341,31.7399],[-96.6513,31.7387],[-96.8728,31.6964],[-96.8889,31.6913],[-96.9029,31.6827],[-96.9091,31.676]]]] } },
  { county: 'Bosque', geometry: { type: 'MultiPolygon', coordinates: [[[[-97.5675,32.0731],[-97.5663,32.059],[-97.5608,32.0457],[-97.4365,31.8352],[-97.4272,31.8235],[-97.4147,31.8143],[-97.3998,31.8081],[-97.3835,31.8054],[-97.367,31.8064],[-97.3513,31.811],[-97.3376,31.8189],[-97.3267,31.8295],[-97.319,31.8444],[-97.3302,31.8417],[-97.3409,31.8531],[-97.3558,31.862],[-97.369,31.8653],[-97.3841,31.8727],[-97.3855,31.8784],[-97.3829,31.8832],[-97.3661,31.885],[-97.3594,31.8899],[-97.3968,31.9095],[-97.4106,31.9087],[-97.4222,31.9229],[-97.4313,31.9245],[-97.4394,31.9298],[-97.4378,31.9343],[-97.4285,31.9414],[-97.4031,31.9543],[-97.382,31.9706],[-97.3777,31.9764],[-97.3832,31.9858],[-97.4062,31.988],[-97.4217,32.0039],[-97.4232,32.022],[-97.4271,32.0291],[-97.4345,32.0261],[-97.4418,32.0145],[-97.4497,32.0122],[-97.4745,32.0099],[-97.4856,32.0172],[-97.4854,32.0417],[-97.4915,32.0623],[-97.4696,32.0891],[-97.4707,32.095],[-97.4855,32.1106],[-97.492,32.1224],[-97.5167,32.1228],[-97.5324,32.1181],[-97.5462,32.1102],[-97.5571,32.0996],[-97.5643,32.0869],[-97.5675,32.0731]]],[[[-97.2977,31.8471],[-97.2782,31.8283],[-97.2766,31.8338],[-97.2793,31.8414],[-97.2977,31.8471]]]] } },
];
