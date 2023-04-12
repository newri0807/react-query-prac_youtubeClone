import { useQuery } from "react-query";

export default function useList(props) {
  const { isLoading, isError, data, error } = useQuery(
    [`${props[0]}`],
    async () => {
      const res = await fetch(`${props[1]}`);
      return await res.json();
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return { isLoading, isError, data, error };
}
