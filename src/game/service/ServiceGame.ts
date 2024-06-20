import api from "../../api/api";

const fetchQuestions = async () => {
  const response = await api.get("", {
    params: {
      amount: 10,
      category: 18,
      difficulty: "easy",
      type: "multiple",
    },
  });
  console.log(response.data.results);
  return response.data.results;
};

export default fetchQuestions;
