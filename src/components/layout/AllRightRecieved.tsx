import { Fa0, FaApplePay } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

export const AllRightRecieved = () => {
  const paymentMethods = [<FaApplePay />, <RiVisaLine />];
  return (
    <div className="bg-secondary text-[#F1F1F1] py-6 border-t-2 border-[#333]">
      <div className="container flex items-center justify-center">
        <p>جميع الحقوق محفوظة لدى نادي الطائي © {new Date().getFullYear()}</p>
        {/* <div className="flex gap-2">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="text-3xl border-2 px-2 rounded-lg text-white border-[#333333]"
            >
              {method}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
