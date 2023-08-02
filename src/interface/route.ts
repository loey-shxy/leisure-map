export interface FavoriteRoute {
  id: number;
  name: string
  from: string
  to: string
  collections: Collections[]
}

export interface Collections {
  id: number;
  county: string;
}

export interface AddRouteParams {
  name: string
  from: string
  to: string
  collections: Collections[]
}
