import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    setCurrentUser: () => {},
    setUserToken: () => {}
})

const tmpSurveys = [
    {
        "id": 1,
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "titlr": "Question 1",
        "slug": "question-1",
        "description": "\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id lacus et nunc ultrices pretium. Morbi ultrices ultrices mauris, ac convallis velit elementum vel. Fusce non finibus lorem. Nullam condimentum varius nisi vel interdum. Donec non felis enim. Ut est arcu, tempor ac metus ac, sodales condimentum lorem. Nulla rutrum auctor velit eget tincidunt. Curabitur nec neque vitae diam rhoncus condimentum. Phasellus sagittis ultricies finibus. Nunc vulputate, ante at molestie aliquet, diam tortor pretium justo, vitae elementum enim lectus id neque. Maecenas pellentesque vel tortor ut pellentesque. Suspendisse finibus leo faucibus nunc placerat viverra. Vestibulum magna purus, bibendum a vehicula at, ultrices et lectus",
        "status": true
    },
    {
        "id": 2,
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "titlr": "Question 2",
        "slug": "question-2",
        "description": "\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id lacus et nunc ultrices pretium. Morbi ultrices ultrices mauris, ac convallis velit elementum vel. Fusce non finibus lorem. Nullam condimentum varius nisi vel interdum. Donec non felis enim. Ut est arcu, tempor ac metus ac, sodales condimentum lorem. Nulla rutrum auctor velit eget tincidunt. Curabitur nec neque vitae diam rhoncus condimentum. Phasellus sagittis ultricies finibus. Nunc vulputate, ante at molestie aliquet, diam tortor pretium justo, vitae elementum enim lectus id neque. Maecenas pellentesque vel tortor ut pellentesque. Suspendisse finibus leo faucibus nunc placerat viverra. Vestibulum magna purus, bibendum a vehicula at, ultrices et lectus",
        "status": true
    },
    {
        "id": 3,
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "titlr": "Question 3",
        "slug": "question-3",
        "description": "\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id lacus et nunc ultrices pretium. Morbi ultrices ultrices mauris, ac convallis velit elementum vel. Fusce non finibus lorem. Nullam condimentum varius nisi vel interdum. Donec non felis enim. Ut est arcu, tempor ac metus ac, sodales condimentum lorem. Nulla rutrum auctor velit eget tincidunt. Curabitur nec neque vitae diam rhoncus condimentum. Phasellus sagittis ultricies finibus. Nunc vulputate, ante at molestie aliquet, diam tortor pretium justo, vitae elementum enim lectus id neque. Maecenas pellentesque vel tortor ut pellentesque. Suspendisse finibus leo faucibus nunc placerat viverra. Vestibulum magna purus, bibendum a vehicula at, ultrices et lectus",
        "status": true
    }
];

export const ContextProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState({

    })

    const [ surveys, setSurveys ] = useState(tmpSurveys)
    const [ userToken, _setUserToken ] = useState(localStorage.getItem('TOKEN') || '')

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            surveys
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
