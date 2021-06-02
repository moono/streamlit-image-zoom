import os
import numpy as np
import streamlit.components.v1 as components

from dataclasses import dataclass
from PIL import Image


_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        'st_image_zoom', url='http://localhost:3001',
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, 'frontend/build')
    _component_func = components.declare_component('st_image_zoom', path=build_dir)


@dataclass
class ImageResult:
    """Dataclass to store output of React Component
    Attributes
    ----------
    image_data: np.array
        RGBA Matrix of Image Data.
    # json_data: dict
    #     JSON string of canvas and objects.
    """

    image_data: np.array = None
    # json_data: dict = None


def st_image_zoom(image, key=None):
    """Create a new instance of "my_component".

    Parameters
    ----------
    # name: str
    #     The name of the thing we're saying hello to. The component will display
    #     the text "Hello, {name}!"
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    # int
    #     The number of times the component's "Click Me" button has been clicked.
    #     (This is the value passed to `Streamlit.setComponentValue` on the
    #     frontend.)

    """
    
    component_value = _component_func(
        name=name, 
        key=key, 
        default=None,
    )
    
    if component_value is None:
        return ImageResult

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value


# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/__init__.py`
if not _RELEASE:
    import streamlit as st

    st.subheader('Test image')
    
    image_file = './test-images/Dark-Mode-macOS-catalina-quality.jpg'
    sample_image = Image.open(image_file)
    # Create an instance of our component with a constant `name` arg, and
    # print its output value.
    num_clicks = st_image_zoom('World')
    # st.markdown('You've clicked %s times!' % int(num_clicks))
