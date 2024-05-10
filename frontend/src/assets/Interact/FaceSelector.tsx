import { useState, useEffect } from "react"
import './FaseSelector.css'

import sad0 from "/sad-0.svg"
import sad2 from "/sad-2.svg"
import sad4 from "/sad-4.svg"
import sad6 from "/sad-6.svg"
import sad8 from "/sad-8.svg"
import sad10 from "/sad-10.svg"
import blank from "/blank.svg"

const faces = [sad0, sad2, sad4, sad6, sad8, sad10];

export default function FaceComponent() {
  const [faceButtons, setFaceButtons] = useState([blank, blank, blank, blank, blank, blank])
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null)

  useEffect(() => {
    updateFaceButtons()
  }, [hoveringIndex, clickedIndex])

  function updateFaceButtons() {
    if (hoveringIndex === null) {
      if (clickedIndex !== null) setFaceButtons(faces.map((face, index) => index <= clickedIndex ? face : blank));
      else setFaceButtons([blank, blank, blank, blank, blank, blank])
    }
    else if (clickedIndex !== null) {
      if (hoveringIndex <= clickedIndex) setFaceButtons(faces.map((face, index) => index <= clickedIndex ? face : blank));
      else setFaceButtons(faces.map((face, index) => index <= hoveringIndex ? face : blank));
    }
    else setFaceButtons(faces.map((face, index) => index <= hoveringIndex ? face : blank));
  }

  function handleOnClick(index: number) {
    setClickedIndex(index);
  }

  function handleOnMouseOver(index: number) {
    setHoveringIndex(index);
  }

  function handleOnMouseLeave() {
    setHoveringIndex(null);
  }

  return (
    <div className="flex flex-col justify-between items-center gap-3">
      <div className="Faces" onMouseLeave={handleOnMouseLeave}>
        {faceButtons.map((face, faceIndex) => (
          <img
            key={faceIndex}
            src={face}
            alt={`Face ${faceIndex}`}
            onMouseOver={() => handleOnMouseOver(faceIndex)}
            onClick={() => handleOnClick(faceIndex)}
            className="cursor-pointer img-fluid"
          />
        ))}
      </div>
      <div>
        <span>
          {clickedIndex === null ? "請選擇你的疼痛指數" : `你選擇了 ${(clickedIndex)*2}分的疼痛指數!`}
        </span>
      </div>
    </div>
  )
}