export default function DownloadReview(username, users, lists, cards) {
  function getDuration(endTime, startTime) {
    let duration = "",
      durationUnit = "",
      durationString = "";

    duration = Math.floor(endTime - startTime);
    durationUnit = "seconds";

    let secunde, minute, ore;
    secunde = Math.floor(duration % 60);
    minute = Math.floor((duration / 60) % 60);
    ore = Math.floor(duration / 60 / 60);

    durationString = ore + "h " + minute + "m " + secunde + "s";
    return durationString;
  }

  let reviews = "REVIEWS \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  reviews = reviews + "\n\nBY PROGRESS";

  let completed = "\n\tcompleted cards: ";

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
              " (" +
              carduri.department +
              "): " +
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

  let inpr = "\n\tin progress cards: ";

  lists[1].hasCards.length === 0
    ? (inpr = inpr + "no cards here")
    : lists[1].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            inpr =
              inpr +
              "\n\t\t" +
              carduri.id +
              " (" +
              carduri.department +
              "): " +
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

  let avail = "\n\tavailable cards: ";

  lists[0].hasCards.length === 0
    ? (avail = avail + "no cards here")
    : lists[0].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            avail =
              avail +
              "\n\t\t" +
              carduri.id +
              " (" +
              carduri.department +
              "): " +
              carduri.title;
          }
        });
      });

  reviews = reviews + avail;

  let probs = "\n\tencountered problems: ";

  lists[3].hasCards.length === 0
    ? (probs = probs + "no cards here")
    : lists[3].hasCards.forEach((carduri1) => {
        cards.forEach((carduri) => {
          if (carduri.id === carduri1) {
            probs =
              probs +
              "\n\t\t" +
              carduri.id +
              " (" +
              carduri.department +
              "): " +
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

  reviews = reviews + "\n\nBY DEPARTMENT";

  departamente.length === 0
    ? (reviews = reviews + "\n\tthere are no cards at the moment")
    : departamente.forEach((dept) => {
        reviews = reviews + "\n\t" + dept + ": ";
        cards.forEach((carduri) => {
          if (carduri.department === dept) {
            if (lists[2].hasCards.includes(carduri.id)) {
              let duration = Math.floor(carduri.endTime - carduri.startTime);

              let secunde, minute, ore;
              secunde = Math.floor(duration % 60);
              minute = Math.floor((duration / 60) % 60);
              ore = Math.floor(duration / 60 / 60);

              let durationString = ore + "h " + minute + "m " + secunde + "s";
              reviews =
                reviews +
                "\n\t\t" +
                carduri.id +
                ": completed by " +
                carduri.by +
                " started at " +
                new Date(carduri.startTime.seconds * 1000).toLocaleString(
                  "en-GB"
                ) +
                ", done in " +
                durationString;
            }

            if (lists[1].hasCards.includes(carduri.id)) {
              reviews =
                reviews +
                "\n\t\t" +
                carduri.id +
                ": in progress by " +
                carduri.by +
                " since " +
                new Date(carduri.startTime.seconds * 1000).toLocaleString(
                  "en-GB"
                );
            }

            if (lists[0].hasCards.includes(carduri.id)) {
              reviews = reviews + "\n\t\t" + carduri.id + ": available";
            }

            if (lists[3].hasCards.includes(carduri.id)) {
              reviews =
                reviews +
                "\n\t\t" +
                carduri.id +
                ": problem encoutered by " +
                carduri.by +
                " at " +
                new Date(carduri.problemStart.seconds * 1000).toLocaleString(
                  "en-GB"
                );
            }
          }
        });
      });

  reviews = reviews + "\n\nBY USER";

  users.forEach((useri) => {
    let count = 0;
    cards.forEach((carduri) => {
      if (carduri.by === useri.username) {
        count = count + 1;
      }
    });
    reviews =
      reviews +
      "\n\t" +
      "#" +
      useri.id.replace(/[^0-9]/g, "") +
      " - " +
      useri.username +
      " interacted with " +
      count +
      " cards.";

    cards.forEach((carduri) => {
      if (carduri.by === useri.username) {
        if (lists[2].hasCards.includes(carduri.id)) {
          let duration = Math.floor(carduri.endTime - carduri.startTime);

          let secunde, minute, ore;
          secunde = Math.floor(duration % 60);
          minute = Math.floor((duration / 60) % 60);
          ore = Math.floor(duration / 60 / 60);

          let durationString = ore + "h " + minute + "m " + secunde + "s";
          reviews =
            reviews +
            "\n\t\t" +
            carduri.id +
            " (" +
            carduri.department +
            "): completed, started at " +
            new Date(carduri.startTime.seconds * 1000).toLocaleString("en-GB") +
            ", done in " +
            durationString;
        }

        if (lists[1].hasCards.includes(carduri.id)) {
          reviews =
            reviews +
            "\n\t\t" +
            carduri.id +
            " (" +
            carduri.department +
            "): in progress since " +
            new Date(carduri.startTime.seconds * 1000).toLocaleString("en-GB");
        }

        if (lists[0].hasCards.includes(carduri.id)) {
          reviews = reviews + "\n\t\t" + carduri.id + ": available";
        }

        if (lists[3].hasCards.includes(carduri.id)) {
          reviews =
            reviews +
            "\n\t\t" +
            carduri.id +
            " (" +
            carduri.department +
            "): problem encoutered at " +
            new Date(carduri.problemStart.seconds * 1000).toLocaleString(
              "en-GB"
            );
        }
      }
    });
  });

  reviews = reviews + "\n\nSTATISTICS";

  if (lists[2].hasCards.length !== cards.length || cards.length === 0) {
    reviews =
      reviews +
      "\n\tno statistics available - " +
      (cards.length === 0 ? "no cards" : "not all cards are done");
  } else {
    // reviews = reviews + "\n\tstatistics here";
    let duration,
      maxDuration = 0,
      minDuration = 100000 * 24 * 60 * 60,
      minTitle,
      minID,
      minBy,
      maxTitle,
      maxID,
      maxBy;

    cards.forEach((carduri) => {
      duration = Math.floor(carduri.endTime - carduri.startTime);
      if (duration > maxDuration) {
        maxDuration = duration;
        maxTitle = carduri.title;
        maxID = carduri.id;
        maxBy = carduri.by;
      }

      if (duration < minDuration) {
        minDuration = duration;
        minTitle = carduri.title;
        minID = carduri.id;
        minBy = carduri.by;
      }
    });

    let secunde, minute, ore;
    secunde = Math.floor(maxDuration % 60);
    minute = Math.floor((maxDuration / 60) % 60);
    ore = Math.floor(maxDuration / 60 / 60);

    reviews =
      reviews +
      "\n\tmost time spent: card #" +
      maxID.replace(/[^0-9]/g, "") +
      " - " +
      maxTitle +
      " by " +
      maxBy +
      " - " +
      ore +
      "h " +
      minute +
      "m " +
      secunde +
      "s";

    secunde = Math.floor(minDuration % 60);
    minute = Math.floor((minDuration / 60) % 60);
    ore = Math.floor(minDuration / 60 / 60);

    reviews =
      reviews +
      "\n\tleast time spent: card #" +
      minID.replace(/[^0-9]/g, "") +
      " - " +
      minTitle +
      " by " +
      minBy +
      " - " +
      ore +
      "h " +
      minute +
      "m " +
      secunde +
      "s";

    let numberOfProblems = 0,
      maxProblem = 0,
      minProblem = 100000 * 24 * 60 * 60;

    cards.forEach((carduri) => {
      if (carduri.problemStart) {
        numberOfProblems++;
        if (
          Math.floor(carduri.problemEnd - carduri.problemStart) > maxProblem
        ) {
          maxProblem = Math.floor(carduri.problemEnd - carduri.problemStart);
        }
        if (
          Math.floor(carduri.problemEnd - carduri.problemStart) < minProblem
        ) {
          minProblem = Math.floor(carduri.problemEnd - carduri.problemStart);
        }
      }
    });

    if (numberOfProblems === 0) {
      reviews = reviews + "\n\tproblems encountered: no cards here";
    } else {
      reviews = reviews + "\n\tproblems encountered: ";
      cards.map((carduri) => {
        if (carduri.problemStart) {
          let time1, durata1;

          time1 = new Date(carduri.problemStart.seconds * 1000).toLocaleString(
            "en-GB"
          );

          durata1 = getDuration(carduri.problemEnd, carduri.problemStart);

          reviews =
            reviews +
            "\n\t\t" +
            carduri.id +
            ": encountered at " +
            time1 +
            " by " +
            carduri.by +
            " solved in " +
            durata1;

          if (
            maxProblem ===
              Math.floor(carduri.problemEnd - carduri.problemStart) &&
            numberOfProblems !== 1
          ) {
            reviews = reviews + " (the most time for a problem)";
          }

          if (
            minProblem ===
              Math.floor(carduri.problemEnd - carduri.problemStart) &&
            numberOfProblems !== 1
          ) {
            reviews = reviews + " (the least time for a problem)";
          }
        }
      });
    }

    let maxUserID = 0;

    users.forEach((useri) => {
      if (useri.id.replace(/[^0-9]/g, "") > maxUserID) {
        maxUserID = parseInt(useri.id.replace(/[^0-9]/g, ""));
      }
    });

    let userCards = new Array(maxUserID).fill(0);

    users.forEach((useri) => {
      cards.forEach((carduri) => {
        if (carduri.by === useri.username) {
          userCards[parseInt(useri.id.replace(/[^0-9]/g, "") - 1)]++;
        }
      });
    });

    let maxUserCards = 0,
      minUser = 100000;
    let username1 = "",
      usernameIndex;

    userCards.forEach((cardsNo, index) => {
      if (cardsNo > maxUserCards) {
        maxUserCards = cardsNo;
        usernameIndex = index + 1;
      }
    });

    // console.log(usernameIndex + " a lucrat cel mai mult: " + maxUserCards);

    users.forEach((useri) => {
      if (parseInt(useri.id.replace(/[^0-9]/g, "")) === usernameIndex) {
        username1 = useri.username;
      }
    });

    let totalTime = 0;

    cards.forEach((carduri) => {
      if (carduri.by === username1) {
        totalTime = totalTime + Math.floor(carduri.endTime - carduri.startTime);
      }
    });

    secunde = Math.floor(totalTime % 60);
    minute = Math.floor((totalTime / 60) % 60);
    ore = Math.floor(totalTime / 60 / 60);

    reviews =
      reviews +
      "\n\tuser " +
      usernameIndex +
      ": " +
      username1 +
      " worked most: " +
      maxUserCards +
      " cards, for a total of " +
      ore +
      "h " +
      minute +
      "m " +
      secunde +
      "s";

    let usersWhoDidntWork = [];

    userCards.forEach((cardsNo, index) => {
      if (cardsNo === 0) {
        users.forEach((useri) => {
          if (useri.id.replace(/[^0-9]/g, "") === String(index + 1)) {
            // console.log("userul " + useri.id + " nu a lucrat");
            usersWhoDidntWork[usersWhoDidntWork.length] = useri.id;
          }
        });
      }
    });

    if (usersWhoDidntWork.length === 0) {
      reviews = reviews + "\n\t" + "there are no users who didn't work";
    } else {
      if (usersWhoDidntWork.length === 1) {
        reviews = reviews + "\n\t" + "there was one user who didn't work:";
      } else {
        reviews =
          reviews +
          "\n\t" +
          "there were " +
          usersWhoDidntWork.length +
          " users who didn't work:";
      }

      usersWhoDidntWork.forEach((userIDs) => {
        users.forEach((useri) => {
          if (useri.id === userIDs) {
            reviews =
              reviews +
              "\n\t\t" +
              "user #" +
              useri.id.replace(/[^0-9]/g, "") +
              " - " +
              useri.username +
              " (" +
              useri.department +
              ")";
          }
        });
      });
    }
  }

  return reviews;
}
