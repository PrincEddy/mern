import React  from 'react';
import './history.scss';
import 'antd/dist/antd.css';

import {Table} from 'antd';
const columns = [
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Meta description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'H1',
    dataIndex: 'h1',
    key: 'h1',
  },
  {
    title: 'H2',
    dataIndex: 'h2',
    key: 'h2',
  },
  {
    title: 'Links Count',
    dataIndex: 'links',
    key: 'links',
  }
];

const History = ({ data,load }) => {
  return (
    <div className='history-table-container'>
      <Table
        loading={load}
        columns={columns}
        dataSource={data}
        bordered
      />,
    </div>
  );
};

export default History;
