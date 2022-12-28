
import { useNavigate } from 'react-router-dom';

export default function Index(){
    const navigate = useNavigate();
    return (
        <div className="w-[100vw] h-[100vh] bg-cover bg-right " style={{backgroundImage:`url('images/home-page-image.jpg')`}} >
           <div className="bg-black opacity-75 fixed top-0 right-0 left-0 bottom-0"></div>
            <div>
            <button
            className={`mt-8 z-50 bg-blue-600 rounded-md font-bold text-white  px-4 py-2 fixed top-[50%] right-[25%]`}
            onClick={() => navigate("/practice")}
          >
            Start Exam
          </button>
            </div>
        </div>
    );
};

