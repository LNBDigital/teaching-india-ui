import { Link } from "react-router-dom";


export default function LessonSummary({slug,id,name="lesson",img,duration}){
    return(
        <Link to={`/subject/${slug}`} state={{id}} className="p-7 relative bg-peach2 rounded-xl h-[7cm] w-full max-w-lg">
            <p className="text-[2rem] absolute top-15">{name}</p>
            <img alt="icons" className="absolute top-15 right-7" src={img} />
            <div className="w-xs absolute bottom-7 grid gap-2">
                <span>{duration} mins.</span>
            </div>
        </Link>
    )
}