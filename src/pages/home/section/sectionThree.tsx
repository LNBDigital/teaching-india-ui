import { useRef, useEffect } from "react";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { CustomHead } from "../../../components/global";
import { RulesBox } from "../../../components/layout/home/components";
import {
  useScroll,
  useTransform,
  motion,
  cancelFrame,
  frame,
} from "framer-motion";

type RuleItem = {
  heading: string;
  sub: string;
};

type AnimatedRuleBoxProps = {
  item: RuleItem;
  index: number;
};

function AnimatedRuleBox({ item, index }: AnimatedRuleBoxProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [50, 600]);

  return (
    <motion.div
      ref={containerRef}
      className="rounded-2xl min-h-[400px] bg-white"
      style={{
        opacity: cardOpacity,
        y: cardY,
        zIndex: 1 - index, // stack properly
      }}
    >
      <RulesBox
        spanContent={index + 1}
        headingContent={item.heading}
        subHeading={item.sub}
      />
    </motion.div>
  );
}

export default function SectionThree() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  const ruleData: RuleItem[] = [
    {
      heading: "Teaching that ignites curiosity",
      sub: "Through storytelling, visuals, and clarity, our teaching makes even the toughest chapters feel interesting — because real learning starts with curiosity.",
    },
    {
      heading: "Interactive & Visual Learning",
      sub: "We use rich media, real-world examples, and bite-sized concepts to keep learners engaged from the first second to the last.",
    },
    {
      heading: "Built for Every Learner",
      sub: "From quick revision to deep understanding, our approach adapts to different learning styles and speeds.",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="p-uno py-[10rem] flex flex-wrap items-start gap-16">
        {/* Left Side Content */}
        <div className="flex-1 min-w-[300px] sticky top-[150px] self-start">
          <div className="grid gap-10">
            <CustomHead className="uppercase text-black leading-16 tracking-wide text-[64px]">
              <span className="text-blue">
                Smart Learning <br />
              </span>
              Start Right <br /> Here
            </CustomHead>
            <CustomBlueImgBtn>Start Learning</CustomBlueImgBtn>
          </div>
        </div>

        {/* Right Side Rules Boxes */}
        <div className="flex-1 min-w-[300px] flex flex-col gap-12">
          {ruleData.map((item, i) => (
            <AnimatedRuleBox key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
