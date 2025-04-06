import React from "react";

function SettingForm() {
  return (
    <form className="text-sm md:text-lg font-bold">
      <section className="flex flex-row justify-between items-center px-8 py-8 md:px-12">
        <p>다크모드</p>
        <button className="bg-neutral-100 md:mx-8">버튼</button>
      </section>
      <section className="flex flex-row justify-between items-center px-8 py-8 md:px-12">
        <p>언어</p>
        <div className="flex flex-col gap-2 md:mx-4">
          <label className="flex flex-row gap-1">
            <input type="checkbox" /> <p className="text-sm">한국어</p>
          </label>
          <label className="flex flex-row gap-1">
            <input type="checkbox" /> <p className="text-sm">영어</p>
          </label>
        </div>
      </section>
      <section className="flex flex-row justify-between items-center px-8 py-8 md:px-12">
        <p>생성 갯수</p>
        <input type="number" min={1} max={20} defaultValue={10} className="p-2" />
      </section>
    </form>
  );
}

export default SettingForm;
