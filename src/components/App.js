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

  handleButtonPress(event, text) {
    const ops = ["-", "+", "*", "/", "."];
    const lastBlock = this.state.display.split(/[-+*/]/).at(-1);
    const lastChar = this.state.display.at(-1);
    switch (text) {
      case "AC":
        this.setState({ display: "0" });
        return;
      case "=":
        return;
      case "0":
        if (lastBlock.match(/^0+$/)) return;
        break;
      case ".":
        if (lastBlock.includes(".")) return;
      case "+":
      case "-":
      case "*":
      case "/":
        if (ops.includes(this.state.display.at(-1))) return;
      default:
        break;
    }

    if (lastBlock.match(/^0+$/) && text !== ".") {
      this.setState((state) => {
        return { display: state.display.slice(0, -1) + text };
      });
    } else {
      this.setState((state) => {
        return { display: state.display + text };
      });
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
