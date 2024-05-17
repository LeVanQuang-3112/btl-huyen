import axios from "axios";

// Get user Expenses
export const getAllExpense = async () => {
  try {
    const response = await axios.get("/expense");
    console.log(response, "res");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getExpenseByCategoryInYear = async (
  idCategory: string | number,
  year: number | string
) => {
  try {
    const response = await axios.get(
      `/expense/detail/category/${idCategory}/year/${year}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Add Expense
export const addExpense = async (value) => {
  try {
    const response = await axios.post("/expense", value);
    console.log(response, "response add expense");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Delete Expense
export const deleteExpense = async (ExpenseId) => {
  try {
    const response = await axios.delete(`/expense/${ExpenseId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Update Expense
export const updateExpense = async (ExpenseId, data) => {
  try {
    const response = await axios.put(`/expense/${ExpenseId}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
