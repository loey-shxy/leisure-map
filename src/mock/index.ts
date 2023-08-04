export default [
  {
    url: '/route/list',
    method: 'post',
    response: () => ({
      code: '200',
      data: {
        total: 2,
        list: [
          {
            id: 1,
            name: '贵州看瀑布',
            from: '重庆渝北区',
            fromLocation: [106.486389,29.661781],
            to: '贵州西江千户苗寨',
            toLocation: [108.173598,26.495065],
            favorite: 1,
            pathway: [
              {
                id: 1,
                name: '赤水丹霞瀑布',
                desc: '。。。。。。',
                location: [105.744206,28.3557]
              },
              
              {
                id: 2,
                name: '贵阳黔灵山公园',
                desc: '',
                location: [106.693432,26.597816]
              },
              {
                id: 3,
                name: '黄果树大瀑布',
                desc: '',
                location: [105.669102,25.989377]
              },
              {
                id: 4,
                name: '小七孔',
                desc: '',
                location: [107.705723,25.252959]
              },
            ]
          },
          {
            id: 2,
            name: '湖北恩施大峡谷',
            from: '重庆渝北区',
            fromLocation: [106.486389,29.661781],
            to: '湖北恩施大峡谷',
            toLocation: [109.178306,30.425864],
            favorite: 0,
            pathway: [
              {
                id: 5,
                name: '涪陵美心红酒小镇',
                desc: '。。。。。。',
                location: [107.18541,29.662344]
              },
              {
                id: 6,
                name: '云阳龙缸',
                desc: '',
                location: [109.013669,30.676108]
              },
              {
                id: 7,
                name: '',
                desc: '湖北屏山大峡谷',
                location: [109.013669,30.676108],
              }
            ]
          },
        ]
      } 
    })
  },
  {
    url: '/route/favorite',
    method: 'post',
    response: () => ({
      code: '200',
      data: [
        {
          id: 1,
          name: '贵州看瀑布',
          from: '重庆渝北区',
          fromLocation: [106.486389,29.661781],
          to: '贵州西江千户苗寨',
          toLocation: [108.173598,26.495065],
          pathway: [
            {
              id: 1,
              name: '赤水丹霞瀑布',
              desc: '。。。。。。',
              location: [105.744206,28.3557]
            },
            
            {
              id: 2,
              name: '贵阳黔灵山公园',
              desc: '',
              location: [106.693432,26.597816]
            },
            {
              id: 3,
              name: '黄果树大瀑布',
              desc: '',
              location: [105.669102,25.989377]
            },
            {
              id: 4,
              name: '小七孔',
              desc: '',
              location: [107.705723,25.252959]
            },
          ]
        },
        {
          id: 2,
          name: '湖北恩施大峡谷',
          from: '重庆渝北区',
          fromLocation: [106.486389,29.661781],
          to: '湖北恩施大峡谷',
          toLocation: [109.178306,30.425864],
          pathway: [
            {
              id: 5,
              name: '涪陵美心红酒小镇',
              desc: '。。。。。。',
              location: [107.18541,29.662344]
            },
            {
              id: 6,
              name: '云阳龙缸',
              desc: '',
              location: [109.013669,30.676108]
            },
            {
              id: 7,
              name: '',
              desc: '湖北屏山大峡谷',
              location: [109.013669,30.676108],
            }
          ]
        },
      ]
    })
  },
  {
    url: '/route/favoriteInfoById',
    method: 'post',
    response: () => ({
      code: '200',
      data:  {
        id: 1,
        name: '贵州看瀑布',
        from: '重庆渝北区',
        fromLocation: [106.486389,29.661781],
        to: '贵州西江千户苗寨',
        toLocation: [108.173598,26.495065],
        pathway: [
          {
            id: 1,
            name: '赤水丹霞瀑布',
            desc: '。。。。。。',
            location: [105.744206,28.3557]
          },
          
          {
            id: 2,
            name: '贵阳黔灵山公园',
            desc: '',
            location: [106.693432,26.597816]
          },
          {
            id: 3,
            name: '黄果树大瀑布',
            desc: '',
            location: [105.669102,25.989377]
          },
          {
            id: 4,
            name: '小七孔',
            desc: '',
            location: [107.705723,25.252959]
          },
        ]
      }
    })
  }
]