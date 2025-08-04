import { Link } from "react-router-dom";


export default function SubjectSummary({slug,subjectId,subject="subject",lesson:{completed=3,total=8,remaining=7},img,read="42%",...props}){
    return(
        <Link {...props} to={`/subject/${slug}`} state={{subjectId}} className="p-7 relative bg-peach2 rounded-xl h-[7cm] w-full max-w-lg">
            <p className="text-[2rem] absolute top-15">{subject}</p>
            <img width={120} alt="icons" className="absolute top-15 right-7" src={img} />
            <div className="w-[7cm] md:w-xs absolute bottom-7 grid gap-2">
                <span>You've completed {completed} of {total} lessons</span>
                <hr className="bg-black h-2 rounded-lg after:absolute after:w-20 after:bg-blue after:h-2 after:rounded-lg after:top-8" />
                <p className="inline-flex justify-between">{read} Complete<span>{remaining} lessons remaining</span></p>
            </div>
        </Link>
    )
}