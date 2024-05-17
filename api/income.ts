import axios from "axios";

// Get user incomes
export const getAllIncome = async () => {
  try {
    const response = await axios.get("/income");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getIncomeByCategoryInYear = async (
  idCategory: string | number,
  year: number | string
) => {
  try {
    const response = await axios.get(
      `/income/detail/category/${idCategory}/year/${year}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Add income
export const addIncome = async (value) => {
  try {
    const response = await axios.post("/income", value);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Delete income
export const deleteIncome = async (incomeId) => {
  try {
    const response = await axios.delete(`/income/${incomeId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Update income
export const updateIncome = async (incomeId, data) => {
  try {
    const response = await axios.put(`/income/${incomeId}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
