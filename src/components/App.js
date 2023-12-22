import { Component } from "react";
import Display from "./Display";
import Button from "./Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  calculate(text) {
    return eval(text).toString();
  }

  handleButtonPress(event, text) {
    console.log("input: " + text);
    const ops = ["-", "+", "*", "/"];
    const lastBlock = this.state.display.split(/[-+*/]/).at(-1);
    // AC clears the input
    if (text === "AC") {
      console.log("clear");
      this.setState({ display: "0" });
      return;
    }
    // Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.
    if (text === "=") {
      let display = this.state.display;
      if (display.startsWith("0")) display = display.slice(1, display.length);
      let result;
      console.log("calculate(): " + display);
      if (ops.includes(display.at(-1))) {
        result = this.calculate(display.slice(0, display.length - 1));
      } else {
        result = this.calculate(display);
      }
      console.log("result: " + result);
      this.setState({ display: result });
      return;
    }
    // not allow a number to begin with multiple zeros.
    if (text === "0" && lastBlock.match(/^0+$/)) return;
    // a . should append to the currently displayed value
    // two . in one number should not be accepted.
    if (text === ".") {
      if (lastBlock.includes(".")) return;
      if (lastBlock === "") {
        this.setState((state) => ({ display: state.display + "0." }));
      } else {
        this.setState((state) => ({ display: state.display + text }));
      }
      return;
    }
    // If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).
    if (ops.includes(text) && lastBlock === "") {
      if (text === "-") {
        this.setState((state) => ({ display: state.display + text }));
      } else {
        let count = 0;
        for (let i = this.state.display.length; i >= 0; i--) {
          if (ops.includes(this.state.display.at(i))) {
            count++;
          }
        }
        console.log("Count: " + count);
        this.setState((state) => ({ display: state.display.slice(0, state.display.length - count) + text }));
      }
      return;
    }
    // only zeros gets replaced by number
    if (lastBlock.match(/^0$/)) {
      console.log("onlyZero: " + this.state.display);
      this.setState((state) => ({ display: state.display.slice(0, state.display.length - 1) + text }));
    } else {
      // Rest is displayed normally
      console.log("Rest: " + this.state.display);
      this.setState((state) => ({ display: state.display + text }));
    }
  }

  render() {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-orange-300">
        <div className="grid grid-cols-4 grid-rows-6 border border-orange-900 p-5 rounded-md bg-orange-800">
          <Display text={this.state.display} />
          <Button callback={this.handleButtonPress} id="clear" text="AC" customClass="col-span-2 bg-red-500" />
          <Button callback={this.handleButtonPress} id="divide" text="/" customClass="bg-gray-400" />
          <Button callback={this.handleButtonPress} id="multiply" text="*" customClass="bg-gray-400" />
          <Button callback={this.handleButtonPress} id="seven" text="7" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="eight" text="8" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="nine" text="9" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="subtract" text="-" customClass="bg-gray-400" />
          <Button callback={this.handleButtonPress} id="four" text="4" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="five" text="5" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="six" text="6" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="add" text="+" customClass="bg-gray-400" />
          <Button callback={this.handleButtonPress} id="one" text="1" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="two" text="2" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="three" text="3" customClass="bg-orange-600" />
          <Button callback={this.handleButtonPress} id="equals" text="=" customClass="row-span-2 bg-slate-500" />
          <Button callback={this.handleButtonPress} id="zero" text="0" customClass="col-span-2 bg-orange-600" />
          <Button callback={this.handleButtonPress} id="decimal" text="." customClass="bg-orange-600" />
        </div>
      </div>
    );
  }
}

export default App;
