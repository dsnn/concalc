export const Endpoints = {
  Settings: 'settings',
  Assignments: 'assignments'
} as const

export type EndpointsType = keyof typeof Endpoints

export const get = (key: string) => {
  const item = localStorage.getItem(key)
  if (!item) {
    console.error(`Api cant find item with key ${key}`)
    return null
  }
  return JSON.parse(item)
}

export const add = (key: string, data: any) => {
  const item = get(key)
  const json = JSON.stringify([data])
  if (!item) {
    localStorage.setItem(key, json)
  } else {
    const newData = item.concat(json)
    localStorage.setItem(key, newData)
  }
}

export const remove = (key: string) => {
  localStorage.removeItem(key)
}

export default {
  Endpoints,
  get,
  add,
  remove
}
