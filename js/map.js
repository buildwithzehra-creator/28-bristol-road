// ━━━━━━━━━━━━━━ MAP (Leaflet + OSRM routing) ━━━━━━━━━━━━━━
function initMap() {
  const propCoords = [42.3317, -71.2094];

  const map = L.map('map', {
    center: [42.3300, -71.2094],
    zoom: 14,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false,
    closePopupOnClick: false
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

  function makeLabelIcon(label, type) {
    return L.divIcon({
      className: '',
      html: `<div class="map-label-wrap ${type}"><div class="map-pin-dot"></div><span class="map-pin-name">${label}</span></div>`,
      iconSize: [0, 0], iconAnchor: [5, 5]
    });
  }

  const propMarker = L.marker(propCoords, { icon: makeLabelIcon('28 Bristol Rd', 'prop'), zIndexOffset: 100 })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Inter',sans-serif;padding:2px 0">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#B8924A;margin-bottom:7px">Pre-Construction</div>
        <div style="font-family:'Cormorant Garant',serif;font-size:18px;font-weight:400;color:#19180F;margin-bottom:3px;line-height:1.2">28 Bristol Road</div>
        <div style="font-size:11px;color:#6D6660;margin-bottom:10px">Newton, MA 02458</div>
        <div style="padding-top:10px;border-top:1px solid rgba(25,24,15,0.08);font-size:11px;color:#4A4440;letter-spacing:0.04em">
          7 BD &nbsp;·&nbsp; 6.5 BA &nbsp;·&nbsp; 5,400 SF &nbsp;·&nbsp; 0.38 ac
        </div>
      </div>
    `, { autoClose: false, closeOnClick: false, closeButton: false, maxWidth: 230, minWidth: 210, offset: L.point(0, -4) })
    .openPopup();

  const pois = [
    { label: 'Cabot Elementary',       coords: [42.3334,-71.2119], type: 'edu' },
    { label: 'Newton Country Day',     coords: [42.3274,-71.1997], type: 'edu' },
    { label: 'Newton South HS',        coords: [42.3234,-71.2005], type: 'edu' },
    { label: 'Harvard',                coords: [42.3744,-71.1169], type: 'edu' },
    { label: 'MIT',                    coords: [42.3601,-71.0942], type: 'edu' },
    { label: 'Newton Centre Village',  coords: [42.3296,-71.2047], type: 'shop' },
    { label: 'Stop & Shop',            coords: [42.3164,-71.2001], type: 'shop' },
    { label: 'Whole Foods',            coords: [42.3157,-71.2107], type: 'shop' },
    { label: 'Chestnut Hill Shopping', coords: [42.3381,-71.1703], type: 'shop' },
    { label: 'Newton Centre T',        coords: [42.3282,-71.1999], type: 'transit' },
    { label: 'Logan Airport',          coords: [42.3656,-71.0096], type: 'transit' },
    { label: 'South Station',          coords: [42.3554,-71.0640], type: 'transit' },
    { label: 'Downtown Boston',        coords: [42.3601,-71.0589], type: 'transit' },
  ];
  // Keep a reference to each POI marker so we can wire tap-to-route (mobile-friendly)
  const poiMarkers = pois.map(p => ({
    poi: p,
    marker: L.marker(p.coords, { icon: makeLabelIcon(p.label, p.type), riseOnHover: true }).addTo(map)
  }));

  let routeLayer = null;
  let activeItem = null;
  const routePanel  = document.getElementById('routePanel');
  const routeClose  = document.getElementById('routeClose');
  const routeName   = document.getElementById('routeName');
  const routeAddr   = document.getElementById('routeAddr');
  const timeDrive   = document.getElementById('timeDrive');
  const timeWalk    = document.getElementById('timeWalk');
  const timeBike    = document.getElementById('timeBike');

  function fmtMin(minutes) {
    const m = Math.round(minutes);
    return m >= 60 ? Math.floor(m / 60) + 'h ' + (m % 60) + 'm' : m + ' min';
  }

  async function fetchDrivingRoute(from, to) {
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    try {
      const r = await fetch(url);
      const d = await r.json();
      return d.routes?.[0] ?? null;
    } catch { return null; }
  }

  // OSRM public demo only reliably serves driving.
  // Walk: 5 km/h = 83 m/min. Bike: 16 km/h = 267 m/min.
  function walkMins(meters) { return meters / 83; }
  function bikeMins(meters) { return meters / 267; }

  function clearRoute() {
    if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
    routePanel.classList.remove('open');
    if (activeItem) { activeItem.classList.remove('active'); activeItem = null; }
    map.flyTo([42.3300, -71.2094], 14, { duration: 0.9, easeLinearity: 0.4 });
    setTimeout(() => propMarker.openPopup(), 950);
  }

  async function selectPOI(item) {
    if (activeItem && activeItem !== item) activeItem.classList.remove('active');
    if (activeItem === item) { clearRoute(); return; }

    activeItem = item;
    item.classList.add('active');

    const to = [+item.dataset.lat, +item.dataset.lng];
    routeName.textContent = item.dataset.name || item.querySelector('.prox-name').textContent;
    routeAddr.textContent = item.dataset.addr || '';

    [timeDrive, timeWalk, timeBike].forEach(el => {
      el.textContent = '…'; el.classList.add('loading');
    });
    routePanel.classList.add('open');
    propMarker.closePopup();

    const route = await fetchDrivingRoute(propCoords, to);
    if (activeItem !== item) return;

    if (route) {
      const distM = route.distance;
      const driveSecs = route.duration;

      timeDrive.textContent = fmtMin(driveSecs / 60);
      timeWalk.textContent  = fmtMin(walkMins(distM));
      timeBike.textContent  = fmtMin(bikeMins(distM));
      [timeDrive, timeWalk, timeBike].forEach(el => el.classList.remove('loading'));

      if (routeLayer) map.removeLayer(routeLayer);
      routeLayer = L.geoJSON(route.geometry, {
        style: { color: '#B8924A', weight: 3.5, opacity: 0.85, lineCap: 'round', lineJoin: 'round' }
      }).addTo(map);
      map.fitBounds(routeLayer.getBounds(), { padding: [52, 52], maxZoom: 15 });
    } else {
      [timeDrive, timeWalk, timeBike].forEach(el => { el.textContent = 'N/A'; el.classList.remove('loading'); });
    }
  }

  routeClose.addEventListener('click', clearRoute);

  const proxItems = [...document.querySelectorAll('.prox-item[data-lat]')];
  proxItems.forEach(item => {
    item.addEventListener('click', () => selectPOI(item));
  });

  // ── Tap a pin ON the map → same modal + route as the list (mobile-friendly) ──
  // The list is long on mobile and the map stays pinned at the top, so make the
  // markers themselves interactive: tapping one opens the route info panel
  // (name + drive/walk/bike) and draws the route from 28 Bristol Road.
  function findItemFor(coords) {
    return proxItems.find(it =>
      Math.abs(+it.dataset.lat - coords[0]) < 1e-4 &&
      Math.abs(+it.dataset.lng - coords[1]) < 1e-4
    );
  }
  poiMarkers.forEach(({ poi, marker }) => {
    const item = findItemFor(poi.coords);
    if (!item) return;
    marker.on('click', () => selectPOI(item));
    // Make the whole label a comfortable tap target and show it's clickable
    if (marker._icon) {
      marker._icon.style.cursor = 'pointer';
      marker._icon.classList.add('poi-clickable');
    }
  });

  // Ensure the labels receive taps even if a stylesheet set pointer-events:none
  const tapStyle = document.createElement('style');
  tapStyle.textContent =
    '.map-label-wrap{pointer-events:auto;cursor:pointer}' +
    '.map-pin-name,.map-pin-dot{pointer-events:auto}';
  document.head.appendChild(tapStyle);
}

if (window.L) { initMap(); }
else { document.querySelector('[src*="leaflet.js"]').addEventListener('load', initMap); }
