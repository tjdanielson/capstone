import react from "react";
const Pond = (props) => {
  if (props.percentage == 0) {
    return (
      <img src={`${process.env.PUBLIC_URL}/assets/pond_zero.png`} alt="pond" />
    );
  } else if (props.percentage <= 25) {
    return (
      <img
        src={`${process.env.PUBLIC_URL}/assets/pond_quarter.png`}
        alt="pond"
      />
    );
  } else if (props.percentage <= 50) {
    return (
      <img src={`${process.env.PUBLIC_URL}/assets/pond_half.png`} alt="pond" />
    );
  } else if (props.percentage <= 75) {
    return (
      <img
        src={`${process.env.PUBLIC_URL}/assets/pond_threequarters.png`}
        alt="pond"
      />
    );
  } else if (props.percentage <= 99) {
    return (
      <img
        src={`${process.env.PUBLIC_URL}/assets/pond_almost.png`}
        alt="pond"
      />
    );
  } else if (props.percentage == 100) {
    return (
      <img src={`${process.env.PUBLIC_URL}/assets/pond_clean.png`} alt="pond" />
    );
  } else if (props.percentage > 100) {
    return (
      <img src={`${process.env.PUBLIC_URL}/assets/pond_over.png`} alt="pond" />
    );
  } else {
    return null;
  }
};

export default Pond;
