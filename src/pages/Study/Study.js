import { useMutation } from '@apollo/client';
import { useUser } from 'contexts/UserContext';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DIFFICULTY } from '../../constants';
import { STUDY_SESSION, GET_DECK, GET_USER } from 'queries/queries';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import Error from 'components/common/Error/Error';
import Loading from 'components/common/Loading/Loading';

const Study = ({ location }) => {
  const { userInfo, setUserInfo } = useUser();
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [numOfCards, setNumOfCards] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);

  const deck = location.state?.deck || {};

  const [save, { loading, error }] = useMutation(STUDY_SESSION, {
    onError: () => {},
    refetchQueries: [
      {
        query: GET_DECK,
        variables: { id: deck?.id },
      },
      {
        query: GET_USER,
        variables: { id: userInfo?.id },
      },
    ],
  });

  useEffect(() => {
    if (!location.state || !userInfo) return history.push('/');
    setCards(location.state.cards);
    setNumOfCards(location.state.cards.length);
  }, [location.state, history, userInfo]);

  const handleQuit = () =>
    window.confirm(
      'Are you sure you want to quit? All your progress will be lost!'
    ) && history.push('/');

  const handleSkip = () => {
    const newCards = [...cards];
    newCards.push(newCards.splice(0, 1)[0]);
    setCards(newCards);
    setShowQuestion(true);
  };

  const rateCard = (difficulty) => {
    const currentCard = cards[0];

    if (difficulty !== DIFFICULTY.DIDNT_KNOW) {
      const newCards = cards.filter((card) => card !== cards[0]);
      setCards(newCards);

      let newCardData = null;

      if (!cardData.filter((card) => card.id === currentCard.id).length) {
        newCardData = [...cardData];
        newCardData.push({ id: currentCard.id, rated: difficulty });
        setCardData(newCardData);
      }

      if (!newCards.length) {
        console.log('Saving progress...');
        save({
          variables: {
            cards: JSON.stringify(newCardData ? newCardData : cardData),
          },
        })
          .then((res) => {
            const updatedUserInfo = {
              id: userInfo.id,
              img: userInfo.img,
              name: userInfo.name,
              experience: userInfo.experience + res.data.studySession,
            };
            setUserInfo(updatedUserInfo);
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            history.push('/dashboard');
          })
          .catch((err) => console.log(err.message));
      }
    } else {
      if (!cardData.filter((card) => card.id === currentCard.id).length) {
        const newCardData = [...cardData];
        newCardData.push({ id: cards[0].id, rated: DIFFICULTY.DIDNT_KNOW });
        setCardData(newCardData);
      }

      const newCards = [...cards];
      newCards.push(newCards.splice(0, 1)[0]);
      setCards(newCards);
    }
    setShowQuestion(true);
  };

  const getProgress = () => ((numOfCards - cards.length) / numOfCards) * 100;

  return (
    <div>
      <div id="study-header" className="navbar">
        <span id="study-deck-title">
          {deck.title} {`(studying ${numOfCards} cards)`}
        </span>
        <span className="spacer"></span>
        <span className="material-icons-outlined" onClick={handleQuit}>
          close
        </span>
      </div>
      {error && <Error />}
      {loading && <Loading />}
      {cards && cards.length && (
        <div id="study-content">
          <ProgressBar progress={getProgress()} />
          {showQuestion ? (
            <>
              <h1>Question</h1>
              <div id="question">{cards[0].front}</div>
              <div id="study-buttons">
                <button className="btn" onClick={() => setShowQuestion(false)}>
                  See answer
                </button>
                <button className="btn" onClick={handleSkip}>
                  Skip
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>Answer</h1>
              <div id="question">{cards[0].back}</div>
              <div id="study-buttons-back">
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.EASY)}
                >
                  Easy
                </button>
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.NORMAL)}
                  style={{ background: '#A9AC25' }}
                >
                  Normal
                </button>
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.HARD)}
                  style={{ background: '#AC2E25' }}
                >
                  Hard
                </button>
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.DIDNT_KNOW)}
                  style={{ background: 'black' }}
                >
                  Forgot
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Study;
