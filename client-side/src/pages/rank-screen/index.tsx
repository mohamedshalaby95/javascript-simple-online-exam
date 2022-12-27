import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import rankApi from "../../api/rankApi";
import Spinner from "../../components/spinner";

export default function Index() {
    //used it for get query params
  const [searchParams] = useSearchParams();
  const score = searchParams.get("score");
  const [rank, setRank] = useState<number>();
  //make a loading at send request and closed it after git response
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    rankApi
      .post("", { score })
      .then((res) => {
        setLoading(false);
        setRank(res?.data?.rank);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something go wrong refresh the page");
      });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-[100vw] h-[100vh] bg-gray-400 flex flex-col justify-center items-center">
          <span className="text-white font-bold">
            {" "}
            Your Rank Is :
            <span className="font-bold text-black"> {rank?.toFixed(2)}</span>
          </span>
          <button
            className={`mt-8 bg-blue-600 rounded-md font-bold text-white  px-4 py-2`}
            onClick={() => navigate("/practice")}
          >
            Try Again
          </button>
        </div>
      )}
    </>
  );
}
