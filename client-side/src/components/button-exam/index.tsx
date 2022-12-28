
import {ClickHandler, propsButtonExamComponent} from './buttonExam.type'
import { memo } from 'react';

// it is component help me to display the enable answer when send at props

function Index({backgroundColor,text,disabled,AnswerQuestionHandler,answer}:propsButtonExamComponent){
    
    const handleClick: ClickHandler=(text)=>()=>{
        AnswerQuestionHandler(text)
    }
    return (
        <>
             <button className={`mt-8  text-white mx-2 rounded-md w-24 px-4 py-2 ${answer===text?"border-4 border-blue-600 ":""}  ${disabled?"bg-gray-600":`bg-${backgroundColor}-600`} hover:text-black hover:font-bold`} disabled={disabled} onClick={handleClick(text)} >{text}</button>
        </>
    );
};
export default memo(Index)

