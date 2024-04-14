import React, { type ReactElement } from "react";
import { Loading } from "@components/common";

function Fallback(): ReactElement {
  return (
    <Loading fullScreen={true} backgroundColor="#111815" />
  )
}

export default Fallback;
