export default function ApplicationsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="bg-[#0d0d14] border border-white/5 rounded-2xl overflow-hidden">
        <div className="hidden md:block">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.03]">
            <div className="h-4 w-32 bg-white/5 rounded"></div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 border-b border-white/5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-white/5 rounded"></div>
                <div className="h-3 w-1/4 bg-white/5 rounded"></div>
              </div>
              <div className="w-24 h-8 bg-white/5 rounded-lg ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
