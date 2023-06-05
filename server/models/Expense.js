import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  empName: String,
  empId: String,
  projName: String,
  projId: String,
  billProof: { type: String, default: 'Resource Link' },
  status: { type: String, default: 'InProcess' },
  amount: Number,
  description: String,
  user_id: mongoose.Types.ObjectId,
  currentStatus: {
    type: String,
    enum: [
      'EmployeeRequested',
      'HRApproved',
      'DirectorApproved',
      'FinanceDepartmentApproved',
    ],
    default: 'EmployeeRequested',
  },
  date: { type: Date, default: new Date() },
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model('Expense', expenseSchema);
