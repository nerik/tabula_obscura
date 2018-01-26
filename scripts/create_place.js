#!/usr/bin/env node

const fetch = require('node-fetch')
const fs = require('fs')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/places.db')


// const sqlCreate = `CREATE TABLE IF NOT EXISTS "places" (
//     "id" integer PRIMARY KEY NOT NULL,
//     "latitude" float(128),
//     "longitude" float(128),
//     "title" varchar(128),
//     "subtitle" varchar(128),
//     "url" varchar(128),
//     "city" varchar(128),
//     "country" varchar(128),
//     "location" varchar(128),
//     "thumbnail_url" varchar(128),
//     "thumbnail_url_3x2" varchar(128),
//     "tags" varchar(128),
//     "been_here" integer(128),
//     "want_to_visit" integer(128)
// )`
//db.run(sqlCreate)

db.serialize()

const COLS = ['id', 'title', 'subtitle', 'url', 'city', 'country', 'location', 'thumbnail_url', 'thumbnail_url_3x2']

// fs.readdirSync('./data/places').forEach(f => {
//   const json = fs.readFileSync(`./data/places/${f}`, 'utf-8')
//   const place = JSON.parse(json)
// })



const writePlace = (place) => {
    const sqlValues = {}
    COLS.forEach(c => {
        sqlValues[c] = `'${place[c]}'`
        if (typeof place[c] === 'string')  {
            sqlValues[c] = `'${place[c].replace(/'/gi, '\'\'')}'`
        }
    })

    sqlValues.latitude = place.coordinates.lat
    sqlValues.longitude = place.coordinates.lng
    const sql = `INSERT INTO places (${Object.keys(sqlValues).join(', ')}) VALUES (${Object.values(sqlValues).join(', ')})`
    db.run(sql, [], (e) => {
        if (e) {
            console.log(sql)
            console.log(e, this)
        }
    })
}

const fetchPlace = (i) => {
    fetch(`https://www.atlasobscura.com/places/${i}.json`)
        .then(response => response.json())
        .catch(() => {
            console.warn(`failed to load ${i}`)
        })
        .then(data => {
            if (data !== undefined) {
                console.warn(`success loading ${i}`)
                writePlace(data)
                fs.writeFileSync(`data/places/${i}.json`, JSON.stringify(data))
            }
        })
}


let i = 25183
const MAX = 50000

const interval = setInterval(() => {
    if (i >= MAX) {
        clearInterval(interval)
    }
    fetchPlace(i)
    i++
}, 1000)

