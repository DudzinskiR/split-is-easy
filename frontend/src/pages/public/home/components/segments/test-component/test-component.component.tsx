import Phone3D from "src/components/phone-3D/phone-3D.component";

const TestComponent = () => {
  return (
    <div className="w-full bg-white h-[1000px] mt-20">
      <Phone3D
        text={"Testowe"}
        width={200}
        height={20}
        length={425}
        radius={20}
      />
    </div>
  );
};

export default TestComponent;
