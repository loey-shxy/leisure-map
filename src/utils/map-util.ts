/**
 * @description 获取规划线路
 * @param start 开始点位
 * @param end 结束点位
 * @param map 地图实例
 * @returns 规划线路
 */
export const createDrivingRoute = (start: AMap.LngLat, end: AMap.LngLat, map?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const option = map ? { map, autoFitView: true } : undefined
    if (!window.AMap?.Driving) {
      reject()
    } else {
      const driving = new window.AMap.Driving(option)
      driving.search(start, end, (status: any, result: any) => {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result)
        } else {
          reject(result)
        }
      })
    }
  })
}

/**
 * @description 判断是否偏航
 * @param pos 
 * @param stepPaths 
 * @returns 
 */
export const detectYaw = async (pos: AMap.LngLatLike, stepPaths: AMap.LngLatLike[][]) => {
  const { minDistanceIndex, minDistance } = getMinDistanceAndIndexOfPointToLines(pos, stepPaths)

  const range = 20
  return { 
    isYaw: minDistance > range, 
    minDistanceIndex
  }
}

/**
 * @description 获取离当前点最近的path下标
 * @param position 当前点
 * @param paths 路径规划path数组
 * @returns minDistanceIndex 离当前点最近的path下标，minDistance 离点最近的距离
 */
export const getMinDistanceAndIndexOfPointToLines = (
  position: AMap.LngLatLike,
  paths: AMap.LngLatLike[][]
) => {
  let minDistance = Infinity
  let minDistanceIndex = -1

  paths.forEach((path: AMap.LngLatLike[], index: number) => {
    const distance = window.AMap.GeometryUtil.distanceToLine(position, path)
    if (distance < minDistance) {
      minDistance = distance
      minDistanceIndex = index
    }
  })

  return {
    minDistanceIndex,
    minDistance
  }
}

/**
 * @description 获取离当前点最近的点的下标
 * @param position 当前点
 * @param points 
 * @returns minDistanceIndex 离当前点最近的点的下标，minDistance 离点最近的距离
 */
export const getMinDistanceAndIndexOfPointToPoint = (
  position: AMap.LngLatLike,
  points: AMap.LngLatLike[]
) => {
  let minDistance = Infinity
  let minDistanceIndex = -1
  points.forEach((point: AMap.LngLatLike, index: number) => {
    const distance = window.AMap.GeometryUtil.distance(position, point)
    if (distance < minDistance) {
      minDistance = distance
      minDistanceIndex = index
    }
  })

  return {
    minDistanceIndex,
    minDistance
  }
}