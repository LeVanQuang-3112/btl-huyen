import axios from "axios";

// Get user Expenses
export const getAllFixedExpense = async () => {
  try {
    const response = await axios.get("fixed-expense");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Add Expense
export const addFixedExpense = async (value) => {
  try {
    const response = await axios.post("fixed-expense", value);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Delete Expense
export const deleteFixedExpense = async (ExpenseId) => {
  try {
    const response = await axios.delete(`fixed-expense/${ExpenseId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Update Expense
export const updateFixedExpense = async (ExpenseId, data) => {
  try {
    const response = await axios.put(`fixed-expense/${ExpenseId}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
