import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import Loading from "../components/core/Loading.jsx";
import NotFound from "../components/core/NotFound.jsx";
import PublicQuestionView from "../components/PublicQuestionView.jsx";
import TButton from "../components/core/TButton.jsx";
import {useStateContext} from "../context/ContextProvider.jsx";
import Toast from "../components/core/Toast.jsx";

export default function SurveyPublicView() {
    const answers = {}
    const { slug } = useParams()
    const { showToast } = useStateContext({})

    const [ survey, setSurvey ] = useState({
        questions: []
    })

    const [ error, setError ] = useState("")

    const [ loading, setLoading ] = useState(false)
    const [ surveyFinished, setSurveyFinished ] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setSurvey(data.data)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setLoading(false)
                    setError(error.response.data)
                }
            })
    }, [])

    function answerChanged(question, value) {
        answers[question.id] = value
        console.log(question, value)
    }

    function onSubmit(ev) {
        ev.preventDefault()

        axiosClient.post(`/survey/${survey.id}/answer`, {answers})
            .then((response) => {
                setSurveyFinished(true)
                showToast('Survey submitted successfully', 'success')
            })
    }

    return (
        <>
            {loading && (
                <Loading />
            )}

            {!loading && (
                <>
                    {error && (<div> <NotFound message={error} /> </div>)}

                    {surveyFinished && (
                        <>
                            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                                <div className="text-center">
                                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">Thank You for taking part in the survey</h1>
                                </div>
                            </main>
                        </>
                    )}

                    {!surveyFinished && (
                        <>
                            <form onSubmit={ev => onSubmit(ev)}>
                                <div className="mx-auto m-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                            <img
                                                src={ survey.image_url }
                                                alt={ survey.title }
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{survey.title}</h1>

                                        <div>
                                            <h3 className="italic my-4 font-semibold">Survey Description</h3>

                                            <div className="space-y-6">
                                                <p className="text-sm text-gray-900">Expire Date: {survey.expire_date}</p>
                                                <p className="text-sm text-gray-900">{survey.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto m-6 max-w-6xl">
                                    {survey.questions.map((question, index) => (
                                        <PublicQuestionView
                                            key={question.id}
                                            question={question}
                                            index={index}
                                            answerChanged={val => answerChanged(question, val)}
                                        />
                                    ))}
                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <TButton>
                                            Submit Survey
                                        </TButton>
                                    </div>
                                </div>


                            </form>
                        </>
                    )}

                    <Toast />
                </>
            )}
        </>
    )
}
