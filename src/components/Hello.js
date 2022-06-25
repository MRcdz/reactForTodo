import React, { createRef } from 'react'

class Hello extends React.Component {
  msgRef = createRef()
  pswRef = createRef()

  getValue = () => {
    console.log('msg: ', this.msgRef.current.value)
    console.log('psw: ', this.pswRef.current.value)
  }
  render() {
    return (
      <>
        <h1>Hello World !</h1>
        <div>
          <span>账号：</span>
          <input type="text" ref={this.msgRef}/>
        </div>
        <div>
          <span>密码：</span>
          <input type="password" ref={this.pswRef}/>
        </div>
        <p>
          <button onClick={this.getValue}>点击获取输入框值</button>
        </p>
      </>
    )
  }
}

export default Hello