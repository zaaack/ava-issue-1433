import 'babel-polyfill'
import React, { Component } from 'react'
import RCUpload from 'rc-upload'

class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      captures: [],
      error: '',
      content: '',
    }
  }
  hideDialogOnOverlay() {

  }
  render() {
    const { captures, error, content } = this.state

    return (
      <div className="feedback" onClick={this.hideDialogOnOverlay}>
        <div className="dialog-container">
          <form ref={c => (this._dialog = c)} className="dialog" onSubmit={this.submit}>
            <div className="close" onClick={this.hideDialog}>&times;</div>
            <div className="title">请填写反馈内容</div>
            <div className="editor">
              <textarea name="feedback" value={content} onChange={this.handleChange} placeholder="请填写" maxLength={1000} />
              {error && <div className="error">{error}</div>}
            </div>
            <div className="title">上传图片</div>
            <div className="captures">
              <RCUpload
                className="pic add"
                multiple
                accept="image/*,.txt,.doc,.docx"
                withCredentials
                name="file"
                style={{}} // if it's undefined now, but not in snapshot, or the opposite, it would throw errors.
                beforeUpload={this.handleBeforeUpload}
                onStart={this.handleUploadStart}
                onError={this.handleUploadError}
                onSuccess={this.handleUploadSuccess}
              >
                <div className="h-line" />
                <div className="v-line" />
              </RCUpload>
              {captures.map(item => {
                let content
                if (item.state === 'success') {
                  content = (
                    <div className="msg success">
                      {!this.isImage(item.name) && [
                        <FaFile size={50} className="icon" />,
                        <div className="name">{item.name}</div>
                      ]}
                    </div>
                  )
                } else if (item.state === 'error') {
                  content = <div className="msg error">{item.msg || '上传失败'}</div>
                } else if (item.state === 'pending') {
                  content = <div className="msg info">{item.msg}</div>
                }
                return (
                  <div
                    key={item.uid}
                    className="pic"
                    style={item.url ? {backgroundImage: `url("${item.url}")`} : {}}
                  >
                    <div className="del" onClick={() => this.remove(item)}>
                      <MdClose className="icon" />
                    </div>
                    {/* <div className="del" onClick={() => this.remove(item)}>&times;</div> */}
                    {content}
                  </div>
                )
              })}
            </div>
            <div className="tips">可以上传不超过3个文件，每个限制最大为1MB，类型限制为 jpg / jpeg / gif / png / txt / docx / doc</div>
            <div className="btn-submit" onClick={this.submit}>好了，发送反馈</div>
          </form>
        </div>
      </div>
    )
  }
}

export default Feedback;
