export default function DownloadReview(username, users, lists, cards) {
  let reviews = "Reviews \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  reviews = reviews + "\n\n - BY PROGRESS - ";

  let completed = "\n\tCompleted cards: ";

  lists[2].hasCards.length === 0
    ? (completed = completed + "no cards here")
    : lists[2].hasCards.forEach((carduri) => {
        completed = completed + String(carduri.id);
      });

  reviews = reviews + completed;

  return reviews;
}
