This document defines composition representation used by CQC.

# File Structure

File extension is `.cqc.json`. File content is an Object encoded in JSON.

# Data Structure

An optional field can either be a `null`, or not present at all.
However, in runtime representation an optional field shall be guaranteed to exist
and assigned value `null` if it's not present.

```
{
  version: '0.0.1',
  name: <string>, // optional
  desc: <string>, // optional
  fleets: <Array of Fleet>, // optional
  airbase: <Array of Squadron>, // optional
}
```

## `Fleet` structure

```
{
  name: <string>, // optional
  ships: <Array of Ship>, // optional
}
```

## `Ship` structure

```
{
  mstId: <int>,
  rstId: <int>, // optional
  level: <int>, // optional
  luck: <int>, // optional
  asw: <int>, // optional
  hp: <int>, // optional
  slots: <Array of Equip>, // optional
  exSlot: <Equip>, // optional
}
```

## `Equip` structure

```
{
  mstId: <int>,
  rstId: <int>, // optional
  ace: <int>, // optional, 0~7
  imp: <int>, // optional 0~10
}
```

## `Squadron` structure

```
{
  name: <string>, // optional,
  slots: <Array of Equip>, // optional
}
```
