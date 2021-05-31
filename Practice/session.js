let list = [{
      idx: 1,
      username: 'minr2kb',
      password: 'mkb1129ok',
      sid: null
    },
    {
      idx: 2,
      username: 'minr2kb2',
      password: 'mkb1129ok',
      sid: null
    },
    {
      idx: 3,
      username: 'minr2kb2',
      password: 'mkb1129ok',
      sid: null
    },
    {
      idx: 4,
      username: 'star1',
      password: 'starinstar',
      sid: null
    }
]

console.log(list.includes({
    idx: 4,
    username: 'star1',
    password: 'starinstar',
    sid: null
  }))