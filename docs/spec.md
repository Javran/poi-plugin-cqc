This document defines CQC format - a representation of fleet and LBAS composition for Kantai Collection
which can be stored as files.

# File Structure

The file extension is `.cqc.json`. File content is a single JSON Object that I call "CQC structure"
(see section `Data Structure` below).

As it's a strict subset of JSON, all constraints about JSON applies: `NaN`, `Infinity`, `undefined`, etc. are not representable.

# `CQC` structure

Unless explicitly stated, all fields are optional, which can either be a `null`, or not present at all.

```
{
  version: '0.0.1', // required
  hqLevel: <number>,
  name: <string>, // name of this composition
  desc: <string>, // description of this composition
  fleets: <Array of Fleet>,
  airbase: <Array of Squadron>,
}
```

## `Fleet` structure

```
{
  name: <string>, // fleet name
  ships: <Array of Ship>,
}
```

## `Ship` structure

```
{
  mstId: <int>, // required
  rstId: <int>, // rosterId of this ship
  level: <int>,
  luck: <int>,
  asw: <int>,
  hp: <int>, // maxhp
  slots: <Array of Equip>, // should not include extra slot
  exSlot: <Equip>,
}
```

## `Equip` structure

```
{
  mstId: <int>, // required
  rstId: <int>,
  ace: <int>, // number range: 0~7, must be integer
  imp: <int>, // number range: 0~10, must be integer
}
```

## `Squadron` structure

```
{
  name: <string>, // name of an airbase squadron,
  slots: <Array of Equip>,
}
```
