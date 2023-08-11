import {useEffect, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import {PlusIcon, TrashIcon} from "@heroicons/react/20/solid/index.js";

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange
                                       }) {
    const [model, setModel] = useState({...question})
    const { questionTypes } = useStateContext()

    useEffect(() => {
        questionChange(model)
    }, [model])

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className="flex justify-between mb-3">
                <h4>
                    {index + 1}. {model.question}
                </h4>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        onClick={() => addQuestion(index + 1)}
                    >
                        <PlusIcon className="w-4" /> Add
                    </button>
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
                        onClick={() => deleteQuestion(question)}
                    >
                        <TrashIcon className="w-4" /> Delete
                    </button>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* Question Text */}
                <div className="sm:col-span-4">
                    <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">
                        Question
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="question"
                            id="question"
                            value={model.question}
                            onChange={(ev) =>
                                setModel({...model, question: ev.target.value})
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {/* Question Text */}

                {/* Question Type */}
                <div className="sm:col-span-2">
                    <label htmlFor="questionType" className="block text-sm font-medium leading-6 text-gray-900">
                        Question Type
                    </label>
                    <div className="mt-2">
                        <select
                            id="questionType"
                            name="questionType"
                            value={model.type}
                            onChange={(ev) =>
                                setModel({...model, type: ev.target.value})
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select type of question</option>
                            {questionTypes.map((type) => (
                                <option value={type} key={type} >
                                    {upperCaseFirst(type)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Question Type */}
            </div>

            <div>
                {/* Description */}
                <div className="col-span-full">
                    <label htmlFor="questionDescription" className="block text-sm font-medium leading-6 text-gray-900">
                        Question Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="questionDescription"
                            name="questionDescription"
                            rows={3}
                            value={model.description}
                            onChange={(ev) =>
                                setModel({...model, description: ev.target.value})
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences describing the question.</p>
                </div>
                {/* Description */}
            </div>
        </>
    )
}
