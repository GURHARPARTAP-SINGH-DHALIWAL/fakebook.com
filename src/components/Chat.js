import React from "react";
import '../chat.css';
class Chat extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            userMessage:'',
            messages:[]
        };
    };

    handleChange=(e)=>{
        this.setState({
            userMessage:e.target.value
        });
    };
    render() { 
        const {userMessage,messages}=this.state;
        return (
          <div className="chat-container" id="chat">
            <div className="chat-header">
              Chat
              <i class="fas fa-minus" height={17}></i>
            </div>
            <div className="chat-messages">
                {
                    messages.map(message=>{
                        return (
                          <div
                            className={
                              message.self ? "chat-bubble self-chat" : "chat-bubble other-chat"
                            }
                          >
                            {message.content}
                          </div>
                        );
                    })
                }
            </div>
            <div className="chat-footer">
                <input type="text" value={userMessage} onChange={(e)=>this.handleChange(e)} id="chat-input" placeholder="Type a message"></input>
                <button >Send</button>
            </div>
          </div>
        );
    }
}
 
export default Chat;