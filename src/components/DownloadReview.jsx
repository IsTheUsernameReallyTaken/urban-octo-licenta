export default function DownloadReview(username, users, lists, cards) {
  let reviews = "Reviews \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  reviews = reviews + "\n\n - BY PROGRESS - ";

  let completed = "\n\tCompleted cards: ";

  lists[2].hasCards.length === 0
    ? (completed = completed + "no cards here")
    : lists[2].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            let duration = Math.floor(carduri.endTime - carduri.startTime);

            let secunde, minute, ore;
            secunde = Math.floor(duration % 60);
            minute = Math.floor((duration / 60) % 60);
            ore = Math.floor(duration / 60 / 60);

            let durationString = ore + "h " + minute + "m " + secunde + "s";

            completed =
              completed +
              "\n\t\t" +
              carduri.id +
              " - " +
              carduri.title +
              " by " +
              carduri.by +
              " from " +
              new Date(carduri.startTime.seconds * 1000).toLocaleString(
                "en-GB"
              ) +
              ", took " +
              durationString;
          }
        });
      });

  reviews = reviews + completed;

  let inpr = "\n\tIn Progress cards: ";

  lists[1].hasCards.length === 0
    ? (inpr = inpr + "no cards here")
    : lists[1].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            inpr =
              inpr +
              "\n\t\t" +
              carduri.id +
              " - " +
              carduri.title +
              " started by " +
              carduri.by +
              " at " +
              new Date(carduri.startTime.seconds * 1000).toLocaleString(
                "en-GB"
              );
          }
        });
      });

  reviews = reviews + inpr;

  let avail = "\n\tAvailable cards: ";

  lists[0].hasCards.length === 0
    ? (avail = avail + "no cards here")
    : lists[0].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            avail = avail + "\n\t\t" + carduri.id + " - " + carduri.title;
          }
        });
      });

  reviews = reviews + avail;

  let probs = "\n\tEncountered problems: ";

  lists[3].hasCards.length === 0
    ? (probs = probs + "no cards here")
    : lists[3].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            probs =
              probs +
              "\n\t\t" +
              carduri.id +
              " - " +
              carduri.title +
              " encountered by " +
              carduri.by +
              " at " +
              new Date(carduri.startTime.seconds * 1000).toLocaleString(
                "en-GB"
              );
          }
        });
      });

  reviews = reviews + probs;

  let departamente = [];

  for (let i = 0; i < cards.length; i++) {
    departamente[departamente.length] = cards[i].department;
  }

  departamente = Array.from(new Set(departamente));

  reviews = reviews + "\n\n - BY DEPARTMENT - ";

  departamente.length === 0
    ? (reviews = reviews + "\n\t Nothing here")
    : departamente.forEach((dept) => {
        reviews = reviews + "\n\t" + dept;
      });

  return reviews;
}
