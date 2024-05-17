import axios from "axios";

// Get all category expense
export const getAllCategoryExpense = async () => {
  try {
    const response = await axios.get("category-expense");
    console.log(response, "res all");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllExpenseByUserAndCategory = async (formattedCurrentYear) => {
  try {
    const response = await axios.get(
      `category-expense/dashboard/${formattedCurrentYear}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postCategoryExpense = async (payload: any) => {
  try {
    const response = await axios.post("category-expense", payload);
    console.log(response, "res");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const putCategoryExpense = async (id: string, payload: any) => {
  try {
    await axios.put(`category-expense/${id}`, payload);
    console.log("Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryExpense = async (id: string) => {
  try {
    console.log(id, "id delete");
    await axios.delete(`category-expense/${id}`);
    console.log("Successfully");
  } catch (error) {
    console.log(error);
  }
};
