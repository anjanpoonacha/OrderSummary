const express = require('express');
const mongoose = require('mongoose');

const app = express();

const orderSchema = mongoose.Schema({
  isActive: {
    type: Boolean
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Order should have a userID']
  },
  orderedAt: {
    type: Date,
    required: [true, 'Order should have the Order Date']
  }
});

const userSchema = mongoose.Schema({
  name: String
});

const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);

const getDeliveryDate = async (uid, orderedAt, isActive = false) => {
  try {
    const user = await User.findById(uid);
    const { name } = user;

    console.log(`Ordered by ${name} on ${orderedAt} ${isActive}`);

    console.log(
      `Delivery is on ${dateLogic(orderedAt, isActive).toUTCString()}`
    );
  } catch (err) {
    console.log(err);
  }
};

const dateLogic = (orderedAt, isActive) => {
  const day = orderedAt.getDay();
  let numFri;
  if (day !== 4 && day !== 5 && day !== 6 && !isActive) {
    // provided: First day of the week is Sunday and NOT Monday
    numFri = 5;
    console.log(`Delivery is on current week's friday`);
  } else if (day !== 4 && day !== 5 && day !== 6 && isActive) {
    // provided: First day of the week is Sunday and NOT Monday
    numFri = 12;
    console.log(`Delivery is on next week's friday`);
  } else {
    numFri = 12;
    console.log(`Delivery is on next week's friday`);
  }
  const add = numFri - day;
  deliveryDate = new Date();
  deliveryDate.setDate(orderedAt.getDate() + add);
  return deliveryDate;
};

const orderData = async userID => {
  try {
    user = {
      ...(await Order.findOne({ userId: userID }))._doc
    };
    const { userId, orderedAt } = user;
    const isActive = user.isActive || false;
    getDeliveryDate(userId, orderedAt, isActive);
  } catch (err) {
    console.log(err);
  }
};

// 5de63de00d874733642084ca - Saturday order
// 5de63de00d874733642084ce - friday order
// 5de63de00d874733642084cd - thursday order
// 5de63de00d874733642084cc - wednesday order
// 5de63de00d874733642084cb - tuesday order
// 5de6298bc336250d48b992b6 - monday order
// 5de629500d23052a108b37f8 - sunday order

orderData('5de63de00d874733642084cb');

module.exports = app;

// (async () => {
//   const query = await Order.findOneAndDelete({
//     userId: '5de629500d23052a108b37f8'
//   });
//   console.log(query);
// })();

// User.create(
//   { name: '3' },
//   { name: '4' },
//   { name: '5' },
//   { name: '6' },
//   { name: '7' }
// );

// Order.create({
//   userId: '5de6298bc336250d48b992b6',
//   isActive: true,
//   orderedAt: new Date('2019-12-07T09:22:24.467Z')
// });
