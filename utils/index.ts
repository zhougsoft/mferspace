export const truncateAddress = (address: string): string => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

export const serializeJSON = (data: any): any => {
  return JSON.parse(JSON.stringify(data))
}

// returns true if value is a valid mfer id (is a number and is in range)
export const isValidMferId = (idInput: any) => {
  const inputNum = parseInt(idInput)
  return !isNaN(inputNum) && inputNum >= 0 && inputNum <= 10000
}
