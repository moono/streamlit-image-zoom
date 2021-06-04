// import {
//   Streamlit,
//   StreamlitComponentBase,
//   withStreamlitConnection,
// } from "streamlit-component-lib"
// import React, { ReactNode } from "react"
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// class ImageZoom extends StreamlitComponentBase {
//   public render = (): ReactNode => {
//     const imageData = this.props.args["imageData"]

//     return (
//       <TransformWrapper
//         options={{
//           disabled: this.props.disabled
//         }}
//       >
//         <TransformComponent>
//           <img 
//             src={`data:image/png;base64,${imageData}`}
//             alt="testaaaaa">
//           </img>
//         </TransformComponent>
//       </TransformWrapper>
//     );
//   }
// }

// export default withStreamlitConnection(ImageZoom)


import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


import zoom_in from "./images/zoom-in.svg";
import zoom_out from "./images/zoom-out.svg";
import zoom_reset from "./images/zoom-reset.svg";


class ImageZoom extends StreamlitComponentBase {
  state = {
    // type: true,
    limitToBounds: true,
    panningEnabled: true,
    transformEnabled: true,
    pinchEnabled: true,
    limitToWrapper: true,
    // disabled: false,
    dbClickEnabled: true,
    lockAxisX: false,
    lockAxisY: false,
    velocityEqualToMove: true,
    enableWheel: true,
    enableTouchPadPinch: true,
    enableVelocity: true,
    limitsOnWheel: false,
  };

  public render = (): ReactNode => {
    const {
      // type,
      limitToBounds,
      panningEnabled,
      transformEnabled,
      pinchEnabled,
      limitToWrapper,
      // disabled,
      dbClickEnabled,
      lockAxisX,
      lockAxisY,
      velocityEqualToMove,
      enableWheel,
      enableTouchPadPinch,
      enableVelocity,
      limitsOnWheel,
    } = this.state;
    const imageData = this.props.args["imageData"]

    return (
      // <div className="body">
        // <div className="container">
            <div className="align-items-center">
              <div className="col-lg-12 order-lg-2 example">
                <TransformWrapper
                  options={{
                    limitToBounds,
                    transformEnabled,
                    disabled: this.props.disabled,
                    limitToWrapper,
                  }}
                  pan={{
                    disabled: !panningEnabled,
                    lockAxisX,
                    lockAxisY,
                    velocityEqualToMove,
                    velocity: enableVelocity,
                  }}
                  pinch={{ disabled: !pinchEnabled }}
                  doubleClick={{ disabled: !dbClickEnabled }}
                  wheel={{
                    wheelEnabled: enableWheel,
                    touchPadEnabled: enableTouchPadPinch,
                    limitsOnWheel,
                  }}
                >
                  {({
                    zoomIn,
                    zoomOut,
                    resetTransform,
                    setDefaultState,
                    positionX,
                    positionY,
                    scale,
                    previousScale,
                    options: { limitToBounds, transformEnabled, disabled },
                    ...rest
                  }) => (
                    <React.Fragment>
                      <div className="tools">
                        <div className="spacer" />
                        <button
                          className="btn-gradient cyan small"
                          onClick={zoomIn}
                          data-testid="zoom-in-button"
                        >
                          <img src={zoom_in} alt="" />
                        </button>
                        <button
                          className="btn-gradient blue small"
                          onClick={zoomOut}
                          data-testid="zoom-out-button"
                        >
                          <img src={zoom_out} alt="" />
                        </button>
                        <button
                          className="btn-gradient purple small"
                          onClick={resetTransform}
                          data-testid="reset-button"
                        >
                          <img src={zoom_reset} alt="" />
                        </button>
                      </div>
                      <div className="element">
                      <TransformComponent>
                        <img
                          className="zoom"
                          style={{objectFit: "contain"}}
                          src={`data:image/png;base64,${imageData}`}
                          alt="example-element"
                        />
                      </TransformComponent>
                      </div>
                      <div className="info">
                        {/* <h3>State</h3> */}
                        <h5>
                          <span className="badge badge-secondary">
                            Position x : {positionX}px
                          </span>
                          <span className="badge badge-secondary">
                            Position y : {positionY}px
                          </span>
                          <span className="badge badge-secondary">
                            Scale : {scale}
                          </span>
                          <span className="badge badge-secondary">
                            Previous scale : {previousScale}
                          </span>
                        </h5>
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </div>
          // </div>
      // </div>
    );
  }
}

export default withStreamlitConnection(ImageZoom)