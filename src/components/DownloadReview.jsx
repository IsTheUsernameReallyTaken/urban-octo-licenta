export default function DownloadReview(username, users, lists, cards) {
  let reviews = "Reviews \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  reviews = reviews + "\n\n - BY PROGRESS - ";

  let completed = "\n\tCompleted cards: ";

  lists[2].hasCards.length === 0
    ? (completed = completed + "no cards here")
    : lists[2].hasCards.forEach((carduri) => {
        completed = completed + String(carduri) + " ";
      });

  reviews = reviews + completed;

  let inpr = "\n\tIn Progress cards: ";

  lists[1].hasCards.length === 0
    ? (inpr = inpr + "no cards here")
    : lists[1].hasCards.forEach((carduri) => {
        inpr = inpr + String(carduri) + " ";
      });

  reviews = reviews + inpr;

  let avail = "\n\tAvailable cards: ";

  lists[0].hasCards.length === 0
    ? (avail = avail + "no cards here")
    : lists[0].hasCards.forEach((carduri) => {
        avail = avail + String(carduri) + " ";
      });

  reviews = reviews + avail;

  let probs = "\n\tEncountered problems: ";

  lists[3].hasCards.length === 0
    ? (probs = probs + "no cards here")
    : lists[3].hasCards.forEach((carduri) => {
        probs = probs + String(carduri) + " ";
      });

  reviews = reviews + probs;

  return reviews;
}
