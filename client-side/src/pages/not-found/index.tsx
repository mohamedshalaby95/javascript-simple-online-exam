import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-400 w-[100vw] h-[100vh] flex items-center  justify-center">
        <div className="h-[1/4] w-[1/2] fs-3  flex flex-col  items-center  justify-center ">
          <img
            className=""
            src="images/page-not-found.png"
            alt="not found icon"
          />

          <button className="mt-8 bg-black text-white  w-full py-2" onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    </>
  );
}
