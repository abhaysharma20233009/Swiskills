const Notification = require('../models/notification');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { io } = require('../app'); // Adjust the path as needed

// Get all notifications for a user
exports.getAllNotifications = async (req, res, next) => {
    const receiver  = req.user._id;
    try{
    const notifications = await Notification.findOne({
        recipient: receiver
    });

    if (!notifications) {
        return { notification: [] }; // Return an empty array if no conversation is found
    }
    return { notification: notifications.notification}; 
    }
catch(error){
    console.error("Error in retrieving notification:", error);
    throw new AppError('Internal server error', 500);
}
};

//send notification
exports.createNotification = (io) => {
    return async (req, res = {}, next) => {
        const { recipientId } = req.params;
        const senderId=req.user._id;
        // Validate recipientId
        if (!recipientId) {
            throw new AppError('Recipient ID is required', 400);
        }
        
        const notificationData = {
            sender:senderId,
            message:"new message",
            timestamp: Date.now(),
            isRead:false,
        };
        try {
            let  notifications= await Notification.findOne({
                recipient: recipientId,
            });
            if (notifications) {
                notifications.notification.push(notificationData);
            } else {
                notifications = await Notification.create({
                    recipient: recipientId,
                    notification: [notificationData],
                });
            }

            await notifications.save();
          
        

            // Emit notification to the recipient's room
            io.to(`${recipientId}-${req.user._id}`).emit('notificationReceived', {
                ...notificationData,
            });
            
            return { notifications };
        } catch (error) {
            console.error("Error creating notification:", error);
            throw new AppError('Unable to send notification', 500);
        }
    };
};

// Mark a notification as read
exports.markAsRead =(io)=>{
    return async (req, res, next) => {
        const { recipientId,notificationId } = req.params;
        
   try{ const notifications = await Notification.findOne({recipient: recipientId });

    if (!notifications) {
        throw new AppError('No Notification found for you', 404);
    }
    const message = await Notification.notification.id(notificationId);
    if (!message) {
        throw new AppError('Notification not found', 404);
    }
    message.isRead = true;
    await notifications.save();
       io.to(`${recipientId}-${req.user._id}`).emit('notificationReceived', {
                ...notifications.notification,
            });
    return {notifications};

    }catch(error){
        console.error("Error mark as Read:", error);
        throw new AppError('Unable to isRead', 500);
    }
};
};

