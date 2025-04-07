import InputForm from "./components/main/InputForm";
import Title from "./components/main/Title";

export default function Home() {
  return (
    <div className="flex items-center justify-center m-20 flex-col gap-12">
      <Title />
      <InputForm />
    </div>
  );
}
