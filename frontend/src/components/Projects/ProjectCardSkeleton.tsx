export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Name */}
      <div className="h5 bg-gray-200 rounded w-3/4"></div>

      {/* Meta */}
      <div className="flex justify-between pt-2">
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};
