export interface FavoriteRoute {
  id: number
  name: string
  from: string
  to: string
  fromLocation: number[]
  toLocation: number[]
  pathway: Pathway[]
  favorite?: number
  [key: string]: any
}
export interface AddFavoriteRoute {
  name: string
  from: string
  to: string
  fromLocation: number[]
  toLocation: number[]
  [key: string]: any
}

export interface Pathway {
  id?: number
  name: string
  desc: string
  location: number[]
  [key: string]: any
}

export interface MapSearchResult {
  id: string
  name: string
  location: number[]
  address: string
  district: string
}