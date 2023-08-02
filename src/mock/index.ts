export default [
  {
    url: '/route/favorite',
    method: 'get',
    response: () => ({
      code: '200',
      data: {
        total: 100,
        'list|10': [
          {
            id: '@increment',
            name: '@county',
            from: '@county',
            to: '@county',
            'collections|4': [
              {
                id: '@increment',
                county: '@county'
              }
            ]
          }
        ]
      } 
    })
  }
]