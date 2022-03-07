const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const role_enum = [
  "ADMIN",
  "PLANNER",
  "EXECUTIVE",
  "COMMITTEE",
  "FINANCE",
  "USER",
];
const budget_object_enum = ["REPLACE", "EFFICIENCY", "INSTALL"];
const location_enum = ["PRASARNMIT", "ONGKHARAK"];
const status_enum = ["WAITING_COMMITEE", "WAITING_PLANNER"];
// Project
const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  project_no: {
    type: Number,
    required: true,
  },
});
// /////////////////////////////
// TOR Budget
const BudgetTORSchema = new Schema({
  list: {
    type: String,
  },
  unit_price: {
    type: Number,
  },
});
// Status
const StatusSchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: status_enum,
  },
  comment: {
    type: String,
  },
  time_in: { type: Date, default: Date.now },
  time_out: { type: Date, default: Date.now },
  committee: {
    type: String,
  },
  planner: {
    type: String,
  },
});
// Budget List
const BudgetListSchema = new Schema({
  budget_name: {
    type: String,
    required: true,
  },
  budget_no: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  objective: {
    enum: budget_object_enum,
    type: String,
    required: true,
  },
  tor_budget: [BudgetTORSchema],
  quotation_upload: {
    updated: {
      type: Date,
      default: Date.now,
    },
    file_name: {
      type: String,
    },
    file_path: {
      type: String,
    },
  },
  location: {
    type: String,
    enum: location_enum,
  },
  status: [StatusSchema],
});
// Budget
const BudgetSchema = new Schema({
  year: { type: Date, required: true, unique: true },
  list: [BudgetListSchema],
});
// User
const UserSchema = new Schema(
  {
    buasri_id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: role_enum,
      required: true,
    },
    dep: {
      type: String,
      required: true,
    },
    dep_budget: {
      type: String,
      required: true,
    },
    budget: [BudgetSchema],
    project: [ProjectSchema],
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
