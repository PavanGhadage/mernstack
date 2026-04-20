// import React from "react";
// class Messege extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "Pavan",
//       age: 22,
//       count: 0,
//     };
//   }

//   //   render() {
//   //     return (
//   //       <>
//   //         <h1>Hello My anme is Pavan And Created app using Class component </h1>
//   //         <h1>
//   //           {this.state.name} <br /> {this.state.age} <br /> {this.state.count}
//   //         </h1>
//   //         <button
//   //           onClick={() =>
//   //             this.setState({
//   //               name: "Pavan",
//   //               age: 23,
//   //               count: this.state.count + 1,
//   //             })
//   //           }
//   //         >
//   //           click me{" "}
//   //         </button>
//   //       </>
//   //     );
//   //   }
//   render() {
//     return (
//       <>
//         <h1>Hello, my name is Pavan</h1>
//         <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
//           <p>Name: {this.state.name}</p>
//           <p>Age: {this.state.age}</p>
//           <p>Count: {this.state.count}</p>
//         </div>

//         <button
//           onClick={() =>
//             this.setState({
//               age: 23,
//               count: this.state.count + 1,
//             })
//           }
//         >
//           Click Me
//         </button>
//       </>
//     );
//   }
// }
// export default Messege;
import React from "react";

import "../style/Messege.css";

class Messege extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Pavan",
      age: 22,
      count: 0,
    };
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Hello! I am {this.state.name}</h1>

        <div className="info-card">
          <strong>Name:</strong> {this.state.name} <br />
          <strong>Age:</strong> {this.state.age} <br />
          <strong>Count:</strong> {this.state.count}
        </div>

        <button
          className="btn-update"
          onClick={() =>
            this.setState({
              age: 23,
              count: this.state.count + 1, // Fixed the increment bug here
            })
          }
        >
          Click Me
        </button>
      </div>
    );
  }
}

export default Messege;
