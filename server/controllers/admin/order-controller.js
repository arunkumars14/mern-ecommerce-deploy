const Order = require("../../models/Order")


const getAllOrdersOfAllUsers = async(req, res) => {
    try {


       const orders = await Order.find({})

        if(!orders.length){
            return res.status(404).json({
                success: false,
                message: "No orders Found"
            })

        }

        res.status(200).json({
            success: true,
            data: orders
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}

const getOrderDetailsForAdmin = async(req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id)
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}

const updateOrderStatus = async(req, res) => {
    try {
        const {id} = req.params
        const {orderStatus} = req.body;
        const order = await Order.findById(id)
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        await Order.findByIdAndUpdate(id, {orderStatus}, { new: true })

        res.status(200).json({
            success: true,
            message: "Order status is updated successfully"
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}


module.exports = {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus}