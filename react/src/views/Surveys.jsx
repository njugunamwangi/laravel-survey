import PageComponent from "../components/PageComponent.jsx";
import {useStateContext} from "../context/ContextProvider.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/20/solid/index.js";

export default function Surveys() {
    const { surveys } = useStateContext();
    const onDeleteClick = () => {
        console.log("On delete click");
    }

    return (
        <PageComponent title="Surveys" buttons={(
            <TButton color="green" to="/surveys/create">
                <PlusCircleIcon className="h-6 w-6 mr-2" />Create New
            </TButton>
        )}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map(survey => (
                    <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
                ))}
            </div>
        </PageComponent>
    )
}