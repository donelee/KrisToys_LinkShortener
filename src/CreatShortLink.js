
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import {QRCodeCanvas} from 'qrcode.react';

import './CreatShortLink.css';
import Autotype from './Autotype';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function CreatShortLink() {
    const [link, setLink] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [shortLinkPW, setShortLinkPW] = useState('');
    const [alertCorr, setAlertCorr] = useState();
    const [alertWarn, setAlertWarn] = useState();
    const [alertErr, setAlertErr] = useState();
    const [alertErrmessage, setAlertErrmessage] = useState();
    const [alertWarncc, setAlertWarncc] = useState();
    const [alertWarnccmessage, setAlertWarnccmessage] = useState();
    const [captchaPic, setCaptchaPic] = useState();
    const [captcha, setCaptcha] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };
    const inputKeyEnter_i = (e) => {
        if (e.keyCode === 13) {
            openCaptchaDialog(e);
        };
    };
    const inputKeyEnter_c = (e) => {
        if (e.keyCode === 13) {
            captchaVerify(e);
        };
    };

    const openCaptchaDialog = (e) => {
        if(!/^(http:|https:)\/\//.test(link)) {
            e.preventDefault();
            setAlertWarn(true);
            return;
        }else{
            refreshCaptcha();
            setOpenDialog(true);
        };
    };

    const refreshCaptcha = (e) => {
        axios.get('/api/captcha', { params: { timestamp: Date.now() }})
        .then(function( response ) {
                // console.log(response);
            if(response.data.success === true){
                const captchadata = response.data.data;
                setCaptchaPic(captchadata.pic);
            };
        })
        .catch((error) => {
            setAlertErrmessage(error.response.data.message);
            setCaptchaPic("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAoCAIAAACjL4WRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAB8SURBVHic7dHBCcAgAMDA2kkU3H9GR+izBu4mCGTMtR/u9v4dwDeTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKMCnApACTAkwKOH4+ALUNDQkcAAAAAElFTkSuQmCC");
            setAlertErr(true);
            setAlertWarncc(false);    
            return;
        }); 
    };

    const captchaVerify = (e) => {        
        axios.post('/api/generate_link', { link, captcha })
        .then(function (response) {
            // console.log(response); 
            if (response.data.success === true) {
                setCaptcha();
                const surldata = response.data.data;
                setShortLink(window.location.origin + '/s/' + surldata.hash);
                setShortLinkPW(surldata.token);                
                setOpenDialog(false);
                setAlertCorr(true);
            }
        })
        .catch((error) => {
            setAlertWarnccmessage(error.response.data.message);
            setAlertWarncc(true);
            refreshCaptcha();
        });
    };

    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = shortLinkPW + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Box sx={{ pt: 10, pb: 4, px: 2 }}>
            <Container maxWidth="sm" className='border'
                sx={{            
                bgcolor: 'rgba(255,255,255,0.5)',    
                backdropFilter: 'blur(5px)',
                boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
                pt: 10,
                pb: 4,
                textAlign: 'Center',
                borderRadius: '10px'
                }}
            >
                <ZoomInMapIcon className="App-logo" color="primary" sx={{ fontSize: 100 }} />        
                <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="#252445"
                    gutterBottom
                    marginTop="40px"
                >             
                    短链接生成器
                </Typography>
                <Typography variant="h6" align="center" color="#1d1c38" sx={{ pb: 3 }}>     
                    <Autotype />           
                </Typography>          
                <TextField 
                    className='inputbox'
                    margin = 'none'            
                    required
                    fullWidth
                    id="url"
                    label="请以 http:// 或者 https:// 开头"
                    name="url"
                    autoComplete="off"
                    onChange = {(e) => setLink(e.target.value) }
                    onKeyDown = { inputKeyEnter_i }
                    onFocus={() => setAlertCorr(false) | setAlertWarn(false)}
                />   
                { alertCorr &&             
                    <Card 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            marginTop: 0,                        
                            bgcolor: 'rgba(255,255,255,0.1)',                                     
                        }}
                    >      
                        <Stack sx={{ width: '100%'}} spacing={0}>
                            <Alert onClose={() => setAlertCorr(false)} sx={{ bgcolor: 'rgba(255,255,255,0.4)', color: 'rgb(65, 65, 65)'}}>成功生成短链接</Alert>             
                        </Stack>                    
                        <Card 
                            sx={{ 
                                display: 'flex',                                                                   
                                height: 200, 
                                textAlign: 'left',
                                marginTop: 0.5,
                                bgcolor: 'rgba(255,255,255,0.4)',                                                           
                            }}
                        > 
                            <Box sx={{ width: 160, height: 160, marginTop: 2.5, marginLeft: 2.5, display: { xs: 'none', sm: 'block' } }}>
                                <QRCodeCanvas
                                    id="myqr"
                                    value={ shortLink } 
                                    size={ 160 }
                                    fgColor="#1565c0"  
                                    bgColor="rgba(255,255,255,0.1)" 
                                    level="Q"                                
                                    imageSettings={{ // 二维码中间的logo图片
                                        src: window.location.origin + window.location.pathname + '/logo192.png',
                                        height: 30,
                                        width: 30,
                                        excavate: true, // 中间图片所在的位置是否镂空
                                    }}                                 
                                />                            
                            </Box>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" >         
                                    短链接:
                                    <CopyToClipboard text={ shortLink } >
                                        <Button size="small" title='复制短链接到粘贴板'>
                                            <CopyAllOutlinedIcon fontSize="small" color="primary" />
                                        </Button>                                                               
                                    </CopyToClipboard>                                    
                                    <Button size="small" title='点击下载二维码'>
                                        <FileDownloadOutlinedIcon fontSize="small" color="primary" onClick={ downloadQR }/>                                            
                                    </Button>                                                               
                                </Typography>
                                <Typography variant="subtitle1">        
                                    <a  style={{ 
                                            width:'290px',            
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            position: 'absolute',                          
                                        }}
                                        href= { shortLink }                          
                                    >{ shortLink }</a>
                                </Typography>                 
                                <br /><br /><hr />
                                <Typography variant="subtitle1" color="text.secondary"> 
                                    原链接:                            
                                    <a  style={{ 
                                            width:'290px',            
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            position: 'absolute',
                                        }}
                                        href= { link }
                                    >{ link }</a>                            
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    查询密码:
                                    <a variant="subtitle1" color="#1565c0" href="location.origin">{ shortLinkPW }</a>
                                    <CopyToClipboard text={ shortLinkPW } >
                                        <Button size="small" title='复制密码到粘贴板'>
                                            <CopyAllOutlinedIcon fontSize="small" color="primary" />
                                        </Button>                                                               
                                    </CopyToClipboard>                
                                </Typography>                            
                            </CardContent>
                        </Card>
                    </Card>              
                }
                { alertWarn && 
                    <Stack sx={{ width: '100%'}} spacing={0}>
                        <Alert onClose={() => { setAlertWarn(false); }} severity="warning" sx={{ bgcolor: 'rgba(255,255,255,0.4)', color: 'rgb(65, 65, 65)'}}>格式错误 — 请重新输入 !</Alert>             
                    </Stack>                       
                }
                <Button 
                    onClick={ openCaptchaDialog }                 
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    生成短链接
                </Button>
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted                
                    onClose={handleClose}               
                >        
                    <DialogContent>
                        <Card 
                            sx={{ 
                                display: 'flex',
                                height: 50, 
                                textAlign: 'left',
                                boxShadow: 'none',
                                bgcolor: 'rgba(255,255,255,0.4)',                                     
                            }}
                        > 
                            <Box sx={{ width: 140, height: 40, marginTop: 0, marginLeft: 0, display: { sm: 'block' } }}>  
                                <TextField 
                                    size="small"                    
                                    className = 'inputbox'
                                    margin = 'none'
                                    required
                                    autoComplete = "off"                                
                                    onChange = {(e) => setCaptcha(e.target.value) }
                                    onKeyDown = { inputKeyEnter_c }
                                    onFocus={() => setAlertWarncc(false) | setAlertErr(false)}                                
                                />                    
                            </Box> 
                            <Box sx={{ width: 140, height: 40, marginTop: 0, marginLeft: 1, display: { sm: 'block' } }}>
                                <img style={{ borderRadius: 5 }} alt='captchaPic' src = { captchaPic }  onClick={ openCaptchaDialog } />
                            </Box>               
                        </Card>
                        <Button type="submit" fullWidth variant="outlined" onClick={ captchaVerify }>验证</Button>                    
                        { alertWarncc && 
                        <Stack sx={{ width: '100%'}} spacing={0}>
                            <Alert severity="warning" sx={{ bgcolor: 'rgb(255,255,255)', color: 'rgb(65, 65, 65)'}}>{ alertWarnccmessage }</Alert>             
                        </Stack>                       
                        }
                        { alertErr && 
                        <Stack sx={{ width: '100%'}} spacing={0}>
                            <Alert severity="error" sx={{ bgcolor: 'rgb(255,255,255)', color: 'rgb(65, 65, 65)'}}>{ alertErrmessage }</Alert>             
                        </Stack>                       
                        }
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    );
}