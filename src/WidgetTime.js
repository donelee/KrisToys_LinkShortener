import React, { useState, useEffect } from 'react';
import moment from 'moment';

const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const WidgetTime = () => {
  const [renderKey, setRenderKey] = useState(1);

  useEffect(() => {
     const timer = setInterval(() => {
       setRenderKey(Math.random());
     }, 1000);
   // 组件卸载清除定时器
   return () => clearInterval(timer);
  }, []);

  return (
   // 获取当前时间 年-月-日 时:分:秒  moment().format('YYYY-MM-DD HH:mm:ss') 
   // 获取星期几，其中星期日为0、星期六为6  moment().day()
      <div>
        {moment().format('HH:mm:ss')}
        <div style={{ display: 'none' }}>{renderKey}</div>      
        <div>
          {moment().format('YYYY-MM-DD')}&nbsp;{weeks[moment().day()]}&nbsp;(第{moment().week()}周)
        </div>  
      </div>    
    
  );
};

export default WidgetTime;