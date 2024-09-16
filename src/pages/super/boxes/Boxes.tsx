import { Grid2, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import logo from '../../../../public/logo.png'
import clickSound from '../../../../public/sound.mp3'; // or a URL to the sound file
import { useQuestionIndex } from "../../../hooks/useQuestionIndex";
import { baseUrl } from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { CreateUserPopUp } from "../../../popup/CreateUserPopUp";
import { useScoreUpdate } from "../../../hooks/users/useScoreUpdate";
import { CurrentUserContext } from "../../../App";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export const Boxes = () => {
  const { questions, fetchQuestions, loading, isLast } = useQuestionIndex();
  const { user } = useContext(CurrentUserContext)
  const [point, setPoint] = useState(0)
  const [QuestionPosition, setQuestion] = useState(1);
  const [count, setCount] = useState(1)
  const [answered, setAnswered] = useState(false);
  const [clickable, setClickable] = useState(true)
  const [answredStyle, setAnsweredStyle] = useState('not-answered')
  const [plusAnim, setPlusAnim] = useState('')
  const [lastAnswered, setLastAnswered] = useState(false)
  const { updateScore } = useScoreUpdate()
  const [win, setWin] = useState(false)

  const sound = () => {
    const audio = new Audio(clickSound)
    audio.play()
  }

  const handleSlider = (result: any) => {
    if (clickable) {
      setCount(count + 1);
      setQuestion((prevId: any) => prevId + 1);
  
      let updatedPoint = point;
  
      if (result) {
        updatedPoint = point + 1; 
        setPoint(updatedPoint);
        sound();
        setAnsweredStyle('answered');
        setPlusAnim('plus-one-anim');
      }
  
      setClickable(false);
      setAnswered(true);
  
      if (isLast) {
        updateScore({ user_id: user, score: updatedPoint });
        setLastAnswered(true);
      } else if (!result) {
        updateScore({ user_id: user, score: point });
        setLastAnswered(true);
      }
  
      setTimeout(() => {
        setAnswered(false);
        setClickable(true);
        setAnsweredStyle('not-answered');
        setPlusAnim('');
      }, 500);
    }
  };

  const winGame = () => {
    if (count >= 100) {
      setWin(true)
    }
  }

  useEffect(() => {
    fetchQuestions(QuestionPosition);
  }, [QuestionPosition]);

  useEffect(() => {
    winGame()
  }, [count])


  if (loading) return <div>Loading...</div>;

  return (
    <>
      {!user ? (<>
        <CreateUserPopUp />
      </>) : null}
      <div className="super-cover">
        <div className="cover">
          <Stack direction={'row'} justifyContent={'space-between'} gap={'5px'} width={'100%'} mb={5} alignItems={'flex-start'}>
            <Stack direction={'column'} alignItems={'flex-start'}>
              {!lastAnswered ? (<>
                <h1>{questions?.question}</h1>
                <div className="line"></div>
              </>) : null}
            </Stack>
            <Stack direction={'row'} gap={'10px'}>
              <Stack direction={'row'} alignItems={'center'} gap={'10px'} className={`point ${answredStyle}`}>
                <div className={`plus-one ${plusAnim}`}>+1</div>
                <img width={'30px'} src={logo} alt=" Logo" className="logo" />
                {point}
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={'10px'} className={`point lead`}>
                <Link to={'/lead'}>
                  <LeaderboardIcon />
                </Link>
              </Stack>
            </Stack>
          </Stack>

          <div className={`inner-cover ${answered ? 'slide-left' : 'slide-right'}`}>
            {!lastAnswered ? (
              <Grid2 container spacing={5}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <div
                    className="box"
                    onClick={() => handleSlider(questions?.answers[0]?.is_true)}

                    style={{
                      backgroundColor: `${questions?.answers[0]?.image.url == '' ? 'red' : null}`,
                      backgroundImage: `url(${baseUrl + (questions?.answers[0]?.image.url || '')})`
                    }}
                  >
                    <div className="overlay"></div>
                    <Stack direction={'column'} justifyContent={'center'} gap={'20px'} height={'100%'} zIndex={'10'}>
                      <h1 className="answer">{questions?.answers[0]?.answer}</h1>
                    </Stack>
                  </div>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <div
                    className="box"
                    onClick={() => handleSlider(questions?.answers[1]?.is_true)}
                    style={{
                      backgroundImage: `url(${baseUrl + (questions?.answers[1]?.image.url || '')})`
                    }}
                  >
                    <div className="overlay"></div>
                    <Stack direction={'column'} justifyContent={'center'} gap={'20px'} zIndex={'10'}>
                      <h1 className="answer">{questions?.answers[1]?.answer}</h1>
                    </Stack>
                  </div>
                </Grid2>
              </Grid2>
            ) : (
              <h2 className="end-message"
                style={{ color: "white" }}
              >{win ? 'თქვენ ნამდვილი ქართველი ხართ' : `თამაში დასრულებულია - ${point} ქულა`}</h2>
            )}
          </div>

          <Stack width={'100%'} justifyContent={'space-between'} direction={'row'} mt={3}>
            <h4 className="powered">Powered by <span><Link
              to={''}
            >Puzzles</Link></span></h4>
            <h4 className="powered">{count} / 30</h4>
          </Stack>
        </div>
        {lastAnswered ? (<>
          <button className="begin-button">
            <Link to={'/'}>ხელახლა</Link>
          </button>
        </>) : null}
      </div>
    </>
  );
};
