import AMapLoader from '@amap/amap-jsapi-loader'

window._AMapSecurityConfig = {
  // 设置安全密钥
  securityJsCode: import.meta.env.VITE_APP_AMAP_SECURITY_KEY,
};

export default function useAMap(
  mapId = 'amap',
  plugins?: string[],
) {

  const initMap = async () => {
    const AMap = await AMapLoader.load({
      key: import.meta.env.VITE_APP_AMAP_KEY,
      version: '2.0',
      plugins,
      AMapUI: {
        version: '1.1',
        plugins: []
      },
      Loca: {
        version: '2.0.0'
      }
    })

    const map = new AMap.Map(mapId, {
      center: JSON.parse(import.meta.env.VITE_APP_MAP_CENTER),
      zoom: import.meta.env.VITE_APP_MAP_ZOOM
    })

    return {
      mapValue: toRef(map),
      AMapValue: toRef(AMap)
    }
  }

  return {
    initMap
  }
}