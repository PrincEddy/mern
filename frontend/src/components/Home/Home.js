import React, {useEffect, useState} from 'react';
import './Home.scss';
import agent from '../../agent/agent';
import Crawl from '../Crawl/crawl';
import History from '../History/history';

const Home = () => {
  const [links,setLinks] = useState([]);
  const [load,setLoad]=useState(true);

  useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {
        setLoad(false);
        setLinks(res);
      }).catch(e => {
        setLoad(false);
      });
  },[]);


  const addLink = (e) =>{
    agent.Crawler.getHistory()
      .then(res => {
        setLinks(res);
      }).catch(e => {
      });
  };


  return (
    <div className='main'>
      <h1>Entail Dev Test</h1>
      <hr></hr>
      <Crawl onSave={addLink}></Crawl>
      <History key={links.length} data={links} load={load}></History>
    </div>
  );
};

export default Home;

