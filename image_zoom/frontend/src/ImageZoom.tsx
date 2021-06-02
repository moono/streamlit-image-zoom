import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

class ImageZoom extends StreamlitComponentBase {
  public render = (): ReactNode => {
    const imageData = this.props.args["imageData"]

    return (
      <TransformWrapper
        options={{
          disabled: this.props.disabled
        }}
      >
        <TransformComponent>
          <img 
            src={`data:image/png;base64,${imageData}`}
            alt="testaaaaa">
          </img>
        </TransformComponent>
      </TransformWrapper>
    );
  }
}

export default withStreamlitConnection(ImageZoom)
