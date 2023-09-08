import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Toast() {
    const { toast} = useStateContext();

    return (
        <>
            {
                toast.show && (
                    <>
                        <div className="w-[500px] py-2 px-3 fixed right-2 bottom-2 z-50 animate-fade-in-down text-sm rounded-lg text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                            <span className="font-medium">Info alert!</span> {toast.message}
                        </div>
                    </>
                )
            }
        </>

    )
}
