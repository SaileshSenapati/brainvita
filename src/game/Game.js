import React, { useState } from "react";
import "./Game.scss";

const arr = [0, 1, 2, 3, 4, 5, 6];
const hiddenHoles = [
  "00",
  "01",
  "10",
  "11",
  "05",
  "06",
  "15",
  "16",
  "50",
  "51",
  "60",
  "61",
  "55",
  "56",
  "65",
  "66",
];

const Game = () => {
  const [activeMarble, setActiveMarble] = useState(null);
  const [allowedPositons, setAllowedPositons] = useState([]);
  const [noMarbel, setNoMarble] = useState(["33"]);
  const resetBoard = () => {
    setActiveMarble(null);
    setAllowedPositons([]);
    setNoMarble(["33"]);
  };
  const getAllowedPositions = (id) => {
    let positons = [
      parseInt(id[0]) - 2 + id[1],
      parseInt(id[0]) + 2 + id[1],
      id[0] + (parseInt(id[1]) - 2),
      id[0] + (parseInt(id[1]) + 2),
    ];
    positons = positons.filter((eachData) => {
      if (
        eachData.length > 2 ||
        hiddenHoles.includes(eachData) ||
        parseInt(eachData[0]) > 6 ||
        parseInt(eachData[1]) > 6 ||
        !noMarbel.includes(eachData)
      ) {
        return false;
      }
      return true;
    });
    return positons;
  };
  const handleMarbelClick = (id) => {
    const positons = getAllowedPositions(id);
    const tempActive = activeMarble;
    if (tempActive && allowedPositons.includes(id)) {
      const newEmptyHole =
        tempActive[0] === id[0]
          ? parseInt(tempActive[1]) > parseInt(id[1])
            ? tempActive[0] + (parseInt(id[1]) + 1)
            : tempActive[0] + (parseInt(id[1]) - 1)
          : parseInt(tempActive[0]) > parseInt(id[0])
          ? parseInt(id[0]) + 1 + tempActive[1]
          : parseInt(id[0]) - 1 + tempActive[1];
      const tempNoMarble = [...noMarbel].filter((eachId) => eachId !== id);
      tempNoMarble.push(newEmptyHole);
      tempNoMarble.push(tempActive);
      if (!noMarbel.includes(newEmptyHole)) {
        setNoMarble(tempNoMarble);
        setActiveMarble(null);
        setAllowedPositons([]);
      }
    } else if (positons.length > 0) {
      setAllowedPositons(positons);
      setActiveMarble(id);
    } else {
      setAllowedPositons([]);
      setActiveMarble(null);
    }
  };
  return (
    <section className="scrn-sctn">
      <div className="g-cntr">
        <div className="reset">
          <div className="reset-btn" onClick={() => resetBoard()}>
            Reset
          </div>
        </div>
        <div
          className={`board-round-outer ${
            noMarbel.length !== 1 ? "stop-anim" : ""
          }`}
        >
          <div className="board-round-inner">
            <div className="board-hole-cntr">
              <table>
                <tbody>
                  {arr.map((eachRow) => {
                    return (
                      <tr key={eachRow}>
                        {arr.map((eachCol) => {
                          const holeId = eachRow + "" + eachCol;
                          return (
                            <td
                              key={eachCol}
                              className={`hole ${
                                hiddenHoles.includes(holeId) ? "hide-hole" : ""
                              }`}
                              onClick={() => handleMarbelClick(holeId)}
                            >
                              <div
                                className={`${
                                  noMarbel.includes(holeId)
                                    ? "no-marble"
                                    : "marbel"
                                } ${
                                  activeMarble && holeId === activeMarble
                                    ? "green-marble"
                                    : ""
                                }`}
                              ></div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
