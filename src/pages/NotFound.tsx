import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div className="h-screen flex flex-col items-center justify-center gap-2">
            <h4 className="text-4xl">Page Not Found</h4>
            <Link to={"/"} className="inline-flex text-lg">Go back to <HomeIcon className="pl-1" /></Link>
        </div>
    )
}