/*
   mode must be one of the following: "min", "now", "max"
 */
const mkFighterPowerClass = mode => {
  /* eslint-disable indent */
  const name = mode === "min" ? "fighterPowerMin"
    : mode === "max" ? "fighterPowerMax"
    : mode === "now" ? "fighterPowerNow"
    : console.error(`invalid mode: ${mode}`)
  /* eslint-enable indent */

  const compute = fleet => 'TODO'

  return {name, compute}
}

const fighterPowerClasses = ["min", "now", "max"].map(mkFighterPowerClass)

export {
  fighterPowerClasses,
}
