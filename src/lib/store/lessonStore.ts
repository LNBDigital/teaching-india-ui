// src/store/lessonStore.ts
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface Lesson {
  id: string;
  name: string;
  description: string;
  duration: number;
  pdf: string;
  question_pdf: string;
  image: string;
  video: string;
  is_read: boolean;
}

interface DataType {
  id: string;
  name: string;
  feature_icon: string | null;
  image: string | null;
  slug: string;
  total_lessons: number;
  total_duration: number | null;
  lessons_read_percentage: string;
  lessons: Lesson[];
}

interface LessonState {
  cache: DataType | null // cache by subject ID
  setLessonData: ( data: DataType) => void;
  clearCache:()=>void;
}

export const useLessonStore = create<LessonState>()(
    persist(
        (set)=> ({
            cache:null,
            setLessonData:(data)=> set({cache:data}),
            clearCache:()=>set({cache:null})
        }),
        {
            name:'lessonStorage'
        }
    )
)   