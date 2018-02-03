#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/places.db')

const sql = 'SELECT * FROM places'

db.serialize()

const geoJSON = {
  'type': 'FeatureCollection',
  'features': []
}

db.all(sql, (e, rows) => {
  rows
    .filter(row =>
      row.url &&
      row.latitude &&
      row.longitude &&
      row.latitude > -90 && row.latitude < 90

    )
    .forEach(row => {
      const place = Object.assign({}, row)
      delete place.latitude
      delete place.longitude
      if (place.tags) {
        place.tags = place.tags.split(',')
      }

      geoJSON.features.push({
        'type': 'Feature',
        'properties': place,
        'geometry': {
          'type': 'Point',
          'coordinates': [
            row.longitude,
            row.latitude
          ]
        }
      })

    })
  process.stdout.write(JSON.stringify(geoJSON))
})
