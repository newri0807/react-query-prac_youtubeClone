import { useQueryClient, useQuery } from "react-query";

export default function useList(props) {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    [`${props[0]}`, props[1]],
    async () => {
      const res = await fetch(`${props[1]}`);
      return await res.json();
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const updateData = () => {
    queryClient.invalidateQueries(`${props[0]}`);
  };

  return { isLoading, isError, data, error, updateData };
}
