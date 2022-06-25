import './App.css'
import React, { createContext} from 'react'
import { Input, Table, Popconfirm } from 'antd'
import axios from 'axios'


const { Provider } = createContext()
const { Search } = Input


class App extends React.Component {
  state = {
    data:'我是来自 app 的数据！',
    datasource: [],
    columns: [
      { title: '任务序号', dataIndex: 'id', key: 'id' },
      { title: '任务名称', dataIndex: 'name', key: 'name' },
      { title: '任务描述', dataIndex: 'des', key: 'des' },
      { title: '操作', 
        dataIndex: 'setting', 
        key: 'setting', 
        render: (_, record) => this.state.datasource.length >= 1 ? (
        <Popconfirm 
          title="是否删除？" 
          onConfirm={() => this.delHandler(record.id)}
          okText="是"
          cancelText="否"  
        >
          <a href='#!'>删除</a>
        </Popconfirm>
      ) : null }
    ]
  }

  getB = d => this.setState({data:d})
  
  onSearch = value => {
    // 接口数据
    // if(value.trim() !== '') {
    //   axios.get(`http://localhost:8080/search/${value}`).then(res =>
    //   this.setState({datasource: res.data}))
    // } else {
    //   this.loadList()
    // }

    // 本地数据
    if(value.trim() !== '') {
      const newDatas = this.state.datasource.filter(item => item.name.toLowerCase().startsWith(value.trim().toLowerCase()))
      this.setState({datasource: newDatas})
    } else {
      this.loadList()
    }
  }

  loadList = () => {
    // 接口数据
    // axios.get('http://localhost:8080/api').then(res => {
    //   this.setState({
    //     datasource: res.data
    //   })
    // })

    // 本地数据
    axios.get('/todoLists.json').then(res => {
      // console.log(res)
      this.setState({
        datasource: res.data
      })
    })
  }

  delHandler = (record) => {
    // console.log('删除', record)
    // 删除接口
    // axios.delete(`http://localhost:8080/api/${record}`).then(res => {
    //   this.setState({
    //     datasource: res.data.filter(item => item.id !== record)
    //   })
    // })

    // 本地删除
    axios.get('/todoLists.json').then(res => {
      this.setState({
        datasource: res.data.filter(item => item.id !== record)
      })
    })
  }

  componentDidMount() {
    this.loadList()
  }

  render() {
    return (
      // Provider 提供数据 value 到 Consumer
      <Provider value={this.state.data}>
        <div style={{width: '700px', margin: '30px auto'}}>
          <h1 style={{textAlign: 'center', color: '#448EF7'}}>React 实战之 TodoLists</h1>
          <Search
            placeholder="输入要搜索的文本"
            allowClear
            enterButton="立即搜索"
            size="large"
            onSearch={this.onSearch}
          />
          <Table
            dataSource={this.state.datasource}
            columns={this.state.columns}
            bordered />
        </div>
      </Provider>
    )
  }
}


export default App;
