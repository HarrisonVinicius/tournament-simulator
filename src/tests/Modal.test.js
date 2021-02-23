import React from 'react';
import Enzyme, { shallow , mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import { findByTestAttr } from "./testUtils";
import Modal from '../components/molecules/Modal'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
    return shallow(<Modal />)
}

test('name input renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-inputName')
    expect(component.length).toBe(1)
})

test('phone input renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-inputPhone')
    expect(component.length).toBe(1)
})

test('email input renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-inputEmail')
    expect(component.length).toBe(1)
})



