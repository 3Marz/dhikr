#!/usr/bin/env node  
import sqlite3 from "sqlite3"
import meow from "meow"
const {Database} = sqlite3

const db = new Database("./dhiker.db") 

type Lang = "ar" | "en"
type Sunnah = {
	sunnah_id: number
	ar: string
	en: string
	category_id: number
}
type Category = {
	id: number
	ar: string
	en: string
}

type Flags = {
	ar: boolean
	separator: string
}

const cli = meow(`
A small script to show a random sunnah/dhiker

Usage:
  dhiker [options]

Options:
  --ar            display in arabic (it well render incorctly in most terminal)
  --separator -s  the separator between the dhiker and the category of the dhiker, default '-'
`,
	{
		importMeta: import.meta,
		flags: {
			ar: {
				type: "boolean",
				default: false
			},
			separator: {
				type: "string",
				shortFlag: "s",
				default: "-"
			}
		}
})

let sunnah: Sunnah;
let category: Category;
db.each('SELECT * FROM sunnan ORDER BY RANDOM() LIMIT 1', (err, row: Sunnah) => {
	if(err) { console.error(err); return; }
	sunnah = row
}, (err) => {
		if(err) {console.error(err); return}
		db.each(`SELECT * FROM category WHERE id=${sunnah.category_id}`, (err, row: Category) => {
			if(err) { console.error(err); return; }
			category = row;
			displayZekker(sunnah, category, cli.flags)
		})
})


function displayZekker(sunnah: Sunnah, category: Category, flags: Flags) {
	let lang: Lang = flags.ar ? "ar" : "en"
	console.log("\x1b[1m"+category[lang])
	console.log("\x1b[30m"+flags.separator.repeat(category[lang].length/flags.separator.length))
	console.log("\x1b[39m"+"\x1b[22m"+sunnah[lang])
}

