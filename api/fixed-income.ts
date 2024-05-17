import axios from "axios";

// Get user Incomes
export const getAllFixedIncome = async () => {
  try {
    const response = await axios.get("fixed-income");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Add Income
export const addFixedIncome = async (value) => {
  try {
    const response = await axios.post("fixed-income", value);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Delete Income
export const deleteFixedIncome = async (IncomeId) => {
  try {
    const response = await axios.delete(`fixed-income/${IncomeId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Update Income
export const updateFixedIncome = async (IncomeId, data) => {
  try {
    const response = await axios.put(`fixed-income/${IncomeId}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
