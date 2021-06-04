import os
import base64
import streamlit.components.v1 as components

from io import BytesIO
from PIL import Image
# from dataclasses import dataclass


_RELEASE = True

if not _RELEASE:
    _st_image_zoom = components.declare_component(
        'st_image_zoom', url='http://localhost:3001',
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, 'frontend/build')
    _st_image_zoom = components.declare_component('st_image_zoom', path=build_dir)


def st_image_zoom(image, key=None):
    """Create a new instance of "my_component".

    Parameters
    ----------
    image: PIL.Image
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    None
    """
    
    # wrap as base64 encoded data
    buff = BytesIO()
    image.save(buff, format='PNG')
    image_str = base64.b64encode(buff.getvalue()).decode('utf-8')
    
    _st_image_zoom(imageData=image_str, key=key, default=None)


# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/__init__.py`
if not _RELEASE:
    import streamlit as st
    
    st.subheader('Test image')
    
    image_file  = st.sidebar.file_uploader(
        label='Input file',
        type=['png', 'jpg'],
        accept_multiple_files=False,
    )
    
    if image_file is not None:
        image = Image.open(image_file)
        image = image.convert('RGB')
        
        st.image(image, use_column_width=True)
        st_image_zoom(image)
