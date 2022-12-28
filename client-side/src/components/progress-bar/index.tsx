import { propProgressBarComponent } from "./progressBar.types";

 // i send the value for this component to detected the percent of answered questions
export default function index({percent}: propProgressBarComponent) {
  return (
    <>
      <div className="w-full bg-gray-500 rounded-full h-2.5 dark:bg-gray-800">
        <div className={`bg-blue-600 h-2.5 rounded-full `} style={{width:`${percent}%`}}></div>
      </div>
    </>
  );
}