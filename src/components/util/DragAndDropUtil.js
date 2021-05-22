const handleDragOut = (e, setDropOverLay) => {
  setDropOverLay("");
  e.preventDefault();
  e.stopPropagation();
};
const handleDragOver = (e, setDropOverLay) => {
  setDropOverLay("overlay");
  e.preventDefault();
  e.stopPropagation();
};
const handleDrop = (e, setDropOverLay, setImageFile, setImage) => {
  setDropOverLay("");

  setImageFile(e.dataTransfer.files[0]);

  setImage(URL.createObjectURL(e.dataTransfer.files[0]));

  e.preventDefault();
  e.stopPropagation();
};

export { handleDragOut, handleDragOver, handleDrop };
