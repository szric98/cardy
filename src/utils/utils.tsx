import { card } from 'types/Card';
import { deck } from 'types/Deck';

export function getUserProgress(exp: number) {
  const value = Math.sqrt(exp / 50);
  const level = Math.round(value) + 1;
  const progress = ((value - Math.floor(value)) * 100).toFixed(2);

  return {
    level: level > 99 ? 99 : level,
    progress: progress,
  };
}

export function timeLeftUntilReview(card: card): string {
  if (!card.nextReview) return '-';

  const timeLeft = card.nextReview - Date.now();

  if (timeLeft < 0) return 'now';

  if (timeLeft / (1000 * 60 * 60 * 24) > 0.5) {
    return `in ${Math.round(timeLeft / (1000 * 60 * 60 * 24))} day(s)`;
  } else if (timeLeft / (1000 * 60 * 60) > 0.5) {
    return `in ${Math.round(timeLeft / (1000 * 60 * 60))} hour(s)`;
  } else {
    return `in ${Math.round(timeLeft / (1000 * 60))} minute(s)`;
  }
}

export const getSeenCards = (cards: card[]) =>
  cards.filter((card) => card.nextReview).length;

export function getDeckProgression(deck: deck) {
  if (!deck || !deck.cards || !deck.cards.length) return 0;

  return (getSeenCards(deck.cards) / deck.cards.length) * 100;
}

export const cardsDueTo = (cards: card[]) =>
  cards.filter((card) => card.nextReview && card.nextReview - Date.now() <= 0);

export function getWelcomeMessage() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 4 && hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

export function filterDecks(
  data: { decks: deck[] },
  categoryFilter: string,
  searchFilter: string
) {
  return data
    ? data.decks.filter(
        ({ category, title }) =>
          (categoryFilter ? category.name === categoryFilter : true) &&
          title.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : [];
}
