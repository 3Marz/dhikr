# Diker

## A small script to show a random dhikr/sunnah in your terminal

![](https://raw.githubusercontent.com/3Marz/dhikr/refs/heads/main/assets/screenshot.png)

## Instaltion :
```
npm i -g dhikr
```

# Usage :
```
dhiker [options]

Options:
  --ar            display in arabic (it well render incorctly in most terminal)
  --separator -s  the separator between the dhiker and the category of the dhiker, default '-'
```

## The Database :
the database used is a sqlite db, the actual contents of the database is
scraped from <a href="https://hisnmuslim.com/">hisn al muslim</a> here is the database schemes:
```
 ┌──────────────┐         ┌──────────────┐ 
 │    sunnan    │         │   category   │ 
 ├──────────────┤         ├──────────────┤ 
 │              │         │              │ 
 ├─sunnah_id    │    ┌───►├─id           │ 
 │              │    │    │              │ 
 ├─ar           │    │    ├─ar           │ 
 │              │    │    │              │ 
 ├─en           │    │    ├─en           │ 
 │              │    │    │              │ 
 ├─category_id  ├────┘    └──────────────┘ 
 │              │                          
 └──────────────┘                          
```
