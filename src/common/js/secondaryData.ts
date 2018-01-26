const hotTag = ['华语', '流行', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG']


interface chooseItem {
  value: string
  isHot: boolean
}

interface chooseList {
  title: string
  list: Array<chooseItem>
}

const allTag: Array<chooseList> = [
  {
    title: '语种',
    list: [
      {
        value: '华语',
        isHot: true
      },
      {
        value: '欧美',
        isHot: false
      },
      {
        value: '日语',
        isHot: false
      },
      {
        value: '韩语',
        isHot: false
      },
      {
        value: '粤语',
        isHot: false
      },
      {
        value: '小语种',
        isHot: false
      }
    ]
  },
  {
    title: '风格',
    list: [
      {
        value: '流行',
        isHot: true
      },
      {
        value: '摇滚',
        isHot: true
      },
      {
        value: '民谣',
        isHot: true
      },
      {
        value: '电子',
        isHot: true
      },
      {
        value: '舞曲',
        isHot: false
      },
      {
        value: '说唱',
        isHot: false
      },
      {
        value: '轻音乐',
        isHot: true
      },
      {
        value: '爵士',
        isHot: false
      },
      {
        value: '乡村',
        isHot: false
      },
      {
        value: 'R&B/Soul',
        isHot: false
      },
      {
        value: '古典',
        isHot: false
      },
      {
        value: '民族',
        isHot: false
      },
      {
        value: '英伦',
        isHot: false
      },
      {
        value: '金属',
        isHot: false
      },
      {
        value: '朋克',
        isHot: false
      },
      {
        value: '蓝调',
        isHot: false
      },
      {
        value: '雷鬼',
        isHot: false
      },
      {
        value: '世界音乐',
        isHot: false
      },
      {
        value: '拉丁',
        isHot: false
      },
      {
        value: '另类/独立',
        isHot: false
      },
      {
        value: 'New Age',
        isHot: false
      },
      {
        value: '古风',
        isHot: false
      },
      {
        value: '后摇',
        isHot: false
      },
      {
        value: 'Bossa Nova',
        isHot: false
      }
    ]
  },
  {
    title: '场景',
    list: [
      {
        value: '清晨',
        isHot: false
      },
      {
        value: '夜晚',
        isHot: true
      },
      {
        value: '学习',
        isHot: true
      },
      {
        value: '工作',
        isHot: false
      },
      {
        value: '午休',
        isHot: false
      },
      {
        value: '下午茶',
        isHot: false
      },
      {
        value: '地铁',
        isHot: false
      },
      {
        value: '驾车',
        isHot: false
      },
      {
        value: '运动',
        isHot: true
      },
      {
        value: '旅行',
        isHot: false
      },
      {
        value: '散步',
        isHot: false
      },
      {
        value: '酒吧',
        isHot: false
      }
    ]
  },
  {
    title: '情感',
    list: [
      {
        value: '怀旧',
        isHot: true
      },
      {
        value: '清新',
        isHot: true
      },
      {
        value: '浪漫',
        isHot: false
      },
      {
        value: '性感',
        isHot: false
      },
      {
        value: '伤感',
        isHot: false
      },
      {
        value: '治愈',
        isHot: true
      },
      {
        value: '放松',
        isHot: false
      },
      {
        value: '孤独',
        isHot: false
      },
      {
        value: '感动',
        isHot: false
      },
      {
        value: '兴奋',
        isHot: false
      },
      {
        value: '快乐',
        isHot: false
      },
      {
        value: '安静',
        isHot: false
      },
      {
        value: '思念',
        isHot: false
      }
    ]
  },
  {
    title: '主题',
    list: [
      {
        value: '影视原声',
        isHot:true
      },
      {
        value: 'ACG',
        isHot: true
      },
      {
        value: '游戏',
        isHot: false
      },
      {
        value: '70后',
        isHot: false
      },
      {
        value: '80后',
        isHot: false
      },
      {
        value: '90后',
        isHot: false
      },
      {
        value: '网络歌曲',
        isHot: false
      },
      {
        value: 'KTV',
        isHot: false
      },
      {
        value: '经典',
        isHot: false
      },
      {
        value: '翻唱',
        isHot: false
      },
      {
        value: '吉他',
        isHot: false
      },
      {
        value: '钢琴',
        isHot: false
      },
      {
        value: '器乐',
        isHot: false
      },
      {
        value: '儿童',
        isHot: false
      },
      {
        value: '榜单',
        isHot: false
      },
      {
        value: '00后',
        isHot: false
      }
    ]
  }
]

const AZMap = ['热门','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']

export { hotTag,allTag,AZMap }
