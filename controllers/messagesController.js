const ChatMessage = require('../models/ChatMessage');
const AppError = require('../utils/appError');

// Get all messages for a conversation between two users
const getRoomId = (senderId, recipientId) => {
    return [senderId, recipientId].sort().join('-');
};
exports.getAllMessages = async (req, res, next) => {
    const { recipientId } = req.params;
    const senderId=req.user._id;
    try{
        const roomId = getRoomId(senderId, recipientId);
    const chat = await ChatMessage.findOne({
       roomId,
    });

    if (!chat) {
        return { messages: [] }; // Return an empty array if no conversation is found
    }
    
   
    return { messages: chat.messages };//return messages property of chat object
    }
catch(error){
    console.error("Error in retrieving conversation:", error);
    throw new AppError('Internal server error', 500);
}

  
};

//create message 
exports.createMessage = (io) => {
    return async (req, res = {}, next) => {
        // extract recipientId from req.params
        const { recipientId } = req.params;
        //extract content from body of req
        const { content } = req.body;
        const senderId = req.user._id; 
         //check whether sender is authenticated 
        if (!senderId) {
            throw new AppError('User is not authenticated');
        }
        
        if (typeof content !== 'string' || content.trim() === '') {
            throw new AppError('Content must be a non-empty string.');
        }
         //create the object for messages of chatMessageSchema
        const messageData = {
            sender:senderId,
            recipient:recipientId,
            content,
            status: 'sent',
            timestamp: Date.now(),
        };
          
        //try to find chat or create chat and send message or catch the error and throw 
        try {
            const roomId = getRoomId(senderId, recipientId);
            let  chat = await ChatMessage.findOne({
               roomId,
            });
            if (chat) {
                chat.messages.push(messageData);
            } else {
                chat = await ChatMessage.create({
                    roomId:roomId,
                    messages: [messageData],
                });
            }

            await chat.save();

            const savedMessage = chat.messages[chat.messages.length - 1];
            io.to(`${recipientId}-${senderId}`).emit('messageReceived', {
                ...messageData,
                messageId: savedMessage._id,
            });

            
            return { chat }; // Ensure this line is reached
        } catch (error) {
            console.error("Error in createMessage:", error);
            throw new AppError('Internal server error', 500);
        }
    };
};

// Update a message
exports.updateMessage =(io)=> {
    return async (req, res={}, next) => {
        //extracting the content from body and messageId from params
    const {content}=req.body;
    const { messageId } = req.params;
    
try{
    
    let chat = await ChatMessage.findOne({
       'messages._id':messageId,
    });
    if (!chat) {
        throw new AppError('Chat not found', 404);
    }
    const message = chat.messages.id(messageId);
    if (!chat) {
        throw new AppError('Message not found', 404);
    }
    const senderId=message.sender;
    const recipientId=message.recipient;
    // if the user is neither sender nor receiver throw error
    if(!req.user._id||String(req.user._id)!==String(senderId)) throw new AppError('You are not authorized to edit the message', 404);
   

    const now = new Date();
    const messageTime = new Date(message.timestamp);
    const tenMinutesAgo = new Date(now - 10 * 60 * 1000);
    //check whether the message sent is attempted to edit within 10 minutes or not
    if (messageTime < tenMinutesAgo) {
        throw new AppError('You can only edit a message within 10 minutes of sending.', 403);
    }
    // update content and save it 
    if (content) {
        message.content = content;
        message.status = 'edited';
    }
    
    await chat.save();

    // Emit the updated message to the recipient
    io.to(`${recipientId}-${senderId}`).emit('messageUpdated', {
        message,
    });

    return { chat };
}catch(error){
    console.error("Error in updating Message:", error);
    throw new AppError('Internal server error', 500);
}
};
}
// Delete a message
exports.deleteMessage =(io)=>{
return async (req, res, next) => {
    const {messageId } = req.params;
    
try{
    
    let chat = await ChatMessage.findOne({
       'messages._id':messageId,
    });
    if (!chat) {
        throw new AppError('Chat not found', 404);
    }
    const message = chat.messages.id(messageId);
    const senderId=message.sender;
    const recipientId=message.recipient;
    // if the user is neither sender nor receiver throw error
    if(!req.user._id||(String(req.user._id)!==String(senderId)&&String(req.user._id)!==String(recipientId)))throw new AppError('you are not authorized to delete this message.', 404);
   // filter the message and update the array
    chat.messages = chat.messages.filter(msg => !msg._id.equals(messageId));
    await chat.save();
    const messages=chat.messages;
    io.to(`${recipientId}-${senderId}`).emit('messageDeleted', {
        messages,
     });
    return {chat};
 }catch(error){
    console.error("Error in deleting Message:", error);
    throw new AppError('Internal server error', 500);
 } // No content
};
}
