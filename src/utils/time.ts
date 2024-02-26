// 封装一个函数，判断是中午、晚上、早上、...
export const getTimeMsg = (): string => {
  let message = '';
  // 通过内置构造函数Date解决
  let hours = new Date().getHours()
  if (hours > 6 && hours <= 9){
    message = '早上'
  }else if (hours > 9 && hours <=14) {
    message = '中午'
  }else if (hours > 14 && hours <=18) {
    message = '下午'
  }else if (hours >= 0 && hours <= 6){
    message = '凌晨'
  }else {
    message = '晚上'
  }
  return message;
}