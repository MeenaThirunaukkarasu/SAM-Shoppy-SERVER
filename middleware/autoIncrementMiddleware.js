const mongoose = require('mongoose');
const Counter = require('../models/Counter.model'); // Import the counter model

const autoIncrement = async function (modelName, next) {
  const doc = this;
  try {
    const counter = await Counter.findByIdAndUpdate(
      { orderNumber: modelName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true  }
    );

    doc._id = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = autoIncrement;