import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import Loading from "../components/core/Loading.jsx";

export default function Signup() {
    const { setCurrentUser, setUserToken } = useStateContext();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ error, setError ] = useState({__html: ''});
    const [ loading, setLoading ] = useState(false)

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({__html: ''})
        setLoading(true)

        axiosClient.post('/signup', {
            name: name,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
            .then(({ data }) => {
                setCurrentUser(data.user)
                setUserToken(data.token)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    setLoading(false)
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next  ], [])
                    console.log(finalErrors)
                    setError({__html: finalErrors.join('<br>')})
                }
                console.error(error);
            })
    };

    return (
        <>
            {loading && ( <Loading /> )}
            {
                !loading && (
                    <>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                            {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}

                            <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={ev => setName(ev.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="John Smith"
                                        />
                                    </div>
                                </div>
                                {/* Full Name */}

                                {/* Email Address */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={ev => setEmail(ev.target.value)}
                                            placeholder="johnsmith@example.com"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {/* Email Address */}

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            required
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password-confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={passwordConfirmation}
                                            onChange={ev => setPasswordConfirmation(ev.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already a member?{' '}
                                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </>
                )
            }
        </>
    )
}
