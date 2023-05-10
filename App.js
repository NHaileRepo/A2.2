import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { colors, CLEAR, ENTER } from "./src/constants";
import Keyboard from './src/components/Keyboard';

const NUMBER_OF_TRIES = 6;
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};
// const getDayOfTheYear = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), 0, 0);
//   const diff = now - start;
//   const oneDay = 1000 * 60 * 60 * 24;
//   const day = Math.floor(diff / oneDay);
//   return day;
// }
// const dayOfTheYear = getDayOfTheYear();
// const words = [
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
//   "hello",
//   "world",
// ];

/**************Main App******************/
export default function App() {
  const word = "hello";
  // const word = words[dayOfTheYear]
  const letters = word.split("");//returns an array of characters ['h', 'e', 'l', 'l', 'o']
  
  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  // const rows  = new Array(NUMBER_OF_TRIES).fill(
  //   new Array(letters.length).fill("")
    // );
  // [
  //   ['s', 'd', 'a', '2']
  //   ['a', 'a', 'a', '2']
  //   ['', '', '', '']
  //   ['s', 'd', 'a', 'a']
  // ]

  const checkIfWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, i) => letter === letters[i]);
  }
  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  }

  const onKeyPressed = (key) => {
    // console.warn(key);
    // setRows([["1", "2", "3"]]);
    // if  (gameState !== "playing"){
    //   return;
    // }

    const updatedRows = copyArray(rows);

    if (key == CLEAR){
      const prevCol = curCol - 1;
        if (prevCol >= 0) {
          updatedRows[curRow][prevCol] = "";
          setRows(updatedRows);
          setCurCol(prevCol);
        }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1)
    }
  };

  const isCellActive = (row, col) => {
    return row == curRow && col ==curCol;
  }
  const getCellBGColor = (letter, row, col) => {
    // const letter = rows[row][col];
    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };
  // const getAllLettersWithColor = (color) => {
  //   return rows.flatMap((row, i) =>
  //     row.filter((cell, j) => getCellBGColor(i, j) === color)
  //   );
  // };

  // const greenCaps = getAllLettersWithColor(colors.primary);
  // const yellowCaps = getAllLettersWithColor(colors.secondary);
  // const greyCaps = getAllLettersWithColor(colors.darkgrey);


/**************Return******************/
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>
      
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {/* <View style={styles.cell}></View> */}
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell, 
                  {
                    borderColor: isCellActive(i, j) 
                      ? colors.lightgrey 
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(letter, i, j),
                  },
               ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Keyboard 
        onKeyPressed={onKeyPressed} 
        // greenCaps={greenCaps} // ['a', 'b']
        // yellowCaps={yellowCaps}
        // greyCaps={greyCaps}
      />

    </SafeAreaView>
  );
}


/**************Style Sheet******************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title:{
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing:7,
  },

  map:{
    // backgroundColor: "red",
    alignSelf: "stretch",
    // height: 100,
    marginVertical: 20,
  },

  row:{
    // backgroundColor: "blue",
    alignSelf: "stretch",
    flexDirection: "row",//change direction of cells from default column to row
    justifyContent: 'center',
  
  },

  cell:{
    flex: 1,//divide space equally
    borderWidth: 3,
    borderColor: colors.darkgrey,
    aspectRatio: 1,
    margin: 3,
    maxWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },


});
