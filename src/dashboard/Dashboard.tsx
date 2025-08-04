import { useEffect, useState } from "react";
import SubjectSummary from "src/components/dashboard/SubjectSummary";
import DashboardWrapper from "src/components/wrapper/common/DashboardWrapper";
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
const {clearCache} = useLessonStore()
  useEffect(() => {
    getPrefetchData<Prefill>("dashboard").then((data) => {
      if (data){
         setPrefillData(data)
         clearCache();
      };
    });
  }, []);


  return (
    <div className="container mx-auto">
      <div className="bg-black mx-8 my-5 rounded-lg p-4">
        <div className="flex justify-between ">
          <h2 className="text-[26px] text-lightBlue4">elevia</h2>
          <span className="text-[18px] text-lightBlue4">Dashboard</span>
          <img alt="user" width={50} src="/dashboard/home/user.png" />
        </div>
        <div className="flex flex-col  gap-2 py-10 px-5 md:px-15">
          <div className="bg-[url('/dashboard/home/name-pattern.svg')] bg-cover rounded-b-2xl p-8">
            <h4 className=" border-[1.5px] border-black rounded-md md:rounded-lg px-2 text-sm md:mt-7 md:text-lg md:py-1 lg:px-4 lg:py-2 w-fit">
              {prefillData?.class}
            </h4>
            <h5 className="text-xl md:text-3xl lg:text-4xl xl:text-[4rem] mt-3 lg:mt-6">
              Welcome Back {prefillData?.name ?? "Guest"} 👋
            </h5>
            <h6 className="text-sm md:text-md md:pb-10 lg:text-lg uppercase">
              You're doing great in your studies. Ready for your next lesson?
            </h6>
          </div>
          <Img />
        </div>
      </div>

      <DashboardWrapper
       heading={`${prefillData?.class} - Subjects`}>
        <div className="grid  justify-items-center md:grid-cols-2 xl:grid-cols-3 gap-4">
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
      </DashboardWrapper>

      <div className="p-7 md:p-14 flex flex-col xl:flex-row items-center gap-10 xl:gap-30">
        <div>
          <h4 className="text-center xl:text-left text-5xl xl:text-[4.5rem] text-lightBlue5 uppercase">
            Upcoming Features
          </h4>
          <div className="flex flex-col xl:flex-row items-center gap-10 border-4 border-black rounded-2xl w-fit p-4 sm:p-7 xl:p-10 mt-10">
            <img
              className="w-15 md:w-20"
              width={140}
              src="/dashboard/home/clip-board.png"
            />
            <div>
              <h5 className="text-2xl sm:text-3xl xl:text-[3.5rem]">
                MCQ Practice Tests
              </h5>
              <p className="text-sm sm:text-lg xl:text-xl">
                Practice topic-wise MCQs and assess your <br /> understanding
                instantly.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img width={430} src="/dashboard/home/up-coming.png" alt="icons" />
        </div>
      </div>
    </div>
  );
}
