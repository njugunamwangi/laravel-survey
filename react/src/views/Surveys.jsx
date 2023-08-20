import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
import SurveyListItem from "../components/SurveyListItem";
import {TwelveDotsScaleRotate} from "react-svg-spinners";

export default function Surveys() {
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);

    const onPageClick = (link) => {
        getSurveys(link.url);
    };

    const getSurveys = (url) => {
        url = url || "/survey";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <PageComponent
            title="Surveys"
            buttons={
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Create new
                </TButton>
            }
        >
            {loading && <div className="text-center text-lg"> <TwelveDotsScaleRotate /> </div>}
            {!loading && (
                <div>
                    {surveys.length === 0 && (
                        <div className="py-8 text-center text-gray-700">
                            You don't have surveys created
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.map((survey) => (
                            <SurveyListItem
                                survey={survey}
                                key={survey.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                    {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
                </div>
            )}
        </PageComponent>
    );
}
