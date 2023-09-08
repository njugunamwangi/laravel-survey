export default function PublicQuestionView({question, index, answerChanged}) {
    let selectedOptions = []

    function onCheckboxChange(option, $event) {
        if ($event.target.checked) {
            selectedOptions.push(option.uuid)
        } else {
            selectedOptions = selectedOptions.filter(op => op != option.uuid)
        }
        answerChanged(selectedOptions)
    }

    return (
        <>
            <div className="border-b  border-gray-900/10 pb-12">
                <h2 className="text-base mt-2 font-semibold leading-7 text-gray-900">{ index + 1 } { question.question }</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600"> { question.description } </p>

                <div className="mt-3">
                    { question.type === "select" && (
                        <select
                            onChange={(ev) => answerChanged(ev.target.value)}

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Please select an option</option>
                            {question.data.options.map((option) => (
                                <option key={option.uuid} value={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    )}
                    { question.type === "radio" && (
                        <div className="mt-6 space-y-6">
                            {question.data.options.map((option, ind) => (
                                <div key={option.uuid} className="flex items-center gap-x-3">
                                    <input
                                        id={option.uuid}
                                        name={"question" + question.id}
                                        value={option.text}
                                        onChange={(ev) => answerChanged(ev.target.value)}
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor={option.uuid} className="block text-sm font-medium leading-6 text-gray-900">
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    { question.type === "checkbox" && (
                        <div className="mt-6 space-y-6">
                            {question.data.options.map((option, ind) => (
                                <div key={option.uuid} className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id={option.uuid}
                                            name="comments"
                                            onChange={ev => onCheckboxChange(option, ev)}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor={option.uuid}  className="font-medium text-gray-900">
                                            {option.text}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                    { question.type === "text" && (
                        <div className="col-span-full">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    onChange={ev => answerChanged(ev.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    )}
                    { question.type === "textarea" && (
                        <div className="col-span-full">
                            <div className="mt-2">
                            <textarea
                                id="about"
                                onChange={ev => answerChanged(ev.target.value)}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
