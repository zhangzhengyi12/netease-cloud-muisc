// 对接口做删减在未来可能会造成维护上的困难，尽量全部保留只是对列表进行拆i分

interface normalized {
  title: string
  list: Array<any>
}

interface normalizedListArray {
  [props: number]: normalized
}

const normalizeList = function(list: Array<object>): normalizedListArray {
  const result: normalizedListArray = [
    {
      title: '创建的歌单',
      list: []
    },
    {
      title: '收藏的歌单',
      list: []
    }
  ]
  const myList = []
  const otherList = []

  list.forEach((element: any) => {
    // 目标为用户自身歌单
    if (element.creator.defaultAvatar) {
      result[0].list.push(element)
    } else {
      result[1].list.push(element)
    }
  })

  return result
}

export default normalizeList