declare type QueryOptions<TData, TError> = Omit<
  import('@tanstack/react-query').UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

declare type MutationOptions<TData, TError, TDto = void> = Omit<
  import('@tanstack/react-query').UseMutationOptions<TData, TError, TDto>,
  'mutationKey' | 'mutationFn'
>;

// declare type InfiniteQueryOptions<TData> = Omit<
//   import('@tanstack/react-query').UseInfiniteQueryOptions<
//     TData,
//     BasicErrorModel,
//     import('@tanstack/react-query').InfiniteData<TData>
//   >,
//   'queryKey' | 'queryFn' | 'initialPageParam' | 'getPreviousPageParam' | 'getNextPageParam'
// >;
