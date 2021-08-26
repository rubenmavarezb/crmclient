import { useRouter } from 'next/router';
/////////////////////////////////////////////////
import { useQuery } from '@apollo/client';
///////////////////////////////////////////////
import { GET_USER } from '../graphql';
////////////////////////////////////////////////

const Header = () => {

    const { data, loading } = useQuery(GET_USER);

    const router = useRouter();

    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    if(loading) return null;

    const { name, lastname } = data.getUser;

    return ( 
        <header className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {name} {lastname}</p>

            <button 
                onClick={() => logOut()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >Log out</button>
        </header>
     );
}
 
export default Header;