export const Loading = () => {
  return (
    <div role="status" className="inline-flex items-center gap-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"/>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <span className="test-sm text-gray-600 dark:text-gray-300 font-medium">Loading...</span>
      <span className="sr-only">Content Loading</span>
    </div>
  );
};
