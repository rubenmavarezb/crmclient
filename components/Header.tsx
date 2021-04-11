import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
    query getUser {
        getUser {
            id
            name
            lastname
        }
    }
`;

const Header = () => {

    const { data, loading, error} = useQuery(GET_USER);

    const router = useRouter();

    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    if(loading) return null;

    const { name, lastname } = data.getUser;

    return ( 
        <header className="flex justify-between mb-6">
            <p className="mr-2">Hola: {name} {lastname}</p>

            <button 
                onClick={() => logOut()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >Log out</button>
        </header>
     );
}
 
export default Header;