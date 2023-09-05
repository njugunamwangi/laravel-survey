import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";

export default function SurveyPublicView() {
    const { slug } = useParams()

    const [ survey, setSurvey ] = useState({})

    useEffect(() => {
        axiosClient.get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setSurvey(data)
            })
    }, [])

    return (
        <>
            <pre>
                {JSON.stringify(survey, undefined, 2)}
            </pre>
        </>
    )
}
