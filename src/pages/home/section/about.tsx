import { useEffect, useRef } from "react";
import { CustomHead, CustomPara } from "../../../components/global";
import {
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { animationOff } from "../../../lib/global/animationOff";

type animation = {
  y: string[];
  x?: string[];
  delay?: number;
  imgSrc: string;
  imgClassName: string;
  className?: string;
  controls?: any;
};

export const Animation = ({
  y,
  x,
  delay,
  imgSrc,
  imgClassName="",
  className,
  controls,
}: animation) => {

  const transition = {
    duration: 1.5,
    ease: "easeIn",
    delay: delay,
  };
  const variant = {
    hidden: {
      opacity: 1,
      y: y[0],
      x: x ? x[0] : 0,
    },
    visible: {
      opacity: 1,
      y: y,
      x: x || 0,
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        variants={variant}
        animate={controls}
        transition={transition}
        className={`absolute animated-element ${className}`}
      >
        <img className={`${imgClassName}`} src={imgSrc} />
      </motion.div>
    </>
  );
};

export default function AboutUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.8 });
  const controls = useAnimation();
  const animateRemove = animationOff();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <div
      ref={sectionRef}
      className="bg-black mx-5 mb-5 gap-6 lg:gap-0 rounded-b-xl p-4 lg:py-15 lg:px-15 flex flex-col lg:flex-row justify-between "
    >
      <div className="flex flex-col gap-4 lg:gap-10 justify-center">
        <CustomHead>ABOUT US</CustomHead>
        <CustomPara className="max-w-2xl text-peach">
          At Elevia, we simplify learning for students from classes 9 to 12.
          With concept-rich videos, concise notes, smart revision tools, and
          engaging quizzes — everything you need is in one place. Our mission is
          simple: study smarter, not harder.
        </CustomPara>
      </div>
    {
      !animateRemove ?   <div
        className="
    relative
    w-full
    max-w-[300px]
    lg:max-w-[630px]
    aspect-[1/1]
    lg:aspect-[1/1]
    overflow-hidden
    bg-no-repeat
    bg-cover
    bg-right
    bg-[url(/home/about-bg.svg)]
  "
      >
        <Animation
          controls={controls}
          delay={0}
          imgClassName="w-[145px]"
          imgSrc="/home/about/Qus.svg"
          y={["-150px", "460px", "440px", "460px"]}
          x={["10px"]}
        />
        <Animation
          controls={controls}
          imgClassName="w-[355px]"
          delay={0.6}
          imgSrc="/home/about/Doubt.svg"
          y={["-100px", "520px", "500px", "520px"]}
          x={["153px"]}
        />
        <Animation
          controls={controls}
          delay={0.9}
          imgClassName="w-[170px]"
          imgSrc="/home/about/Notes.svg"
          y={["-100px", "420px", "400px", "420px"]}
          x={["130px"]}
        />
        <Animation
          controls={controls}
          delay={1.2}
          imgClassName="w-[220px]"
          imgSrc="/home/about/Quizzes.svg"
          y={["-100px", "310px", "300px", "320px"]}
          x={["160px"]}
        />
        <Animation
          controls={controls}
          delay={1.4}
          imgClassName="w-[95px]"
          imgSrc="/home/about/Video.svg"
          y={["-100px", "210px", "220px", "240px"]}
          x={["100px"]}
        />
        <Animation
          controls={controls}
          delay={1.6}
          imgClassName="w-[370px]"
          imgSrc="/home/about/Lecture.svg"
          y={["-175px", "190px", "170px", "190px"]}
          x={["220px"]}
        />
      </div> 
      : 
      <div>
        <img src="/gif/home/about.svg" />
        </div>
    }
    </div>
  );
}
