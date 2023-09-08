import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Toast() {
    const { toast} = useStateContext({});

    let classes = ["w-[500px]", "py-2", "px-3", "fixed", "right-2", "bottom-2", "z-50", "animate-fade-in-down", "text-sm", "rounded-lg", "dark:bg-gray-800",];

    if (toast.variant === 'success') {
        classes = [
            ...classes,
            "text-green-800", "bg-green-50", "dark:text-green-400"
        ];
    } else {
        classes = [
            ...classes,
            "text-red-800", "bg-red-50", "dark:text-red-400"
        ];
    }

    return (
        <>
            {
                toast.show && (
                    <>
                        <div className={classes.join(" ")} role="alert">
                            <span className="font-medium normal-case">{toast.variant} alert!</span> {toast.message}
                        </div>
                    </>
                )
            }
        </>

    )
}
