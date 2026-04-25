
import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Page1 from "./Components/Page1";

import {
  products as P,
  phones as ph,
  shoes as S,
  watches as W,
  clothes as C,
} from "./array";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isAll: true,
      isphone: false,
      isshoes: false,
      iswatches: false,
      isclothes: false,
    };
  }

  render() {
    return (
      <>
        {/* Heading */}
        <h1 className="text-white bg-dark p-3 text-center">E-Commerce Store</h1>

        <div className="container">
          {/* Buttons */}
          <div className="text-center my-4">
            <button
              className="btn btn-dark m-2"
              onClick={() =>
                this.setState({
                  isAll: true,
                  isphone: false,
                  isshoes: false,
                  iswatches: false,
                  isclothes: false,
                })
              }
            >
              All
            </button>

            <button
              className="btn btn-primary m-2"
              onClick={() =>
                this.setState({
                  isAll: false,
                  isphone: true,
                  isshoes: false,
                  iswatches: false,
                  isclothes: false,
                })
              }
            >
              Phones
            </button>

            <button
              className="btn btn-success m-2"
              onClick={() =>
                this.setState({
                  isAll: false,
                  isphone: false,
                  isshoes: true,
                  iswatches: false,
                  isclothes: false,
                })
              }
            >
              Shoes
            </button>

            <button
              className="btn btn-warning m-2"
              onClick={() =>
                this.setState({
                  isAll: false,
                  isphone: false,
                  isshoes: false,
                  iswatches: true,
                  isclothes: false,
                })
              }
            >
              Watches
            </button>

            <button
              className="btn btn-info m-2"
              onClick={() =>
                this.setState({
                  isAll: false,
                  isphone: false,
                  isshoes: false,
                  iswatches: false,
                  isclothes: true,
                })
              }
            >
              Clothes
            </button>
          </div>

          {/* Product Section */}
          <div className="row">
            {this.state.isAll
              ? P.map((val, index) => (
                  <Page1
                    key={index}
                    name={val.name}
                    price={val.price}
                    category={val.category}
                    img={val.img}
                  />
                ))
              : this.state.isphone
                ? ph.map((val, index) => (
                    <Page1
                      key={index}
                      name={val.name}
                      price={val.price}
                      category={val.category}
                      img={val.img}
                    />
                  ))
                : this.state.isshoes
                  ? S.map((val, index) => (
                      <Page1
                        key={index}
                        name={val.name}
                        price={val.price}
                        category={val.category}
                        img={val.img}
                      />
                    ))
                  : this.state.iswatches
                    ? W.map((val, index) => (
                        <Page1
                          key={index}
                          name={val.name}
                          price={val.price}
                          category={val.category}
                          img={val.img}
                        />
                      ))
                    : this.state.isclothes
                      ? C.map((val, index) => (
                          <Page1
                            key={index}
                            name={val.name}
                            price={val.price}
                            category={val.category}
                            img={val.img}
                          />
                        ))
                      : null}
          </div>
        </div>
      </>
    );
  }
}
