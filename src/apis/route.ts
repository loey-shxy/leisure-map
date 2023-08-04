import { AppHttp } from '@/http/request';
import { handlerArrayData, handlerObjectData, handlerTableData } from '@/http/request-util';
import { FavoriteRoute } from '@/interface/route';
import { Paging } from '@/interface/common';

export const apiRouteList = async (
  params?: any, 
  loading = false
): Promise<Paging<FavoriteRoute>> => {
  return handlerTableData(
    await AppHttp.post({
      url: '/route/list',
      data: params,
      loading
    })
  )
}

export const apiFavoriteRouteList = async (
  params?: any, 
  loading = false
): Promise<Array<FavoriteRoute>> => {
  return handlerArrayData(
    await AppHttp.post({
      url: '/route/favorite',
      data: params,
      loading
    })
  )
}

export const apiRouteInfoById = async (
  params: { id: number },
  loading = true
): Promise<FavoriteRoute> => {
  return handlerObjectData(
    await AppHttp.post({
      url: '/route/favoriteInfoById',
      data: params,
      loading
    })
  )
}