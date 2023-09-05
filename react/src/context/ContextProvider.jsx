import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    questionTypes: [],
    toast: {
        message: null,
        show: false,
    },
    error: {
        message: null,
        show: false,
    },
    setCurrentUser: () => {},
    setUserToken: () => {},
})

export const ContextProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState({})
    const [ surveys, setSurveys ] = useState([])
    const [ userToken, _setUserToken ] = useState(localStorage.getItem('TOKEN') || '')
    const [ questionTypes] = useState(["text", "textarea", "radio", "select", "checkbox"])
    const [ toast, setToast ] = useState({message: '', show: false})
    const [ error, setError ] = useState({message: '', show: false})

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }

    const showToast = (message) => {
        setToast({message, show: true})
        setTimeout(() => {
            setToast({message: '', show: false})
        }, 5000)
    }

    const showError = (message) => {
        setToast({message, show: true})
        setTimeout(() => {
            setToast({message: '', show: false})
        }, 5000)
    }

    return (
        <StateContext.Provider value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                surveys,
                questionTypes,
                toast,
                showToast,
                error,
                showError
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
