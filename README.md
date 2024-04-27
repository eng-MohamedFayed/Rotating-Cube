### Interactive 3D Cube Visualization

This project demonstrates the use of WebGL to create an interactive 3D visualization of a cube. Users can manipulate the cube in real-time through a variety of transformations, including translation, rotation, and scaling. The project is built using HTML and JavaScript, making extensive use of WebGL shaders for the rendering pipeline.

#### Features

- **3D Cube Manipulation**: Users can interact with the 3D cube using buttons to rotate the cube along the x, y, and z axes, scale the cube up or down, and translate the cube horizontally.
- **Dynamic Interaction Controls**: Includes buttons to start or stop the cube's movement, initiate slow motion, or reset the cube to its original speed.
- **Real-Time Rendering**: Utilizes vertex and fragment shaders for real-time manipulation and rendering of the cube.

#### Implementation Details

- **WebGL Shaders**: Two shaders are implemented:
  - **Vertex Shader**: Handles the transformations of the cube's vertices based on user interactions. It supports rotation, scaling, and translation through uniform variables controlled by JavaScript.
  - **Fragment Shader**: Assigns color to each pixel rendered on the cube's surface.
- **JavaScript Controls**: JavaScript functions manage user interactions through buttons, adjusting transformation parameters like angle of rotation, scaling factor, and translation distance. The cube's state and render loop are managed using `requestAnimationFrame` for efficient graphics updates.

#### Technologies Used

- **HTML5**: For structuring the web interface and embedding the WebGL canvas.
- **JavaScript**: For creating interactive elements and managing WebGL operations.
- **WebGL**: For rendering 3D graphics within the browser without the need for external plugins.

#### How to Run

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser that supports WebGL (e.g., Chrome, Firefox, Edge).
3. Use the provided buttons on the webpage to manipulate the cube.

#### Future Enhancements

- **Touch Support**: Implement touch controls for mobile and tablet devices.
- **Additional Geometric Shapes**: Extend the application to include more 3D shapes.
- **User-Configurable Parameters**: Allow users to change parameters like color, speed of rotation, and scaling limits through a GUI.

This project is a great example of how WebGL can be used to build interactive and high-performance graphical applications directly in a web browser. Whether you're learning WebGL or looking to build similar 3D visualizations, this project provides a foundational approach to handling user interactions and rendering in real-time.
