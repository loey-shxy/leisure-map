import { AppHttp } from '@/http/request';
import { handlerTableData } from '@/http/request-util';
import { FavoriteRoute } from '@/interface/route';
import { Paging } from '@/interface/common';

export const apiFavoriteRouteList = async (
  params?: any, 
  loading = false
): Promise<Paging<FavoriteRoute>> => {
  return handlerTableData(
    await AppHttp.get({
      url: '/route/favorite',
      data: params,
      loading
    })
  )
}
