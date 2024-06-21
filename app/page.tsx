import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Category from "@/components/Category";
import Footer from "@/components/Footer";

const data = Array.from({ length: 10 });

export default function Home() {
  return (
    <>
      <Banner />
      <Category />
      <div className="mx-4 grid grid-cols-3 gap-4 rounded-3xl border p-4">
        {data.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
      <Footer />
    </>
  );
}
