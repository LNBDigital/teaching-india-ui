import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { CustomHead } from "../../../components/global";

export default function Hero() {
  const letter = "elevia";
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20% 0px" }); // Add margin to delay trigger
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div className="bg-black mx-5 p-uno " ref={textRef}>
      <div className="container mx-auto">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex tracking-normal">
            {letter.split("").map((char, index) => (
              <motion.p
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="text-lightBlue gellatio flex md:text-[210px] h-[6cm]"
              >
                {char}
              </motion.p>
            ))}
          </div>
          <CustomHead>Elevate Learning. Empower Minds.</CustomHead>
          <CustomBlueImgBtn>Start Learning</CustomBlueImgBtn>
        </div>
        <div>
          <img src="/gif/home/home.gif" className="float-right" />
        </div>
      </div>
      </div>
    </div>
  );
}
