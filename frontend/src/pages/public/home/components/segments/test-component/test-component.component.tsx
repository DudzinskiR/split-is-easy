import Phone3D from "src/components/phone-3D/phone-3D.component";

const TestComponent = () => {
  return (
    <div className="w-full bg-white h-[1000px] mt-20">
      <Phone3D text={"Testowe"} width={200} height={425} length={15} />
      {/* <div className="absolute-center absolute">
        <div className="">
          <div className="absolute w-[150px] h-[300px] bg-red-500 rounded-xl"></div>
          <div className="absolute w-[150px] h-[300px] bg-blue-500 flex justify-center items-center rounded-xl">
            <div className="text-2xl text-white">Losowy tekst</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TestComponent;
