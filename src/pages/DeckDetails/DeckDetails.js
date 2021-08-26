import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DeckDetails = () => {
  const { id } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8080/decks/' + Number(id))
      .then((res) => setDeck(res.data));
  }, [id]);

  return <div>{deck.title}</div>;
};

export default DeckDetails;
