export interface Constants {
  [key: string]: {
    l: string
    v: string | number
  }
}

export interface Paging<T> {
  total: number
  list: Array<T>
  [propName: string]: any
}

export interface PagingQuery {
  pageSize?: number
  pageNum?: number
  [propName: string]: any
}