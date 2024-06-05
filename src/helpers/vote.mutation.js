import useSWRMutation from "swr/mutation";

const fetcherVote = async (url, { arg }) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res.json();
};

const useVoteMutation = () => {
  return useSWRMutation(
    `createAuth`,
    (url, data) => fetcherVote("/api/vote", data),
    {
      onSuccess: (data) => {},
    }
  );
};

export { useVoteMutation };
