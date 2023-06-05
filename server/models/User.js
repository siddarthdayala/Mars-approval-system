import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: ['First name field is required'] },
    lastName: { type: String, required: ['Last name field is required'] },
    email: { type: String, required: ['Email field is required'] },
    password: { type: String, required: ['Password field is required'] },
    userId: { type: String, required: ['employee Id field is required'] },
    userType: {
      type: String,
      enum: ['Admin', 'Employee', 'HR', 'Director', 'FinanceDept'],
      default: 'Employee',
    },
  },
  { timestamps: true }
);

export default new mongoose.model('User', userSchema);
