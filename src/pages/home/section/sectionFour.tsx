import { motion } from "framer-motion";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { PotentialBox } from "../../../components/layout/home/components";
import { animationOff } from "../../../lib/global/animationOff";

export default function SectionFour() {
  const removeAnimate = animationOff();
  const boxData = [
    { class: 9, subHead: "Foundation for higher studies" },
    { class: 10, subHead: "Comprehensive coverage" },
    { class: 11, subHead: "Advanced concepts" },
    { class: 12, subHead: "Preparation with specialized" },
  ];

  return (
    <div className={`bg-blue px-5 py-[28px] lg:mt-0 ${!removeAnimate ? "pt-5" : "pt-14"}`}>
      <div className="container mx-auto">
        <div className="bg-peach rounded-4xl py-5 border-black border-2 relative">
          {/* Headings */}
          <div className="text-center">
            <h4 className="text-3xl lg:text-[64px]">Unlock your potential</h4>
            <p className="text-md lg:text-[36px] text-black">
              Start your journey by selecting <br /> your class
            </p>
          </div>
      {!removeAnimate &&     <div className="sideImage ">
            <img
              className="absolute top-4 lg:top-17 rotate-45 -left-30 max-w-[300px] w-[70px] lg:w-fit"
              src="/home/potential/Book.svg"
            />
            <img
              className="absolute top-36 lg:top-24 left-60 lg:left-70 z-20"
              src="/home/potential/Star2.svg"
            />
            <img
              className="absolute top-14 lg:top-20 right-[12%] z-20"
              src="/home/potential/Star.svg"
            />
            <img
              className="absolute lg:top-[15%]  lg:right-20 z-20"
              src="/home/potential/RollingLine.svg"
            />
            <img
              className="absolute top-[18%] -right-5 z-20"
              src="/home/potential/Pencil.svg"
            />
          </div> }

          {/* Animated Potential Boxes */}
          <div className="my-10 lg:my-20  flex flex-wrap justify-center gap-10 lg:gap-6 ">
            {boxData.map((item, index) => (
              <motion.div
                className="z-20"
                key={index}
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 1, delay: index * 0.20 },
                }}
                viewport={{ amount: 0.2 }}
              >
                <PotentialBox spanNumb={item.class} content={item.subHead} />
              </motion.div>
            ))}

            <motion.img
              src="/home/potential/rainbow.svg"
              className="absolute w-full z-10"
              initial={{ opacity: 0, y: "200px" }}
              whileInView={{
                opacity: !removeAnimate ? 1: 0,
                y: "-210px",
                transition: { duration: 0.8 },
              }}
            />
          </div>
          {/* Description + Button */}
          <div className="px-4 lg:px-10 pb-50 lg:pt-[30rem] flex">
            <div className="flex flex-col gap-5 relative z-20">
              <h4 className="text-4xl lg:text-[64px] lg:leading-[60px]">
                How does learning <br />
                happen here?
              </h4>
              <p className="text-2xl lg:text-[36px] text-black">
                Start your journey by <br />
                selecting your class
              </p>
              <div className="mt-0 lg:mt-10">
                <CustomBlueImgBtn className="">Register Now</CustomBlueImgBtn>
              </div>
            </div>
            <div className="absolute bottom-20 left-0 my-0 lg:left-10 lg:my-10">
              <img src="/gif/home/steps.gif" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
