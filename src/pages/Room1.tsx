import React from "react";

interface Room1Props {
  isActive: boolean;
  onShow: () => void;
}

const Room1: React.FC<Room1Props> = (props: Room1Props) => {
  const { isActive, onShow } = props;
  return (
    <>
      {isActive ? (
        <div className="bg-black h-screen cursor-none">
          Room1
          <button
            className="absolute top-2 left-2 hover:animate-pulse bg-white text-black rounded px-2 cursor-none"
            onClick={onShow}
          >
            Go Home
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Room1;
