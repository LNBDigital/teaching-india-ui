import { useEffect } from "react";
import { useLocation } from "react-router";
import FallBack from "src/components/common/Fallback";
import LessonSummary from "src/components/dashboard/LessonSummary";
import DashboardWrapper from "src/components/wrapper/common/DashboardWrapper";
import { getPrefetchData } from "src/lib/getApi";
import { useLessonStore } from "src/lib/store/lessonStore";

interface Prefill {
  id: string;
  name: string;
  feature_icon: string | null;
  image: string | null;
  slug: string;
  total_lessons: number | number;
  total_duration: number | null;
  lessons_read_percentage: string;
  lessons: [
    {
      id: string;
      name: string;
      description: string;
      duration: number;
      pdf: string;
      question_pdf: string;
    feature_icon:string;
      image: string;
      video: string;
      is_read: boolean;
    }
  ];
}

export default function LessonDetail() {
  //use hidden params
  const location = useLocation();
  const subjectId = location.state?.subjectId;
  //set lesson data
  const { cache, setLessonData } = useLessonStore();
  //check if the id is present

useEffect(() => {
  if (subjectId && !cache?.id) {
    getPrefetchData<Prefill>(`subjects/${subjectId}`).then((data) => {
      if (data) {
        setLessonData(data); // Will now merge properly
      }
    });
  }
}, [subjectId]);

if (!cache) return <FallBack /> 

  return (
    <DashboardWrapper className="h-screen" heading={`Subject - ${cache?.name}`}>
      <div className="grid md:grid-cols-3 gap-7 mt-6">
        {cache?.lessons.map((item, index) => (
          <LessonSummary
            key={index}
            lessonId={item.id}
            name={item.name}
            img={item.feature_icon}
            duration={item.duration}
          />
        ))}
      </div>
    </DashboardWrapper>
  );
}
