export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-10 w-40 rounded-full bg-white/10" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
          <div className="rounded-[34px] border border-white/10 bg-white/5 p-8">
            <div className="h-4 w-40 rounded bg-white/10" />
            <div className="mt-5 h-14 w-3/4 rounded bg-white/10" />
            <div className="mt-4 h-6 w-5/6 rounded bg-white/10" />
            <div className="mt-8 flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-8 w-24 rounded-full bg-white/10" />
              ))}
            </div>
          </div>
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <div className="h-4 w-28 rounded bg-white/10" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-14 rounded-2xl bg-white/10" />
              ))}
            </div>
          </div>
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[30px] border border-white/10 bg-white/5 p-6"
          >
            <div className="h-4 w-44 rounded bg-white/10" />
            <div className="mt-5 h-28 rounded-[24px] bg-white/10" />
          </div>
        ))}
      </div>
    </main>
  );
}
