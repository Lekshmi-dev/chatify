import Message from "../models/Messages.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
    try {
        const {text} = req.body;
        const image = req.file;
        const{id:receiverId} = req.params;
        const senderId = req.user._id;

        if(!text && !image){
            return res.status(400).json({message:"Text or image is required"});
        }

        if(senderId.equals(receiverId)){
            return res.status(400).json({message:"You cannot send message to yourself"});
        }
        
        const receiverExist = await User.exists({_id:receiverId});
        if(!receiverExist) return res.status(400).json({"message":"Receiver not found! "});

        let imageUrl;
        if(image){
            imageUrl = `/chatImages/${req.file.filename}`;
        }
        const saveMessage = new Message({
               senderId,
               receiverId,
               text,
               image:imageUrl
        });
        await saveMessage.save();
        res.status(201).json(saveMessage);
    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllChatPartners =async (req,res)=>{

    try{
        const loggedInUserId = req.user._id;

         const messages = await Message.find({
                            $or: [
                                { senderId: loggedInUserId },
                                { receiverId: loggedInUserId },
                            ],
                        });
        const chatPartnerIds = [...new Set(messages.map(msg=>msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];

        const chatPartners = await User.find({_id:{$in:chatPartnerIds}}).select("-password");
        return res.status(200).json(chatPartners);
    }catch(error){
        console.log("Error in getChatPartners:", error);
        res.status(500).json({ message: "Server error" });
    }

};