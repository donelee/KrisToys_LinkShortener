import React from 'react';

const typingRate = 250;
class Autotype extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      //打字出的文字
      textAreaShow: "",
      // 是否在打字中
      isTyping: false,
      //等待被打字的数组
      waitToType: ["一个开源免费的短链接生成器"],
      //延迟时间
      delayTime: this.props.delayTime || 1,
    }
  }
  componentDidMount() {
    let waitToType = this.state.waitToType;
    if (waitToType.length > 0) {
      let stringInput = waitToType.shift();
      setTimeout(() => this.typing(stringInput, stringInput[0], 0), typingRate);
      this.setState({
          waitToType: waitToType
      })
    }
  }
  typing(stringAll, char, nowLength) {
    if (nowLength < stringAll.length) {
      // isTyping = true;
      let textAreaShow = this.state.textAreaShow + char;
      // let textArea = this.refs.textArea;
      // this.refs.textArea.innerText = textAreaShow;
      this.setState({
          textAreaShow: textAreaShow,
          isTyping: true,
      }, () => {
          setTimeout(() => this.typing(stringAll, stringAll[nowLength + 1], nowLength + 1), typingRate);
      }, this)
    } else if (nowLength >= stringAll.length) {
        this.setState({
            isTyping: false,
        }, () => {
            let waitToType = this.state.waitToType;
            if (waitToType.length > 0) {
                let stringInput = waitToType.shift();
                setTimeout(() => this.typing(stringInput, stringInput[0], 0), typingRate);
                this.setState({
                    waitToType: waitToType
                })
            }
        }, this)
      }
  }
      
  render() {
    const {
      textAreaShow
    } = this.state;
    return (
      <div >       
        <div >{textAreaShow}</div>
      </div>
    );
  }
}

export default Autotype
