export const truncateAddress = (address: string): string => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

export const serializeJSON = (data: any): any => {
  return JSON.parse(JSON.stringify(data))
}

const getUrlRouteParams = (url: string) =>
  new URL(url).pathname.split('/').filter(x => x !== '')

// returns true if value is a valid mfer id (is a number and is in range)
export const isValidMferId = (idInput: any) => {
  const inputNum = parseInt(idInput)

  return !isNaN(inputNum) && inputNum >= 0 && inputNum <= 10020
}

// returns true if value is a valid Soundcloud link
export const isValidSoundCloudLink = (url: string): boolean => {
  return Boolean(url.match(/^https:\/\/soundcloud\.com\//) || false)
}

// strips query strings and formats soundcloud link
export const cleanSoundCloudLink = (url: string) => {
  const params = getUrlRouteParams(url)
  return `https://soundcloud.com/${params[0]}/${params[1]}`
}

// generate a pseudo-random value to be used for react component keys
export const makeRandomKey = () => {
  return `${Math.floor(Math.random() * 1000000)}-${Date.now()}`
}
