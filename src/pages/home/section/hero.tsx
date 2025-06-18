import { easeInOut, motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { CustomHead } from "../../../components/global";

export default function Hero() {
  // const letter = "elevia";
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // // Animation variants
  // const containerVariants = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  // const letterVariants = {
  //   hidden: { opacity: 0, x: -18 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeInOut",
  //       type: "tween",
  //     },
  //   },
  // };

  return (
    <div className="bg-black mx-5 p-uno" ref={textRef}>
      <div className="container mx-auto">
        <div className="flex justify-between">
          {/* Left Content */}
          <div className="flex flex-col gap-10 items-center max-w-[50%] justify-center">
            {/* <motion.div
              className="flex tracking-normal"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {letter.split("").map((char, index) => (
                <motion.p
                  key={index}
                  variants={letterVariants}
                  className="text-lightBlue gellatio flex md:text-[210px] h-[6cm] will-change-transform"
                >
                  {char}
                </motion.p>
              ))}
            </motion.div> */}
            <img src="/home/elevia.gif"  />

            <CustomHead>Elevate Learning. Empower Minds.</CustomHead>
            <CustomBlueImgBtn>Start Learning</CustomBlueImgBtn>
          </div>

          {/* Right Animations */}
          <div className="relative max-w-[475px]">
            <img
              className="float-right relative"
              src="/home/animation/bg.svg"
            />

            <motion.img
              className="absolute right-50 top-10 will-change-transform"
              src="/home/animation/bulb-light.svg"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src="/home/animation/bulb.svg"
              className="absolute right-50 top-10 will-change-transform"
            />
            <motion.img
              src="/home/animation/girl.svg"
              className="absolute left-[10%] top-20 will-change-transform"
            />
            <motion.img
              src="/home/animation/eyes.svg"
              className="absolute left-[10%] top-20 will-change-transform"
              initial={{ y: 76, x: 64 }}
              animate={{ x: [60, 62, 64, 62, 60] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.img
              className="absolute right-26 top-0 will-change-transform"
              src="/home/animation/star.svg"
              animate={{ scale: [0.1, 1.1, 0.1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              className="absolute right-26 top-30 will-change-transform"
              src="/home/animation/notebook.svg"
              animate={{ scale: [0.6, 0.8, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.img
              className="absolute left-[7%] bottom-60 will-change-transform"
              src="/home/animation/cloud.svg"
              animate={{ y: [-60, -80, -60], x: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <motion.img
              className="absolute left-[14%] bottom-0 will-change-transform"
              src="/home/animation/pencil.svg"
              animate={{ y: [-80, -120, -80] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.img
              className="absolute right-0 bottom-[36%] will-change-transform"
              src="/home/animation/aeroplane.svg"
              animate={{
                rotate: [10, -20, 10], // smooth nose tilt
                y: [-20, -80, -20], // gentle vertical arc
                x: [0, 5, 0], // slight forward nudge
              }}
              transition={{
                duration: 2.5,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              className="absolute left-[35%] bottom-68 will-change-transform"
              src="/home/animation/book.svg"
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ duration: 4, ease: easeInOut, repeat: Infinity }}
            />
            <motion.img
              className="absolute right-10 bottom-36 will-change-transform"
              src="/home/animation/spinner.svg"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="absolute right-13 bottom-16 p-4 will-change-transform"
        animate={{ filter: ["invert(40%)", "invert(70%)", "invert(0%)"] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            >
              <img src="/home/animation/arrow2.svg" />
            </motion.div>

            <img
              className="absolute right-[35%] bottom-20 will-change-transform"
              src="/home/animation/boy.svg"
            />
            <motion.img
              src="/home/animation/boy-eyes.svg"
              className="absolute left-[32%] bottom-[30%] will-change-transform"
              initial={{ y: 76, x: 64 }}
              animate={{ x: [58, 60, 62, 64, 62, 60, 58] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
