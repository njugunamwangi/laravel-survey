import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import Loading from "../components/core/Loading.jsx";
import NotFound from "../components/core/NotFound.jsx";
import PublicQuestionView from "../components/PublicQuestionView.jsx";

export default function SurveyPublicView() {
    const { slug } = useParams()

    const [ survey, setSurvey ] = useState({
        questions: []
    })

    const [ error, setError ] = useState("")

    const [ loading, setLoading ] = useState(false)

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

    return (
        <>
            {loading && (
                <Loading />
            )}

            {!loading && (
                <>
                    {error && (<div> <NotFound message={error} /> </div>)}

                    <form>
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
                                    <h3 className="italic m-4 font-semibold">Survey Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-sm text-gray-900">Expire Date: {survey.expire_date}</p>
                                        <p className="text-sm text-gray-900">{survey.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto m-6 max-w-6xl">
                            {survey.questions.map((question, index) => (
                                <PublicQuestionView key={question.uuid} question={question} index={index} />
                            ))}
                        </div>
                    </form>
                </>
            )}
        </>
    )
}
