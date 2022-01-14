import React from "react";
import '../chat.css';
import io from 'socket.io-client';
import { connect } from "react-redux";
class Chat extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            userMessage:'',
            messages:[],
            showChat:true
        };

        this.socket = io.connect(
          "https://fakebook-chat-server.herokuapp.com/",
          {
            transports: ["websocket"],
          }
        );
        this.userEmail=this.props.user.email;

        if(this.userEmail)
        {   
            // We Will add event listenrs only if user is logged in
            this.setupConnection();
        }
    };

    setupConnection=()=>{
        const self=this;

        this.socket.on('connect',function(){
            console.log("Connected ");

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'fakebook'
            });

            self.socket.on('user_joined',(data)=>{
                console.log('Joined - >',data);
            });

            self.socket.on('receive_message',(data)=>{
                const messageObj={};
                messageObj.content=data.message;
                messageObj.user=self.props.user.name;
                if(data.user_email===self.userEmail)
                {
                    messageObj.self=true;
                }
                else
                {
                    messageObj.self=false;
                }

                const newMessage = [...self.state.messages, messageObj];
                self.setState({
                    messages:newMessage,
                    userMessage:''
                });

            });



        });
    };

    handleChange=(e)=>{
        this.setState({
            userMessage:e.target.value
        });
    };

    handleSend=()=>{

        const {userMessage}=this.state;
        if(userMessage&&this.userEmail){
        this.socket.emit('receive_message',{
            message:userMessage,
            chatroom:'fakebook',
            user_email:this.userEmail
        });
    }
    };

    handleChatPopup=()=>{
        const oldVal=this.state.showChat;
        this.setState({
            showChat:!oldVal
        });
    }
    render() { 
        const {userMessage,messages}=this.state;
        const {showChat}=this.state;

        return (
          <div className="chat-container" id="chat" >
            <div className="chat-header">
              Chat
              <i class="fas fa-minus" height={17} onClick={this.handleChatPopup}></i>
            </div>

            {showChat && (
              <div className="chat-messages">
                {messages.map((message) => {
                  return (
                    <div
                      className={
                        message.self
                          ? "chat-bubble self-chat"
                          : "chat-bubble other-chat"
                      }
                    >  
                    {this.userEmail}
                    <div className="divider black"></div>
                      {message.content}
                    </div>
                  );
                })}
              </div>
            )}

            {showChat && (
              <div className="chat-footer">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => this.handleChange(e)}
                  id="chat-input"
                  placeholder="Type a message"
                ></input>
                <button onClick={this.handleSend}>Send</button>
              </div>
            )}
          </div>
        );
    }
}
 

function mapStateToProps(state){
    return {
        user:state.auth.user
    };
};
export default connect(mapStateToProps)(Chat);