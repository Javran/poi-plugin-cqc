import { fighterPowerClasses } from './fighter-power'

const Fleet = {
  allMethods: [],
}

// assume methodClass.name is the method name
const registerFleetMethod = methodClass => {
  const methodName = methodClass.name
  if (!methodName || typeof methodName !== 'string') {
    console.error(`invalid method name: ${methodName}`)
    return
  }

  if (Fleet.allMethods.includes(methodName)) {
    console.error(`method name ${methodName} has been registered, skipping`)
    return
  }

  Fleet.allMethods.push(methodName)
  Fleet[methodName] = methodClass
}

fighterPowerClasses.map(registerFleetMethod)

console.log(Fleet)

export { Fleet }
