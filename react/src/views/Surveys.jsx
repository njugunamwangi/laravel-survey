import PageComponent from "../components/PageComponent.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/20/solid/index.js";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import PaginationLinks from "../components/PaginationLinks.jsx";

export default function Surveys() {
    const [surveys, setSurveys] = useState([]);

    const [loading, setLoading] = useState(false)
    const onDeleteClick = () => {
        console.log("On delete click");
    }

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/survey')
            .then(({data}) => {
                setSurveys(data.data)
                setLoading(false)
            })
    }, [])

    return (
        <PageComponent title="Surveys" buttons={(
            <TButton color="green" to="/surveys/create">
                <PlusCircleIcon className="h-6 w-6 mr-2" />Create New
            </TButton>
        )}>
            {loading && (<div>
                Loading...
            </div>)}
            {!loading && (<div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {surveys.map(survey => (
                        <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick}/>
                    ))}
                </div>

                <PaginationLinks/>
            </div>)}
        </PageComponent>
    )
}
