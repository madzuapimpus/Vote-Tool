import useSWRMutation from "swr/mutation";

const fetcher = async (url, { arg }) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res.json();
};

const useQuestionMutation = () => {
  return useSWRMutation(
    "questions",
    (url, data) => {
      return fetcher("/api/questions", data);
    },
    {
      onSuccess: (data) => {},
    }
  );
};

export { useQuestionMutation };
