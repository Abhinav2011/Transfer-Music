import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = () => {
  return (
    <Dimmer active>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  );
};

export default Loading;
