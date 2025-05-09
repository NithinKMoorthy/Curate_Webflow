const SkeletonLoader = () => (
    <div className="p-6 font-sans bg-white animate-pulse space-y-6">
      <div className="flex items-center mb-2 space-x-3">
        <div className="h-4 w-32 bg-gray-200 rounded-full blur-sm" />
        <div className="h-4 w-16 bg-gray-200 rounded-full blur-sm" />
      </div>
  
      <div className="h-6 w-3/4 bg-gray-300 rounded-md blur-sm mb-4" />
  
      <div className="flex border-b mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded blur-sm mr-4" />
        <div className="h-6 w-32 bg-gray-100 rounded blur-sm" />
      </div>
  
      <div className="bg-gray-100 rounded-lg p-6 mb-5 space-y-4">
        <div className="h-5 w-40 bg-gray-300 rounded blur-sm" />
        <div className="h-4 w-full bg-gray-200 rounded blur-sm" />
        <div className="h-4 w-5/6 bg-gray-200 rounded blur-sm" />
        <div className="h-4 w-2/3 bg-gray-200 rounded blur-sm" />
      </div>
  
      <div className="bg-gray-100 rounded-lg p-6 space-y-3">
        <div className="h-5 w-40 bg-gray-300 rounded blur-sm" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 rounded blur-sm" />
          <div className="h-20 bg-gray-200 rounded blur-sm" />
        </div>
      </div>
    </div>
  );
  