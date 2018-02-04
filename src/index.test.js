import React from "react";
import { expect } from "chai"
import { mount } from "enzyme";
import sinon from "sinon";
import RadioSelect from "./index";

describe("RadioSelect", () => {

  const options = [
    {
      value: "1001",
      text: "Item 1001",
      component: <div>Item 1001</div>
    },
    {
      value: "1002",
      text: "Item 1002",
      component: <div>Item 1002</div>
    },
    {
      value: "1003",
      text: "Item 1003",
      component: <div>Item 1003</div>
    },
    {
      value: "1004",
      text: "Item 1004",
      component: <div>Item 1004</div>
    },
  ]
  const name = "test-radio-select";
  let wrapper;
  let clock;

  wrapper = mount(
    <RadioSelect
      options={options}
      name={name}
      defaultOption={0}
      required={true}/>
  );

  it("the component renders", () => {
    expect(wrapper).to.be.ok;
  })

  describe("events", () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();
      wrapper = mount(
        <RadioSelect
          options={options}
          name={name}
          defaultOption={0}
          required={true}/>
      );
    })

    afterEach(() => {
      clock.restore();
    })


    it("focusing an input adds class 'focused' to the container div" , () => {
      expect(wrapper.find('.radio-select').hasClass('focused')).to.equal(false);
      wrapper.find("input").first().simulate("focus");
      expect(wrapper.find('.radio-select').hasClass('focused')).to.equal(true);
    })

    it("pressing enter toggles class 'collapsed'", () => {
      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(true);
      wrapper.find("input").first().simulate("keydown", {keyCode: 13});
      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(false);
      wrapper.find("input").first().simulate("keydown", {keyCode: 13});
      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(true);
    })

    it("pressing space removes class collapsed", () => {
      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(true);
      wrapper.find("input").first().simulate("keydown", {keyCode: 32});
      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(false);
    })

    it("pressing esc adds class collapsed", () => {

      wrapper.find("input").first().simulate("keydown", {keyCode: 13});
      

      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(false);
      wrapper.find("input").first().simulate("keydown", {keyCode: 27});
      expect(wrapper.find('.option-list').hasClass('collapsed')).to.equal(true);
    })

  })
});