import axios from "axios";

// Get all category income
export const getAllCategoryIncome = async () => {
  try {
    const response = await axios.get("category-income");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllIncomeByUserAndCategory = async (formattedCurrentYear) => {
  try {
    const response = await axios.get(
      `category-income/dashboard/${formattedCurrentYear}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const putCategoryIncome = async (id: string, payload: any) => {
  try {
    await axios.put(`category-income/${id}`, payload);
    console.log("Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryIncome = async (id: string) => {
  try {
    await axios.delete(`category-income/${id}`);
    console.log("Successfully");
  } catch (error) {
    console.log(error);
  }
};
