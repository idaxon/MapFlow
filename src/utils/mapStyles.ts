import type { StyleSpecification } from 'maplibre-gl';
import type { MapLayerType } from '../types';

export function getMapStyle(layer: MapLayerType): StyleSpecification {
  switch (layer) {
    case 'satellite':
      return {
        version: 8,
        sources: {
          'satellite-tiles': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            attribution:
              'Tiles &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community',
          },
          'satellite-reference': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'satellite-base-layer',
            type: 'raster',
            source: 'satellite-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
          {
            id: 'satellite-ref-layer',
            type: 'raster',
            source: 'satellite-reference',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      };

    case 'streets':
      return {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      };

    case 'terrain':
      return {
        version: 8,
        sources: {
          'topo-tiles': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            attribution:
              'Tiles &copy; Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
          },
        },
        layers: [
          {
            id: 'topo-layer',
            type: 'raster',
            source: 'topo-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      };

    case 'dark':
    default:
      return {
        version: 8,
        sources: {
          'esri-dark-base': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            attribution:
              'Tiles &copy; Esri, DeLorme, NAVTEQ &mdash; OpenStreetMap & Esri Contributors',
          },
          'esri-dark-reference': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'esri-dark-base-layer',
            type: 'raster',
            source: 'esri-dark-base',
            minzoom: 0,
            maxzoom: 18,
          },
          {
            id: 'esri-dark-ref-layer',
            type: 'raster',
            source: 'esri-dark-reference',
            minzoom: 0,
            maxzoom: 18,
          },
        ],
      };
  }
}
