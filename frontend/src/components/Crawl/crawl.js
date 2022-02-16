
import React, {useState} from 'react';
import './crawl.scss';
import agent from '../../agent/agent';
import 'antd/dist/antd.css';
import { Button,notification} from 'antd';

const Crawl = ({onSave}) =>{
  const [url,setUrl]= useState('');
  const [load,setLoad]=useState(false);

  const  onChange = (event) => {
    setUrl(event.target.value);
  };
  const openNotificationWithIcon = (type,msg,description) => {
    notification[type]({
      message: msg,
      description:description,
    });
  };
  const onClick = () => {
    if(url!==undefined && url!==''){
      setLoad(true);
      agent.Crawler.crawl(url).then(res =>{
        setUrl('');
        setLoad(false);
        onSave(res);
        openNotificationWithIcon('success','Successful','Your Website was successfully Crawled check the first Row On the table below for more information!!');
      }).catch(e=>{
        setUrl('');
        openNotificationWithIcon('error','Error',`${e}`);
        setLoad(false);
      });
    }
  };


  return (
    <div className='input-container'>
      <input onChange={(e)=>onChange(e)} value={url} className = "input-box" type="text" id="fname" name="fname" placeholder='Paste URL here..'></input>
      <Button  type="primary" loading={load} onClick={onClick}>
           Crawl
      </Button>
    </div>
  );
};
export default Crawl;
