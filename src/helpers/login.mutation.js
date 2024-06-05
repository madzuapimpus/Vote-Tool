import useSWRMutation from "swr/mutation";

const fetcherLogin = async (url, { arg }) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res.json();
};

const useLoginMutation = () => {
  return useSWRMutation(`createAuth`, (url, data) =>
    fetcherLogin("/api/login", data)
  );
};
export { useLoginMutation };
