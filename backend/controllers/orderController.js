import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Add new orders
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //check fot orderItems array and if its empty?
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    //if there are order Items
    const order = new Order({
      //the fields are based on Order model.
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // res.send("get my orders");
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get orders by id
// @route   GET /api/orders/:id
// @access  Private
const getOrdersById = asyncHandler(async (req, res) => {
  // res.send("get order by id");
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // As the order donot have the fields name and email, we are using the user to get name and email.

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // res.send("update order to paid");
  const order = await Order.findById(req.params.id);

  if (order._id) {
    order.isPaid = true;

    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: req.body._id,
    //   status: req.body.status,
    //   update_time: req.body.update_time,
    //   email_address: req.body.payer.email_address,
    // };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrder,
};
