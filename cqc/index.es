import { Fleet } from './fleet'

/*

   TODO:

   Cqc.Fleet[<info>].compute(<CqcFleet>) should give a value
   sufficient to be displayed on UI.
   (Note that whenever a call happens, CqcFleet is guaranteed to be non-empty)

   Cqc.Fleet.allMethods: an Array of methods, info will be displayed respecting this order.

   Similarly we'll have:

   - Cqc.Squadron[<info>].compute(<CqcSquadron>)
   - Cqc.Squadron.allMethods

   for example:

   Cqc.Fleet["fighterPowerMin"].compute(<a Cqc Fleet structure>) = {min: XXX, max: XXX}

   TODO: note that cqc is not taking into account remaining planes,
   and we should somehow make this more clear on UI.

   TODO: part info needs to be implemented:
   fleet part info:

   - fighterPower{Min,Now,Max}: fighter power

       - postfix Min stands for no air proficiency
       - postfix Now stands for current FP
       - postfix Max stands for maximum air proficiency

   - f33: formula-33
   - tpRange: TP drain for A-rank and S-rank
   - levelSum: level sum of fleet members
   - losSum: Sum of LoS
   - antiSubSum: Sum of ASW
   - antiAirSum: Sum of AA

   airbase part info:

   - state: squadron state
   - radius: combat radius
   - fighterPower{Min,Now,Max}: same as that of fleet part
   - airDefensePower{Min,Now,Max}: air defense power

 */

const Cqc = {
  Fleet,
  Squadron: {
    allMethods: [],
  },
}

export { Cqc }
