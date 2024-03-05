
import {Icon1,Icon10,Icon11,Icon12,Icon13,Icon14,Icon15,Icon16,Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9} from '@/static/icon'

/**
 *旧：
 * 0系统管理员，
 * 1教师，
 * 2普通学生，
 * 3值班学生
 *
 *
 *新：
 * 1系统管理员，
 * 2教师，
 * 7普通学生（协会会长），
 * 4协会会长，
 * 5值班学生
 * **/
export const RoleList = {
  1:[
    {
      name:'运行管理',
      subList:[
        {
          name:'实验室运行状态',
          icon:Icon1,
          url:'../../indexPages/labCondition/index'
        },
        {
          name:'课表联动场景',
          icon:Icon2,
          url:'../../indexPages/classSchedule/index'
        }
      ]
    },
    {
      name:'预约管理',
      subList:[
        {
          name:'预约审批',
          icon:Icon3,
          url:'../../indexPages/makeApprove/index'
        },
        {
          name:'我的邀约',
          icon:Icon4,
          url:'../../indexPages/myInvite/index'
        }
      ]
    },
    {
      name:'课程管理',
      subList:[
        {
          name:'实验室排课情况',
          type:'tab',
          icon:Icon7,
          url:'../schedule/index'
        }
      ]
    },
    {
      name:'值班管理',
      subList:[
        {
          name:'实验室巡检记录',
          icon:Icon8,
          url:'../../indexPages/labInspectRecord/index'
        },
        {
          name:'办公室签到记录',
          icon:Icon9,
          url:'../../indexPages/officeSignRecords/index'
        },
        {
          name:'值班月报表',
          icon:Icon10,
          url:'../../indexPages/monthlyReport/index'
        },
        {
          name:'加班任务',
          icon:Icon11,
          url:'../../indexPages/overtimeApproval/index'
        }
      ]
    },
    {
      name:'个人中心',
      subList:[
        {
          name:'我的消息',
          icon:Icon12,
          url:'../../userPages/myNews/index'
        },
        {
          name:'完善个人信息',
          icon:Icon13,
          url:'../../userPages/personInfo/index'

        }
      ]
    }
  ],
  2:[
    {
      name:'预约管理',
      subList:[
        {
          name:'实验室预约',
          icon:Icon16,
          url:'../../indexPages/labInvite/index'
        }
      ]
    },
    {
      name:'课程管理',
      subList:[
        {
          name:'我的课程',
          icon:Icon5,
          url:'../../indexPages/myCourse/index'
        },
        {
          name:'我的课表',
          icon:Icon6,
          type:'tab',
          url:'../schedule/index'
        }
      ]
    }
  ],
  7:[
    {
      name:'预约管理',
      subList:[
        {
          name:'实验室预约',
          icon:Icon16,
          url:'../../indexPages/labInvite/index'
        }
      ]
    },
    {
      name:'课程管理',
      subList:[
        {
          name:'我的课表',
          icon:Icon6,
          type:'tab',
          url:'../schedule/index'
        }
      ]
    }
  ],
  4:[
    {
      name:'预约管理',
      subList:[
        {
          name:'实验室预约',
          icon:Icon16,
          url:'../../indexPages/labInvite/index'
        }
      ]
    },
    {
      name:'课程管理',
      subList:[
        {
          name:'我的课表',
          icon:Icon6,
          type:'tab',
          url:'../schedule/index'
        }
      ]
    }
  ],
  5:[
    {
      name:'运行管理',
      subList:[
        {
          name:'实验室运行状态',
          icon:Icon1,
          url:'../../indexPages/labCondition/index'
        }
      ]
    },
    {
      name:'预约管理',
      subList:[
        {
          name:'实验室预约',
          icon:Icon16,
          url:'../../indexPages/labInvite/index'
        }
      ]
    },
    {
      name:'课程管理',
      subList:[
        {
          name:'我的课程',
          icon:Icon5,
          url:'../../indexPages/myCourse/index'
        },
        {
          name:'我的课表',
          icon:Icon6,
          type:'tab',
          url:'../schedule/index'
        }
      ]
    },
    {
      name:'值班管理',
      subList:[
        {
          name:'实验室值班任务',
          icon:Icon14,
          url:'../../indexPages/labDutyRecord/index'
        },
        {
          name:'办公室值班任务',
          icon:Icon15,
          url:'../../indexPages/officeDuty/index'
        },
        {
          name:'值班月报表',
          icon:Icon10,
          url:'../../indexPages/monthlyReport/index'
        },
        {
          name:'加班任务',
          icon:Icon11,
          url:'../../indexPages/overtimeApproval/index'
        }
      ]
    }
  ],
  6:[
    {
      name:'运行管理',
      subList:[
        {
          name:'实验室运行状态',
          icon:Icon1,
          url:'../../indexPages/labCondition/index'
        },
        {
          name:'课表联动场景',
          icon:Icon2,
          url:'../../indexPages/classSchedule/index'
        }
      ]
    },
    {
      name:'预约管理',
      subList:[
        {
          name:'预约审批',
          icon:Icon3,
          url:'../../indexPages/makeApprove/index'
        },
        {
          name:'我的邀约',
          icon:Icon4,
          url:'../../indexPages/myInvite/index'
        },
        {
          name:'实验室预约',
          icon:Icon16,
          url:'../../indexPages/labInvite/index'
        }
      ]
    },
    {
      name:'课程管理',
      subList:[
        {
          name:'我的课程',
          icon:Icon5,
          url:'../../indexPages/myCourse/index'
        },
        {
          name:'我的课表',
          icon:Icon6,
          type:'tab',
          url:'../schedule/index?IsSearchMine=1'
        },
        {
          name:'实验室排课情况',
          icon:Icon7,
          type:'tab',
          url:'../schedule/index?IsSearchMine=0'
        }
      ]
    },
    {
      name:'值班管理',
      subList:[
        {
          name:'实验室值班任务',
          icon:Icon14,
          url:'../../indexPages/labDutyRecord/index'
        },
        {
          name:'办公室值班任务',
          icon:Icon15,
          url:'../../indexPages/officeDuty/index'

        },
        {
          name:'实验室巡检记录',
          icon:Icon8,
          url:'../../indexPages/labInspectRecord/index'
        },
        {
          name:'办公室签到记录',
          icon:Icon9,
          url:'../../indexPages/officeSignRecords/index'
        },
        {
          name:'值班月报表',
          icon:Icon10,
          url:'../../indexPages/monthlyReport/index'
        },
        {
          name:'加班任务',
          icon:Icon11,
          url:'../../indexPages/overtimeApproval/index'
        }
      ]
    },
    {
      name:'个人中心',
      subList:[
        {
          name:'我的消息',
          icon:Icon12,
          url:'../../userPages/myNews/index'
        },
        {
          name:'完善个人信息',
          icon:Icon13,
          url:'../../userPages/personInfo/index'

        }
      ]
    }
  ]
}
