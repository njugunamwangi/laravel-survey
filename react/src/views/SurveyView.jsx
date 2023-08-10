import PageComponent from "../components/PageComponent.jsx";
import {useState} from "react";
import {PhotoIcon, UserCircleIcon} from "@heroicons/react/20/solid/index.js";
import TButton from "../components/core/TButton.jsx";

export default function SurveyView() {
    const [ survey, setSurvey ] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: []
    });

    const onImageChoose = () => {
        console.log("on image choose");
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(ev);
    }

    return (
        <PageComponent title="Create new survey">
            <form action="#" method="POST" onSubmit={onSubmit} >
                <div className="shadow sm-overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        {/* Image */}
                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    {survey.image_url && (
                                        <img
                                            src={survey.image_url}
                                            alt={survey.title}
                                            className="w-32 h-32 object-cover"
                                        />
                                    )}
                                    {!survey.image_url && (
                                        <div>
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="photo"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                    <span>Upload a file</span>
                                                    <input id="photo" name="photo" type="file" className="sr-only" onChange={onImageChoose}/>
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Image */}

                        {/* Title */}
                        <div className="col-span-full">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Survey Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={survey.title}
                                    onChange={(ev) =>
                                        setSurvey({...survey, title: ev.target.value})
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Title */}

                        {/* Description */}
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Survey Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={survey.description}
                                    onChange={(ev) =>
                                        setSurvey({...survey, description: ev.target.value})
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences describing the survey.</p>
                        </div>
                        {/* Description */}

                        {/* Expire Date */}
                        <div className="col-span-full">
                            <label htmlFor="expire_date" className="block text-sm font-medium leading-6 text-gray-900">
                                Expire Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="expire_date"
                                    id="expire_date"
                                    value={survey.expire_date}
                                    onChange={(ev) =>
                                        setSurvey({...survey, expire_date: ev.target.value})
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Expire Date */}

                        {/* Active */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 space-y-10">
                                <fieldset>
                                    <div className="mt-6 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    id="status"
                                                    name="status"
                                                    type="checkbox"
                                                    checked={survey.status}
                                                    onChange={(ev) =>
                                                        setSurvey({...survey, expire_date: ev.target.value})
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="status" className="font-medium text-gray-900">
                                                    Active
                                                </label>
                                                <p className="text-gray-500">Make survey publicly available?</p>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        {/* Active */}

                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <TButton>
                                Save
                            </TButton>
                        </div>
                    </div>
                </div>
            </form>
        </PageComponent>
    );
}