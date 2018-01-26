#!/usr/bin/env node

const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = 'https://www.atlasobscura.com/places/musee-fragonard'

const fetchPlaceDetails = (place) => {
    console.log(`loading row ${place.id} @ ${place.url}`)
    fetch(place.url)
        .then(response => response.text())
        .catch(() => {
            console.warn(`failed to load ${url}`)
        })
        .then(data => {
            const $ = cheerio.load(data)
            const updateData = {}
            updateData.been_here = parseInt($('.js-been-to-top-wrap .item-action-count').first().text(), 10)
            updateData.want_to_visit = parseInt($('.js-like-top-wrap .item-action-count').first().text(), 10)
            updateData.tags = $('.item-tags a').map(function() {
                return $(this).text()
            }).get().join(',')
            updateData.tags = `'${updateData.tags.replace(/'/gi, '\'\'')}'`
            const updateDataSql = Object.keys(updateData).map(p => `${p} = ${updateData[p]} `)
            //console.log(updateData)
            //console.log(updateDataSql)
            const sql = `UPDATE places SET ${updateDataSql} where id = ${place.id}`
            console.log(place.id, sql)
            db.run(sql, [], (e) => {
                if (e) {
                    console.log(sql)
                    console.log(e, this)
                }
            })
        })

}

let i = 0
let i_max
const START = 25181
const MAX = 25183

let interval

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/places.db')
const sql = `SELECT * FROM places WHERE id >= ${START} AND id <= ${MAX}`

db.serialize()

db.all(sql, (e, rows) => {
    i_max = rows.length - 1
    console.log(`${i_max} rows found`)
    interval = setInterval(() => {
        if (i_max >= MAX) {
            clearInterval(interval)
        }
        const place = rows[i]

        fetchPlaceDetails(place)
        i++
    }, 1000)
})

