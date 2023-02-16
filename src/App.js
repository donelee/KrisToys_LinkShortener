import React from 'react';
import AppBar from '@mui/material/AppBar';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import './App.css';
import CreatShortLink from './CreatShortLink'
import WidgetTime from './WidgetTime';
import Adcard from './Adcard';
import Copyright from './Copyright';

// 定义AD卡片5项元素
const adcards = [
  {
    title: '特斯拉引荐奖励1',
    description: '使用我的引荐链接购买Tesla产品可获得积分,用于兑换超级充电里程、服饰精品、车辆配件等奖品。',
    image: require('./img/0x0-Roadster_04.jpg'),
    imageLabel: 'ad_img',
    adURL: 'http://ts.la/krislee961502',
  },
  {
    title: '特斯拉引荐奖励2',
    description: '使用我的引荐链接购买Tesla产品可获得积分,用于兑换超级充电里程、服饰精品、车辆配件等奖品。',
    image: require('./img/0x0-Cybertruck_16.jpg'),
    imageLabel: 'ad_img',
    adURL: 'http://ts.la/krislee961502',
  },
  {
    title: '特斯拉引荐奖励3',
    description: '使用我的引荐链接购买Tesla产品可获得积分,用于兑换超级充电里程、服饰精品、车辆配件等奖品。',
    image: require('./img/0x0-Cyber_Rodeo_04.jpg'),
    imageLabel: 'ad_img',
    adURL: 'http://ts.la/krislee961502',
  },
];

export default function LinkShortener() {
  return (    
    <div> 
      {/* AppBar */}
      <AppBar position="fixed" sx={{bgcolor: 'rgba(255,255,255,0.5)', height: '48px'}}>
        <Toolbar>
          <ZoomInMapIcon sx={{ mr: 1, mb: 1.5, color: "#252445" }}  />
          <Typography variant="h6" color="#252445" noWrap sx={{mb: 1.5}}>
            KrisToys
          </Typography>
        </Toolbar>
      </AppBar>
      {/* End AppBar */}

      {/* 主页面 */} 
      <CreatShortLink />
      {/* End 主页面 */}    
      
      {/* 显示时间组件 */}
      <Typography component="span" variant="body2" align="center" gutterBottom>
        <WidgetTime />
      </Typography>
      {/* End 显示时间组件 */}           
      <br />
      {/* 广告组件阵列 */}
      <Box bgcolor='rgba(0, 0, 0, 0.5)' z-index= '1'>
        <Container sx={{ py: 4}} maxWidth="md">         
          <Grid container spacing={4}>
            {adcards.map((adcard) => (
              <Adcard key={adcard.title} adcard={adcard} />
            ))}
          </Grid>
        </Container>
      </Box>     
      {/* End 广告组件阵列 */}        
      
      {/* Footer */}
      <Box sx={{ bgcolor: 'lightgrey', pt: 1, pb: 1 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}     
    </div>           
  ); 
}