import { Suspense, useEffect, useState } from "react";
import FallBack from "src/components/common/Fallback";
import SubjectSummary from "src/components/dashboard/SubjectSummary";
import { getPrefetchData } from "src/lib/getApi";
import { useLessonStore } from "src/lib/store/lessonStore";

interface Prefill {
  name: string;
  class: string;
  subjects: [
    {
      id: string;
      name: string;
      feature_icon: string;
      image: string;
      slug: string;
      total_lessons: number;
      total_duration: number;
      lessons_read_count: number;
      lessons_read_percentage: string;
    }
  ];
}

function Img() {
  const img = ["1.png", "2.png", "3.png", "4.png"];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {img.map((item, index) => (
        <img
          key={index}
          src={`/dashboard/home/${item}`}
          alt="icons"
          className="w-full rounded-2xl"
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [prefillData, setPrefillData] = useState<Prefill | null>(null);
  //refresh the subject data on dashboard - zustand
  const { clearCache } = useLessonStore();
  useEffect(() => {
    getPrefetchData<Prefill>("dashboard").then((data) => {
      if (data) {
        setPrefillData(data);
        clearCache();
      }
    });
  }, []);
  if (!prefillData) return <FallBack />

  return (
    <div className=" ">
      <div className=" bg-black px-3 lg:px-18">
        <div className="container mx-auto">
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
            {/* content */}
            <div className="flex flex-col mt-10 md:mt-24">
              <h2 className="text-white text-xl md:text-[42px] uppercase mb-2 md:mb-4">
                {prefillData?.class}
              </h2>
              <p className="text-white text-xl md:text-[42px] uppercase">
                Welcome Back {prefillData?.name}
              </p>
              <p className="text-white text-sm md:text-[19px]">
                You're doing great in your studies. Ready for your next lesson?
              </p>
            </div>
            <img
              className="w-full max-w-xs lg:w-auto"
              width={400}
              src="/dashboard/home/main.png"
              alt="home-image"
            />
          </div>
          <div className="grid justify-items-center md:grid-cols-2 xl:grid-cols-3 my-10 gap-4">
            {prefillData?.subjects.map((item, index) => (
              <SubjectSummary
                slug={item.slug}
                subjectId={item.id}
                key={index}
                subject={item.name}
                lesson={{
                  completed: item.lessons_read_count,
                  total: item.total_lessons,
                  remaining: item.total_lessons - item.lessons_read_count,
                }}
                img={item.feature_icon}
                read={item.lessons_read_percentage}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 py-4 lg:px-18 lg:py-10">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-center text-2xl md:text-[42px] text-lightBlue5 uppercase">
              Upcoming Features
            </h4>
            <div className="flex flex-col xl:flex-row items-center gap-4 md:gap-10 border-4 border-black rounded-2xl w-fit p-4 sm:p-7 xl:p-10 mt-10">
              <img
                className="w-15 md:w-20"
                width={140}
                src="/dashboard/home/clip-board.png"
              />
              <div>
                <h5 className="text-lg sm:text-3xl xl:text-[37px]">
                  MCQ Practice Tests
                </h5>
                <p className="text-sm sm:text-lg xl:text-xl">
                  Practice topic-wise MCQs and assess your <br /> understanding
                  instantly.
                </p>
              </div>
            </div>
          </div>

          <img
            className="max-w-4/6 md:max-w-2/3"
            width={430}
            src="/dashboard/home/up-coming.png"
            alt="icons"
          />
        </div>
      </div>
    </div>
  );
}
