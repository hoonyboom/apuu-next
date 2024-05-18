import { MaxWidthWrapper } from "@/components";

export default function Home() {
  return (
    <div className="container min-h-screen bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8"></MaxWidthWrapper>
      </section>
    </div>
  );
}
