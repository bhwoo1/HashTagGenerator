import InputForm from "./components/main/InputForm";
import Title from "./components/main/Title";

export default function Home() {
  return (
    <div className="flex items-center justify-center md:m-24 m-24 flex-col gap-24">
      <Title />
      <InputForm />
    </div>
  );
}
