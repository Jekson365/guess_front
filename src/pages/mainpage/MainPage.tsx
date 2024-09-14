import { Stack } from '@mui/material'
import cover from '../../../public/cover.mp4'
import logo from '../../../public/logo.png'
import { Link } from 'react-router-dom'

const MainPage = () => {
    return (
        <>
            <div className="main-page">

                <div className="overlay"></div>
                <div className="col">
                    <Stack
                        direction={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        zIndex={'10'}
                        gap={'40px'}
                        height={'100%'}
                    >
                        <img src={logo}
                            width={'100px'}
                        />
                        <p>ერთი კლიკი გაშორებთ ყველაზე ქართული ქვიზის დასაწყებად.</p>
                        <button className="begin-button">
                            <Link to={'/main'}>დაწყება</Link>
                        </button>
                    </Stack>
                </div>
                <video
                    width={'100%'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    height={'100%'}
                    src={cover}
                ></video>
            </div>
        </>
    )
}

export default MainPage