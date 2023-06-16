import Button from '@mui/material/Button';
import { useUserContext } from './UserContext';

export const HomePage = () => {

    const onHomePageButtonClick = () => {
        alert("You are already on Home Page");
    };
    const {userName} = useUserContext();

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                {/* <Button variant="contained" onClick={onHomePageButtonClick} className="">
                    HomePage
                </Button> */}
                <p>{userName}</p>
            </div>
        </div>
    );
}


