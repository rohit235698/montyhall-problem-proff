import shuffle from "lodash/shuffle.js";
import { boolean } from "boolean";

const initialDoorSetup = ["goat", "goat", "car"];

function selectRandomDoorIndex() {
  // Selecting a random door index from 3 doors
  return Math.floor(Math.random() * 3);
}

function selectDoorWithGoat(doors, selectedDoorIndex) {
  // Select a door with goat provided it's not the same door selected randomly
  return doors.findIndex(
    (_, index) => _ === "goat" && index != selectedDoorIndex
  );
}

function montyHallProff(iterations, shuffleChoice) {
  let shuffledDoorSetup;
  let counter = 0;
  for (let i = 0; i < iterations; i++) {
    shuffledDoorSetup = shuffle(initialDoorSetup);
    const selectedDoorIndex = selectRandomDoorIndex();
    const selectedDoorWithGoat = selectDoorWithGoat(
      shuffledDoorSetup,
      selectedDoorIndex
    );
    const selectedDoor = shuffledDoorSetup[selectedDoorIndex];
    // Remove the Door from array which was selected in previous step
    shuffledDoorSetup.splice(selectedDoorWithGoat, 1);
    if (shuffleChoice) {
      const doorAfterShuffleChoice = shuffledDoorSetup.find(
        (_) => _ !== selectedDoor
      );
      if (doorAfterShuffleChoice === "car") {
        counter++;
      }
    } else {
      if (selectedDoor === "car") {
        counter++;
      }
    }
  }
  return counter;
}


const iterations = !isNaN(process.argv[2]) ? process.argv[2] : 100000;
const shuffleChoice = boolean(process.argv[3]);

const count = montyHallProff(iterations, shuffleChoice);

console.log (`${shuffleChoice === true ? "After" : "Without"} shuffling choice chances of getting a car is :`,(count/iterations)*100);

