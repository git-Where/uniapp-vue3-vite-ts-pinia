export const betweenArray = (start, end) => {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// 获取当前月份的天数
export const getDaysInMonth = (year, month) => {
  month = month - 1; // 月份从0开始，要减1
  let date = new Date(year, month);
  date.setMonth(date.getMonth() + 1); // 设置为下个月的第一天
  date.setDate(date.getDate() - 1); // 减去1天，即为当前月份的天数
  return date.getDate();
}

// 时间戳转时间
export const timestampToTime = (timestamp,type) => {
  // 假设时间戳为1598457600000
  // let timestamp = 1598457600000;

  // 使用Date对象将时间戳转换为时间
  let date = new Date(timestamp);

  // 获取年份
  let year = date.getFullYear();

  // 获取月份（注意月份是从0开始计数的，所以需要加1）
  let month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1;

  // 获取日期
  let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

  // 获取小时
  let hour = date.getHours();

  // 获取分钟
  let minute = date.getMinutes();

  // 获取秒钟
  let second = date.getSeconds();

  // 将时间拼接成字符串
  let time = ''
  if(type === '1'){
    time = year + '年' + month + '月' + day + '日'
  }else if(type === '2'){
    time = year + '-' + month + '-' + day
  }else if(type === '3'){
    time = year + '-' + month
  }else{
    time = year + type + month + type + day + ' ' + hour + ':' + minute + ':' + second;
  }
  return time
}


/**
 * 计算两个地点坐标之间的间距
 * @param {array} location1 [lon: string, lat: string] 地点坐标
 * @param {array} location2 [lon: string, lat: string] 地点坐标
 */
export const calculateDistance = (location1, location2) =>{
	const earthRadius = 6371 // 地球半径，单位为千米

	function toRadians(degrees) {
		return degrees * (Math.PI / 180)
	}

	// 将经纬度转换为弧度
	const radLat1 = toRadians(location1[1])
	const radLon1 = toRadians(location1[0])
	const radLat2 = toRadians(location2[1])
	const radLon2 = toRadians(location2[0])

	// 计算经纬度差值（弧度）
	const diffLat = radLat2 - radLat1
	const diffLon = radLon2 - radLon1

	// 应用 Haversine 公式计算距离
	const a =
		Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return earthRadius * c * 1000 // 换成米
}

// 2023-06-03T00:00:00 转时间格式
function formatTen(num) {
  return num > 9 ? (num + "") : ("0" + num);
}
export const formatDate = (dateTime) => {
  const date = new Date(dateTime)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return year + "-" + formatTen(month) + "-" + formatTen(day)+ " " +formatTen(hour)+ ":" +formatTen(minute)+ ":" +formatTen(second);
}
// 2023-06-03T00:00:00 转时间格式
export const formatDateDay = (dateTime) => {
  const date = new Date(dateTime)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = new Date(dateTime).getHours();
  let time = ''
  if (hours < 12) {
    time =  '上午'; // 早上
  } else {
    time =  '下午'; // 下午
  }
  return year + "年" + formatTen(month) + "月" + formatTen(day)+ "日 " + time;
}

// 判断当前日期是否在某个日期段
export const isDateInRange = (startDateStr, endDateStr) => {
  var currentDate = new Date(); // 获取当前日期

  var startDate = new Date(startDateStr); // 将起始日期字符串转换为 Date 对象
  var endDate = new Date(endDateStr); // 将结束日期字符串转换为 Date 对象

  return (currentDate >= startDate && currentDate <= endDate); // 返回布尔值表示当前日期是否在指定范围内
}

 //Uint8ClampedArray 转bae64图片格式
const toBase64 = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
]
export const uintbase64 = (src)=> {
  let dstLen = Math.ceil(src.length * 4 / 3);
  let dst = new Array(dstLen);
  let pos = 0;
  let dstIndex = 0;
  let nextLeft = 0;
  src.forEach( b => {
      let r = 0;
      if (pos == 0) {
          r = b >> 2;
          dst[dstIndex++] = toBase64[nextLeft + r];
          nextLeft = (b & 0x03) << 4;
      } else if (pos == 1) {
          r = b >> 4;
          dst[dstIndex++] = toBase64[nextLeft + r];
          nextLeft = (b & 0x0F) << 2;
      } else if (pos == 2) {
          r = b >> 6;
          dst[dstIndex++] = toBase64[nextLeft + r];
          dst[dstIndex++] = toBase64[b & 0x3F];
          nextLeft = 0;
      }

      pos++;
      if (pos == 3) {
          pos = 0;
      }
  });

  if (pos != 0) {
      dst[dstIndex] = toBase64[nextLeft];
  }

  return dst.join('');
}


// 通过起止时间获取周数
export const getWeeks = (startDateStr, endDateStr) => {
  var start = new Date(startDateStr); // 创建起始日期对象
  var end = new Date(endDateStr); // 创建结束日期对象

  var timeDiff = Math.abs(Number(end) - Number(start)); // 获取时间差（单位为毫秒）
  var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 转换成天数并向上取整
  console.log('getWeeks',start,end,timeDiff,daysDiff,Math.floor(daysDiff / 7))
  return Math.floor(daysDiff / 7); // 返回周数
}

// 当前日期距离指定日期是第几周
export const getWeekNumber = (dateString) => {
  var date = new Date(dateString); // 创建指定日期的Date对象

  // 获取当前日期的年份、月份和日期
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth() + 1;
  var currentDayOfMonth = new Date().getDate();

  // 设置当前日期为指定日期
  date.setFullYear(currentYear);
  date.setMonth(currentMonth - 1);
  date.setDate(currentDayOfMonth);

  // 计算两个日期之间的时间差（单位：毫秒）
  var timeDiff = Math.abs(date.getTime() - new Date().getTime());

  // 转换成天数并求商取整
  var daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return Math.floor((daysDifference % 7 === 0 ? daysDifference : daysDifference % 7) / 7) + 1;
}

// 获取当前年月日
export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 月份是从 0 开始计数的，因此要加1

  const day = currentDate.getDate();
  return `${year}-${month<9 ? '0' + month : month}-${day<9 ? '0' + day : day}`
}
// 获取当前年月日往后一个月
export const getCurrentDateToMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1+1; // 月份是从 0 开始计数的，因此要加1

  const day = currentDate.getDate();
  return `${year}-${month<9 ? '0' + month : month}-${day<9 ? '0' + day : day}`
}

export const getCurrentYearMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 月份是从 0 开始计数的，因此要加1
  return `${year}-${month > 9 ? month : '0' + month}`
}

export const formatPast = (date, type = "default", zeroFillFlag = true) => {
  // 定义countTime变量，用于存储计算后的数据
  let countTime;
  // 获取当前时间戳
  let time = new Date().getTime();
  const dataFormatter = date.replaceAll('-','/')
  // 转换传入参数为时间戳
  let afferentTime = new Date(dataFormatter).getTime();
  // 当前时间戳 - 传入时间戳
  time = Number.parseInt(`${time - afferentTime}`);
  if (time < 10000) {
      // 10秒内
      return "刚刚";
  } else if (time < 60000) {
      // 超过10秒少于1分钟内
      countTime = Math.floor(time / 1000);
      return `${countTime}秒前`;
  } else if (time < 3600000) {
      // 超过1分钟少于1小时
      countTime = Math.floor(time / 60000);
      return `${countTime}分钟前`;
  } else if (time < 86400000) {
      // 超过1小时少于24小时
      countTime = Math.floor(time / 3600000);
      return `${countTime}小时前`;
  } else if (time >= 86400000 && type == "default") {
      // 超过二十四小时（一天）且格式参数为默认"default"
      countTime = Math.floor(time / 86400000);
      //大于等于365天
      if (countTime >= 365) {
          return `${Math.floor(countTime / 365)}年前`;
      }
      //大于等于30天
      if (countTime >= 30) {
          return `${Math.floor(countTime / 30)}个月前`;
      }
      return `${countTime}天前`;
  } else {
      // 一天（24小时）以上且格式不为"default"则按传入格式参数显示不同格式
      // 数字补零
      let Y = new Date(date).getFullYear();
      let M = new Date(date).getMonth() + 1;
      let zeroFillM = M > 9 ? M : "0" + M;
      let D = new Date(date).getDate();
      let zeroFillD = D > 9 ? D : "0" + D;
      // 传入格式为"-" "/" "."
      if (type == "-" || type == "/" || type == ".") {
          return zeroFillFlag
              ? Y + type + zeroFillM + type + zeroFillD
              : Y + type + M + type + D;
      }
      // 传入格式为"年月日"
      if (type == "年月日") {
          return zeroFillFlag
              ? Y + type[0] + zeroFillM + type[1] + zeroFillD + type[2]
              : Y + type[0] + M + type[1] + D + type[2];
      }
      // 传入格式为"月日"
      if (type == "月日") {
          return zeroFillFlag
              ? zeroFillM + type[0] + zeroFillD + type[1]
              : M + type[0] + D + type[1]
      }
      // 传入格式为"年"
      if (type == "年") {
          return Y + type
      }

  }
};
